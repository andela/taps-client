import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import config from '../../../config';

const CardItems = ({
  item, favorite, lock, toolTip, progressBar
}) => (
  <div>
    <div className="col s12 m6 l4">
      <div className="card">
        <div className="card-image">
          <img src={item.photo || config.defaultImg} alt="teams" />
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
          <div className="row progress-bar" id="progress-bar">
            <div className={`progress col s11 ${progressBar[1]}`}>
              <div
                className={`determinate ${progressBar[0]}`}
                style={{ width: `${item.progress}%` }}
              />
            </div>
            <div className="col s1">{item.progress}%</div>
          </div>
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
            data-tip={`manage ${item.members} member(s)`}
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
  item: PropTypes.object.isRequired,
  favorite: PropTypes.string.isRequired,
  lock: PropTypes.string.isRequired,
  toolTip: PropTypes.string.isRequired,
  progressBar: PropTypes.array.isRequired
};
export default CardItems;
