import React from 'react';

const Profile = (props) => {

  const { name, clips } = props;

  return (
    <div className="profile">
      <div>
        <div className="sub-head">{name}</div>
        <div>{clips} clips</div>
      </div>
    </div>
  )
}

export default Profile;
