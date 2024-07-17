import React, {useCallback, useState} from 'react';
import ActivityItem from './ActivityItem.jsx';
import './css/activityList.css';
import {groupCallsByDateAndType} from "./utils/function";


const ActivityList = ({ activities, onAction, onSelect, actionLabel }) => {
  const [expandedGroups, setExpandedGroups] = useState({});
  const groupedActivities = groupCallsByDateAndType(activities);

  const handleGroupClick = useCallback((date, index) => {
    setExpandedGroups(prevState => ({
      ...prevState,
      [date]: {
        ...prevState[date],
        [index]: !prevState[date]?.[index],
      },
    }));
  },[]);

  return (
    <div className="activity-list">
      {Object.entries(groupedActivities).map(([date, groups]) => (
        <div key={date} className="activity-date-group">
          <h3 className="activity-date">{date}</h3>
          {groups.map((calls, index) => {
            const latestCall = calls.reduce((latest, call) => 
              new Date(call.created_at) > new Date(latest.created_at) ? call : latest, calls[0]);
  
            return (
              <div key={index} className="activity-group">
                {calls.length > 1 ? (
                  <>
                    <div onClick={() => handleGroupClick(date, index)} className="activity-group-header">
                      <div className="group-header-content">
                        <ActivityItem
                          activity={latestCall}
                          onAction={onAction}
                          actionLabel={actionLabel}
                          onSelect={() => handleGroupClick(date, index)}
                          hideActionButton
                        />
                        <span className={`group-count ${latestCall.call_type === 'missed' ? 'missed' : 'not-missed'}`}>
                          {calls.length}
                        </span>
                      </div>
                    </div>
                    {expandedGroups[date]?.[index] && (
                      <div className="activity-group-details">
                        {calls
                          .slice()
                          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                          .map((call) => (
                            <ActivityItem
                              key={call.id}
                              activity={call}
                              onAction={onAction}
                              actionLabel={actionLabel}
                              onSelect={() => onSelect(call.id)}
                            />
                          ))}
                      </div>
                    )}
                  </>
                ) : (
                  <ActivityItem
                    key={calls[0].id}
                    activity={calls[0]}
                    onAction={onAction}
                    actionLabel={actionLabel}
                    onSelect={() => onSelect(calls[0].id)}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
