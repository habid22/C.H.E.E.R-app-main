import React, { useState, useEffect } from 'react';
import { Box, Select, Button, Flex, Input, VStack, HStack, Text, useToast } from '@chakra-ui/react';
import moment from 'moment';
import { getTeachers, fetchClockingRecords, updateRecord, addRecord, deleteRecord } from '../../hooks/clockingHooks';

const EditClockingRecords = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [records, setRecords] = useState([]);
    const [editingRecords, setEditingRecords] = useState({});
    const [newRecord, setNewRecord] = useState({
        punchIn: moment().format('YYYY-MM-DDTHH:mm'),
        punchOut: moment().format('YYYY-MM-DDTHH:mm')
      });
      
    const toast = useToast();

    useEffect(() => {
        const loadTeachers = async () => {
            const fetchedTeachers = await getTeachers();
            setTeachers(fetchedTeachers);
        };
        loadTeachers();
    }, []);

    const fetchRecords = async () => {
        if (selectedTeacher && month && year) {
            try {
                const fetchedRecords = await fetchClockingRecords(selectedTeacher, year, month - 1);
                setRecords(fetchedRecords);
                let editState = {};
                fetchedRecords.forEach(record => {
                    editState[record.id] = {
                        punchIn: record.punchIn ? moment(record.punchIn.toDate()).format('YYYY-MM-DDTHH:mm') : '',
                        punchOut: record.punchOut ? moment(record.punchOut.toDate()).format('YYYY-MM-DDTHH:mm') : '',
                    };
                });
                setEditingRecords(editState);
            } catch (error) {
                toast({ title: 'Error fetching records.', status: 'error', description: error.message });
            }
        }
    };

    // Use fetchRecords function in useEffect hook
    useEffect(() => {
        fetchRecords();
        // You should remove the async function inside and just use fetchRecords
    }, [selectedTeacher, month, year]);

    const handleUpdateRecord = async (recordId) => {
        try {
            const { punchIn, punchOut } = editingRecords[recordId];
            await updateRecord(recordId, {
                punchIn: punchIn ? moment(punchIn, 'YYYY-MM-DDTHH:mm').toDate() : null,
                punchOut: punchOut ? moment(punchOut, 'YYYY-MM-DDTHH:mm').toDate() : null,
            });
            toast({ title: 'Record updated successfully.', status: 'success' });
            fetchRecords();
        } catch (error) {
            toast({ title: 'Error updating record.', status: 'error' });
        }
    };

    const handleRecordChange = (recordId, field, value) => {
        setEditingRecords(prev => ({
            ...prev,
            [recordId]: { ...prev[recordId], [field]: value } 
        }));
    };

    const handleAddRecord = async () => {
        try {
            const selectedTeacherInfo = teachers.find(teacher => teacher.id === selectedTeacher);
            if (!selectedTeacherInfo) {
                toast({ title: 'Teacher not found.', status: 'error' });
                return;
            }

            const now = moment();
            const recordId = `${now.format('YYYYMMDD_HHmmss')}_added_${selectedTeacher}`;

            const newRecordData = {
                id: recordId,
                userId: selectedTeacher,
                name: selectedTeacherInfo.name,
                punchIn: newRecord.punchIn ? moment(newRecord.punchIn, 'YYYY-MM-DDTHH:mm').toDate() : null,
                punchOut: newRecord.punchOut ? moment(newRecord.punchOut, 'YYYY-MM-DDTHH:mm').toDate() : null,
            };

            await addRecord(newRecordData);
            toast({ title: 'Record added successfully.', status: 'success' });
            fetchRecords();
        } catch (error) {
            toast({ title: 'Error adding record.', status: 'error' });
        }
    };

    const handleDeleteRecord = async (recordId) => {
        try {
            await deleteRecord(recordId);
            toast({ title: 'Record deleted successfully.', status: 'success' });
            fetchRecords();
        } catch (error) {
            toast({ title: 'Error deleting record.', status: 'error' });
        }
    };


    return (
        <Box  p={4}
            bg="gray.50"
            boxShadow="base"
            borderRadius="md"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            w="full"
            maxW= "600px"
            mx="auto"
            my={6}>
            <Text fontSize="xl" mb="4">Edit Clocking Records</Text>
            <VStack spacing="4" align="stretch" mb="4">
                <Select onChange={(e) => setSelectedTeacher(e.target.value)} placeholder="Select teacher">
                    {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                </Select>
                <HStack>
                    <Select onChange={(e) => setMonth(e.target.value)} value={month} placeholder="Select month">
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                        ))}
                    </Select>
                    <Select onChange={(e) => setYear(e.target.value)} value={year} placeholder="Select year">
                        {Array.from(new Array(20), (_, i) => {
                            const yearOption = new Date().getFullYear() - i;
                            return <option key={yearOption} value={yearOption}>{yearOption}</option>;
                        })}
                    </Select>
                </HStack>
                {/* <Button colorScheme="blue" onClick={fetchRecords}>Fetch Records</Button> */}
            </VStack>

            {records.map((record) => (
                <Flex key={record.id} p="4" borderWidth="1px" boxShadow="base"borderRadius="lg" mb="2" direction="column">
                    <Text mb="2">Record ID: {record.id}</Text>
                    <HStack mb="2">
                        <Input
                            type="datetime-local"
                            value={editingRecords[record.id]?.punchIn || ''}
                            onChange={(e) => handleRecordChange(record.id, 'punchIn', e.target.value)}
                        />
                        <Input
                            type="datetime-local"
                            value={editingRecords[record.id]?.punchOut || ''}
                            onChange={(e) => handleRecordChange(record.id, 'punchOut', e.target.value)}
                        />

                    </HStack>
                    <Button colorScheme="blue" onClick={() => handleUpdateRecord(record.id)}>Update</Button>
                    <Button colorScheme="red" onClick={() => handleDeleteRecord(record.id)}>Delete</Button>
                </Flex>
            ))}

            <Box p="4" borderWidth="1px" boxShadow="base"borderRadius="lg" mt="4" bg="blue.50">
                <Text mb="2">Add New Record</Text>
                <Flex gap="2" mb="2">
                    <Input
                        type="datetime-local"
                        value={newRecord.punchIn}
                        onChange={(e) => setNewRecord({ ...newRecord, punchIn: e.target.value })}
                        placeholder="Punch In"
                    />
                    <Input
                        type="datetime-local"
                        value={newRecord.punchOut}
                        onChange={(e) => setNewRecord({ ...newRecord, punchOut: e.target.value })}
                        placeholder="Punch Out"
                    />
                </Flex>
                <Button colorScheme= "whatsapp" onClick={handleAddRecord}>Add Record</Button>
            </Box>
        </Box>
    );
};

export default EditClockingRecords;
