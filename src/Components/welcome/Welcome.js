import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Fox from "../logo/Logo";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Welcome = () => {
  
  
  function demo() {
    const arr = [
      // {
      //   balance: "0",
      //   tokenAddress: "0x9767c8E438Aa18f550208e6d1fDf5f43541cC2c8",
      //   symbol: "MMIT",
      //   API_URL: "https://bsc-dataseed.binance.org/",
      // },
      // {
      //   balance: "0",
      //   tokenAddress: "0xa03110800894b3CcF8723D991d80875561F96777",
      //   symbol: "BGVT",
      //   API_URL: "https://bsc-dataseed.binance.org/",
      // },
      // {
      //   balance: "0",
      //   tokenAddress: "0x9A2478C4036548864d96a97Fbf93f6a3341fedac",
      //   symbol: "ZAX ",
      //   API_URL: "https://bsc-dataseed.binance.org/",
      // },
    ];
    localStorage.setItem("btnvalue", "BNB Smart Chain");
    localStorage.setItem("symbol", "BNB");
    localStorage.setItem("rpcUri", "https://bsc-dataseed.binance.org/");
    localStorage.setItem("Tokens", JSON.stringify(arr));
    localStorage.setItem("OldTokens", JSON.stringify(arr));
    
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function open() {
    var accountValue = await localStorage.getItem("account-data");
    if (!accountValue) {
    } else {
      document.getElementById("start").style.display = "none";
      document.getElementById("open").style.display = "block";
    }
  }
  open();
  async function pkey() {
    let pwd = localStorage.getItem("Password");
    await fetch("http://167.172.106.122:8082/pwdecrypt?pwd=" + pwd)
      .then((res) => res.json())
      .then(async (data) => {
        var p = document.getElementById("pwdinput").value;
        if (!p) {
          return;
        } else if (p === data.password.password) {
          localStorage.setItem("allow", 1);
          window.location.replace("/wallet");
        } else {
          Swal.fire({
            icon: "error",
            title: "Password does not match...",
          });
        }
      });
  }
async function start() {
  localStorage.setItem("accName",'Account');
  demo();
};
  useEffect(() => {
    open();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row align-items-start">
          <div className="col"></div>
          <div style={{ height: "150px" }} className="col"></div>
          <div className="col"></div>
        </div>
        <div className="row align-items-center">
          <div className="col"></div>
          <div className="col">
            <div
              className="card"
              style={{ width: "25rem", alignItems: "center" }}
            >
              <img
                style={{ width: "30%" }}
                src="https://pbs.twimg.com/media/FrKo2NEXoAEzWUM?format=png"
                className="card-img-top"
                alt="..."
              />
              {/* <div style={{width:'30%'}}><Fox /></div> */}
              <div className="card-body">
                <h5 className="card-title">Welcome To Meflex Wallet</h5>
                <p
                  style={{ textAlign: "left", fontSize: "11px" }}
                  className="card-text"
                >
                  Connecting you to Etherrum and the Decentralized Web.
                  <br />
                  We are Happy to see you.
                </p>
                <Link id="start" to={"/help"}>
                  <a
                    style={{
                      borderRadius: "50px",
                      fontSize: "11px",
                      width: "130px",
                    }}
                    onClick={start}
                    className="btn btn-primary"
                  >
                    Get Started
                  </a>
                </Link>
                <Link
                  id="open"
                  style={{ display: "none" }}
                  onClick={handleShow}
                >
                  <a
                    style={{
                      borderRadius: "50px",
                      fontSize: "11px",
                      width: "130px",
                    }}
                    href="#"
                    className="btn btn-primary"
                  >
                    Open Your Wallet
                  </a>
                </Link>
              </div>
            </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Control
                      id="pwdinput"
                      style={{ color: "black" }}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Back
                </Button>
                <Button variant="primary" onClick={pkey}>
                  Next
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="col"></div>
        </div>
        <div className="row align-items-end">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
