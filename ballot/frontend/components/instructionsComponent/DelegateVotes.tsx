import { useState } from "react";
import { getRequestOptions } from ".";
import { Button, Input, Typography } from "@mui/joy";
import { EventChange } from "./typeEvents";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { parseEther } from "viem";

export function DelegateVotes() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [delegatee, setDelegatee] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  const {config} = usePrepareContractWrite({
    address: tokenAddress as `0x${string}`,
    abi: [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "delegatee",
            "type": "address"
          }
        ],
        "name": "delegate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    functionName: 'delegate',
    args: [delegatee],
    value: parseEther('0')
  });
  const {write} = useContractWrite(config);

  if (!data)
    return (
      <div>
        <Input
          sx={{ my: 1 }}
          color="primary"
          size="md"
          variant="outlined"
          value={tokenAddress}
          onChange={(e: EventChange) => {
            return setTokenAddress(e.target.value);
          }}
          placeholder="Token Contract Address:"
        />
        <Input
          sx={{ my: 1 }}
          color="primary"
          size="md"
          variant="outlined"
          value={delegatee}
          onChange={(e: EventChange) => {
            return setDelegatee(e.target.value);
          }}
          placeholder="Delegate Votes to this address:"
        />
        <Button
          disabled={isLoading}
          variant="solid"
          onClick={() => {
            write?.();
          }}
        >
          {isLoading ? "Requesting tokens from API..." : "Delegate"}
        </Button>
      </div>
    );
}