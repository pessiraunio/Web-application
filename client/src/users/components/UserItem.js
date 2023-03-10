import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/avatar/Avatar'
import Card from '../../shared/components/card/Card'

import './UserItem.css';

const UserItem = props => {
  console.log(props.id)
  console.log(props.placeCount)
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className='user-item__info'>
            <h2>{props.name}</h2>
            <h3>{props.planCount} {props.planCount === 1 ? 'Plan' : 'Plans'}</h3>
          </div>
        </Link>
      </Card>
    </li>
  )
}

export default UserItem;
