import React from 'react';

const Profile = (props) => {

  const { name, total } = props;

  return (
    <div className="profile">
      <div className="sub-head">{name} — {total} clips</div>
    </div>
  )
}

export default Profile;
