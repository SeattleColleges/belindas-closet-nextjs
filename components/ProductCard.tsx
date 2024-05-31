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
// WARNING: You won't be able to connect to local backend unless you remove the env variable below.
const URL =
  process.env.BELINDAS_CLOSET_PUBLIC_API_URL || "http://localhost:3000/api";

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
  _id: string;
  isHidden: boolean;
  isSold: boolean;
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
  _id,
}: ProductCardProps) {
  const [userRole, setUserRole] = React.useState("");

  const token = localStorage.getItem("token"); // get token from local storage
  React.useEffect(() => {
    if (token) {
      const role = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(role);
    }
    // testing what role is returned via console log -- delete later
    console.log(userRole);
  }, [token, userRole]);

  // delete product function -----------------------------------
  const handleDelete = async () => {
    try {
      const response = await fetch(`${URL}/products/remove/${_id}`, {
        // delete API uses DELETE method
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // pass token to the server
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log(`Successful delete the product with id: ${_id}`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    window.location.reload();
  };

  // archive product function -----------------------------------------
  const handleArchive = async () => {
    try {
      const response = await fetch(`${URL}/products/archive/${_id}`, {
        // archive API uses PUT method
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // pass token to the server
        },
      });
      console.log("Product archived successfully!");
    } catch (error) {
      console.error("Error archiving product:", error);
    }
    window.location.reload();
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
      }}
    >
      <Grid container spacing={2} justifyContent="center">
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
      <Stack direction="column" spacing={2} justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          href={href}
          color="primary"
          sx={{ minWidth: 30, maxWidth: "215px" }}
        >
          View
        </Button>

        {userRole === "admin" || userRole === "creator" ? (
          <Stack direction="row" spacing={2}>
            {/* TODO: Add delete function to this button  */}
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => handleDelete()}
              sx={{ fontSize: 10 }}
            >
              Delete
            </Button>
            {/* TODO: Add archive function to this button  */}
            <Button
              variant="contained"
              startIcon={<ArchiveIcon />}
              color="warning"
              onClick={() => handleArchive()}
              sx={{ fontSize: 10 }}
            >
              Archive
            </Button>
          </Stack>
        ) : null}
      </Stack>
    </Paper>
  );
}
