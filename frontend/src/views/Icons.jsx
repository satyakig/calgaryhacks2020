import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
// import { getDb } from '../lib/Firebase';

// import './styles.css';
// must manually import the stylesheets for each plugin
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './main.scss'; // webpack must be configured to do this

export default () => {
  const [courseLoad, setCourseLoad] = useState([]);
  const [events, setEvents] = useState([]);
  const courses = useSelector((state) => {
    return state.courseReducer;
  });

  const user = useSelector((state) => {
    return state.userReducer;
  });

  function getWeeklyCourseLoad(userCourses) {
    fetch(`https://calgaryhacks2020.appspot.com/getweek/${userCourses.join(',')}`)
      .then((res) => res.json())
      .then((result) => {
        setCourseLoad(result['percentageArr']);
      });
  }

  useEffect(() => {
    getWeeklyCourseLoad(user.selectedCourses);
  }, [user.selectedCourses]);

  useEffect(() => {
    const userEvents = courses.deliverables
      .filter((deliverable) => {
        return user.selectedCourses.includes(deliverable.course);
      })
      .map((event) => {
        return {
          ...event,
          title: `${event.course} ${event.name}`,
        };
      });

    setEvents(userEvents);
  }, [user, courses]);

  return (
    <FullCalendar
      defaultView="dayGridMonth"
      header={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      }}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      contentHeight={700}
      // eventColor="red"
      // ref={this.calendarComponentRef}
      // weekends={this.state.calendarWeekends}
      // events={this.state.calendarEvents}
      // dateClick={this.handleDateClick}
      events={events}
    />
  );
};
