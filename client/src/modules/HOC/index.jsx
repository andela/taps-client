import React from "react";
import ReactTooltip from "react-tooltip";
import CardItem from "../Home/components/CardItem";

const renderCards = (addFavorites, { teams }) => {
  return teams.map(item => {
    const toolTip = item.private ? "private team" : "public team";
    const lock = item.private ? "lock" : "lock_open";
    const favorite = item.favorite ? "red" : "grey";
    let progress = [];
    if (item.progress >= 0 && item.progress < 30) {
      progress = ["zero", "zero-bg"];
    } else if (item.progress >= 30 && item.progress < 70) {
      progress = ["half-way", "half-way-bg"];
    } else {
      progress = ["completed", "completed-bg"];
    }

    return (
      <React.Fragment key={item.id}>
        <CardItem
          item={item}
          favorite={favorite}
          addFavorites={addFavorites}
          isFavorited={item.favoritedByYou}
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
