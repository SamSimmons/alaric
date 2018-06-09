import React from 'react';

const Profile = (props) => {

  const { name, clips, avatar } = props;

  return (
    <div className="profile">
      <div className="avatar">
        <img src={avatar} alt="avatar" />
      </div>
      <div>
        <div className="sub-head">{name}</div>
        <div>{clips} clips</div>
      </div>
    </div>
  )
}

export default Profile;
