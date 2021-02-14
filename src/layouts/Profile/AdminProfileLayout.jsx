import React from "react";
import AdminProfileHeader from "components/ProfileHeader/AdminProfileHeader";

const ProfileLayout = (Content) => (props) => {
	return (
		<>
			<AdminProfileHeader {...props} />
			<Content {...props} />
		</>
	);
};

export default ProfileLayout;
