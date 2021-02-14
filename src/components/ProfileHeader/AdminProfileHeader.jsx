import React from "react";
import { Card, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const headerElements = [
	{ navigation: "/admin/applicant/profile", name: "Personal" },
	{ navigation: "/admin/applicant/academics", name: "Academics" },
	{ navigation: "/admin/applicant/experience", name: "Job Experience" },
	{ navigation: "/admin/applicant/preference", name: "Preferences" },
	{ navigation: "/admin/applicant/documents", name: "Upload Documents" },
	{ navigation: "/admin/applicant/submission", name: "Submission" },
];

const ProfileHeader = (props) => {
	return (
		<Card className="mt-2" border="dark">
			<Card.Header>
				<Nav justify variant="pills" defaultActiveKey={props.match.path}>
					{headerElements.map(({ navigation, name }) => (
						<Nav.Item key={name}>
							<Card border="dark">
								<Nav.Link as={Link} to={navigation} eventKey={navigation}>
									{name}
								</Nav.Link>
							</Card>
						</Nav.Item>
					))}
				</Nav>
			</Card.Header>
		</Card>
	);
};
export default ProfileHeader;
