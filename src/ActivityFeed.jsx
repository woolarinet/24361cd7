import React from 'react';
import ActivityList from './ActivityList.jsx';

const ActivityFeed = ({ activities, onArchive, onSelect }) => {
  return (
    <ActivityList
      activities={activities.filter(call => !call.is_archived)}
      onAction={onArchive}
      onSelect={onSelect}
      actionLabel="Archive"
      
    />
  );
};

export default ActivityFeed;
