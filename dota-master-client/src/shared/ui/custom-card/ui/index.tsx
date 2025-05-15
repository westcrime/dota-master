import { Card, CardContent } from "@mui/material";
import { ReactNode } from "react";

interface CustomCardProps {
  children: ReactNode;
}

const CustomCard = ({ children }: CustomCardProps) => {
  return (
    <Card
      sx={{
        p: 2,
        m: 0,
        borderRadius: 2,
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export { CustomCard };
