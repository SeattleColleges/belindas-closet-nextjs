import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { StaticImageData } from "next/image";
import { Stack, Button, Link } from "@mui/material";
import Image from "next/image";

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
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="contained"
                href={href}
                startIcon={<Link />}
                color="primary"
              >
                View
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
