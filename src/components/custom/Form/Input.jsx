import React from "react";
import {  Form } from "react-bootstrap";

function Input({ formInfo, errors, onChange, data }) {
  return (
    <>
      {formInfo.map((formGroup) => (
        <Form.Group
          className="mb-3"
          controlId={formGroup.id}
          key={formGroup.id}
        >
          {formGroup.type !== "checkbox" ? (
            <>
              <Form.Label>{formGroup.label}</Form.Label>
              <Form.Control
                type={formGroup.type}
                placeholder={formGroup.placeholder && formGroup.placeholder}
                onChange={onChange}
                name={formGroup.id}
                value={data[formGroup.id]}
              />
            </>
          ) : (
            <Form.Check
              type="checkbox"
              label={formGroup.label}
              onChange={onChange}
              name={formGroup.id}
            />
          )}
          {formGroup.formText && (
            <Form.Text className="text-muted">{formGroup.formText}</Form.Text>
          )}
          {errors[formGroup.id] && (
            <div size="sm" className="alert alert-danger">
              {errors[formGroup.id]}
            </div>
          )}
        </Form.Group>
      ))}
    </>
  );
}

export default Input;
