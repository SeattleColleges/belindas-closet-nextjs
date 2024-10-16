import * as React from 'react';
import { styled, useThemeProps } from '@mui/material/styles';
import { useRouter } from 'next/navigation'

export interface CategoryBlockProps {
    category: string;
    variant?: 'light';
}

interface StatOwnerState extends CategoryBlockProps {
}

export default function CategoryBlock({category, variant}: {category: string, variant?: 'light'}){
    const router = useRouter()
    const navigate = (category: string) => {
        const encodedCategoryId = encodeURIComponent(category); //sanitize item name for route
        router.push(`/category-page/${encodedCategoryId}`);
    };

    let categoryLocation: string;
    switch (category) {
        case 'Dhirts':
            categoryLocation = 'https://media.istockphoto.com/id/854677216/photo/white-t-shirt-on-brick-background.jpg?s=1024x1024&w=is&k=20&c=nPejcLVjLLPE1zN2TfsBbIbR3Zs2kyfhjaKcLcEiDjs=';
            break;
        case 'Skirts':
            categoryLocation = 'https://media.istockphoto.com/id/166672434/photo/waist-down-view-of-a-group-of-men-in-traditional-kilts.jpg?s=1024x1024&w=is&k=20&c=YOHiR057RntiZ41Pwng81d0Q330LeVo8KNhydd1dKmc=';
            break;
        case 'Pants':
            categoryLocation = 'https://media.istockphoto.com/id/182688952/photo/full-frame-blue-denim-jeans.jpg?s=1024x1024&w=is&k=20&c=Y0CdL7quy30nlFxc14Xw5RkIb23-6zYZT2B0YVVKyVQ=';
            break;
        case 'Shoes':
            categoryLocation = 'https://media.istockphoto.com/id/1279108197/photo/variety-of-womens-fashion-comfortable-shoes-of-all-seasons-on-a-light-background-top-view.jpg?s=1024x1024&w=is&k=20&c=I7--KKDMWMPX0yQsaVUTr5S7jBPH9RcM8owFkL6G00E=';
            break; 
        case 'Dress':
            categoryLocation = 'https://media.istockphoto.com/id/935032524/photo/women-summer-dresses-on-display-at-camden-market.jpg?s=1024x1024&w=is&k=20&c=tJOs8y-0XOCDy5Mtzsj4FRiPv8EGe1cUPbXp4UuSEuY=';
            break;
        case 'Suits':
            categoryLocation = 'https://media.istockphoto.com/id/615631610/photo/business-mannequin.jpg?s=1024x1024&w=is&k=20&c=iBFKQ3WXeTkomh8TWaKxyiMnmIugZ9YPx1JQeFlIVg4=';
            break;
        case 'Accessories':
            categoryLocation = 'https://media.istockphoto.com/id/482779158/photo/boho-girls-hands-looking-feminine-with-many-rings.jpg?s=1024x1024&w=is&k=20&c=akep0klpBBQ1wceTXbqIsMl3RcoeZmvN9q6OeO_d1oU=';
            break;
        case 'Casual Wear':
            categoryLocation = 'https://media.istockphoto.com/id/1407082939/photo/black-sweatshirts-with-hoodie-for-logo-mockup-template.jpg?s=1024x1024&w=is&k=20&c=ab6YXK41VPNceLEjX0XQ-szWzDhzCPOkyO-OFNwBmV0=';
            break;
        default:
            categoryLocation = 'https://media.istockphoto.com/id/854677216/photo/white-t-shirt-on-brick-background.jpg?s=1024x1024&w=is&k=20&c=nPejcLVjLLPE1zN2TfsBbIbR3Zs2kyfhjaKcLcEiDjs='
    }
    
    const CategoryBlockWrapper = styled('div', {
        name: 'CategoryBlock',
        slot: 'wrapper'
    })<{ownerState: StatOwnerState}>(({theme, ownerState}) => ({
        height: 250,
        width: '100%',
        backgroundColor: 'white',
        backgroundImage: `url(${categoryLocation})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer'
    }));

    const BlockContent = styled('div', {
        name: 'CategoryBlock',
        slot: 'content'
    })<{ownerState: StatOwnerState}>(({theme, ownerState}) => ({
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#174DA0a8',
        ...(ownerState.variant === 'light' && {
            backgroundColor: '#174DA038'
        }),
    }));

    const CategorySVG = styled('svg', {
        name: 'CategoryBlock',
        slot: 'svg'
    })<{ownerState: StatOwnerState}>(({theme, ownerState}) => ({
        fontWeight: 500,
        fontSize: '3rem',
        width: '100%',
        height: '100%'
    }));

    const CategoryText = styled('text', {
        name: 'CategoryBlock',
        slot: 'text'
    })<{ownerState: StatOwnerState}>(({theme, ownerState}) => ({
        fill: '#333',
        stroke:'white',
        strokeWidth: 4,
        strokeLinejoin: 'round',
        fontStretch: 'ultra-condensed%'
    }));

    const Block = React.forwardRef<HTMLDivElement, CategoryBlockProps>(
        function Block(inProps, ref){
            const props = useThemeProps({props: inProps, name: 'CategoryBlock'});
            const {category, variant, ...other} = props;
            const ownerState = {...props, variant};
            return(
                <CategoryBlockWrapper ownerState={ownerState} onClick={() => navigate(category)}>
                    <BlockContent ownerState={ownerState}>
                        <CategorySVG ownerState={ownerState} >
                            <CategoryText ownerState={ownerState} 
                                y="50%" x='50%' 
                                dominantBaseline='middle' textAnchor='middle' 
                                paint-order="stroke" 
                                textLength={'75%'} lengthAdjust="spacingAndGlyphs">
                                {category.toLowerCase()}
                            </CategoryText>
                        </CategorySVG>
                    </BlockContent>    
                </CategoryBlockWrapper>
            );
        },
    );

    return (
        <Block category={category} variant={variant}/>
    )
}