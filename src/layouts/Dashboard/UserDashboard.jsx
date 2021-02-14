import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from 'components/Header';
import UserSidebar from 'components/Sidebar/UserSidebar';

const Dashboard = (Content) => {
  return (props) => {
    return (
      <>
        <Header />
        <Container fluid>
          <Row>
            <Col sm='2' className='pl-0'>
              <UserSidebar />
            </Col>
            <Col sm='10'>
              <Content {...props} />
            </Col>
          </Row>
        </Container>
      </>
    );
  };
};

export default Dashboard;
