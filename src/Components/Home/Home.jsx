import React from 'react';
import './Home.css';
import Gif from './Gif.gif';
import Typical from "react-typical";

const Home = () => {
  return (
    <div className='home-container'>
        <img src={Gif} alt="none"/>
        <div className='header-img'>
        <img src='https://intellectoglobal.com/wp-content/uploads/2022/04/IG-Logo.svg' alt="None"/>
        <h1>
        <Typical
                loop={Infinity}
                steps={[
                  "🔴---App Development---🔴",
                  1000,
                  "🟠---AI  Development---🟠",
                  1000,
                  "🟡-- Web  Development--🟡",
                  1000,
                  "🟢- Python Development-🟢",
                  1000,
                  "🔵QA Automation Testing🔵",
                  1000,
                ]}
              />
        </h1>
        </div>
</div>
  )
}
export default Home;
