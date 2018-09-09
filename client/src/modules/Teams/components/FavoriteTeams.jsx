import React, { Component } from 'react';
import { connect } from 'react-redux';
import Emoji from 'react-emoji-render';
import ReactTooltip from 'react-tooltip';
import CardItem from '../../Home/components/CardItem';
import Navbar from '../../common/Navbar';
import { fetchFavoriteTeamsAction, toggleFavoritesAction } from '../../../redux/actions/teams';

class Favorites extends Component {
  componentDidMount() {
    const userId = localStorage.getItem('userId');
    this.props.fetchFavoriteTeamsAction(userId);
  }

  componentDidUpdate() {
    const userId = localStorage.getItem('userId');
    this.props.fetchFavoriteTeamsAction(userId);
  }

  removeFavorites = (id) => {
    this.props.teams.map(team => {
      if (team.id === id) {
        this.props.toggleFavoritesAction(id);
      }
    });
  }

  render() {
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
                  const toolTip = items.private ? 'private team' : 'public team';
                  const lock = items.private ? 'lock' : 'lock_open';
                  const favorite = items.favorite ? 'red' : 'grey';
                  let progress = [];
                  if (items.progress >= 0 && items.progress < 30) {
                    progress = ['zero', 'zero-bg'];
                  } else if (items.progress >= 30 && items.progress < 70) {
                    progress = ['half-way', 'half-way-bg'];
                  } else {
                    progress = ['completed', 'completed-bg'];
                  }
                  return (
                    <React.Fragment>
                      <CardItem
                        item={items}
                        favorite={favorite}
                        lock={lock}
                        addFavorites={this.removeFavorites}
                        toolTip={toolTip}
                        progressBar={progress}
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

const mapStateToProps = state => {
  return {
    teams: state.teams.favoriteTeams.teams
  };
};

export default connect(mapStateToProps, { fetchFavoriteTeamsAction, toggleFavoritesAction })(Favorites);
