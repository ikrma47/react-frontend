import React from "react";
import { Form } from "react-bootstrap";
import { useField } from "formik";

var DropDown = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: "dropdown" });
  return (
    <Form.Group controlId={props.id || props.name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" {...props} {...field} />
      {meta.touched && meta.error ? (
        <Form.Text className="text-danger">{meta.error}</Form.Text>
      ) : null}
    </Form.Group>
  );
};
export default DropDown;
