import React, { Component } from 'react';
import PropTypes from 'prop-types';

// component
import CardItem from './CardItem';

export default class Cards extends Component {
  static propTypes = {
    users: PropTypes.shape({
      users: PropTypes.object
    }).isRequired,
    teams: PropTypes.array.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const {
      users: { users }
    } = nextProps;
    const options = {
      data: users
    };
    const elem = document.querySelector('.autocomplete');
    M.Autocomplete.init(elem, options);
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
