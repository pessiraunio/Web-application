import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/input/Input';
import Button from '../../shared/components/button/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/modal/ErrorModal';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';

import './PlanForm.css';

const UpdatePlan = () => {
  const auth = useContext(AuthContext);
  const [loadedPlan, setLoadedPlan] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const planId = useParams().planId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const repsponse = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/plans/${planId}`
        );
        setLoadedPlan(repsponse.plan);
        setFormData(
          {
            title: {
              value: repsponse.plan.title,
              isValid: true
            },
            description: {
              value: repsponse.plan.description,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    }
    fetchPlan();
  },[sendRequest, planId, setFormData]);

  const history = useHistory();

  const planUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/plans/${planId}`, 
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
      }),
      { 
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
      })
      history.push('/' + auth.userId + '/plans');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
       <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlan && !error) {
    return (
      <div className="center">
        <h2>Could not find plan!</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
       <ErrorModal error={error} onClear={clearError} />
       {!isLoading && loadedPlan && <form className="plan-form" onSubmit={planUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={loadedPlan.title}
          initialValid={true}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={loadedPlan.description}
          initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Update plan
        </Button>
      </form>}
    </React.Fragment>
  );
};

export default UpdatePlan;