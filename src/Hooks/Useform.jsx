// import { useEffect } from "react";
import {useState} from "react";
import axios from "axios";

 const UseForm = (Validation)=> {
  const [values, setValues] = useState({
    candidatename: "",
    mobile: "",
    technology: "",
    startdate: "",
    followupdate:"",
    resource: "",
    status: "",
    feedback: "",
  });
  const [errors, seterrors] = useState({});
  const [done, setdone] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevalues) => {
      return {
        ...prevalues,
        [name]: value,
      };
    });
  };

  const enqdata = {
    candidatename: values.candidatename,
    mobile: values.mobile,
    technology: values.technology,
    startdate: values.startdate,
    followupdate:values.followupdate,
    resource: values.resource,
    status: values.status,
    feedback: values.feedback,
  };


  const postData=()=>{
    if(Object.values(values).includes("") === false){
      axios.post('https://jb-form-backend.onrender.com/api/jbform/', enqdata) 
      .then(res=>console.log(res.data))
       console.log("success",Object.values(values))
    }
  }
  

 const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event)
     console.log(values)
     console.log("I am Working")

    
     postData()
  
        

    setValues({
      candidatename: "",
      mobile: "",
      technology: "",
      startdate: "",
      followupdate:"",
      resource: "",
      status: "", 
      feedback: "",
    });

    seterrors(Validation(values));
    
    setdone(true)
  };
  

  return { handleChange, values, handleSubmit, errors, done };
}
export default UseForm;