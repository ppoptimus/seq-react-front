import React from "react";
import { Form } from "react-bootstrap";

const LocationInfo = ({ handleChange }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Address Info</h2>
      <Form.Group className="w-75 mt-4">
        <Form.Control
          placeholder="ที่อยู่"
          onChange={handleChange("address")}
          name="address"
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

export default LocationInfo;