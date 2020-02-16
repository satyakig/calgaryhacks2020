import React, { useState, useEffect } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';
import { Card } from '../components/Card/Card.jsx';
import { Tasks } from '../components/Tasks/Tasks.jsx';
import { responsiveSales, customCharOpt } from '../variables/Variables.jsx';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const selectedCourses = useSelector((state) => {
    return state.userReducer.selectedCourses;
  });

  const [courseLoad, setCourseLoad] = useState({
    labels: [],
    series: [],
  });
  const [joke, setJoke] = useState(
    "Why do you never see elephants hiding in trees?\nBecause they're so good at it.",
  );

  function getCourseLoad(courses) {
    if (courses.length > 0) {
      const labels = [];
      for (let i = 0; i < 17; i++) {
        labels.push(i + 1);
      }

      fetch(`https://calgaryhacks2020.appspot.com/getweekpercent/${courses.join(',')}`)
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setCourseLoad({
            labels,
            series: [result['percentageArr']],
          });
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

  console.log(courseLoad);

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={8}>
            <Card
              statsIcon="fa fa-history"
              id="chartHours"
              title="Homework Load"
              category="Here is a view of your course load over the semester"
              stats={joke}
              content={
                <div className="ct-chart">
                  <ChartistGraph
                    data={courseLoad}
                    type="Line"
                    options={customCharOpt}
                    responsiveOptions={responsiveSales}
                  />
                </div>
              }
            />
          </Col>
          <Col lg={4} sm={4}>
            <Row>
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="UCalgary"
                options={{ height: 250 }}
              />
            </Row>
            <Row>
              <Card
                title="Tasks"
                category="Targed Studying for Today"
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
