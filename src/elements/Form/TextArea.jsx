import React from 'react';
import { Form } from 'react-bootstrap';
import { useField } from 'formik';

var TextArea = ({ label, ...props }) => {
  var [field, meta] = useField({ ...props });
  return (
    <Form.Group controlId={props.name || props.id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as='textarea' {...field} {...props} />
      {meta.touched && meta.error ? (
        <Form.Text className='text-danger'>{meta.error}</Form.Text>
      ) : null}
    </Form.Group>
  );
};

export default TextArea;
