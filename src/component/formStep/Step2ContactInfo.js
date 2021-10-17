import React from "react";

const ContactInfo = ({ handleChange }) => {
  return (
    <div className="container">
      <form>
       <div className="form-group">
         <input className="form-control form-control-lg" type="date" onChange={handleChange("birth_date")}></input>
       </div>
       <div className="form-group">
         <textarea className="form-control form-control-lg" type="text" placeholder="ที่อยู่" onChange={handleChange("address")}></textarea>
       </div>
       <div className="form-group">
         <input className="form-control form-control-lg w-25" type="text" placeholder="รหัสไปรษณีย์" onChange={handleChange("zipcode")}></input>
       </div>
       </form>
    </div>
  );
};

export default ContactInfo;