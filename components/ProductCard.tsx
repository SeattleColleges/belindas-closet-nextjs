"use client";

import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import {StaticImageData} from "next/image";
import {Stack, Button, Link, useTheme, useMediaQuery, IconButton, Box} from "@mui/material";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;

type ProductCardProps = {
    image: StaticImageData | string;
    categories: string;
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
    showArchiveButton?: boolean; // optional
    deleteItem?: any;
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
                                        isHidden,
                                        isSold,
                                        showArchiveButton,
                                        deleteItem,
                                    }: ProductCardProps) {
    const [userRole, setUserRole] = React.useState("");
    const [isFavorite, setIsFavorite] = React.useState(false);
    const theme = useTheme();

    const token = localStorage.getItem("token"); // get token from local storage
    React.useEffect(() => {
        if (token) {
            const userRole = JSON.parse(atob(token.split(".")[1])).role;
            setUserRole(userRole);
        }
    }, [token]);

    const handleDelete = async () => {
        try {
            const res = await fetch(`${URL}/products/remove/${_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ isHidden: Boolean }),
            });
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            window.location.reload();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleArchive = async () => {
        try {
            const res = await fetch(`${URL}/products/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    isSold: true,
                }),
            });
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            window.location.reload();
        } catch (error) {
            console.error("Error archiving product:", error);
        }
    };

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        // TODO: Add API call to save favorite status
    };

    function HeartButton() {
        return (
            <IconButton
                onClick={handleFavoriteClick}
                sx={{
                    padding: 0.5,
                    "&:hover": {
                        bgcolor: 'rgba(0,0,0,0.04)',
                    },
                }}
            >
                {isFavorite ? (
                    <FavoriteIcon sx={{color: "error.main", fontSize: 20}}/>
                ) : (
                    <FavoriteBorderIcon sx={{fontSize: 20}}/>
                )}
            </IconButton>
        )
    }

    return (
        <Paper
            sx={{
                p: 0,
                margin: "auto",
                maxWidth: 500,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",   
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }
            }}
        >
            {/* Product Image */}
            <Link href={href} style={{textDecoration: 'none'}}>
                <Box sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '100%', // 1:1 Aspect ratio
                }}>
                    <Image
                        src={image}
                        alt={categories}
                        fill
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </Box>

                {/* Product Info */}
                <Box sx={{p: 2}}>
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            mb: 0.5,
                            color: 'text.primary',
                        }}
                    >
                        {categories}
                    </Typography>
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontStyle: 'italic',
                            color: 'text.secondary',
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                        }}
                    >
                        {description}
                    </Typography>
                </Box>
            </Link>

            {/* Bottom Actions Bar */}
            <Box sx={{
                p: 2,
                mt: 1,
                pt: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* Favorite Icon */}
                <Box
                    sx={{
                        bgcolor: theme.palette.background.paper,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        color: theme.palette.primary.contrastText,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 1,
                        borderRadius: 1
                    }}
                >
                    {userRole ? <HeartButton /> : <Link href={'/auth/sign-in'}><HeartButton /></Link>}
                </Box>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            height: "100%",
                            opacity: 0,
                            transition: 'opacity 0.2s ease-in-out',
                            '.MuiPaper-root:hover &': {
                                opacity: 1
                            }
                        }}
                    >
                        {/* Admin Controls - Only visible for admin/creator */}
                        {(userRole === "admin" || userRole === "creator") && (
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<DeleteIcon sx={{ fontSize: 24 }}/>}
                                color="error"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        )}
                        {showArchiveButton && (
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<ArchiveIcon/>}
                                color="warning"
                                onClick={handleArchive}
                            >
                                Archive
                            </Button>
                        )}
                    </Stack>

            </Box>
        </Paper>
    );
}
