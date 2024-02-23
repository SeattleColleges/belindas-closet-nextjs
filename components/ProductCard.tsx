import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { StaticImageData } from "next/image";
import { Stack, Button, Link } from "@mui/material";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";

type ProductCardProps = {
  image: StaticImageData;
  categories: string[];
  gender: string;
  sizeShoe: string;
  sizePantsWaist: string;
  sizePantsInseam: string;
  size: string;
  description: string;
  href: string;
};
export default function ProductCard({
  image,
  categories,
  gender,
  sizeShoe,
  size,
  sizePantsWaist,
  sizePantsInseam,
  description,
  href,
}: ProductCardProps) {
  const [userRole, setUserRole] = React.useState("");

  // Get user role from token
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(role);
    }
  }, []);
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase>
            <Link href={href}>
              <Image
                src={image}
                alt="product image"
                style={{ width: 128, height: 128 }}
              />
            </Link>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {categories}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {gender}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {sizeShoe}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {size}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {sizePantsWaist}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {sizePantsInseam}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
        <Button variant="contained" href={href} color="primary">
          View
        </Button>
        {userRole === "admin" ||
          (userRole === "creator" && (
            <Stack direction="row" spacing={2}>
              {/* TODO: Add delete function to this button  */}
              <Button variant="contained" startIcon={<DeleteIcon />} color="error">
                Delete
              </Button>
              {/* TODO: Add archive function to this button  */}
              <Button variant="contained" startIcon={<ArchiveIcon />} color="warning">
                Archive
              </Button>
            </Stack>
          ))}
      </Stack>
    </Paper>
  );
}
