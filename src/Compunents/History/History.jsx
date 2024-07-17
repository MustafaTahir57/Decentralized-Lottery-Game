import React from "react";
import { Spinner } from "react-bootstrap";
import profile from "../../assets/d6e931799ee14d92989c96f6f7989a8175df65c6_full.jpg";

function History({ historyDetails, loading }) {
//   console.log("historyDetails", historyDetails);
  return (
    <div className="mb-4" >
      {loading ? (
        <div className="d-flex justify-content-center mt-5 mb-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {historyDetails.length > 0 &&
            historyDetails.map((items, index) => {
              return (
                <div key={index} className="mb-4">
                  <div className="d-flex justify-content-between bg-dark px-3 py-3 pt-4 align-items-center mt-1 ">
                    <h5 className="winner">Winner</h5>
                    <div className="">
                      <h5>Round No: # {items?.roundNumber}</h5>
                    </div>
                  </div>
                  <div
                    className="d-block d-lg-flex align-items-center justify-content-between py-4 px-2 win_back "
                   
                  >
                    <div className="d-flex align-items-center ">
                      <img src={profile} className="img_pro2" alt="" />
                      <div className="ms-3">
                        <h6>Win: {items?.amount} BNB</h6>
                      </div>
                    </div>
                    <div className="d-flex ">
                  <div className="fs">   Winner Address : </div> 
                     <div className="ms-1 fs">{items?.winnerAddress}</div> 
                    </div>
                     
                  </div>
                  <div className=" pt-3 pb-3 gap-1 bg-dark">
                    <h5 className="winner ms-3">Runner Up</h5>
                    <div className="d-flex flex-wrap justify-content-center ">
                      {items?.users?.map((user, idx) => {
                        return (
                          <div className="baxk-history text-center pt-1">
                            <img
                              src={profile}
                              className="img_pro2-history"
                              alt=""
                            />
                            <h6 className="mt-2">{`${user.runnerUpAddress.slice(
                              0,
                              6
                            )}...${user.runnerUpAddress.slice(-6)}`}</h6>
                            <h6 className="pb-2">{user?.runerUpAmmount.toFixed(5)} BNB</h6>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}

export default History;
