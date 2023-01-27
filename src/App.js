import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./Components/Enq-form/Form";
import EnquiryList from "./Components/Enq-Table/Enquiry-List";
import EnqFilterList  from "./Components/Enq-Table/Enq-Filter-Table";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Sidebar from "./Components//Home/Sidebar";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Home from "./Components/Home/Home";


function App() {
  
  return (
    <div>
       
      
        <Router>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/form" element={<Form />} />
          <Route path="/enqlist" element={<EnquiryList />} />
          <Route path="/enqfilterlist" element={<EnqFilterList />} />
         </Routes>
         </Router>
      
      
    </div>
  );
}

export default App;
