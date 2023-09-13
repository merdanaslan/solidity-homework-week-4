import React from 'react';
import { useEffect, useState } from "react";
import styles from "./instructionsComponent.module.css";
import { useAccount, useBalance, useContractRead, useNetwork } from "wagmi";
import Address from "./address";
import ChainName from "./chainName";
import { SignMessage } from "./SignMessage";
import { RequestTokensToBeMinted } from "./RequestTokensToBeMinted";
import { GetWinningProposal } from "./GetWinningProposal";
import { VoteProposal } from "./VoteProposal";
import { GrantRole } from "./GrantRole";
import { MintTokenToAddress } from "./MintTokenToAddress";
import { DelegateVotes } from "./DelegateVotes";
import { InputList } from "./InputList";
import { backendBaseUrl } from "@/app/constants";

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1 style={{ color: 'black' }}>Tokenized Ballot!</h1>
      <div>
        <button
          style={{
            backgroundColor: 'green',
            color: 'white',
            borderRadius: '50%',
            width: '150px',
            height: '150px',
            fontSize: '24px',
            margin: 'auto',
            display: 'block',
            marginBottom: '20px',
          }}
        >
          Request Mint Tokens
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Token Contract Address"
          style={{ width: '300px', height: '40px' }}
        />
        <input
          type="text"
          placeholder="Grant Role to Address"
          style={{ width: '300px', height: '40px', marginTop: '10px' }}
        />
        <br />
        <button
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '100px',
            height: '40px',
            fontSize: '16px',
            marginTop: '10px',
          }}
        >
          Grant Role
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Amount of Votes"
          style={{ width: '300px', height: '40px', marginTop: '20px' }}
        />
        <br />
        <button
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '100px',
            height: '40px',
            fontSize: '16px',
            marginTop: '10px',
          }}
        >
          Mint to Address
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Token Contract Address"
          style={{ width: '300px', height: '40px', marginTop: '20px' }}
        />
        <input
          type="text"
          placeholder="Delegate Votes to Address"
          style={{ width: '300px', height: '40px', marginTop: '10px' }}
        />
        <br />
        <button
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '100px',
            height: '40px',
            fontSize: '16px',
            marginTop: '20px',
          }}
        >
          Delegate
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Proposal 0"
          style={{ width: '300px', height: '40px', marginTop: '20px' }}
        />
        <input
          type="text"
          placeholder="Proposal 1"
          style={{ width: '300px', height: '40px', marginTop: '10px' }}
        />
        <input
          type="text"
          placeholder="Proposal 2"
          style={{ width: '300px', height: '40px', marginTop: '10px' }}
        />
        <br />
        <button
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '100px',
            height: '40px',
            fontSize: '16px',
            marginTop: '20px',
          }}
        >
          Deploy
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Contract Address"
          style={{ width: '300px', height: '40px', marginTop: '20px' }}
        />
        <input
          type="text"
          placeholder="Proposal Number"
          style={{ width: '300px', height: '40px', marginTop: '10px' }}
        />
        <input
          type="text"
          placeholder="Amount of Votes"
          style={{ width: '300px', height: '40px', marginTop: '10px' }}
        />
        <br />
        <button
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '100px',
            height: '40px',
            fontSize: '16px',
            marginTop: '20px',
          }}
        >
          Vote
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Contract Address"
          style={{ width: '300px', height: '40px', marginTop: '20px' }}
        />
        <br />
        <button
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '100px',
            height: '40px',
            fontSize: '16px',
            marginTop: '10px',
          }}
        >
          Winning Proposal
        </button>
      </div>
    </div>
  );
};

export default App;
