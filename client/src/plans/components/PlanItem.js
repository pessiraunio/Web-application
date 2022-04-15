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

  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const templateCopyfunction = async () => {
    console.log("This function has no functionality yet")
    for (const item in props) {
      console.log(item)
    }
    console.log("user id: " + auth.userId )
    console.log("prop id: " + props.creatorId)
  }

  
  const deleteConfirmedHandler = async () => {
    setShowConfirmationModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/plans/${props.id}`, 
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
          header={props.address}
          contentClass="plan-item__modal-content"
          footerClass="plan-item__modal-actions"
        >
        </Modal>
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
        <li className="plan-item">
          {isLoading && <LoadingSpinner asOverlay/>}
          <Card className="plan-item__content">
            <div className="plan-item__image">
              <img src={props.image} alt={props.title} />
            </div>
            <div className="plan-item__info">
              <h2>{props.title}</h2>
              <h2>{props.category}</h2>
              <h3>{props.address}</h3>
              <p>{props.description}</p>
            </div>
            <div className="plan-item__actions">
              {auth.isLoggedIn && (
                <Button to={`/plans/${props.id}`}>Edit</Button>
              )}
              {auth.isLoggedIn && (
                <Button danger onClick={showConfirmationHandler}>Delete</Button>
              )}
              {auth.userId !== props.creatorId && (
                <Button onClick={templateCopyfunction}>Copy this plan.</Button>
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
          header={props.address}
          contentClass="plan-item__modal-content"
          footerClass="plan-item__modal-actions"
        >
        </Modal>
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
            <div className="plan-item__image">
              <img src={props.image} alt={props.title} />
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