import React, { useState, useEffect } from 'react';
import Checkbox from '../CustomCheckbox/CustomCheckbox.jsx';
import { useSelector } from 'react-redux';

export const Tasks = () => {
  const courses = useSelector((state) => {
    return state.userReducer.selectedCourses;
  });
  const [day, setDay] = useState([]);

  function getStudyPlan(cs) {
    if (cs.length > 0) {
      fetch(`https://calgaryhacks2020.appspot.com/getstudyplan/${cs.join(',')}`)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          const now = new Date();
          const start = new Date(now.getFullYear(), 0, 0);
          const diff = now - start;
          const oneDay = 1000 * 60 * 60 * 24;

          setDay(result['todo_list'][Math.floor(diff / oneDay)]);
        });
    }
  }

  useEffect(() => {
    getStudyPlan(courses);
  }, [courses]);

  const tasksTitle = day;

  const tasks = [];
  let number;
  for (let i = 0; i < tasksTitle.length; i++) {
    number = `checkbox${i}`;
    tasks.push(
      <tr key={i}>
        <td>
          <Checkbox number={number} isChecked={i === -1} />
        </td>
        <td>{tasksTitle[i]}</td>
      </tr>,
    );
  }
  return <tbody>{tasks}</tbody>;
};
