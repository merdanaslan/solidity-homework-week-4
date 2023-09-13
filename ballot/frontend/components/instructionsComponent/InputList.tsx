import { useState } from "react";
import { getRequestOptionsTokenizedBallot } from ".";
import { Button, ButtonGroup, Input, Typography } from "@mui/joy";
import { EventChange } from "./typeEvents";
import { backendBaseUrl } from "@/app/constants";
export function InputList() {
  const [proposals, setProposals] = useState([""]);
  const [data, setData] = useState<any>(null);
  const [address, setAddress] = useState("");

  function handleInputChange(index: number, value: string) {
    const newInputs = [...proposals];
    newInputs[index] = value;
    setProposals(newInputs);
  }

  const handleAddInput = () => {
    setProposals([...proposals, ""]);
  };

  const handleRemoveInput = (index: number) => {
    const newInputs = [...proposals];
    newInputs.splice(index, 1);
    setProposals(newInputs);
  };

  if (!data)
    return (
      <div>
        {proposals.map((input, index) => (
          <div key={index}>
            <Input
              sx={{ my: 1 }}
              color="primary"
              size="md"
              variant="outlined"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Proposal ${index}`}
              endDecorator={
                <Button onClick={() => handleRemoveInput(index)} color="danger">
                  X
                </Button>
              }
            />
          </div>
        ))}
        <ButtonGroup variant="solid">
          <Button color="success" onClick={handleAddInput}>
            Add Input
          </Button>
          <Button
            color="primary"
            onClick={() => {
              fetch(
                `${backendBaseUrl}/deploy-ballot`,
                getRequestOptionsTokenizedBallot(proposals)
              )
                .then((res) => res.json())
                .then((data) => {
                  setData(data);
                });
            }}
          >
            Deploy contract
          </Button>
        </ButtonGroup>
      </div>
    );

  return (
    <div>
      <Typography level="h4" textAlign={"center"}>
        Tokenized Ballot Deployed: {data.success ? "Worked" : "Failed"}
      </Typography>
      <Typography level="h4" textAlign={"center"}>
        Contract address: {data.address}
      </Typography>
    </div>
  );
}