import { Typography } from "@mui/joy";
import { useEffect, useState } from 'react';

type Props = {
  address: `0x${string}`;
};
export default function Address(props: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && (
    <Typography level="title-sm">
      Your account address is:&nbsp;
      {props.address}
    </Typography>
  );
}