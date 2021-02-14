import React from "react";
import { Card, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const headerElements = [
  { navigation: "/user/profile", name: "Personal" },
  { navigation: "/user/academics", name: "Academics" },
  { navigation: "/user/experience", name: "Job Experience" },
  { navigation: "/user/preferences", name: "Preferences" },
  { navigation: "/user/documents", name: "Upload Documents" },
  { navigation: "/user/submit", name: "Submission" },
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
