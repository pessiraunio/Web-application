import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PlansList from '../components/PlansList';
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/modal/ErrorModal';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner';

// 'https://visitylojarvi.fi/wp-content/uploads/2016/11/ylojarvi-seitseminen-nuotiopaikka.jpg'

const UserPlans = props => {
  const [loadedPlans, setLoadedPlans] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const userId = useParams().userId;
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const repsponse = await sendRequest(
          `http://localhost:5000/api/plans/user/${userId}`
        );
        setLoadedPlans(repsponse.plans);
      } catch (err) {}
    }
    fetchPlans();

  },[sendRequest, userId]);

  const planDeletedHandler = (deletedPlanId) => {
    setLoadedPlans(prevPlans => 
      prevPlans.filter(plan => plan.id !== deletedPlanId)
    )
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && ( 
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlans && 
        <PlansList items={loadedPlans} onDeletePlan={planDeletedHandler} />}
    </React.Fragment>
  );
};

export default UserPlans;