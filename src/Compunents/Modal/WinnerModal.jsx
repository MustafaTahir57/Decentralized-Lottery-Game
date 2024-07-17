import React from "react";
import Modal from "react-bootstrap/Modal";
import profile from "../../assets/d6e931799ee14d92989c96f6f7989a8175df65c6_full.jpg";
import eth_logo from "../../assets/Ethereum_logo_translucent.png";
import { TbCoinTakaFilled } from "react-icons/tb";
const WinnerModal = ({ setModalShow, modalShow, winerDetails }) => {
  return (
    <div>
      {modalShow ? (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body
            style={{
              background: "rgb(70 68 176)",
              borderRadius: "7px",
              color: "#fff",
            }}
          >
            <h4 className="mb-3 mt-3">Winner Announcement</h4>
            <div
              className="card p-0 m-0 text-center justify-content-center mt-2"
              style={{ borderRadius: "13px" }}
            >
              <div className="card-body p-0 w-100">
                <p className="py-4"></p>
                <img src={profile} className="img_pro-modal" alt="" />
                <div
                  className="p-3 pt-5"
                  style={{ background: "rgb(94, 92, 182)" }}
                >
                  <p>
                    {winerDetails &&
                      `${winerDetails.winnerAddress.slice(
                        0,
                        6
                      )}...${winerDetails.winnerAddress.slice(-6)}`}
                  </p>
                  <div className="back d-flex justify-content-between align-items-center">
                    <div className="align-items-center d-flex gap-1 box-width">
                      <img src={eth_logo} width={20} />
                    </div>
                    <span>
                      {(winerDetails && winerDetails.amount) || 0.0} BNB
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="card bg_dark2 p-0 m-0 text-center justify-content-center mt-2">
              <div className="card-body w-100 m-auto">
                <img src={profile} className="img_pro" alt="" />
                <p>
                  {winerDetails &&
                    `${winerDetails.winnerAddress.slice(
                      0,
                      6
                    )}...${winerDetails.winnerAddress.slice(-6)}`}
                </p>
                <div className="back d-flex justify-content-between align-items-center">
                  <span className="align-items-center d-flex gap-1">
                    <TbCoinTakaFilled
                      className=""
                      style={{ marginTop: "2px" }}
                    />
                    
                  </span>
                  <span>{winerDetails && winerDetails.amount} BNB</span>
                </div>
              </div>
            </div> */}
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default WinnerModal;
