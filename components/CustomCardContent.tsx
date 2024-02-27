import Image, { StaticImageData } from "next/image";
import React from "react";
import { CardActionArea, Typography } from '@mui/material';
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
                <Image src={image} alt="logo" style={{width: 128, height: 128, display: 'block', margin: 'auto'}} />
                <Typography variant='h5' align='center' mt={2}>
                    {title}
                </Typography>
            </CardContent>
        </CardActionArea>
    )
}

export default CustomCardContent;