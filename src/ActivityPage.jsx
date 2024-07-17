import React, {useState, useEffect, useCallback} from 'react';
import ActivityFeed from './ActivityFeed.jsx';
import ArchivedFeed from './ArchivedFeed.jsx';
import {http} from "./utils/http";
import './css/app.css';
import {useInternalRouter} from "./hooks/useinternalRouter";


const ActivityPage = () => {
  const [activities, setActivities] = useState([]);
  const [activeTab, setActiveTab] = useState('inbox');
  const router = useInternalRouter();
  const missedCallCount = activities.filter(call => call.call_type === 'missed').length;

  useEffect(() => {
    http.get('/activities').then(response => {
      setActivities(response)
    }).catch(error => console.error('Error fetching activities:', error));
  }, []);

  const handleArchive = useCallback((id) => {
    http.patch(`/activities/${id}`, {is_archived: true}).then(() => {
      setActivities(prevActivities => prevActivities.map(call =>
          call.id === id ? {...call, is_archived: true} : call
      ));
    })
        .catch(error => console.error('Error archiving call:', error));

  }, []);

  // use useCallback to prevent unnecessary function declaration
  const handleArchiveAll = useCallback(() => {
    activities.filter(call => !call.is_archived).forEach(call => handleArchive(call.id));
  }, [activities]);

  const handleUnarchiveAll = useCallback(() => {
    activities.filter(call => call.is_archived).forEach(call => handleUnarchive(call.id));
  }, [activities]);

  const handleUnarchive = (id) => {
    http.patch(`/activities/${id}`, {is_archived: false}).then(() => {
      setActivities(prevActivities => prevActivities.map(call =>
          call.id === id ? {...call, is_archived: false} : call
      ));
    })
        .catch(error => console.error('Error unarchiving call:', error));
  }

    const handleSelectCall = (id) => {
      console.log(id,'ddasd')
      router.push(`/detail/${id}`)
      // http.get(`/activities/${id}`).then(data => setSelectedCall(data)).catch(error => console.error('Error fetching call details:', error));
    };

    return (
        <div className='container'>
          <div className="tabs">
            <button className={activeTab === 'inbox' ? 'active' : ''} onClick={() => setActiveTab('inbox')}>Inbox
            </button>
            <button className={activeTab === 'archived' ? 'active' : ''}
                    onClick={() => setActiveTab('archived')}>Archived
            </button>
          </div>
          <div className="container-view">
            {activeTab === 'inbox' ? (
                <>
                  <button className="archive-all" onClick={handleArchiveAll}>Archive all calls</button>
                  <ActivityFeed activities={activities.filter(call => !call.is_archived)} onArchive={handleArchive}
                                onSelect={handleSelectCall}/>
                </>
            ) : (
                <>
                  <button className="unarchive-all" onClick={handleUnarchiveAll}>Unarchive all calls</button>
                  <ArchivedFeed activities={activities.filter(call => call.is_archived)} onUnarchive={handleUnarchive}
                                onSelect={handleSelectCall}/>
                </>
            )}
          </div>
        </div>
    );
}

export default ActivityPage;
