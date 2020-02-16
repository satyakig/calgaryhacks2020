import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { getDb } from '../lib/Firebase';

// import './styles.css';
// must manually import the stylesheets for each plugin
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './main.scss'; // webpack must be configured to do this

export default () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getDb()
      .collection('courses')
      .onSnapshot(function(querySnapshot) {
        const events = [];
        querySnapshot.forEach(function(doc) {
          events.push(doc.data());
        });

        const newEvents = events.flatMap((course) => {
          return course.Deliverables.map((ev) => {
            return {
              ...ev,
              title: `${course.course} ${ev.name}`,
            };
          });
        });

        setEvents(newEvents);
      });
  }, []);

  return (
    <FullCalendar
      defaultView="dayGridMonth"
      header={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      }}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      // ref={this.calendarComponentRef}
      // weekends={this.state.calendarWeekends}
      // events={this.state.calendarEvents}
      // dateClick={this.handleDateClick}
      events={events}
    />
  );
};
