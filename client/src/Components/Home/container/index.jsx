import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

// Actions
import { fetchTeams, fetchUsers } from '../../../actions/teams';

// components
import Navbar from '../../common/Navbar';
import Card from '../components/Cards';
import Modal from '../../common/Modals/AddMember';
import Footer from '../../common/Footer';
import config from '../../../config';

class Home extends Component {
  static propTypes = {
    fetchTeams: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    teams: PropTypes.shape({
      teams: PropTypes.object.isRequired
    }).isRequired,
    users: PropTypes.shape({
      users: PropTypes.object.isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    auth: PropTypes.shape({
      loggedIn: PropTypes.bool
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      teamsCount: 0,
      offset: 0,
      hasMore: true,
      teams: []
    };

    this.loadMore = this.loadMore.bind(this);
    this.spinner = this.spinner.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    const elem = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(elem, {
      constrainWidth: false,
      coverTrigger: false,
      inDuration: 400
    });
    this.loadMore();
    // this.props.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.loggedIn) nextProps.history.push('/');

    if (nextProps.teams.teams && nextProps.teams.meta) {
      const {
        teams: {
          meta: {
            pagination: { total }
          }
        }
      } = nextProps;

      this.setState(prevState => ({
        teamsCount: prevState.TeamsCount + total
      }));

      if (nextProps.teams.teams.length >= total) {
        this.setState(prevState => ({
          hasMore: !prevState.hasMore
        }));
      }
    }
  }
  loadMore() {
    const { offset, teamsCount } = this.state;
    if (this.props.teams && this.props.teams.meta) {
      if (offset >= teamsCount) {
        return;
      }
    }

    this.props.fetchTeams(2, this.state.offset);
    this.setState(prevState => ({
      offset: prevState.offset + 2
    }));
  }
  render() {
    const { teams, users } = this.props;
    const { hasMore } = this.state;
    return (
      <div>
        <Navbar />
        <Modal />
        <div className="row mt-2">
          <InfiniteScroll
            dataLength={this.state.teamsCount}
            next={this.loadMore}
            hasMore={hasMore}
            loader={
              <div className="center">
                <img
                  src={config.spinner}
                  className="custom-spinner"
                  alt="loading..."
                />
              </div>
            }
          >
            <Card teams={teams} users={users} />
          </InfiniteScroll>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams,
  users: state.users,
  auth: state.auth
});

export default connect(mapStateToProps, { fetchTeams, fetchUsers })(Home);
