import React, { Component } from 'react';

// component
import CardItem from './CardItem';

export default class Cards extends Component {
  componentDidMount() {
    console.log('props======>', this.props);
  }

  renderCards = ({ teams }) =>
    teams.map(items => {
      const toolTip = items.private ? 'private team' : 'public team';
      const lock = items.private ? 'lock' : 'lock_open';
      const favorite = items.favorite ? 'red' : 'grey';
      return (
        <CardItem
          key={items.id}
          item={items}
          favorite={favorite}
          lock={lock}
          toolTip={toolTip}
        />
      );
    });

  render() {
    return this.renderCards(this.props.teams);
  }
}
