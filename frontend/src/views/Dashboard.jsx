import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

import { Card } from 'components/Card/Card.jsx';
import { StatsCard } from 'components/StatsCard/StatsCard.jsx';
import { Tasks } from 'components/Tasks/Tasks.jsx';
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  courseLoad,
  customCharOpt,
  legendCourse,
} from 'variables/Variables.jsx';

import { TwitterTimelineEmbed } from 'react-twitter-embed';

class Dashboard extends Component {
  createLegend(json) {
    const legend = [];
    for (let i = 0; i < json['names'].length; i++) {
      const type = `fa fa-circle text-${json['types'][i]}`;
      legend.push(<i className={type} key={i} />);
      legend.push(' ');
      legend.push(json['names'][i]);
    }
    return legend;
  }
  getCurrentLevel() {
    let retVal = 7;
    fetch(`https://calgaryhacks2020.appspot.com/getweekcolour/GOPH375,CPSC457,CPSC441`)
      .then((res) => res.json())
      .then((result) => {
        retVal = result['percentageArr'][5];
      });

    return retVal;
  }
  getJoke() {
    fetch(`https://official-joke-api.appspot.com/random_joke`)
      .then((res) => res.json())
      .then((result) => {
        return result['setup'] + '\n' + result['punchline'];
      });

    return (
      'Why do you never see elephants hiding in trees?' + '\n' + "Because they're so good at it."
    );
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-hourglass" />}
                statsText={this.getCurrentLevel()}
                statsValue="105GB"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={4} sm={6}>
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="UCalgary"
                options={{ height: 150 }}
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                statsText="Joke of the day"
                statsValue={this.getJoke()}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Homework Load"
                category="Here is a view of your course load over the semester"
                stats="Updated 3 minutes ago"
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
                legend={<div className="legend">{this.createLegend(legendCourse)}</div>}
              />
            </Col>
            <Col md={4}>
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
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
