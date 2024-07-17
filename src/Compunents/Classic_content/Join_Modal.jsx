import React from "react";
import { Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
const JoinModal = ({
  joinModalShow,
  setJoinModalShow,
  setToken,
  token,
  error,
  bnbPrice,
  loading,
  handleBuyLottery,
  buttonDisable,
}) => {
  return (
    <div>
      {joinModalShow ? (
        <Modal
          show={joinModalShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body
            style={{ background: "rgb(70 68 176)", borderRadius: "7px" }}
          >
            <div className="row d-flex justify-content-center">
              <div className="col-md-12 ">
                <h5>Buy Lottery</h5>
                <div className="input-dollar d-flex align-items-center justify-content-between">
                <input
                  type="number"
                  className="offdK"
                  placeholder="Enter USD Amount"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  min={1}
                />
                <div className="">
                    $
                </div>
                </div>
                
                {error && !token && (
                  <span className="text-danger">Please enter USD amount</span>
                )}
                <div className="row">
                  <div className="col-md-6">
                    <div className="w-100 box-input d-flex justify-content-between align-items-center">
                      <spam>
                        {token && bnbPrice
                          ? bnbPrice.toWeiAmount.toFixed(8)
                          : 0}
                      </spam>{" "}
                      <span className="eth-price">BNB</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="w-100 box-input d-flex justify-content-between align-items-center">
                      <span>{token && bnbPrice ? bnbPrice.ticket : 0}</span>{" "}
                      <span className="eth-price">Ticket</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                    <button
                      className="btn btn-secondary w-100 mb-1 mt-3"
                      onClick={() => setJoinModalShow(false)}
                      disabled={loading}
                    >
                      Close
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      className=" w-100 btn btn_jion btn-success  mb-1 mt-3"
                      onClick={handleBuyLottery}
                      disabled={loading || buttonDisable}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          <span className="ms-1">Loading...</span>
                        </>
                      ) : (
                        "Buy"
                      )}
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default JoinModal;
