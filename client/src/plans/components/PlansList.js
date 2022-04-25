import React from 'react';

import Button from '../../shared/components/button/Button'
import Card from '../../shared/components/card/Card'
import PlanItem from './PlanItem';

import './PlansList.css';

const PlansList = props => {

  if (props.items.length === 0) {
    return (
      <div className="plan-list center">
        <Card>
          <h2>No plans found.</h2>
          <Button to="/plans/new">Share plan</Button>
        </Card>
      </div>
    );
  }
  return <ul className="plan-list">
    {props.items.map(plan => <PlanItem 
      key={plan.id}
      id={plan.id}
      image={'https://www.mindpumpmedia.com/hubfs/2160%20x%201044_%20%281%29.png'}
      title={plan.title}
      description={plan.description}
      category={plan.category}
      creatorId={plan.creator}
      originalowner={plan.originalowner}
      onDelete={props.onDeleteplan}
      />
    )}
  </ul>
};

export default PlansList;