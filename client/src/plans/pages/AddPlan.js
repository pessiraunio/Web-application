import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/input/Input';
import Button from '../../shared/components/button/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/modal/ErrorModal';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner';

import './PlanForm.css';

const NewPlan = () => {
  const auth = useContext(AuthContext);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      category: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const planSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest('http://localhost:5000/api/plans/', 'POST', JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        category: formState.inputs.category.value,
        creator: auth.userId
      }),
      { 
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
      })
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="plan-form" onSubmit={planSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="category"
          element="input"
          label="Category"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid category."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add plan
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlan;