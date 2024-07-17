import React from 'react';
import CallIcon from '@mui/icons-material/Call';
import './css/activityItem.css';

const ActivityItem = ({ activity, onAction, actionLabel, onSelect, hideActionButton }) => {
  return (
    <div className="activity-item" onClick={onSelect}>
      <div className="activity-item-details">
        <div className="activity-item-info">
          <CallIcon className={`call-icon ${activity.call_type}`} />
          <div className="activity-info">
            <div className="activity-from">{activity.from}</div>
            <div className="activity-to">tried to call on {activity.to}</div>
          </div>
        </div>
        <div className="activity-time">{new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
      {!hideActionButton && (
        <button className="archive-button" onClick={(e) => { e.stopPropagation(); onAction(activity.id); }}>{actionLabel}</button>
      )}
    </div>
  );
};

export default ActivityItem;
