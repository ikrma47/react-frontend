import React from 'react';
import { Col } from 'react-bootstrap';
import { Container } from 'layouts/Site/styles';
/**
 * Site Component is used to support the full page layout
 */
const Site = (Content) => (props) => {
  return (
    <Container fluid className='d-flex'>
      <Col sm='4' className='m-auto p-2'>
        <Content {...props} />
      </Col>
    </Container>
  );
};

export default Site;
