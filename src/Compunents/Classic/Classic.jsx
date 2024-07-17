import React, { useEffect, useState } from "react";
import Box_profile from "../Box_profile/Box_profile";
import Classic_content from "../Classic_content/Classic_content";
import History from "../History/History";
import Web3 from "web3";
import { lotteryAbi, lotteryAddress } from "../../utils/lotteryContract";
function Classic({ connection, setUserName,userName }) {
  const [inputType, setInputType] = useState("Classic");
  const [winerDetails, setWinnerDetails] = useState(null);
  const [userMostTicketsDetails, setUserMostTicketsDetails] = useState(null);
  const [historyDetails, setHoistoryDetails] = useState([]);
  const [loading, setLoading] = useState(true);
const providerUrl = 'https://sepolia.infura.io/v3/045e3d0386824476a6198431b88d7b93';
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
  const integrateContract = () => {
    const lottery_Contract = new web3.eth.Contract(lotteryAbi, lotteryAddress);
    return lottery_Contract;
  };
  const lestWinner = async () => {
    try {
      const contract = integrateContract();
      let currentRound = await contract.methods.currentRound().call();
      currentRound = Number(currentRound);
      const getRoundData = await contract.methods
        .getRoundData(currentRound - 1)
        .call();
      let amount = Number(getRoundData.rewardPool_) / 1e18;
      amount = amount.toFixed(5);
      const object = {
        winnerAddress: getRoundData.winner_,
        amount: amount,
        roundNumber: Number(getRoundData.roundNumber_),
      };
      setWinnerDetails(object);

      // user Most ticket bet
      const getUserWithMostTickets = await contract.methods
        .getUserWithMostTickets()
        .call();
      let userMostTicketAmount = Number(getUserWithMostTickets.amount) / 1e18;
      userMostTicketAmount = userMostTicketAmount.toFixed(5);
      const userMostTicketObject = {
        winnerAddress: getUserWithMostTickets.userWithMostTickets,
        amount: userMostTicketAmount,
        roundNumber: "",
      };
      setUserMostTicketsDetails(userMostTicketObject);


      // const getLuckyUserOfTheDay = await contract.methods.getLuckyUserOfTheDay().call();
      // console.log("getLuckyUserOfTheDay", getLuckyUserOfTheDay);
    } catch (e) {
      console.log("e", e);
    }
  };

  const historyRecord = async () => {
    try {
      const contract = integrateContract();
      let currentRound = await contract.methods.currentRound().call();
      currentRound = Number(currentRound);
      let array = [];
      if (currentRound > 0) {
        for (let i = 1; i < currentRound; i++) {
          let getUsersData = await contract.methods.getUsersData(i).call();
          const getRoundData = await contract.methods.getRoundData(i).call();
          const winnerAddress = getRoundData.winner_;
          let amount = Number(getRoundData.rewardPool_) / 1e18;
          amount = amount.toFixed(3);
          const roundNumber = Number(getRoundData?.roundNumber_);
          const filteredUserData = getUsersData.filter(
            (user) => user.userAddress !== winnerAddress
          );

          const resultObject = {
            amount,
            roundNumber,
            winnerAddress,
            users: [],
          };
          filteredUserData?.forEach((element) => {
            let runerUpAmmount = Number(element.amount) / 1e18;
            const userDataObject = {
              runerUpAmmount: runerUpAmmount,
              runnerUpAddress: element?.userAddress,
            };
            resultObject.users.push(userDataObject);
          });
          array.push(resultObject);
        }
      }
      // console.log("array",array);
      setHoistoryDetails(array);
    } catch (e) {
      console.log("e", e);
    } finally {
      setLoading(false);
    }
  };
  const handleEmailClick = () => {
    setInputType("Classic");
  };

  const handleNumberClick = () => {
    setInputType("History");
  };
  useEffect(() => {
    lestWinner();
    historyRecord();
  }, []);
  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="row px-lg-5 px-2">
          <div className="col-12 col-lg-9">
            <div className=" bg_dark">
              <div className="card-body p-0">
                <div className="d-flex gap-3 bg-dark" style={{background:""}}>
                  <button onClick={handleEmailClick} className="btn text-white">
                    Contract Game
                  </button>
                  <button
                    onClick={handleNumberClick}
                    className="btn text-white"
                  >
                    History
                  </button>
                </div>
                <div className="">
                  {inputType === "Classic" && (
                    <div className="">
                      <Classic_content
                        connection={connection}
                        lestWinner={lestWinner}
                        historyRecord={historyRecord}
                        winerDetails={winerDetails}
                        setUserName={setUserName}
                        userName={userName}
                      />
                    </div>
                  )}

                  {inputType === "History" && (
                    <div className="">
                      <History
                        historyDetails={historyDetails}
                        loading={loading}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-12">
            <Box_profile
              winer="Last Winner"
              name="froxxy"
              winerDetails={winerDetails}
              backgroundColor="rgb(94, 92, 182)"
            />
            <Box_profile
              winer="Biggest Bet"
              name="Arslan"
              winerDetails={userMostTicketsDetails}
              backgroundColor="rgb(157, 86, 3)"

            />
            <Box_profile winer="Lucky of the day" name="Bilal"  backgroundColor="rgb(24, 157, 3)"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Classic;
