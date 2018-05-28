import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MemberCard extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    remove: PropTypes.string.isRequired,
    addMember: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };

    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay() {
    this.setState(prevState => ({ show: !prevState.show }));
  }

  render() {
    const {
      name, role, photo, remove, addMember, userId
    } = this.props;
    /* eslint-disable */
    return (
      <div className="row p-3">
        <div className="col s11">
          <div
            className="list-wrapper light-shadow"
            onMouseEnter={this.toggleDisplay}
            onMouseLeave={this.toggleDisplay}
          >
            <div className="user-list pl-10 col s1">
              <img src={photo} alt="displayPhoto" className="user-photo" />
            </div>
            <div className="col s7">
              <h5 className="capitalize username">{name}</h5>
              {role && (
                <p className="role grey-text">
                  {role}{' '}
                  {this.state.show && (
                    <a href="#!">
                      <em>change role</em>
                    </a>
                  )}
                </p>
              )}
            </div>
            <div className="col s6" />
            <div className="user-action col s1 hovered ">
              {!remove && (
                <i
                  className="material-icons "
                  data-tip="add member"
                  onClick={event => addMember(event, userId)}
                >
                  person_add
                </i>
              )}
              {remove && (
                <i className="material-icons text-red" data-tip="remove member">
                  remove_circle
                </i>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default MemberCard;
