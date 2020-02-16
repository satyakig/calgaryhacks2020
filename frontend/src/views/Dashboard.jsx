import React, { useState, useEffect } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Card } from '../components/Card/Card.jsx';
import { Tasks } from '../components/Tasks/Tasks.jsx';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { useSelector } from 'react-redux';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const selectedCourses = useSelector((state) => {
    return state.userReducer.selectedCourses;
  });

  const [courseLoad, setCourseLoad] = useState([]);
  const [yRange, setYRange] = useState([0, 0]);
  const [joke, setJoke] = useState(
    "Why do you never see elephants hiding in trees?\nBecause they're so good at it.",
  );

  function getCourseLoad(courses) {
    if (courses.length > 0) {
      fetch(`https://calgaryhacks2020.appspot.com/getweekpercent/${courses.join(',')}`)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          const arr = result['percentageArr'];

          const vals = arr.map((val, index) => {
            return {
              name: `Week ${index + 1}`,
              Load: val,
            };
          });

          setCourseLoad(vals);
          setYRange([Math.min(...arr) - 1, Math.max(...arr) + 5]);
        });
    }
  }

  function getJoke() {
    fetch('https://official-joke-api.appspot.com/random_joke')
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setJoke(`${result['setup']}\n${result['punchline']}`);
      });
  }

  useEffect(() => {
    window.setInterval(() => {
      getJoke();
    }, 5000);
  }, []);

  useEffect(() => {
    getCourseLoad(selectedCourses);
  }, [selectedCourses]);

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col lg={8} sm={8}>
            <Card
              statsIcon="pe-7s-smile"
              title="Homework Load"
              category="Here is a view of your course load over the semester"
              stats={joke}
              content={
                <div style={{ width: '100%', height: 400 }}>
                  <ResponsiveContainer>
                    <AreaChart
                      data={courseLoad}
                      margin={{
                        top: 0,
                        right: 5,
                        left: 0,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={yRange} />
                      <Tooltip />
                      <Area type="monotone" dataKey="Load" stroke="#1DC7EA" fill="#31DBFE" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              }
            />
          </Col>
          <Col lg={4} sm={4}>
            <Row>
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="UCalgary"
                options={{ height: 350 }}
              />
            </Row>
            <Row>
              <Card
                title="Tasks"
                category="Targeted Studying for Today"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Dashboard;
