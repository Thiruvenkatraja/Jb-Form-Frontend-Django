import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHome, FaWpforms, FaList, FaBars,FaTimes,FaListAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "/form",
    name: "Enq-Form",
    icon: <FaWpforms />,
  },
  {
    path: "/enqlist",
    name: "Enq-List",
    icon: <FaList />,
  },
  {
    path: "/enqfilterlist",
    name: "Follow-Up-List",
    icon: <FaListAlt/>,
  },
];

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.6,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.6,
      },
    },
  };
  return (
    <div className="main-container">
      <div className='nav-controls'>
      <div className="top-bar" style={{ zIndex:'1'}}>
        <h1 style={{marginLeft: open?'10.5rem':'0rem',transition: open ?'.9s':'.9s'}}>Intellecto-Global-Services</h1>
      </div>

      <motion.div
        animate={{ width: open ? "200px" : "40px",
        transition: {
            duration: 0.5,
            type: "none",
            damping:0,
          }, }}
        className="sidebar"
        
      >
        <div className="top-section">
          {open && (
            <motion.h1
              varients={showAnimation}
              intial="hidden"
              animate="show"
              exit="hidden"
              className="logo"
            >
              <img src='https://intellectoglobal.com/wp-content/uploads//2022/04/IG-Logo-White.svg' alt='None'/>{" "}
            </motion.h1>
          )}

          <div className="bars">{
           open? <FaTimes onClick={toggle} 
             />:
             <FaBars onClick={toggle}/>
          }
          </div>
        </div>
        <div className="route-page">
        <section className="routes">
          {Routes.map((route) => (
            <NavLink activeClassName='active' to={route.path} key={route.name} className="link">
              <div className="icon">{route.icon}</div>
              <AnimatePresence>
                {open && (
                  <motion.div
                    varients={showAnimation}
                    intial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link-text"
                  >
                    {route.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </section>
       </div>


      </motion.div>


      </div>
      <main style={{zIndex:'2',position:'absolute', left: open?'10rem':'0.5rem',transition: open ?'.6s':'.6s'}}>
        {children}
        </main>
    </div>
  );
};

export default Sidebar;
