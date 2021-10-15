import React from "react";

import { Form } from "react-bootstrap";

const ContactInfo = ({ handleChange }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Other Info</h2>
      <Form.Group className="w-75 mt-4">
        <Form.Control
          placeholder="วันเกิด"
          onChange={handleChange("birth_date")}
          name="birth_date"
        />
      </Form.Group>
      <Form.Group className="w-75 mt-4">
        <Form.Control
          placeholder="ZipCode"
          onChange={handleChange("zipcode")}
          name="zipcode"
        />
      </Form.Group>
    </div>
  );
};

export default ContactInfo;