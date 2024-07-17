import React, { useEffect, useState } from "react";
import profile from "../../assets/d6e931799ee14d92989c96f6f7989a8175df65c6_full.jpg";
import Web3 from "web3";
import { lotteryAbi, lotteryAddress } from "../../utils/lotteryContract";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import WinnerModal from "../Modal/WinnerModal";
import JoinModal from "./Join_Modal";
import Spiner from "../Spiner/Spioner";
import Slider from "../Slider/Slider";
function Classic_content({
  connection,
  polygonWeb3,
  lestWinner,
  historyRecord,
  winerDetails,
  userName,
  setUserName
}) {
  const [token, setToken] = useState("");
  const [bnbPrice, setBnbPrice] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [joinModalShow, setJoinModalShow] = useState(false);
  const [rewardPool, setReward] = useState(0);
  const [currentRound, setCurrentRound] = useState("");
  const [userData, setUserData] = useState([]);
  const [spinnerRun, setSpinnerRun] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: "00", seconds: "00" });
  const [getEntranceFe, setGetEntranceFee] = useState(0);
  const [currentPlayers, setCurrentPlayers] = useState(0);
  const getName = localStorage.getItem("userName");
  //   const providerUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545';
  // const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
  // const web3 = new Web3("https://sepolia.infura.io/v3/045e3d0386824476a6198431b88d7b93");
  const providerUrl =
    "https://sepolia.infura.io/v3/045e3d0386824476a6198431b88d7b93";
  const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
  const integrateContract = () => {
    const lottery_Contract = new web3.eth.Contract(lotteryAbi, lotteryAddress);
    return lottery_Contract;
  };
  const handleBuyLottery = async () => {
    try {
      const newWeb3 = new Web3(window.ethereum);
      const lottery_Contract = new newWeb3.eth.Contract(
        lotteryAbi,
        lotteryAddress
      );
      // const contract = integrateContract();
      const valueInWei = web3.utils.toWei(
        bnbPrice.toWeiAmount.toString(),
        "ether"
      );
      if (connection) {
        if (!token) {
          setError(true);
          return;
        }
        setError(false);
        setLoading(true);
        const buyLottery = await lottery_Contract.methods
          .buyLottery(bnbPrice.ticket.toString())
          .send({
            from: connection,
            value: valueInWei,
          });
        if (buyLottery) {
          setLoading(false);
          setBnbPrice(0);
          setToken("");
          toast.success("Lottery Buy Successfully.");
          setJoinModalShow(false);
          timerCountDown();
          handleuserDetails();
          getCurrentPlayer();
        }
      } else {
        toast.error("Wallet connect first!");
      }
    } catch (e) {
      console.log("e", e);
    } finally {
      setLoading(false);
    }
  };
  const getValue = async () => {
    try {
      const contract = integrateContract();
      if (token) {
        const valueInWei = web3.utils.toWei(token.toString(), "ether");
        let calculateTicketsForAmount = await contract.methods
          .getEthAndTicketsFromUsd(valueInWei)
          .call();

          const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
          const data = await response.json();
          const amount = Number(calculateTicketsForAmount.ethAmount) / 1e18;
          const usdAmount = data?.ethereum?.usd * amount;
          console.log("data", usdAmount, data, calculateTicketsForAmount.ethAmount);
        const object = {
          ethAmount: Number(calculateTicketsForAmount.ethAmount),
          toWeiAmount: usdAmount,
          ticket: Number(calculateTicketsForAmount.tickets),
        };
        setBnbPrice(object);
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  const timerCountDown = async () => {
    try {
      const contract = integrateContract();
      let countdownEnd = await contract.methods.countdownEnd().call();
      countdownEnd = Number(countdownEnd);

      if (countdownEnd > 0) {
        let timerInterval;
        let hasLogged = false;

        const updateTimer = () => {
          const currentTime = Math.floor(Date.now() / 1000);
          const remainingTime = countdownEnd - currentTime;
          if (remainingTime > 0) {
            const minutes = String(Math.floor(remainingTime / 60)).padStart(
              2,
              "0"
            );
            const seconds = String(remainingTime % 60).padStart(2, "0");
            setTimeLeft({ minutes, seconds });
          } else {
            if (!hasLogged) {
              setTimeLeft({ minutes: "00", seconds: "00" });
              clearInterval(timerInterval);
              setButtonDisable(true);
              setSpinnerRun(true);
              console.log("111111");
              pickWinner();
              hasLogged = true;
            }
          }
        };

        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);

        return () => clearInterval(timerInterval);
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  const pickWinner = async () => {
    try {
      const contract = integrateContract();
      const account = web3.eth.accounts.privateKeyToAccount(
        "0x74f803f0d331e967f0d6792862034c8d5855b29eac8cafed6e70b50439c4393f"
      );
      web3.eth.accounts.wallet.add(account);
      web3.eth.defaultAccount = account.address;
      const tx = contract.methods.pickWinner();
      const gas = await tx.estimateGas({ from: account.address });
      const gasPrice = await web3.eth.getGasPrice();
      const data = tx.encodeABI();
      const nonce = await web3.eth.getTransactionCount(account.address);
      const transactionObject = {
        to: contract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: 11155111,
      };
      const signedTx = await web3.eth.accounts.signTransaction(
        transactionObject,
        account.privateKey
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      if (receipt) {
        setTimeout(() => {
          setReward(0);
          setButtonDisable(false);
          setUserData([]);
          lestWinner();
          historyRecord();
          setSpinnerRun(false);
          setModalShow(true);
          getCurrentPlayer();
          setTimeout(() => {
            setModalShow(false);
          }, 7000);
        }, 30000);
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  const handleuserDetails = async () => {
    try {
      const contract = integrateContract();
      let getEntranceFee = await contract.methods.getEntranceFee().call();
      getEntranceFee = Number(getEntranceFee) / 1e18;
      setGetEntranceFee(getEntranceFee);
      let currentRound = await contract.methods.currentRound().call();
      currentRound = Number(currentRound);
      setCurrentRound(currentRound);
      let getUsersData = await contract.methods
        .getUsersData(currentRound)
        .call();
      const array = [];
      getUsersData.forEach((element) => {
        const amount = Number(element.amount) / 1e18;
        const object = {
          userAddress: element.userAddress,
          amount: amount,
          tickets: element.tickets,
        };
        array.push(object);
      });
      let rewardPool = await contract.methods.rewardPool().call();
      rewardPool = Number(rewardPool) / 1e18;
      rewardPool = rewardPool.toFixed(4);
      setReward(rewardPool);
      setUserData(array);
    } catch (e) {
      console.log("e", e);
    }
  };

  const getCurrentPlayer = async () => {
    try {
      const contract = integrateContract();
      let currentPlayers = await contract.methods.currentPlayers().call();
      currentPlayers = Number(currentPlayers);
      setCurrentPlayers(currentPlayers);
    } catch (e) {
      console.log("e", e);
    }
  };

  const progressBarWidth = (currentPlayers / 50) * 100 + "%";

  useEffect(() => {
    getCurrentPlayer();
    if(getName){
      setUserName(getName)
    }
  }, []);
  useEffect(() => {
    timerCountDown();
    handleuserDetails();
  }, []);
  useEffect(() => {
    getValue();
  }, [token]);
  return (
    <div>
      <div className="">
        {spinnerRun ? (
          <div className="d-flex flex-column justify-content-center align-items-center mt-3 mb-3">
            <p className="lottery-win">Lottery Winner is on the way!</p>
            <div class="lds-hourglass"></div>
          </div>
        ) : (
          <div className="tw-bg-blue ">
            {/* <figure>
              <div className="progress-container">
                <div className="progress">
                  <div
                    className="progress-bar2 progress-bar-warning progress-bar-striped active"
                    style={{ width: progressBarWidth }}
                  ></div>
                  <span className="progress-text">
                    {currentPlayers} / {50}
                  </span>
                </div>
              </div>
            </figure> */}
            <div className="d-flex justify-content-center mb-3">
              <div className="baxk_lable d-flex justify-content-around">
                <span>Total</span>
                <span>{rewardPool} BNB</span>
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-center">
              <div className="timer">
                <h3>{timeLeft.minutes}</h3>
              </div>
              <span className="slash text-white">:</span>
              <div className="timer">
                <h3>{timeLeft.seconds}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="bg-light text-dark boder_gran pt-2 pb-2">
          <div className="row align-items-center">
            <div className="col-lg-6 col-12 p-2 ps-4">
              {/* <h5 className="">You have deposited - 0 (out of 10) items</h5> */}
              <p className="p-0 m-0 fw_bold">
                Minimum buy ticket 1 price, {getEntranceFe.toFixed(5)} BNB
              </p>
              <p className="p-0 m-0 fw_bold">
                Buy more tickets makes more chances to win.
              </p>
            </div>
            <div className="col-lg-5 col-12 d-flex justify-content-end flex-column">
              <button
                className=" w-100 btn btn_jion btn-success"
                onClick={() => setJoinModalShow(true)}
              >
                Join
              </button>
            </div>
            {/* <div className="col-lg-3 col-12">
              <div className="d-flex gap-2 align-items-center justify-content-evenly">
                <p className="fw_bold p-0 m-0">chance</p>
                <span className="per_0"> 0%</span>
              </div>
            </div> */}
          </div>
        </div>

        <div className="mt-5">
          {userData?.length > 0 &&
            userData?.map((items, index) => {
              return (
                <div
                  className="detail d-flex justify-content-between  mt-3"
                  key={index}
                >
                  <div className=" d-flex align-items-center">
                    <img src={profile} className="img_pro2" alt="" />
                    <div className="ms-lg-3 ms-2 mt-2 mb-2">
                      <span className="userName"> {userName ? userName : "Anonymous"}</span>
                      {/* &nbsp;(<span className="userAddress">
                        {`${items.userAddress.slice(
                          0,
                          6
                        )}...${items.userAddress.slice(-6)}`}
                      </span>) */}
                      
                      <div className="d-flex align-items-center">
                        <span>Ticket #</span>
                        <br />
                        {items.tickets &&
                          items.tickets.map((element, idx) => {
                            return (
                              <div
                                key={idx}
                                style={{
                                  background: "rgb(120, 118, 216)",
                                  padding: "1px 8px",
                                  borderRadius: "6px",
                                  margin: "3px",
                                }}
                                className="d-flex justify-content-center align-items-center"
                              >
                                {Number(element)}
                              </div>
                            );
                            px;
                          })}
                      </div>
                    </div>
                  </div>
                  <div className="poligon  d-flex align-items-center ">
                    <h6 className="eth_main text-center ">
                      {items?.amount.toFixed(5)}
                      <br /> BNB
                    </h6>
                  </div>
                </div>
              );
            })}
        </div>
        {/* <div className="my-4">
          <Slider />
        </div> */}
        {/* <Spiner/> */}
      </div>
      <JoinModal
        setJoinModalShow={setJoinModalShow}
        joinModalShow={joinModalShow}
        setToken={setToken}
        token={token}
        error={error}
        bnbPrice={bnbPrice}
        loading={loading}
        handleBuyLottery={handleBuyLottery}
        buttonDisable={buttonDisable}
      />
      <WinnerModal
        setModalShow={setModalShow}
        modalShow={modalShow}
        winerDetails={winerDetails}
      />
    </div>
  );
}

export default Classic_content;
