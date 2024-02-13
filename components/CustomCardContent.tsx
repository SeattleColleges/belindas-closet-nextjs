import Image, { StaticImageData } from "next/image";
import React from "react";
import { CardActionArea, Typography, CardHeader } from '@mui/material';
import { useRouter } from "next/navigation";
import CardContent from '@mui/material/CardContent';

// TODO: CHANGE types to match final DB
type CategoryCardProps = {
    title: string;
    image: StaticImageData;
};

const CustomCardContent: React.FC<CategoryCardProps> =({title, image})=>{
    const router = useRouter();
    const navigate=()=>{
        const encodedCategoryId = encodeURIComponent(title); //sanitize item name for route
        router.push(`/category-page/${encodedCategoryId}`);
    }
    return (
        <CardActionArea onClick={() => navigate()}>
            <CardContent>
                <Image src={image} alt="logo" style={{width: "100%"}} />
                <Typography variant='h5' align='center' gutterBottom>
                    {title}
                </Typography>
            </CardContent>
        </CardActionArea>
    )
}

export default CustomCardContent;