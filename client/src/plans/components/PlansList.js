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
      image={'https://visitylojarvi.fi/wp-content/uploads/2016/11/ylojarvi-seitseminen-nuotiopaikka.jpg'}
      title={plan.title}
      description={plan.description}
      category={plan.category}
      creatorId={plan.creatorId}
      onDelete={props.onDeleteplan}
      />
    )}
  </ul>;
};

export default PlansList;