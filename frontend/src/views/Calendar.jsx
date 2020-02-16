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

          let day = moment('January 01, 2020', 'MMMM DD, YYYY');
          const newCourses = [];

          for (let i = 0; i < load.length; i++) {
            const cs = load[i];

            if (cs.length > 0) {
              for (let j = 0; j < cs.length; j++) {
                const c = cs[j];
                newCourses.push({
                  title: c.split(': ').join(' - '),
                  date: day.format('YYYY-MM-DD'),
                  color: '#a2bdaf',
                });
              }
            }

            day = day.add(1, 'days');
          }

          setCourseLoad(newCourses);
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
          color: '#f44336',
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
      contentHeight={700}
      events={events}
      themeSyste="bootstrap"
    />
  );
};
