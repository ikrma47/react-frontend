import React from 'react';
import ProfileHeader from 'components/ProfileHeader';

const ProfileLayout = (Content) => (props) => {
  return (
    <>
      <ProfileHeader {...props} />
      <Content {...props} />
    </>
  );
};

export default ProfileLayout;
