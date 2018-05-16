import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

// Actions
import { fetchTeams, clearTeams } from '../../../actions/teams';

// components
import Navbar from '../../common/Navbar';
import Card from '../components/Cards';
import Modal from '../../common/Modals/AddMember';
import Footer from '../../common/Footer';
import config from '../../../config';

class Home extends Component {
  static propTypes = {
    fetchTeams: PropTypes.func.isRequired,
    clearTeams: PropTypes.func.isRequired,
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
      searchOffset: 0,
      hasMore: true,
      searchInput: ''
    };

    this.loadMore = this.loadMore.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.gotoHome = this.gotoHome.bind(this);
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
    this.setState(() => ({
      hasMore: true
    }));
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

      console.log(this.state.searchOffset, total);
      if (
        nextProps.teams.teams.length >= total ||
        this.state.searchOffset >= total
      ) {
        this.setState(() => ({
          hasMore: false
        }));
      }
    }
  }

  gotoHome(event) {
    console.log('going back home.....');
    this.setState(() => ({ searchInput: '', searchOffset: 0, offset: 0 }));
    this.props.clearTeams();
    this.loadMore('', 0);
  }

  handleSearch(event) {
    event.preventDefault();
    this.props.clearTeams();
    this.loadMore(this.state.searchInput);
    this.setState(() => ({ offset: 0, searchInput: '', searchOffset: 0 }));
  }

  handleSearchInput(event) {
    this.setState({
      searchInput: event.target.value,
      searchOffset: 0
    });
  }

  loadMore(query = this.state.searchInput, refreshOffset = null) {
    console.log('query===>', query);
    const { offset, searchOffset } = this.state;
    console.log('state===>', this.state);
    // if (this.props.teams && this.props.teams.meta) {
    //   if (offset >= teamsCount) {
    //     return;
    //   }
    // }
    let queryOffset = offset;
    if (query) {
      queryOffset = searchOffset;
      this.setState(prevState => ({
        searchOffset: prevState.searchOffset + 20
      }));
    } else if (refreshOffset === 0) {
      queryOffset = refreshOffset;
      console.log('offset=====>', queryOffset);
    }
    this.props.fetchTeams(20, queryOffset, query);
    this.setState(prevState => ({
      offset: prevState.offset + 20
    }));
  }
  render() {
    const { teams, users } = this.props;
    const { hasMore } = this.state;
    return (
      <div>
        <Navbar
          handleSubmit={this.handleSearch}
          handleInput={this.handleSearchInput}
          searchValue={this.state.searchInput}
          gotoHome={this.gotoHome}
        />
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

export default connect(mapStateToProps, { fetchTeams, clearTeams })(Home);
