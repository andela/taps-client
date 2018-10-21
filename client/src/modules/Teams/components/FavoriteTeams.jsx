import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Emoji from 'react-emoji-render';
import ReactTooltip from 'react-tooltip';
import CardItem from '../../Home/components/CardItem';
import Navbar from '../../common/Navbar';
import Spinner from '../../common/Spinner/Spinner';
import { fetchFavoriteTeamsAction, removeFavoritesTeamsAction } from '../../../redux/actions/teams';

export class Favorites extends Component {
  componentDidMount() {
    this.props.fetchFavoriteTeamsAction();
  }

  removeFavorites = (id) => {
    this.props.teams.map(team => {
      if (team.teamId === id) {
        this.props.removeFavoritesTeamsAction(id);
      }
    });
  }

  render() {
    if (this.props.isLoading) {
      return (
        <Spinner />
      );
    }
    let team;
    team = this.props.teams ? this.props.teams : [];
    return (
      <div>
        <Navbar />
        <p className="favorites-header"> My Favorite teams </p>
        <div className="custom-container">
          <div className="row mt-2 pb-3">
            {
              team.length > 0 ?
                team.map(items => {
                  const toolTip = items.team.private ? 'private team' : 'public team';
                  const lock = items.team.private ? 'lock' : 'lock_open';
                  const favorite = items.team.favorite ? 'red' : 'grey';
                  let progress = [];
                  if (items.team.progress >= 0 && items.team.progress < 30) {
                    progress = ['zero', 'zero-bg'];
                  } else if (items.team.progress >= 30 && items.team.progress < 70) {
                    progress = ['half-way', 'half-way-bg'];
                  } else {
                    progress = ['completed', 'completed-bg'];
                  }
                  return (
                    <React.Fragment>
                      <CardItem
                        item={items.team}
                        favorite={favorite}
                        lock={lock}
                        favoriteLinkTooltip="Remove from favourites"
                        addFavorites={this.removeFavorites}
                        toolTip={toolTip}
                        progressBar={progress}
                        icon="close"
                      />
                      <ReactTooltip />
                    </React.Fragment>
                  );
                }) :
                <React.Fragment>
                  <p className="favorite-text">You currently have no <Emoji text="<3" /> teams</p>
                </React.Fragment>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams.favoriteTeams.teams,
  isLoading: state.isLoading.isLoading
});


Favorites.propTypes = {
  fetchFavoriteTeamsAction: PropTypes.func.isRequired,
  removeFavoritesTeamsAction: PropTypes.func.isRequired,
  teams: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  { fetchFavoriteTeamsAction, removeFavoritesTeamsAction }
)(Favorites);
