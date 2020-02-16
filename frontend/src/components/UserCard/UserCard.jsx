import React, { Component } from 'react';

export class UserCard extends Component {
  render() {
    return (
      <div className="card card-user">
        <div className="image">
          <img src={this.props.bgImage} alt="..." />
        </div>
        <div className="content">
          <div className="author">
            <span>
              <img className="avatar border-gray" src={this.props.avatar} alt="Logo" />
              <h4 className="title">
                {this.props.name}
                <br />
                <small>{this.props.userName}</small>
              </h4>
            </span>
          </div>
          <p className="description text-center">{this.props.description}</p>
        </div>
        <hr />
        <div className="text-center">{this.props.socials}</div>
      </div>
    );
  }
}

export default UserCard;
