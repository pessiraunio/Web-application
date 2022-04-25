import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';

import PlansList from '../components/PlansList';
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/modal/ErrorModal';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner';

// 'https://visitylojarvi.fi/wp-content/uploads/2016/11/ylojarvi-seitseminen-nuotiopaikka.jpg'

const AllPlans = props => {
  const auth = useContext(AuthContext);
  const [loadedPlans, setLoadedPlans] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/plans/all_plans`
        );
        setLoadedPlans(response.plans);
      } catch (err) {}
    }
    fetchPlans();

  },[sendRequest], auth.userId);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && ( 
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlans && 
        <PlansList items={loadedPlans} />}
    </React.Fragment>
  );
};

export default AllPlans;