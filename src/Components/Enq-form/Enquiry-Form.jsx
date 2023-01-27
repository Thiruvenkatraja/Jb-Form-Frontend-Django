import UseForm from "../../Hooks/Useform";
import Validation from "../../Utils/Validation";



 const EnquiryForm=()=> {
  const { handleChange, values, handleSubmit, errors, done} =
    UseForm(Validation);

 
  
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0,10);
    
  return (
    <div className="form-right">
      
      <form className="form" onSubmit={handleSubmit}>
        <h1>Fill The Details To Save Data</h1>
        <div className="form-fields">
        <div className="form-inputs">
          <label htmlFor="" className="formlabel">
           Candiate-Name *
          </label>
          <input
            className="form-input"
            type="text"
            name="candidatename"
            placeholder="Enter your FirstName"
            value={values.candidatename}
            onChange={handleChange}
          />
          {errors.candidatename && <p>{errors.candidatename}</p>}
        </div>
        
         <div className="form-inputs">
          <label htmlFor="" className="formlabel">
            Start-Date *
          </label>
          <input
            className="form-input textbox-n"
            name="startdate"
            placeholder="date"
            type="date"
            value={values.startdate||date}
            onChange={handleChange}
          />
          {errors.startdate && <p>{errors.startdate}</p>}
        </div>
        <div className="form-inputs">
          <label htmlFor="" className="formlabel">
           Follow-Up-Date *
          </label>
          <input
            className="form-input textbox-n"
            name="followupdate"
            placeholder="date"
            type="date"
            value={values.followupdate||date}
            onChange={handleChange}
          />
          {errors.followupdate && <p>{errors.followupdate}</p>}
        </div>
        <div className="form-inputs">
          <label htmlFor="" className="formlabel">
            Technology *
          </label>
          <input
            className="form-input"
            type="text"
            name="technology"
            placeholder="Technology"
            value={values.technology}
            onChange={handleChange}
          />
          {errors.technology && <p>{errors.technology}</p>}
        </div>
        <div className="form-inputs">
          <label htmlFor="" className="formlabel">
            Resource *
          </label>
          <input
            className="form-input"
            type="text"
            name="resource"
            placeholder="Resource"
            value={values.resource}
            onChange={handleChange}
          />
          {errors.resource && <p>{errors.resource}</p>}
        </div>
        <div className="form-inputs">
          <label htmlFor="" className="formlabel">
            Mobile *
          </label>
          <input
            className="form-input"
            type="number"
            name="mobile"
            placeholder="Enter your MobileNum"
            value={values.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p>{errors.mobile}</p>}
        </div> 
        <div className="form-inputs">
          <label htmlFor="" className="formlabel">
            Status *
          </label>
          <select className="form-input" name="status" value={values.status} onChange={handleChange}>
            <option >Click to select status</option>
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
          {errors.status && <p>{errors.status}</p>}
        </div>

        <div className="form-inputs">
          <label htmlFor="" className="formlabel">
           Feedback
          </label>
          <input
            className="form-input message"
            type="text-area"
            name="feedback"
            placeholder="Type Your Feedback "
            value={values.feedback}
            onChange={handleChange}
          />
          
        </div>
        <button className="submit-btn">Submit</button>
        {Object.keys(errors).length === 0 && done ? (
        <div className="success">Thanking for Contacting Us</div>
        ) : ("")}
       
        </div>
      </form>
    </div>
  );
}
export default EnquiryForm  