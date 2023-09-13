import { Typography } from "@mui/joy";
import { useEffect, useState } from 'react';

type Props = {
  name: string;
};
export default function ChainName(props: Props) {const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && (
    <Typography level="title-sm">
      Connected to the network {props.name}
    </Typography>
  );
}