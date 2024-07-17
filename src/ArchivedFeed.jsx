import React from 'react';
import ActivityList from './ActivityList.jsx';

const ArchivedFeed = ({ activities, onUnarchive, onSelect }) => {
  return (
    <ActivityList
      activities={activities.filter(call => call.is_archived)}
      onAction={onUnarchive}
      onSelect={onSelect}
      actionLabel="Unarchive"
    />
  );
};

export default ArchivedFeed;
