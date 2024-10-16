import { Typography, Stack } from "@mui/material";
import { styled, useThemeProps, createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import * as React from 'react';
import { OverridesStyleRules } from "@mui/material/styles/overrides";
import Product from '../models/productModel';
import { useRouter } from 'next/navigation'

export interface ProductPreviewProps {
    product: Product;
}

export interface ItemPreviewProps {
    product: Product;
}

type ItemPreviewClassKey = "blue" | "purple";

declare module "@mui/material/styles" {
    interface Components {
        ItemPreview?: {
        // defaultProps?: ItemPreviewProps;
        styleOverrides?: Partial<
          OverridesStyleRules<ItemPreviewClassKey, "ItemPreview", Theme>
        >;
      };
    }
}

export function SimpleItemPreview({ product }: {product: Product }) {
    const router = useRouter()
    // variable only to set the background during development and testing
    let BackgroundImageURL: string;
    if (product.productType.includes('Skirts')) { BackgroundImageURL = "https://media.istockphoto.com/id/1089326536/photo/horizontal-cropped-image-of-stylish-slim-woman-in-beautiful-yellow-skirt-caucasian-female.jpg?s=1024x1024&w=is&k=20&c=pojdrr2t_2JRhGczoAS66P2JLn65d__9FN_Dhscnwm0="}
    if (product.productType.includes('Pants')) { BackgroundImageURL = "https://media.istockphoto.com/id/1221134337/photo/front-views-black-trousers.jpg?s=1024x1024&w=is&k=20&c=rVKYfysfiwgAWdVY5d0PXcy_RQHtRtxwNQMe365kVac="}
    if (product.productType.includes('Shirts')) { BackgroundImageURL = "https://i.etsystatic.com/27918564/r/il/63e701/3281550374/il_794xN.3281550374_8cmm.jpg"}
    if (product.productType.includes('Shoes')) { BackgroundImageURL = "https://media.istockphoto.com/id/1189775398/photo/wardrobe-order.jpg?s=1024x1024&w=is&k=20&c=gkooE8BGwECY2DvTPOj6BR85cpIna5h1AVlPuOH7UlM="}
    if (product.productType.includes('Jacket/Blazer')) { BackgroundImageURL = "https://media.istockphoto.com/id/1152838910/photo/male-dark-blue-blazer-on-isolated-background.jpg?s=1024x1024&w=is&k=20&c=kXvTrgkvlSm7ZfIv99wE-fmj3bW36LGb2uG8HGPkWxM="}
    if (product.productType.includes('Dress')) { BackgroundImageURL = "https://media.istockphoto.com/id/1440977634/photo/vertical-shot-of-the-beautiful-pink-dress-isolated-on-the-white-background.jpg?s=1024x1024&w=is&k=20&c=9ssDBqQ4ZXiOk26XzSAy84N3GW0IWUAbWQRKBnb3Cvw="}
    if (product.productType.includes('Suits')) { BackgroundImageURL = "https://c7.alamy.com/comp/C5J128/suits-on-the-rack-isolated-on-white-C5J128.jpg"}
    if (product.productType.includes('Casual Wear')) { BackgroundImageURL = "https://media.istockphoto.com/id/1314274760/photo/sport-pants.jpg?s=1024x1024&w=is&k=20&c=2KOUwWbbErCpdCDKvorVkV7_-BSSYX_E6vX6CjGTFh4="}
    if (product.productType.includes('Accessories')) { BackgroundImageURL = "https://media.istockphoto.com/id/531786318/photo/top-view-of-female-fashion-accessories.jpg?s=1024x1024&w=is&k=20&c=9sBort3zBYN8iUuRnxt2XqS5NX4WEkfhk5gBLUv7oTc="}

    const ItemPreviewContainer = styled('div', {
        name: 'ItemPreview',
        slot: 'container',
        })(({ theme }) => {
            return {height: 175, 
                    width: 175, 
                    minWidth: 175, 
                    color: 'black',
                    backgroundImage: `url(${BackgroundImageURL})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'whitesmoke',
                    cursor: 'pointer',
                    borderRadius: 5
                }
          });
    
    const ItemPreviewContent = styled('div', {
    name: 'ItemPreview',
    slot: 'container',
    })(({ theme }) => {
        return {height: '100%', 
                width: '100%', 
                padding: 12,
                overflowX: 'hidden',
                opacity: 0,
                borderRadius: 5,
                '&:hover': {
                    opacity: 1,
                    backgroundColor: '#3f50b588',
                }
            }
        });
    
    const ItemPreview = React.forwardRef<HTMLDivElement, ItemPreviewProps>(
        function ItemPreview(inProps, ref) {
            const props = useThemeProps({ props: inProps, name: 'ItemPreview' });
            const {product, ...other } = props;
            console.log(product)
            return (
                    <ItemPreviewContainer onClick={() => router.push(`/category-page/${encodeURIComponent(product.productType[0])}/products/${product._id}`)}>
                        <ItemPreviewContent>
                            {product.productType.includes('Shoes') && 
                                <Stack alignItems='flex-start' px={2}>
                                    <Typography variant="h5" color="white">Size: {product.productSizeShoe}</Typography>
                                </Stack>}
                            {(product.productType.includes('Pants') ||
                             product.productType.includes('Skirts')) && 
                                <Stack alignItems='flex-start' px={2}>
                                    <Typography variant="h5" color="white">W {product.productSizePantsWaist}</Typography>
                                    <Typography variant="h5" color="white">L {product.productSizePantsInseam}</Typography>
                                </Stack>}
                            {!product.productType.includes('Pants') && 
                             !product.productType.includes('Shoes') &&
                             !product.productType.includes('Accessories') &&
                             !product.productType.includes('Skirts') &&
                                <Stack alignItems='flex-start' px={2}>
                                    <Typography variant="h5" color="white">Size:  {product.productSizes[0]}</Typography>
                                </Stack>}
                        </ItemPreviewContent>
                    </ItemPreviewContainer>
            );
    },
    );
    
    const theme = createTheme({
        components: {
            ItemPreview: {
                styleOverrides: {
                    blue: {
                        padding: 16,
                        '&:hover': {
                            opacity: 1,
                            backgroundColor: '#99f',
                        },
                    },
                    purple: {
                        borderColor: "purple"
                    }
                }
            }
        }
    });
    return (
      <ThemeProvider theme={theme}>
        <ItemPreview product={product}/>
      </ThemeProvider>
    );
  }