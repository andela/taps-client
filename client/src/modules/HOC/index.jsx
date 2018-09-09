import React from 'react';
import ReactTooltip from 'react-tooltip';
import CardItem from '../Home/components/CardItem';

const renderCards = (addFavorites, { teams }) => {
  return teams.map(items => {
    const userId = localStorage.getItem('userId');
    let hasFavorited = false;
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
    items.teams.map(teamUser => {
      if (teamUser.userId === userId) {
        hasFavorited = true;
      }
    });
    return (
      <React.Fragment key={items.id}>
        <CardItem
          item={items}
          favorite={favorite}
          addFavorites={addFavorites}
          isFavorited={hasFavorited}
          lock={lock}
          toolTip={toolTip}
          progressBar={progress}
        />
        <ReactTooltip />
      </React.Fragment>
    );
  });
};

export default renderCards;
