import React from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const CheckBox = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <Form.Group controlId={props.name || props.id}>
      <Form.Check required label={label} {...field} {...props} />
      {meta.touched && meta.error ? (
        <Form.Text className='text-danger'>{meta.error}</Form.Text>
      ) : null}
    </Form.Group>
  );
};
export default CheckBox;
