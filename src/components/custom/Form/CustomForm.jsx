import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Input from "./Input";
import Joi from "joi-browser";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: #ffdcbd !important; 
  border: 2px solid black;
  border-radius: 15px;
  font-size: 20px;
  color: black; 

  &:hover {
    background-color: #e5c8a8 !important; 
    border-color: #333; 
  }
`;

function CustomForm({
  formInfo,
  buttonLabel,
  schema,
  initializedData,
  doSubmit,
}) {
  const [data, setData] = useState(initializedData);
  const [errors, setErrors] = useState({});

  const validateProperty = ({ name, value, type, checked }) => {
    const obj = type !== "checkbox" ? { [name]: value } : { [name]: checked };
    const propSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, propSchema);
    return error ? error.details[0].message : null;
  };

  const joiValidate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(data, schema, options);
    if (!result.error) return null;
    const newErrors = {};
    for (let item of result.error.details)
      newErrors[item.path[0]] = item.message;
    return newErrors;
  };

  const handleChange = ({ currentTarget: input }) => {
    const previousData = { ...data };
    input.type !== "checkbox"
      ? (previousData[input.id] = input.value)
      : (previousData[input.id] = input.checked);
    setData(previousData);
    const previousErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) previousErrors[input.name] = errorMessage;
    else delete previousErrors[input.name];
    setErrors(previousErrors || {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedData = { ...data };
    const newErrors = joiValidate(sanitizedData);
    setErrors(newErrors || {});
    if (newErrors) return;
    doSubmit(sanitizedData);
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: "50%" }}>
      <Input
        formInfo={formInfo}
        errors={errors}
        onChange={handleChange}
        data={data}
      />
      <StyledButton
        className="mt-2"
        variant="danger"
        type="submit"
        style={{ width: "100%" }}
      >
        {buttonLabel || "Submit"}
      </StyledButton>
    </Form>
  );
}

export default CustomForm;
