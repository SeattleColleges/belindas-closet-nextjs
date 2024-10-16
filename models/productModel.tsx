import { StaticImageData } from "next/image";

interface Product {
    _id: string;
    productImage: string;
    productType: string[];
    productGender: string;
    productSizeShoe: string;
    productSizes: string;
    productSizePantsWaist: string;
    productSizePantsInseam: string;
    productDescription: string;
    isHidden: Boolean;
    isSold: Boolean;
    createdAt: string;
 }

export default Product