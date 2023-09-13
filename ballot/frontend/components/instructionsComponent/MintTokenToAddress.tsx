import { useState } from "react";
import { getRequestOptions } from ".";
import { Button, Input, Typography } from "@mui/joy";
import { EventChange } from "./typeEvents";
import { backendBaseUrl } from "@/app/constants";

export function MintTokenToAddress() {
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
          onChange={(e: EventChange) => setAddress(e.target.value)}
          placeholder="Amount of votes:"
        />
        <Button
          disabled={isLoading}
          variant="solid"
          onClick={() => {
            setLoading(true);
            fetch(
              `${backendBaseUrl}/mint-tokens`,
              getRequestOptions(address)
            )
              .then((res) => res.json())
              .then((data) => {
                setData(data);
                setLoading(false);
              });
          }}
        >
          {isLoading ? "Requesting tokens from API..." : "Mint to address"}
        </Button>
      </div>
    );

  return (
    <div>
      <Typography level="h4" textAlign={"center"}>
        Tokens minted: {data.success ? "Worked" : "Failed"}
      </Typography>
      <Typography level="h4" textAlign={"center"}>
        Transaction Hash: {data.txHash}
      </Typography>
    </div>
  );
}