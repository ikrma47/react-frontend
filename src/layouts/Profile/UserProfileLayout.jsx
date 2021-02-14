import React from "react";
import UserProfileHeader from "components/ProfileHeader/UserProfileHeader";

const ProfileLayout = (Content) => (props) => {
	return (
		<>
			<UserProfileHeader {...props} />
			<Content {...props} />
		</>
	);
};

export default ProfileLayout;
