import React from "react";
import profile from "../../assets/d6e931799ee14d92989c96f6f7989a8175df65c6_full.jpg";
import { TbCoinTakaFilled } from "react-icons/tb";
import eth_logo from "../../assets/Ethereum_logo_translucent.png";

function Box_profile({ winer, winerDetails, backgroundColor }) {
  const demiAddress = "0x0000000000000000000000000000000000000000";
  const style = {
    backgroundColor: backgroundColor,
  };

  return (
    <div>
      <div
        className="card p-0 m-0 text-center justify-content-center mt-2"
        style={{ borderRadius: "13px" }}
      >
        <div className="card-body p-0 w-100 m-auto">
          <p className="py-4">{winer}</p>
          <img src={profile} className="img_pro " alt="" />
          <div className="p-3 pt-5" style={style}>
            <p>
              {winerDetails && winerDetails.winnerAddress
                ? `${winerDetails.winnerAddress.slice(
                    0,
                    6
                  )}...${winerDetails.winnerAddress.slice(-6)}`
                : `${demiAddress.slice(0, 6)}...${demiAddress.slice(-6)}`}
            </p>
            <div className="back d-flex justify-content-between align-items-center">
              <div className="align-items-center d-flex gap-1 box-width">
                <img src={eth_logo} width={20} />
              </div>
              <span>{(winerDetails && winerDetails.amount) || 0.0} BNB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Box_profile;
