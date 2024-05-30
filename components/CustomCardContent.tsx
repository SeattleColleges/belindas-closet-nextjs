import React from "react";
import { CardActionArea, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import CardContent from "@mui/material/CardContent";
import { Category } from "./CategoryImages";

type CategoryCardProps = {
  id: string;
  title: string;
  alt: string;
};

const CustomCardContent: React.FC<CategoryCardProps> = ({ id, title, alt }) => {
const router = useRouter();
const navigate = () => {
    const encodedCategoryId = encodeURIComponent(title); //sanitize item name for route
    router.push(`/category-page/${encodedCategoryId}`);
};
return (
    <CardActionArea onClick={() => navigate()}>
        <CardContent>
            <Category id={id} title={title} alt={alt} />
            <Typography variant="h5" align="center" gutterBottom>
                {title}
            </Typography>
        </CardContent>
    </CardActionArea>
);
};

export default CustomCardContent;
