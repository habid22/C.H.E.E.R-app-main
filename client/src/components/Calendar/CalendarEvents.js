import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarStyles.css'; // Make sure this import points to your CSS file correctly
import TTSControls from '../TTS/TTSControls';

Modal.setAppElement('#root');

const localizer = momentLocalizer(moment);

const CalendarEvents = () => {
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const calendarId = '9efd4aac130c07c3a4d808d436b295cd5553cf46ef52c08054500485bb954c7d@group.calendar.google.com';
        const apiKey = ''; //Removed for security reasons, also next time put this in an env !!! 
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}`;

        const fetchEvents = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const transformedEvents = data.items.map(event => ({
                    id: event.id,
                    title: event.summary,
                    start: new Date(event.start.dateTime || event.start.date),
                    end: new Date(event.end.dateTime || event.end.date),
                    desc: event.description || 'No description',
                }));
                setEvents(transformedEvents);
            } catch (error) {
                console.error("Error fetching calendar events:", error);
            }
        };

        fetchEvents();
    }, []);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleEventSelect = (event) => {
        if (modalIsOpen) return; // Prevents opening a new modal if one is already open
        setSelectedEvent(event);
        openModal();
    };

    return (
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleEventSelect}
                style={{ height: '100%', margin: '0 auto' }}
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Event Details"
                className="custom-modal"
                overlayClassName="custom-modal-overlay"
            >
                {selectedEvent && (
                    <div>
                        <h2>{selectedEvent.title}</h2>
                        <p>Start: {selectedEvent.start.toLocaleString()}</p>
                        <p>End: {selectedEvent.end.toLocaleString()}</p>
                        <p>Description: {selectedEvent.desc}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                )}
                <TTSControls />
            </Modal>
        </div>
    );
};

export default CalendarEvents;
