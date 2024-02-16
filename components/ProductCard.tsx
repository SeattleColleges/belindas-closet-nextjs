import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import Link from 'next/link';
import styles from '../app/category-page/[categoryId]/page.module.css'; // Import style from category page

type ProductCardProps = {
    image: StaticImageData;
    categories: string[];
    description: string;
    href: string; 
};

const ProductCard: React.FC<ProductCardProps> = ({ image, categories, description, href }) => {
    return (
        <Link href={href} passHref>
            <div tabIndex={0} className={`product-card-container cursor-pointer px-4 py-2 border-4 border-gray-300 rounded-md hover:border-blue-500 focus:outline-none focus:border-blue-500 w-1/4 ${styles.product}`}>
                <Image src={image} alt={`Image for ${categories.join(', ')}`} width={200} height={200} layout="responsive" />
                <div className="py-4" style={{ flexGrow: 1 }}>
                    <p className="font-bold text-l mb-2 text-white h-8 truncate text-center">{categories.join(', ')}</p>
                    <p className="text-sm text-gray-200 text-center" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;