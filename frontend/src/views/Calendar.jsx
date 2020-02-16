import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

const activities = ['Yoga', 'Workout', 'Run', 'Meditate'];

export default () => {
  const [events, setEvents] = useState([]);
  const [userLoad, setUserLoad] = useState([]);
  const [courseLoad, setCourseLoad] = useState([]);

  const courses = useSelector((state) => {
    return state.courseReducer;
  });

  const user = useSelector((state) => {
    return state.userReducer;
  });

  function getWeeklyCourseLoad(userCourses) {
    if (userCourses.length > 0) {
      fetch(`https://calgaryhacks2020.appspot.com/getstudyplan/${userCourses.join(',')}`)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          const load = result['todo_list'];

          let day = moment('January 01, 2020', 'MMMM DD, YYYY').startOf('day');
          let newEvents = [];

          let dayEvents = [];
          for (let i = 0; i < load.length; i++) {
            const cs = load[i];

            for (let j = 0; j < cs.length; j++) {
              const start = day.clone().add(2 * j + 15, 'hours');

              const c = cs[j];
              dayEvents.push({
                title: c
                  .split(': ')
                  .splice(0, 2)
                  .join(' - ')
                  .trim(),
                start: start.valueOf(),
                end: start
                  .clone()
                  .add(2, 'hours')
                  .valueOf(),
                textColor: '#292f36',
                borderColor: '#292f36',
              });
            }

            if (dayEvents.length < 3) {
              const start = day.clone().add(2 * dayEvents.length + 15, 'hours');

              dayEvents.push({
                title: activities[Math.floor(Math.random() * (3 + 1))],
                start: start.valueOf(),
                end: start
                  .clone()
                  .add(1, 'hours')
                  .valueOf(),
                textColor: '#00bfa5',
                borderColor: '#00bfa5',
              });
            }

            newEvents = [...newEvents, ...dayEvents];
            dayEvents = [];

            day = day.add(1, 'days').startOf('day');
          }

          setCourseLoad(newEvents);
        });
    }
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
          title: `${event.course} - ${event.name}`,
          textColor: '#d63c6b',
          borderColor: '#d63c6b',
          allDay: true,
        };
      });

    setUserLoad(userEvents);
  }, [user, courses]);

  useEffect(() => {
    setEvents([...userLoad, ...courseLoad]);
  }, [userLoad, courseLoad]);

  return (
    <FullCalendar
      defaultView="dayGridMonth"
      header={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      }}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      handleWindowResize={true}
      contentHeight={625}
      events={events}
      themeSyste="bootstrap"
    />
  );
};
