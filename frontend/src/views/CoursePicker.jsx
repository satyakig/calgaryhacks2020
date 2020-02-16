import React, { Component } from 'react';
import { Table, Form } from 'react-bootstrap';

import Button from 'components/CustomButton/CustomButton.jsx';

class CoursePicker extends Component {
  render() {
    return (
      <div className="content">
        <h1>Pick your courses</h1>
        <h2>Please select the courses you would like to take</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Description</th>
              <th>Select Course</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CPSC 559</td>
              <td>
                Designing and implementing distributed systems that overcome challenges due to
                concurrent computation, failure of components in the system and heterogeneity of
                processors and communication channels.
              </td>
              <td>
                <Button type="button" onClick={this.handleToggle}>
                  Add CPSC 559
                </Button>
              </td>
            </tr>
            <tr>
              <td>CPSC 565</td>
              <td>
                An insight into a new mindset for programming as an emergent and evolutionary
                process of "breeding," rather than constructing. Programs can evolve to perform
                specific tasks in a bottom-up fashion rather than being manually coded. Topics will
                include: decentralized agent-based programming, massive parallelism and interaction,
                evolution, swarm intelligence.
              </td>
              <td>
                <Button type="button" onClick={this.handleToggle}>
                  Add CPSC 565
                </Button>
              </td>
            </tr>
            <tr>
              <td>GOPH 375</td>
              <td>
                Causes of disasters such as earthquakes, tsunami, volcanic eruptions, mud flows,
                landslides, avalanches, flooding, tornadoes and hurricanes, and other critical
                phenomena such as sinkholes, ozone depletion and radiation, carbon dioxide and
                global warming, El Nino, toxic natural materials and pollution, and extraterrestrial
                impacts. Surveys of historic disasters and their effects on life on Earth. Methods
                of prediction and prevention of disasters and precautions for the mitigation of
                their effects.
              </td>
              <td>
                <Button type="button" onClick={this.handleToggle}>
                  Add GOPH 375
                </Button>
              </td>
            </tr>
            <tr>
              <td>CPSC 457</td>
              <td>
                An introduction to operating systems principles. Performance measurement; concurrent
                programs; the management of information, memory and processor resources.
              </td>
              <td>
                <Button type="button" onClick={this.handleToggle}>
                  Add CPSC 457
                </Button>
              </td>
            </tr>
            <tr>
              <td>CPSC 441</td>
              <td>
                Principles and practice in modern telecommunications, computer communications and
                networks. Layered communication protocols and current physical, data link, network
                and internet protocol layers. Circuit switching, packet switching, and an
                introduction to broadband multimedia networking.
              </td>
              <td>
                <Button type="button" onClick={this.handleToggle}>
                  Add CPSC 441
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Button variant="dark">Submit</Button>
      </div>
    );
  }

  handleToggle() {
    console.log();
  }
}

export default CoursePicker;
