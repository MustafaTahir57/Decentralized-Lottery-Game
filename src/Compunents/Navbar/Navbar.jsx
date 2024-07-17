import React, { useState } from "react";
import logo from "../../assets/coon.jpeg";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import ConnectWallet from "./ConnectWallet";
import Modal from 'react-bootstrap/Modal';
function Navbar({ setConnection , setUserName }) {
  const [modalShow,setModalShow] = useState(false);
  const [name,setName] = useState("")
  const [error,setError] = useState(false);
  const handleSubmit = ()=>{
    if(!name){
      setError(true)
      return
    }
    localStorage.setItem("userName", name)
    setUserName(name)
    setModalShow(false)
    setName("")
  }
  console.log("modalShow", modalShow);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light " style={{borderBottom:"1px solid rgb(161, 160, 210)"}}>
        <div className="container-fluid m-0">
          <Link to="/" className="navbar-brand text-white" href="#">
            <img src={logo} width={100} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="">
              <IoMenu className="text-white" />
            </span>
          </button>
          <div
            className="collapse navbar-collapse gap-5"
            id="navbarTogglerDemo02"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/How"
                  className="nav-link  text-decoration-none  fw-bold link"
                >
                  How to go
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="https://bscscan.com/address/0x8a7219ee700cdc5b13ed5718b82d5c4c6954e36f"
                  target="_blank"
                  className="nav-link text-decoration-none  fw-bold link"
                >
                  Contract
                </a>
              </li>
            </ul>
            <div className="d-flex">
              <ConnectWallet setConnection={setConnection} setModalShow={setModalShow}/>
            </div>
          </div>
        </div>
        {
          modalShow ? (
            <Modal
            show={modalShow}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body  style={{
              background: "rgb(70 68 176)",
              borderRadius: "7px",
              color: "#fff",
            }}>
              <h4>Enter Your Name</h4>
              <input
                  type="text"
                  className="w-100 mt-2 "
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {
                  error && !name &&  <span className="text-danger">Please enter Name</span>
                }
                <div className="row">
                  <div className="col-md-12">
                    <button
                      className=" w-100 btn btn_jion btn-success  mb-1 mt-3"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                  
                </div>
            </Modal.Body>
          </Modal>
          ) : (
            <></>
          )
        }
      </nav>
    </div>
  );
}

export default Navbar;
