import { Button, Typography } from "@mui/joy";
import { useState } from "react";
import { backendBaseUrl } from "@/app/constants";

export function RequestTokensToBeMinted(params: { address: `0x${string}` }) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: params.address }),
  };
  if (!data)
    return (
      <Button
        disabled={isLoading}
        onClick={() => {
          setLoading(true);
          fetch(`${backendBaseUrl}/mint-tokens`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
              setData(data);
              setLoading(false);
            });
        }}
      >
        {isLoading ? "Requesting tokens from API..." : "   Request mint tokens"}
      </Button>
    );

  return (
    <div>
      <Typography level="h4" textAlign={"center"}>
        Mint success: {data.success ? "Worked" : "Failed"}
      </Typography>
      <Typography level="h4" textAlign={"center"}>
        Transaction Hash: {data.txHash}
      </Typography>
    </div>
  );
}