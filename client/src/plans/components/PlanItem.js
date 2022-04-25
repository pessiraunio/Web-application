import React, { useState, useContext } from 'react';

import Button from '../../shared/components/button/Button';
import Card from '../../shared/components/card/Card'
import Modal from '../../shared/components/modal/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/components/modal/ErrorModal';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner';
import './PlanItem.css';

const PlanItem = props => {
  const auth = useContext(AuthContext);

  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [showCopyModal, setShowCopyHandler] = useState(false);

  const showCopyHandler = () => setShowCopyHandler(true);
  const cancelCopyHandler = () => setShowCopyHandler(false);
  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);



  const CopyPlan = async () => {
    try {
      await sendRequest(process.env.REACT_APP_BACKEND_URL + '/plans/', 'POST', JSON.stringify({
        title: props.title,
        description: props.description,
        category: props.category,
        creator: auth.userId,
        copied: true,
        originalowner: props.originalowner
      }),
      { 
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
      })
    } catch (err) {}
  }

  const deleteConfirmedHandler = async () => {
    setShowConfirmationModal(false);
    setShowCopyHandler(false);

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/plans/${props.id}`, 
        'DELETE',
        null, // No body
        { Authorization: 'Bearer ' + auth.token }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };
  if (auth.isLoggedIn) {
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        <Modal 
          show={showConfirmationModal}
          header="Are you sure?" 
          footerClass="plan-item__modal-actions"
          footer={
            <React.Fragment>
              <Button inverse onClick={cancelConfirmationHandler}>Cancel</Button>
              <Button delete onClick={deleteConfirmedHandler}>Delete</Button>
            </React.Fragment>
          }
        >
          <p>Are you sure? Once it's gone, it's gone!</p>
        </Modal>
        <Modal 
          show={showCopyModal}
          header="Copy success!" 
          footerClass="plan-item__modal-actions"
          footer={
            <React.Fragment>
              <Button inverse onClick={cancelCopyHandler}>Noted</Button>
            </React.Fragment>
          }
        >
          <p>Plan copied to your profile!</p>
        </Modal>
        <li className="plan-item">
          {isLoading && <LoadingSpinner asOverlay/>}
          <Card className="plan-item__content">
            <div className="plan-item__image">
              <img src={props.image} alt={props.title} />
            </div>
            <div className="plan-item__info">
              <h2>{props.title}</h2>
              <h2>{props.category}</h2>
              <p>{props.category}</p>
              <p>Owner: {props.originalowner}</p>
            </div>
            <div className="plan-item__actions">
              {auth.isLoggedIn && (
                <Button to={`/plans/${props.id}`}>Edit</Button>
              )}
              {auth.isLoggedIn && (
                <Button danger onClick={showConfirmationHandler}>Delete</Button>
              )}
              {auth.userId !== props.creatorId && auth.userId !== props.originalowner && (
                <Button onClick={() => {showCopyHandler(); CopyPlan();}}>Copy this plan.</Button>
              )}
            </div>
          </Card>
        </li>
      </React.Fragment>
    )
  }
  else {
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        <Modal 
          show={showConfirmationModal}
          header="Log in first." 
          footerClass="plan-item__modal-actions"
          footer={
            <React.Fragment>
              <Button inverse onClick={cancelConfirmationHandler}>Okay</Button>
            </React.Fragment>
          }
        >
          <p>Log in or sign up to copy plans!</p>
        </Modal>
        <li className="plan-item">
          {isLoading && <LoadingSpinner asOverlay/>}
          <Card className="plan-item__content">
            <div className=".container">
              <div className="plan-item__image">
                <img src={props.image} alt={props.title}/>
                <div className=".top-left">Owner:{props.originalowner}</div>
              </div>
            </div>
            <div className="plan-item__info">
              <h2>{props.title}</h2>
              <h2>{props.category}</h2>
            </div>
            <div className="plan-item__actions">
              <Button inverse onClick={setShowConfirmationModal}>Copy this plan.</Button>
            </div>
          </Card>
        </li>
      </React.Fragment>
    )
  }
};

export default PlanItem;