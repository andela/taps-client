import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { fetchTeams } from '../../../actions';

// components
import Navbar from '../../Common/Navbar';
import Card from '../components/Cards';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    this.props.fetchTeams();
  }

  render() {
    const { teams } = this.props;
    console.log('raw stuff', teams);
    return (
      <div>
        <Navbar />
        <div className="row mt-2">
          <Card teams={teams} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams
});

export default connect(mapStateToProps, { fetchTeams })(Home);
