import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

const CardItems = ({
  item, favorite, lock, toolTip
}) => (
  <div>
    <div className="col s12 m6 l4">
      <div className="card">
        <div className="card-image">
          <img
            src="https://cdn.pixabay.com/photo/2016/03/09/09/22/workplace-1245776_640.jpg"
            alt="teams"
          />
          <div className="card-title ">{item.name}</div>
          <a
            href="#!"
            data-tip="Add to favorites"
            className={`btn-floating halfway-fab waves-effect waves-light ${favorite}`}
          >
            <i className="material-icons">favorite</i>
          </a>
        </div>
        <div className="card-content">
          <p>{item.description}</p>
        </div>
        <div className="card-action">
          <a href="#!">go to team</a>
          <i className="tiny-small material-icons right" data-tip={toolTip}>
            {lock}
          </i>
          <a
            className="waves-effect waves-light right modal-trigger icon-link"
            href="#addMember"
          >
            <i className="tiny-small material-icons" data-tip="add member">
              person_add
            </i>
          </a>
          <i
            className="tiny-small material-icons right"
            data-tip={`manage ${item.members.length} member(s)`}
          >
            groups
          </i>

          <i
            className="tiny-small material-icons right"
            data-tip="admin settings"
          >
            settings
          </i>
          <ReactTooltip />
        </div>
      </div>
    </div>
  </div>
);

CardItems.propTypes = {
  item: PropTypes.string.isRequired,
  favorite: PropTypes.string.isRequired,
  lock: PropTypes.string.isRequired,
  toolTip: PropTypes.string.isRequired
};
export default CardItems;
