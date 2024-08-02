import Stack from "@mui/material/Stack";
import { Link, Typography } from "@mui/material";
import Image from "next/image";
import google_play from "@/public/belinda-images/google_play.png";
import sc_logo from "@/public/sc-logo.png";
import insta_logo from "@/public/insta-icon.png";

const styles = {
    mainDiv: {
        width: "100%",
        display: "flex",
        backgroundColor: 'primary.main',
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 3
    },
    leftDiv: {
        gap: 2
    },
    rightDiv: {
        justifyContent: 'end',
    },
    iconRow: {
        flexDirection: "row"
    }
  };

export default function Footer(){

    return(
        <Stack sx={styles.mainDiv}>
            <Stack color="white" sx={styles.leftDiv}>
                <Typography variant='h4' fontWeight={700}>
                    Belinda&apos;s Closet
                </Typography>
                <Link href='/donation-info' variant="h5" fontWeight={700} color="inherit" sx={{textDecoration: 'none'}}>
                    Make a Donation
                </Link>
                <Link href='/mission-page' variant="h5" fontWeight={700} color="inherit" sx={{textDecoration: 'none'}}>
                    Learn About Our Mission
                </Link>
                <Link href='/contact-page' variant="h5" fontWeight={700} color="inherit" sx={{textDecoration: 'none'}}>
                    Contact Us
                </Link>
            </Stack>
            <Stack sx={styles.rightDiv}>
                <Stack sx={styles.iconRow} gap={3}>
                <Link href='/'>
                    <Image src={google_play} alt="google_play" height={50} />
                </Link>
                <Link href='https://www.instagram.com/'>
                    <Image src={insta_logo} alt="instagram logo" height={50} />
                </Link>
                <Link href='https://northseattle.edu/edic/belindas-closet'>
                    <Image src={sc_logo} alt="seattle college's logo" height={50} />
                </Link>
                </Stack>
            </Stack>
        </Stack>
    )
}