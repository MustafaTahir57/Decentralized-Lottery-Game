import React from 'react'
import logo from "../../assets/coon.jpeg"; 
import baner from "../../assets/baner.jpeg"; 
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div>
        <div className="container  py-5" style={{borderTop:"1px solid rgb(161, 160, 210)",marginTop:"4%"}}>
            <div className="row">
                <div className="col-lg-4 col-12 mt-4 ">
<div className=" d-flex justify-content-between mt-4">
                  <div className="icon"><FaFacebookF /></div>  
                  <div className="icon"><FaXTwitter  /></div>  
                  <div className="icon"><FaInstagram /></div>  
                  <div className="icon"><FaDiscord /></div>  
                </div>
                </div>
                <div className="col-lg-4 col-12 mt-4 d-flex justify-content-center align-items-center">
                <img src={logo} className='w-50 m-auto'  alt="" />
</div>

                <div className="col-lg-4 col-12 mt-4 d-flex justify-content-center align-items-center">
<img className="" src={baner}  height={80}  alt="" />
                </div>
                
                
            </div>
        </div>
    </div>
  )
}

export default Footer