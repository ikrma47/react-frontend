import React from 'react';
import { Modal } from 'react-bootstrap';

const DisplayModal = ({ Body, Footer, header, ...props }) => {
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>{header}</Modal.Header>
      <Modal.Body>
        <Body />
      </Modal.Body>
      {Footer ? (
        <Modal.Footer>
          <Footer />
        </Modal.Footer>
      ) : null}
    </Modal>
  );
};

export default DisplayModal;
