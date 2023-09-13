import { Button, Textarea } from "@mui/joy";
import { useEffect, useState } from "react";
import { useSignMessage } from "wagmi";
export function SignMessage() {
  const [signatureMessage, setSignatureMessage] = useState<any>("");
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage();
  useEffect(() =>{
    if(isSuccess && !isLoading){
      setSignatureMessage(data);
    }
  },[isSuccess])
  useEffect(() =>{
    if(isError){
      setSignatureMessage("Error signing message");
    }
  },[isError])
  return (
    <div>
      <Textarea
        minRows={5}
        value={signatureMessage}
        onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setSignatureMessage(e.target.value)}
      />
      <Button
       sx={{ my: 1 }}
         variant="solid"
        disabled={isLoading}
        onClick={() =>
          signMessage({
            message: signatureMessage,
          })
        }
      >
        Sign message
      </Button>
    </div>
  );
}