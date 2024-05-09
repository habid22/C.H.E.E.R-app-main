import React, { useState } from 'react';
import { fetchShiftsForMonth } from '../../hooks/clockingHooks';
import { Button, Select, Box, Text } from '@chakra-ui/react';
import * as XLSX from 'xlsx';
import moment from 'moment';

const ShiftsByMonthComponent = () => {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(new Date().getMonth());
    const [shifts, setShifts] = useState([]);

    const handleFetchShifts = async () => {
        const fetchedShifts = await fetchShiftsForMonth(year, month);

        // Calculate the total hours for each employee
        const employeeHours = fetchedShifts.reduce((acc, shift) => {
            const punchIn = moment(shift.punchIn);
            const punchOut = shift.punchOut ? moment(shift.punchOut) : moment();
            const duration = moment.duration(punchOut.diff(punchIn)).asHours();
            if (!acc[shift.name]) {
                acc[shift.name] = 0;
            }
            acc[shift.name] += duration;
            return acc;
        }, {});

        // Prepare the data for the 'Total Hours' sheet
        const totalHoursData = Object.entries(employeeHours).map(([name, totalHours]) => ({
            Name: name,
            'Total Hours': totalHours.toFixed(2)
        }));

        // Create sheets
        const shiftsSheet = XLSX.utils.json_to_sheet(fetchedShifts.map(shift => ({
            Name: shift.name,
            PunchIn: moment(shift.punchIn).format('YYYY-MM-DD HH:mm:ss'),
            PunchOut: shift.punchOut ? moment(shift.punchOut).format('YYYY-MM-DD HH:mm:ss') : ''
        })));

        const totalHoursSheet = XLSX.utils.json_to_sheet(totalHoursData);

        // Create a new workbook and append the sheets
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, shiftsSheet, 'Shifts');
        XLSX.utils.book_append_sheet(workbook, totalHoursSheet, 'Total Hours');

        // Generate the Excel file and trigger download
        XLSX.writeFile(workbook, `Shifts_${months[month]}_${year}.xlsx`);
    };

    const downloadCSV = (csvString, fileName) => {
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const convertToCSV = (shifts) => {
        // Create a title for each column
        const columns = "Name,Total Hours Worked,Punch In,Punch Out\n";

        // Map over shifts and create a row for each
        const rows = shifts.map(shift => {
            // Calculate total hours worked
            const punchInMoment = moment(shift.punchIn);
            const punchOutMoment = shift.punchOut ? moment(shift.punchOut) : moment();
            const duration = moment.duration(punchOutMoment.diff(punchInMoment));
            const totalHoursWorked = duration.asHours().toFixed(2);

            // Create a row string for the current shift
            return `${shift.name},${totalHoursWorked},${punchInMoment.format('YYYY-MM-DD HH:mm:ss')},${shift.punchOut ? punchOutMoment.format('YYYY-MM-DD HH:mm:ss') : ''}`;
        }).join("\n");

        // Return the full CSV string
        return columns + rows;
    };


    // Generate a list of years for the dropdown, e.g., from 2020 to the current year
    const years = Array.from(new Array(10), (val, index) => currentYear - index);

    // Months array for the dropdown
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <Box
            p={4}
            bg="gray.50"
            boxShadow="base"
            borderRadius="md"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            w="full"
            maxW="md"
            mx="auto"
            my={6}
        >
            <Select
                placeholder="Select year"
                mb={3}
                onChange={(e) => setYear(e.target.value)}
                value={year}
                w="full"
                borderColor="gray.300" // Set the border color
                borderWidth="2px" // Increase the border width
                borderRadius="md" // Round the corners
            >
                {years.map((yearOption) => (
                    <option key={yearOption} value={yearOption}>
                        {yearOption}
                    </option>
                ))}
            </Select>
            <Select
                placeholder="Select month"
                mb={3}
                onChange={(e) => setMonth(parseInt(e.target.value))}
                value={month}
                w="full"
                borderColor="gray.300"
                borderWidth="2px"
                borderRadius="md"
            >
                {months.map((monthName, index) => (
                    <option key={index} value={index}>
                        {monthName}
                    </option>
                ))}
            </Select>


            <Button
                onClick={handleFetchShifts}
                colorScheme="blue"
                w="full"
            >
                Download Shifts as Excel
            </Button>
        </Box>


    );
};

export default ShiftsByMonthComponent;
