import React from "react";
import { Form } from "react-bootstrap";
import { useField } from "formik";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props });
  return (
    <Form.Group controlId={props.id || props.name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...field} {...props} />
      {meta.touched && meta.error ? (
        <Form.Text className="text-danger">{meta.error}</Form.Text>
      ) : null}
    </Form.Group>
  );
};

export default TextField;
