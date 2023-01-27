import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FaFilter } from "react-icons/fa";
import _ from "lodash";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import EnqDataTable from "./Enq-Data-Table";
import EnqEditTable from "./Enq-Edit-Table";
import ExportToExcel from "./ExportToExcel";

const pageSize = 10;

const EnqFilterList = () => {
    const [list, setList] = useState([]);
    const [paged, setPaged] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
  
    const getData = () => {
      axios.get("https://jb-form-backend.onrender.com/api/jbform/")
          .then((res) => {
          setList(res.data);
          setAllVal(res.data);
          setPaged(_(res.data).slice(0).take(pageSize).value());
        })
        .catch((err) => {
          console.log(err);
        });
    };
    useEffect(() => {
      getData();
    }, []);
  
    const [enqId, setEnqId] = useState(null);
    const [order, setOrder] = useState("ASC");
    const sorting = (col) => {
      if (order === "ASC") {
        const sorted = [...list].sort((a, b) =>
          a[col].toString().toLowerCase() > b[col].toString().toLowerCase()
            ? 1
            : -1
        );
        setPaged(sorted) || setList(sorted);
        setOrder("DSC");
      }
  
      if (order === "DSC") {
        const sorted = [...list].sort((a, b) =>
          a[col].toString().toLowerCase() < b[col].toString().toLowerCase()
            ? 1
            : -1
        );
        setPaged(sorted) || setList(sorted);
        setOrder("ASC");
      }
    };
  
    const [values, setValues] = useState({
      candidatename: "",
      mobile: "",
      technology: "",
      startdate: "",
      followupdate: "",
      resource: "",
      status: "",
      feedback: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      const newEditData = { ...values };
      newEditData[name] = value;
      setValues(newEditData);
    };
  
    const enqdata = {
      candidatename: values.candidatename,
      mobile: values.mobile,
      technology: values.technology,
      startdate: values.startdate,
      followupdate: values.followupdate,
      resource: values.resource,
      status: values.status,
      feedbackc: values.feedback,
    };
    const editData = (id) => {
      axios
        .put(`https://jb-form-backend.onrender.com/api/jbform/${id}/`, enqdata)
        .then((res) => {
          console.log(res.data);
          console.log("Empdata Successfully updated");
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const handleEditClick = (event, obj) => {
      event.preventDefault();
  
      setEnqId(obj._id);
  
      const formValues = {
        candidatename: obj.candidatename,
        mobile: obj.mobile,
        technology: obj.technology,
        startdate: obj.startdate,
        followupdate: obj.followupdate,
        resource: obj.resource,
        status: obj.status,
        feedback: obj.feedback,
      };
      setValues(formValues);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // console.log(values);
      // console.log("I am Working");
  
      editData(enqId);
  
      const editedData = {
        id: enqId,
        candidatename: values.candidatename,
        mobile: values.mobile,
        technology: values.technology,
        startdate: values.startdate,
        followupdate: values.followupdate,
        resource: values.resource,
        status: values.status,
        feedback: values.feedback,
      };
  
      const newList = [...(list || paged)];
      const index = list.findIndex((lists) => lists._id === enqId);
      newList[index] = editedData;
      setList(newList) || setPaged(newList);
      setEnqId(null);
    };
    const Datass = list.map((edata,index)=>({
      SNo:index+1,
      StartDate:edata.startdate,
     Candidatename:edata.candidatename,
      Mobile:edata.mobile,
      Technology:edata.technology,
      Resource:edata.resource,
      Status:edata.status,
      Feedback:edata.feedback,
      Followupdate:edata.followupdate
  }))
    const Datas = Datass
    const Filename ='EnquiredData'
    const filter = ["Confrimed","Demo completed","Demo Scheduled","Demo yet to Schedule","Waiting for response"]
    // console.log(filter)
    const [search, setSearch] = useState("");
    const [allVal, setAllVal] = useState([]);
    const [click1, setClick1] = useState(true);
    const [click3, setClick3] = useState(true);
    const [click4, setClick4] = useState(true);
    const [click5, setClick5] = useState(true);
    const [click6, setClick6] = useState(true);
    const [click7, setClick7] = useState(true);
    const [click8, setClick8] = useState(true);
  
    const toggle1 = () => {
      setClick1(!click1);
    };
    const toggle3 = () => {
      setClick3(!click3);
    };
    const toggle4 = () => {
      setClick4(!click4);
    };
    const toggle5 = () => {
      setClick5(!click5);
    };
    const toggle6 = () => {
      setClick6(!click6);
    };
    const toggle7 = () => {
      setClick7(!click7);
    };
    const toggle8 = () => {
      setClick8(!click8);
    };
  
    const pageCount = list ? Math.ceil(list.length / pageSize) : 0;
    if (pageCount === -1) return null;
    const pages = _.range(1, pageCount + 1);
    const pagination = (pageNo) => {
      setCurrentPage(pageNo);
      const startIndex = (pageNo - 1) * pageSize;
      const pagePost = _(list).slice(startIndex).take(pageSize).value();
      setPaged(pagePost);
    };

    
  
    return (
      <div className="data-table">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          style={{
            position: "relative",
            marginTop: "50",
            left: "1rem",
            marginBottom: "20",
            width: "20rem",
          }}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
            if (search === "") {
              return setPaged(allVal) || setList(allVal);
            } else {
              let temp = allVal.filter(
                (data) =>
                  data.candidatename
                    .toLowerCase()
                    .trim()
                    .includes(search.toLowerCase()) ||
                  data.email.toLowerCase().trim().includes(search.toLowerCase())
              );
              setPaged(temp) || setList(temp);
            }
          }}
        />
        <div style={{margin:'1rem'}}>
        <ExportToExcel csvData={Datas} fileName={Filename}/>
        </div>
        <form className="table-data"  onSubmit={handleSubmit}>
          <Table bordered hover >
            
            <thead style={{verticalAlign:'middle',boxSizing:'border-box'}}>
            
              <tr style={{background: "brown", color: "white" }}>
              
              <th><div style={{width:'5rem'}}>Actions</div></th>
              <th>
  
              <div
          className="drop-down"
          style={{
            display: click5 ? "none" : "",
            transition: click5 ? ".6s" : ".6s",
            top: "9rem",
            
          }}
        >
          <Multiselect
            isObject={false}
            id="css_custom"
            // groupBy="cat"
            closeIcon="circle"
            // ref={multiselectRef}
            style={{
              optionContainer: {
                width: "11rem",
                height: "5rem",
                background: "#82AAE3",
                fontSize: "0.7rem",
              },
              searchBox: {
                maxHeight: "2.5rem",
                overflow: "hidden",
                border: "2px solid black",
              },
              inputFileld: {
                margin: "3px",
              },
            }}
            keepSearchTerm="false"
            options={allVal.map((fil) => fil.startdate)}
            closeOnSelect
            onSelect={(event) => {
              if (event.length === 0) {
                return setList(allVal) || setPaged(allVal);
              } else {
                let temp = allVal.filter((data) =>
                  event.includes(data.startdate)
                );
                setPaged(temp) || setList(temp);
                console.log(event);
              }
            }}
            onRemove={(event) => {
              if (event.length === 0) {
                return setList(allVal) || setPaged(allVal);
              } else {
                let temp = allVal.filter((data) =>
                  event.includes(data.startdate)
                );
                setPaged(temp) || setList(temp);
                console.log(event);
              }
            }}
            selectedValues={() => {
              setList(allVal) || setPaged(allVal);
            }}
            showCheckbox
            showArrow
            displayValue
          />
  
          <button class="btn btn-primary okay" onClick={toggle5}>
            Okay
          </button>
              </div>
  
                <div style={{width:'9rem'}}>
                <FaFilter
                    className="filter"
                    onClick={toggle5}
                    style={{
                      
                      marginLeft:'0.5rem',
                      marginRight:'0.5rem'
                     
                    }}
                  />
                  <i
                    onClick={() => sorting("startdate")}
                    className={
                      order === "DSC"
                        ? "fa fa-sort-alpha-asc"
                        : "fa fa-sort-alpha-desc"
                    }
                    style={{ paddingRight: "1rem" }}
                  ></i>
                  Start-Date
                  </div>
                </th>
              
                <th >
                <div style={{width:'12rem'}}>
  
                <div
          className="drop-down"
          style={{
            display: click1 ? "none" : "",
            transition: click1 ? ".6s" : ".6s",
            top: "9rem",
            
          }}
        >
          <Multiselect
            isObject={false}
            id="css_custom"
            // groupBy="cat"
            closeIcon="circle"
            // ref={multiselectRef}
            style={{
              optionContainer: {
                width: "11rem",
                height: "5rem",
                background: "#82AAE3",
                fontSize: "0.7rem",
              },
              searchBox: {
                maxHeight: "2.5rem",
                overflow: "hidden",
                border: "2px solid black",
              },
              inputFileld: {
                margin: "3px",
              },
            }}
            keepSearchTerm="false"
            options={allVal.map((fil) => fil.candidatename)}
            closeOnSelect
            onSelect={(event) => {
              if (event.length === 0) {
                return setList(allVal) || setPaged(allVal);
              } else {
                let temp = allVal.filter((data) =>
                  event.includes(data.candidatename)
                );
                setPaged(temp) || setList(temp);
                console.log(event);
              }
            }}
            onRemove={(event) => {
              if (event.length === 0) {
                return setList(allVal) || setPaged(allVal);
              } else {
                let temp = allVal.filter((data) =>
                  event.includes(data.candidatename)
                );
                setPaged(temp) || setList(temp);
                console.log(event);
              }
            }}
            selectedValues={() => {
              setList(allVal) || setPaged(allVal);
            }}
            showCheckbox
            showArrow
            displayValue
          />
          <button class="btn btn-primary okay" onClick={toggle1}>
            Okay
          </button>
                 </div>
  
                <FaFilter
                    className="filter"
                    onClick={toggle1}
                    style={{
                      
                      marginLeft:'0.5rem',
                      marginRight:'0.5rem'
                     
                    }}
                  />
                  <i
                    onClick={() => sorting("candiatename")}
                    className={
                      order === "DSC"
                        ? "fa fa-sort-alpha-asc"
                        : "fa fa-sort-alpha-desc"
                    }
                    style={{ marginRight: "1rem" }}
                  ></i>
                  
                  Candidate-Name
                  </div>
                </th>
                <th>
  
                <div
          className="drop-down"
          style={{
            display: click3 ? "none" : "",
            transition: click3 ? ".6s" : ".6s",
            top: "9rem",
            
          }}
        >
          <Multiselect
            isObject={false}
            id="css_custom"
            // groupBy="cat"
            closeIcon="circle"
            // ref={multiselectRef}
            style={{
              optionContainer: {
                width: "11rem",
                height: "5rem",
                background: "#82AAE3",
                fontSize: "0.7rem",
              },
              searchBox: {
                maxHeight: "2.5rem",
                overflow: "hidden",
                border: "2px solid black",
              },
              inputFileld: {
                margin: "3px",
              },
            }}
            keepSearchTerm="false"
            options={allVal.map((fil) => fil.mobile)}
            closeOnSelect
            onSelect={(event) => {
              if (event.length === 0) {
                return setList(allVal) || setPaged(allVal);
              } else {
                let temp = allVal.filter((data) => event.includes(data.mobile));
                setPaged(temp) || setList(temp);
                console.log(event);
              }
            }}
            onRemove={(event) => {
              if (event.length === 0) {
                return setList(allVal) || setPaged(allVal);
              } else {
                let temp = allVal.filter((data) => event.includes(data.mobile));
                setPaged(temp) || setList(temp);
                console.log(event);
              }
            }}
            selectedValues={() => {
              setList(allVal) || setPaged(allVal);
            }}
            showCheckbox
            showArrow
            displayValue
          />
          <button class="btn btn-primary okay" onClick={toggle3}>
            Okay
          </button>
                </div>
  
                <div style={{width:'8rem'}}>
                <FaFilter
                    className="filter"
                    onClick={toggle3}
                    style={{
                      
                      marginLeft:'0.5rem',
                      marginRight:'0.5rem'
                     
                    }}
                  />
                  <i
                    onClick={() => sorting("mobile")}
                    className={
                      order === "DSC"
                        ? "fa fa-sort-alpha-asc"
                        : "fa fa-sort-alpha-desc"
                    }
                    style={{ paddingRight: "1rem" }}
                  ></i>
                  Mobile
                  </div>
                </th>
                <th>
                <div
          className="drop-down"
          style={{
            display: click4 ? "none" : "",
            transition: click4 ? ".6s" : ".6s",
            top: "9rem",
            
          }}
        >
          <Multiselect
            isObject={false}
            id="css_custom"
            // groupBy="cat"
            closeIcon="circle"
            // ref={multiselectRef}
            style={{
              optionContainer: {
                width: "11rem",
                height: "5rem",
                background: "#82AAE3",
                fontSize: "0.7rem",
              },
              searchBox: {
                maxHeight: "2.5rem",
                overflow: "hidden",
                border: "2px solid black",
              },
              inputFileld: {
                margin: "3px",
              },
            }}
            keepSearchTerm="false"
            options={allVal.map((fil) => fil.technology)}
            closeOnSelect
            onSelect={(event) => {
              if (event.length === 0) {
                return setList(allVal) || setPaged(allVal);
              } else {
                let temp = allVal.filter((data) =>
                  event.includes(data.technology)
                );
                setPaged(temp) || setList(temp);
                console.log(event);
              }
            }}
            onRemove={(event) => {
              if (event.length === 0) {
                return setList(allVal) || setPaged(allVal);
              } else {
                let temp = allVal.filter((data) =>
                  event.includes(data.technology)
                );
                setPaged(temp) || setList(temp);
                console.log(event);
              }
            }}
            selectedValues={() => {
              setList(allVal) || setPaged(allVal);
            }}
            showCheckbox
            showArrow
            displayValue
          />
          <button class="btn btn-primary okay" onClick={toggle4}>
            Okay
          </button>
                 </div>
  
                <div style={{width:'10rem'}}>
                <FaFilter
                    className="filter"
                    onClick={toggle4}
                    style={{
                      
                      marginLeft:'0.5rem',
                      marginRight:'0.5rem'
                     
                    }}
                  />
                  <i
                    onClick={() => sorting("technology")}
                    className={
                      order === "DSC"
                        ? "fa fa-sort-alpha-asc"
                        : "fa fa-sort-alpha-desc"
                    }
                    style={{ paddingRight: "1rem" }}
                  ></i>
                  Technology
                  </div>
                </th>
                <th>
                
                <div
          className="drop-down"
          style={{
            display: click7 ? "none" : "",
            transition: click7 ? ".6s" : ".6s",
            top: "9rem",
            
          }}
        >
          <Multiselect
            isObject={false}
            id="css_custom"
            // groupBy="cat"
            closeIcon="circle"
            // ref={multiselectRef}
            style={{
              optionContainer: {
                width: "11rem",
                height: "5rem",
                background: "#82AAE3",
                fontSize: "0.7rem",
              },
              searchBox: {
                maxHeight: "2.5rem",
                overflow: "hidden",
                border: "2px solid black",
              },
              inputFileld: {
                margin: "3px",
              },
            }}
            keepSearchTerm="false"
            options={allVal.map((fil) => fil.resource)}
            closeOnSelect
            onSelect={(event) => {
              if (event.length === 0) {
                return setList(allVal) || setPaged(allVal);
              } else {
                let temp = allVal.filter((data) => event.includes(data.resource));
                setPaged(temp) || setList(temp);
                console.log(event);
              }
            }}
            onRemove={(event) => {
              if (event.length === 0) {
                return setList(allVal) || setPaged(allVal);
              } else {
                let temp = allVal.filter((data) => event.includes(data.resource));
                setPaged(temp) || setList(temp);
                console.log(event);
              }
            }}
            selectedValues={() => {
              setList(allVal) || setPaged(allVal);
            }}
            showCheckbox
            showArrow
            displayValue
          />
          <button class="btn btn-primary okay" onClick={toggle7}>
            Okay
          </button>
                </div>
  
                <div style={{width:'9rem'}}>
                <FaFilter
                    className="filter"
                    onClick={toggle7}
                    style={{
                      
                      marginLeft:'0.5rem',
                      marginRight:'0.5rem'
                     
                    }}
                  />
                  <i
                    onClick={() => sorting("resource")}
                    className={
                      order === "DSC"
                        ? "fa fa-sort-alpha-asc"
                        : "fa fa-sort-alpha-desc"
                    }
                    style={{ paddingRight: "1rem" }}
                  ></i>
                  Resource
                  </div>
                </th>
                <th>
  
                <div
          className="drop-down"
          style={{
            display: click8 ? "none" : "",
            transition: click8 ? ".6s" : ".6s",
            top: "9rem",
            
          }}
        >
          <Multiselect
            isObject={false}
            id="css_custom"
            // groupBy="cat"
            closeIcon="circle"
            // ref={multiselectRef}
            style={{
              optionContainer: {
                width: "11rem",
                height: "5rem",
                background: "#82AAE3",
                fontSize: "0.7rem",
              },
              searchBox: {
                maxHeight: "2.5rem",
                overflow: "hidden",
                border: "2px solid black",
              },
              inputFileld: {
                margin: "3px",
              },
            }}
            keepSearchTerm="false"
            options={allVal.map((fil) => fil.status)}
            closeOnSelect
            onSelect={(event) => {
              if (event.length === 0) {
                return setList(allVal) || setPaged(allVal);
              } else {
                let temp = allVal.filter((data) => event.includes(data.status));
                setPaged(temp) || setList(temp);
                console.log(event);
              }
            }}
            onRemove={(event) => {
              if (event.length === 0) {
                return setList(allVal) || setPaged(allVal);
              } else {
                let temp = allVal.filter((data) => event.includes(data.status));
                setPaged(temp) || setList(temp);
                console.log(event);
              }
            }}
            selectedValues={() => {
              setList(allVal) || setPaged(allVal);
            }}
            showCheckbox
            showArrow
            displayValue
          />
          <button class="btn btn-primary okay" onClick={toggle8}>
            Okay
          </button>
                 </div>
  
                <div style={{width:'8rem'}}>
                <FaFilter
                    className="filter"
                    onClick={toggle8}
                    style={{
                      
                      marginLeft:'0.5rem',
                      marginRight:'0.5rem'
                     
                    }}
                  />
                  <i
                    onClick={() => sorting("status")}
                    className={
                      order === "DSC"
                        ? "fa fa-sort-alpha-asc"
                        : "fa fa-sort-alpha-desc"
                    }
                    style={{ paddingRight: "1rem" }}
                  ></i>
                  Status
                  </div>
                </th>
                
                <th>
                <div style={{width:'8rem',overflow:'hidden'}}>
                  <i
                    onClick={() => sorting("feedback")}
                    className={
                      order === "DSC"
                        ? "fa fa-sort-alpha-asc"
                        : "fa fa-sort-alpha-desc"
                    }
                    style={{ paddingRight: "1rem" }}
                  ></i>
                  Feedback
                  </div>
                </th>
  
                <th>
  
                <div
          className="drop-down"
          style={{
            display: click6 ? "none" : "",
            transition: click6 ? ".6s" : ".6s",
            top: "9rem",
            left: "73rem",
          }}
        >
          <Multiselect
            isObject={false}
            id="css_custom"
            // groupBy="cat"
            closeIcon="circle"
            // ref={multiselectRef}
            style={{
              optionContainer: {
                width: "11rem",
                height: "5rem",
                background: "#82AAE3",
                fontSize: "0.7rem",
              },
              searchBox: {
                maxHeight: "2.5rem",
                overflow: "hidden",
                border: "2px solid black",
              },
              inputFileld: {
                margin: "3px",
              },
            }}
            keepSearchTerm="false"
            options={allVal.map((fil) => fil.followupdate)}
            closeOnSelect
            onSelect={(event) => {
              if (event.length === 0) {
                return setList(allVal) || setPaged(allVal);
              } else {
                let temp = allVal.filter((data) =>
                  event.includes(data.followupdate)
                );
                setPaged(temp) || setList(temp);
                console.log(event);
              }
            }}
            onRemove={(event) => {
              if (event.length === 0) {
                return setList(allVal) || setPaged(allVal);
              } else {
                let temp = allVal.filter((data) =>
                  event.includes(data.followupdate)
                );
                setPaged(temp) || setList(temp);
                console.log(event);
              }
            }}
            selectedValues={() => {
              setList(allVal) || setPaged(allVal);
            }}
            showCheckbox
            showArrow
            displayValue
          />
          <button class="btn btn-primary okay" onClick={toggle6}>
            Okay
          </button>
                </div>
  
                <div style={{width:'11rem'}}>
                <FaFilter
                    className="filter"
                    onClick={toggle6}
                    style={{
                      
                      marginLeft:'0.5rem',
                      marginRight:'0.5rem'
                     
                    }}
                  />
                  <i
                    onClick={() => sorting("followupdate")}
                    className={
                      order === "DSC"
                        ? "fa fa-sort-alpha-asc"
                        : "fa fa-sort-alpha-desc"
                    }
                    style={{ paddingRight: "1rem" }}
                  ></i>
                  Follow-Up-Date
                  </div>
                </th>
                
              </tr>
            </thead>
            <tbody>
              {paged.filter((fil)=>{
                console.log(fil.status)
                   if(filter.includes(fil.status)){
                    return fil
                   }
              }).map((obj) => (
                <Fragment>
                  {enqId === obj._id ? (
                    <EnqEditTable values={values} handleChange={handleChange} />
                  ) : (
                    <EnqDataTable
                      obj={obj}
                      List={list}
                      setList={setList}
                      paged={paged}
                      setPaged={setPaged}
                      handleEditClick={handleEditClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </Table>
        </form>
        <nav className="d-flex justify-content-center page">
          <ul className="pagination">
            {pages.map((page) => (
              <li
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <p className="page-link" onClick={() => pagination(page)}>
                  {page}
                </p>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }

  export default EnqFilterList;
  
