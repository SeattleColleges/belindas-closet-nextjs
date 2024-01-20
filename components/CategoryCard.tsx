import { StaticImageData } from "next/image";
import React from "react";
import {useNavigate} from 'react-router-dom';
import Image from "next/image";

// TODO: CHANGE types to match final DB
type CategoryCardProps = {
    title: string;
    image: StaticImageData;
    onCardClick: ()=>void;
};

const CategoryCard: React.FC<CategoryCardProps> =({title, image, onCardClick})=>{
    return (
        <div tabIndex={0} className="px-4 py-2 border-4 border-gray-300 rounded-md hover:border-blue-500 focus:outline-none focus:border-blue-500" onClick={onCardClick}>
            <Image src={image} alt={title+" Category Image"} className="w-full"/>
            <div className="px-6 py-4">
                <p className="font-bold text-xl mb-2 text-white">{title}</p>
            </div>
        </div>
    )
}

export default CategoryCard;