import React from "react";
import Button from "react-bootstrap/Button";

const EnqEditTable = ({ values, handleChange }) => {
  return (
    <tr>
      <td>
        <button
          type="submit"
          style={{ borderStyle: "none", marginLeft: "0.5rem" }}
        >
          <Button
            style={{
              display: "flex",
              alignItems: "centre",
              justifyContent: "centre",
            }}
          >
            <i className="fa fa-check" aria-hidden="true" />
          </Button>
        </button>
      </td>
      <td>
        <input
          // className="form-input"
          type="date"
          name="startdate"
          placeholder="Start-Date"
          value={values.startdate}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          // className="form-input"
          type="text"
          name="candidatename"
          placeholder="Enter your FirstName"
          value={values.candidatename}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          // className="form-input"
          type="number"
          name="mobile"
          placeholder="Enter your MobileNum"
          value={values.mobile}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          // className="form-input"
          type="text"
          name="technology"
          placeholder="Technology"
          value={values.technology}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          // className="form-input"
          type="text"
          name="resource"
          placeholder="Resource"
          value={values.resource}
          onChange={handleChange}
        />
      </td>
      <td>
      <select name="status" value={values.status} onChange={handleChange} style={{padding:'0.2rem'}}>
            <option >Click to Select Status</option>
            <option >Cannot provide support</option>
            <option >Confrimed</option>
            <option >Demo completed</option>
            <option >Demo Scheduled</option>
            <option >Demo yet to Schedule</option>
            <option >Follow up</option>
            <option >No response</option>
            <option >Not interested</option>
            <option >Resource not available</option>
            <option >Waiting for response</option>
            </select>
      </td>
      <td>
        <input
          // className="form-input message"
          type="textarea"
          name="queries"
          placeholder="Type Here "
          value={values.feedback}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          // className="form-input"
          type="date"
          name="followupdate"
          placeholder="Followup-Date"
          value={values.followupdate}
          onChange={handleChange}
        />
      </td>
    </tr>
  );
};
export default EnqEditTable;
