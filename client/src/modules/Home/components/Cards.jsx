import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HOC from '../../HOC';

// thunk actions
import { toggleFavoritesAction, clearTeams } from '../../../redux/actions/teams';

export class Cards extends Component {
  static propTypes = {
    teams: PropTypes.object.isRequired,
    toggleFavoritesAction: PropTypes.func.isRequired,
    clearTeams: PropTypes.func.isRequired,
    teamsState: PropTypes.array.isRequired,
    favoriteId: PropTypes.array.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const options = {
      data: {
        Apple: null,
        Microsoft: null,
        Google: 'https://placehold.it/250x250'
      }
    };

    const elem = document.querySelector('.autocomplete');
    M.Autocomplete.init(elem, options);
  }

  componentWillUnmount() {
    this.props.clearTeams();
  }

  addFavorites = (id) => {
    this.props.teamsState.map(team => {
      if (team.id === id) {
        this.props.toggleFavoritesAction(id);
      }
    });
  }

  renderCards = HOC;

  render() {
    return (
      <span>
        {this.renderCards(
          this.addFavorites,
          this.props.teams
        )}
      </span>
    );
  }
}

export const mapStateToProps = state => ({
  teamsState: state.teams.teams
});

export default connect(
  mapStateToProps,
  { toggleFavoritesAction, clearTeams }
)(Cards);
