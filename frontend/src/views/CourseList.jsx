import React from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Card from '../components/Card/Card.jsx';
import Button from '../components/CustomButton/CustomButton.jsx';
import { getDb } from '../lib/Firebase';

const CourseList = () => {
  const courses = useSelector((state) => {
    return state.courseReducer.courses;
  });

  const user = useSelector((state) => {
    return state.userReducer;
  });

  function selectCourse(index) {
    return () => {
      const course = courses[index].course;

      if (user.selectedCourses.includes(course)) {
        // Remove
        const newArr = user.selectedCourses.filter((val) => {
          return val !== course;
        });
        getDb()
          .collection('users')
          .doc(user.uid)
          .update({
            selectedCourses: newArr,
          })
          .then();
      } else {
        // Add
        const newArr = [...user.selectedCourses, course];

        if (newArr.length <= 5) {
          getDb()
            .collection('users')
            .doc(user.uid)
            .update({
              selectedCourses: newArr,
            })
            .then();
        }
      }
    };
  }

  return (
    <div className="content">
      <Grid fluid={true}>
        <Row>
          <Col md={12}>
            <Card
              title="Select your courses"
              ctTableFullWidth={true}
              ctTableResponsive={true}
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      {['Name', 'Description', 'Select Course'].map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => {
                      return (
                        <tr key={index}>
                          <td>{course.course}</td>
                          <td>{course.description}</td>
                          <td>
                            <Button
                              type="button"
                              onClick={selectCourse(index)}
                              className={
                                user.selectedCourses.includes(course.course)
                                  ? 'btn-danger'
                                  : 'btn-primary'
                              }
                            >
                              {user.selectedCourses.includes(course.course) ? 'Remove' : 'Add'}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default CourseList;
