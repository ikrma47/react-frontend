import React from "react";
import { Form, Image } from "react-bootstrap";
import { useField } from "formik";
import { FilledButton } from "elements/Button";
import unavailable from "assets/img/unavailable.png";

const defaultHandler = () => {};

const UploadFileField = ({
  label = "",
  image = "",
  disabled = true,
  hidden = true,
  getRefValue = defaultHandler,
  handleUploadImage = defaultHandler,
  ...props
}) => {
  const [localImage, handleLocalImage] = React.useState(null);
  const [{ onChange, value, ...field }, meta] = useField(props);

  return (
    <Form.Group controlId={props.id || props.name}>
      <Image
        src={localImage || value || unavailable}
        height={200}
        width={200}
        alt="image"
        rounded
      />
      <Form.File
        className="mt-2"
        {...field}
        {...props}
        ref={(ref) => getRefValue(ref)}
        onChange={(e) => {
          handleLocalImage(URL.createObjectURL(e.currentTarget.files[0]));
        }}
        hidden={hidden}
        disabled={disabled}
      />
      <Form.Label>
        <strong>{label}</strong>
      </Form.Label>
      {meta.touched && meta.error ? (
        <Form.Text className="text-danger">{meta.error}</Form.Text>
      ) : null}
      <FilledButton
        type="button"
        className="mt-1"
        onClick={handleUploadImage}
        disabled={disabled}
        hidden={hidden}
      >
        Upload Image
      </FilledButton>
    </Form.Group>
  );
};

export default UploadFileField;
