import Image from "next/image";
import { useTheme } from "@mui/material";

// Categories list
export const categories = [
  { id: "shirt", title: "Shirts", alt: "Shirt category image" },
  { id: "shoe", title: "Shoes", alt: "Shoe category image" },
  { id: "pants", title: "Pants", alt: "Pants category image" },
  { id: "skirt", title: "Skirts", alt: "Skirt category image" },
  { id: "suit", title: "Suits", alt: "Suit category image" },
  { id: "dress", title: "Dress", alt: "Dress category image" },
  { id: "casual", title: "Casual Wear", alt: "Casual Wear category image" },
  { id: "accessories", title: "Accessories", alt: "Accessories category image" },
  { id: "jacket", title: "Jacket/Blazer", alt: "Jacket/Blazer category image" },
];

// Category component
export function Category({
  id,
  title,
  alt,
}: {
  id: string;
  title: string;
  alt: string;
}) {
  const { palette } = useTheme();
  const darkImagePath = `/categories-images/dark-images/${id}.png`;
  const lightImagePath = `/categories-images/light-images/${id}.png`;

  // Check the current theme mode and set the image path accordingly
  const imagePath = palette.mode === "dark" ? lightImagePath : darkImagePath;
  return (
    <Image src={imagePath} title={title} alt={alt} width={100} height={100} />
  );
}

// CategoryImages component
export function CategoryImages() {
  return (
    <div>
      {categories.map((category, index) => (
        <Category
          key={index}
          id={category.id}
          title={category.title}
          alt={category.alt}
        />
      ))}
    </div>
  );
}
