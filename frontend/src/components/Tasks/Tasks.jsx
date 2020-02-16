import React, { useState, useEffect } from 'react';
import Checkbox from 'components/CustomCheckbox/CustomCheckbox.jsx';
import { useSelector } from 'react-redux';

export const Tasks = () => {
  const courses = useSelector((state) => {
    return state.userReducer.selectedCourses;
  });
  const [day, setDay] = useState([]);

  function getstudyplan(courses) {
    fetch(`https://calgaryhacks2020.appspot.com/getstudyplan/${courses.join(',')}`)
      .then((res) => res.json())
      .then((result) => {
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = now - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);

        setDay(result['todo_list'][day]);
      });
  }

  useEffect(() => {
    getstudyplan(courses);
  }, [courses]);

  function handleCheckbox(event) {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked,
    });
  }

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

export default Tasks;
