import React, { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditUserDetailsDialog from "./EditUserDetailsDialog";

export interface CurrentUserCardProps {
  firstName: string;
  lastName: string;
  email: string;
  pronoun: string;
}

function CurrentUserCard({ user }: { user: CurrentUserCardProps }) {
  return (
    <Container
      fixed
      maxWidth="lg"
      sx={{
        border: 1,
        borderRadius: 1,
        borderColor: "ccc",
        padding: 2,
        margin: 2,
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        alignItems="flex-start"
        justifyContent="center"
      >
        <Typography variant="body1" gutterBottom align="left">
          First name: {user.firstName}
        </Typography>
        <Typography variant="body1" gutterBottom align="left">
          Last Name: {user.lastName}
        </Typography>
        <Typography variant="body1" gutterBottom align="left">
          Email: {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom align="left">
          Pronouns: {user.pronoun}
        </Typography>
      </Stack>
    </Container>
  );
}
export default CurrentUserCard;
