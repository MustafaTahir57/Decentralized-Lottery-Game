import React from "react";

function How() {
  return (
    <div className="">
      <div className="container mt-5">
        <div className="d-flex flex-column mt-4">
          <span style={{fontWeight: "700"}}>
            <b>Q1:</b> What is Contractgame?
          </span>
          <span className="mt-2">
            <b>A1:</b> Contractgame is a decentralized lottery platform where
            users can buy tickets to participate in a lottery, with a random
            winner selected to receive a reward pool.
          </span>
        </div>
        <div className="d-flex flex-column mt-4">
          <span style={{fontWeight: "700"}}>
            <b>Q2:</b> How do I join Contractgame?
          </span>
          <span className="mt-2">
            <b>A2:</b> To join Contractgame, you need to connect your Ethereum
            wallet to the platform. Visit the Contractgame website, click on the
            "Connect Wallet" button, and follow the instructions to link your
            wallet.
          </span>
        </div>
        <div className="d-flex flex-column mt-4">
          <span style={{fontWeight: "700"}}>
            <b>Q3:</b> How do I buy lottery tickets on Contractgame?
          </span>
          <span className="mt-2">
            <b>A3:</b> Once your wallet is connected, you can buy lottery
            tickets by selecting the number of tickets you want to purchase and
            sending the required amount of BNB. The ticket price is displayed on
            the site, and you can use the "Buy Tickets" button to complete your
            purchase.
          </span>
        </div>
        <div className="d-flex flex-column mt-4">
          <span style={{fontWeight: "700"}}>
            <b>Q4:</b> How is the BNB/USD price retrieved?
          </span>
          <span className="mt-2">
            <b>A4:</b> The BNB/USD price is retrieved from an oracle
            (AggregatorV3Interface) to ensure the ticket price in BNB is
            accurate and up to date.
          </span>
        </div>
        <div className="d-flex flex-column mt-4">
          <span style={{fontWeight: "700"}}>
            <b>Q5:</b> How is the winner chosen?
          </span>
          <span className="mt-2">
            <b>A5:</b> The winner is chosen randomly using Chainlink VRF
            (Verifiable Random Function). The pickWinner function requests
            random words, and once the randomness is fulfilled, a winner is
            picked based on the random number generated.
          </span>
        </div>
        <div className="d-flex flex-column mt-4">
          <span style={{fontWeight: "700"}}>
            <b>Q6:</b> What happens after a winner is picked?
          </span>
          <span className="mt-2">
            <b>A6:</b> After a winner is picked, 95% of the reward pool is
            transferred to the winner, and 5% is transferred to the contract
            owner. The ticket and player arrays are then reset for the next
            round.
          </span>
        </div>
        <div className="d-flex flex-column mt-4">
          <span style={{fontWeight: "700"}}>
            <b>Q7:</b> What happens if the minimum number of players is not
            reached?
          </span>
          <span className="mt-2">
            <b>A7:</b> If the minimum number of players (defined by miniPlayers)
            is not reached, the lottery will not proceed to pick a winner. The
            countdown timer for the round starts only when the minimum number of
            players is met.
          </span>
        </div>
        <div className="d-flex flex-column mt-4">
          <span style={{fontWeight: "700"}}>
            <b>Q8:</b> Is there a limit to the number of tickets I can buy?
          </span>
          <span className="mt-2">
            <b>A8:</b> There is no strict limit to the number of tickets you can
            buy per round, but each ticket requires the specified amount of BNB.
            You can buy as many tickets as you wish, subject to your BNB
            balance.
          </span>
        </div>
        <div className="d-flex flex-column mt-4">
          <span style={{fontWeight: "700"}}>
            <b>Q9:</b> How often can I participate in the lottery?
          </span>
          <span className="mt-2">
            <b>A9:</b> You can participate in every round of the lottery. Each
            round is independent, and you can buy tickets for multiple rounds as
            long as you meet the entry requirements.
          </span>
        </div>
        <div className="d-flex flex-column mt-4">
          <span style={{fontWeight: "700"}}>
            <b>Q10:</b> Can I see the details of each round?
          </span>
          <span className="mt-2">
            <b>A10:</b> Yes, you can view the details of each round, including
            the total reward pool, number of tickets sold, and the winner's
            address on the Contractgame website. This information is updated in
            real-time and is available in the "History" section.
          </span>
        </div>
        <div className="d-flex flex-column mt-4">
          <span style={{fontWeight: "700"}}>
            <b>Q11:</b> How do I know if I've won the lottery?
          </span>
          <span className="mt-2">
            <b>A11:</b> If you win, your address will be displayed on the
            Contractgame website. Additionally, your wallet will automatically
            receive the reward amount if you are the winner. and also show
            winner data in History page.
          </span>
        </div>
      </div>
    </div>
  );
}

export default How;
