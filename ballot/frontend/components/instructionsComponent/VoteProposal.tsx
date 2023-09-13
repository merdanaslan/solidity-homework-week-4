import { useState } from "react";
import { getRequestOptionsVote } from ".";
import { Button, Input, Typography } from "@mui/joy";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { parseEther } from "viem";

export function VoteProposal() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [amountOfVotes, setAmountOfVotes] = useState("");
  const [proposal, setProposal] = useState("");

  const {config} = usePrepareContractWrite({
    address: address as `0x${string}`,
    abi: [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "proposal",
            "type": "uint256",
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256",
          }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
    ],
    functionName: 'vote',
    args: [proposal, amountOfVotes],
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Ballot Contract address:"
        />
        <Input
          sx={{ my: 1 }}
          color="primary"
          size="md"
          variant="outlined"
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          placeholder="Proposal Number:"
        />
        <Input
          sx={{ my: 1 }}
          color="primary"
          size="md"
          variant="outlined"
          value={amountOfVotes}
          onChange={(e) => setAmountOfVotes(e.target.value)}
          placeholder="Amount of votes:"
        />
        <Button
         variant="solid"
          disabled={isLoading}
          onClick={async () => {
            setLoading(true);
            setLoading(false);
            write?.();
          }}
        >
           { isLoading ? 'Requesting tokens from API...' : 'Vote'}
        </Button>
      </div>
    );

  return (
    <div>
      <Typography level="h4" textAlign={"center"}>
        Voted: {data.success ? "Worked" : "Failed"}
      </Typography>
      <Typography level="h4" textAlign={"center"}>
        Transaction Hash: {data.txHash}
      </Typography>
    </div>
  );
}