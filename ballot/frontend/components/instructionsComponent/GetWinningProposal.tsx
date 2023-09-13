import { Button, Input, Typography } from "@mui/joy";
import { useState } from "react";
import { backendBaseUrl } from "@/app/constants";

export function GetWinningProposal() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

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
        <Button
          disabled={isLoading}
          variant="solid"
          onClick={async () => {
            setLoading(true);
            fetch(`${backendBaseUrl}/winning-proposal/:${address}`)
              .then((res) => res.json())
              .then((data) => {
                setData(data);
                setLoading(false);
              });
          }}
        >
          Get winning proposal🏆
        </Button>
      </div>
    );

  return (
    <div>
      <Typography level="h4" textAlign={"center"}>
        Winning proposal name: {data.proposalName}
      </Typography>
      <Typography level="h4" textAlign={"center"}>
        Winning proposal votes: {data.votesCount}
      </Typography>
    </div>
  );
}