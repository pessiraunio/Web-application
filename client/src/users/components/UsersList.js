import React from 'react';
import UserItem from './UserItem';

import './UsersList.css';

const UsersList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No users found.</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      { props.items.map(user => (
        <UserItem 
          key={user.id}
          id={user.id}
          image={'https://media.istockphoto.com/photos/healthy-young-man-standing-outdoors-in-park-picture-id629591998?k=20&m=629591998&s=612x612&w=0&h=23uip-HHtMW0tZJqteIogw3LC5MsMdFX-_Wv_76vhGY='}
          name={user.name}
          planCount={user.plans}
        />
      ))}
    </ul>
  )
}

export default UsersList;
