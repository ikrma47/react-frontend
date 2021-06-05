import React from "react";
import { Form } from "react-bootstrap";
import { useField } from "formik";

var DropDown = ({ label, getValue, ...props }) => {
	const [{ onChange, ...field }, meta] = useField({ ...props, type: "dropdown" });
	return (
		<Form.Group controlId={props.id || props.name}>
			<Form.Label>{label}</Form.Label>
			<Form.Control
				as="select"
				{...props}
				{...field}
				onChange={(e) => {
					onChange(e);
					if (getValue) getValue(e.target.value);
				}}
			/>
			{meta.touched && meta.error ? (
				<Form.Text className="text-danger">{meta.error}</Form.Text>
			) : null}
		</Form.Group>
	);
};
export default DropDown;
