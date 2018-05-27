import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

// component
import CardItem from './CardItem';

export default class Cards extends Component {
  static propTypes = {
    teams: PropTypes.object.isRequired
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

  renderCards = ({ teams }) =>
    teams.map(items => {
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
        <React.Fragment key={items.id}>
          <CardItem
            item={items}
            favorite={favorite}
            lock={lock}
            toolTip={toolTip}
            progressBar={progress}
          />
          <ReactTooltip />
        </React.Fragment>
      );
    });

  render() {
    return this.renderCards(this.props.teams);
  }
}
