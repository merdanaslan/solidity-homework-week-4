import { useState } from "react";
import { getRequestOptions } from ".";
import { Button, Input, Typography } from "@mui/joy";
import { EventChange } from "./typeEvents";
import { backendBaseUrl } from "@/app/constants";
import { useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { parseEther } from "viem";

function getMinterRole(tokenAddress: string) {
  const { data, isError, isLoading } = useContractRead({
    address: tokenAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "MINTER_ROLE",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
    ],
    functionName: "MINTER_ROLE",
  });

  const minterRole = data;

  return { minterRole };
}

export function GrantRole() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [addressToGrant, setAddressToGrant] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  const {minterRole} = getMinterRole(tokenAddress);

  const {config} = usePrepareContractWrite({
    address: tokenAddress as `0x${string}`,
    abi: [
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
    functionName: 'grantRole',
    args: [minterRole, addressToGrant],
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
          value={addressToGrant}
          onChange={(e: EventChange) => {
            return setAddressToGrant(e.target.value);
          }}
          placeholder="Grant role to this address:"
        />
        <Button
          variant="solid"
          disabled={isLoading}
          onClick={() => {
            write?.();
          }}
        >
          {isLoading ? "Requesting tokens from API..." : "Grant Role"}
        </Button>
      </div>
    );

  return (
    <div>
      <Typography level="h4" textAlign={"center"}>
        Role granted: {data.success ? "Worked" : "Failed"}
      </Typography>
      <Typography level="h4" textAlign={"center"}>
        Transaction Hash: {data.txHash}
      </Typography>
    </div>
  );
}