import React from "react";

const ContactInfo = ({ handleInputChange }) => {
  return (
    <form>
      <div className="mb-3 row">
        <div className="col-sm-9 ml-2">
          <textarea
            className="form-control form-control-lg"
            rows={2}
            type="text"
            maxLength={255}
            placeholder="ที่อยู่"
            onChange={handleInputChange("address")}
          ></textarea>
        </div>
        <label className="col-sm-2 col-form-label text-danger text-danger">*</label>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-4 ml-2">
          <input
            className="form-control form-control-lg"
            type="text"
            maxLength={5}
            placeholder="รหัสไปรษณีย์"
            onChange={handleInputChange("zipcode")}
          ></input>
        </div>
        <label className="col-sm-2 col-form-label text-danger text-danger">*</label>
      </div>
    </form>
  );
};

export default ContactInfo;
