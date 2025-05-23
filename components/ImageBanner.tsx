import * as React from 'react';
import { styled, useThemeProps, makeStyles, } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import { keyframes } from "@emotion/react";

export interface ImageBannerProps {
}

export interface ImageWrapperProps {
    imageurl: string;
}

const myEffect = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-3750px);
  }
`;


export default function ImageBanner(){
    const [orderArray, setOrderArray] = React.useState<number>(0)

    const BannerLimiter = styled('div', {
        name: 'ImageBanner',
        slot: 'limiter'
    })(({theme}) => ({
        width: '100%',
        height: '50vh',
        maxHeight: 600,
        overflowX: 'hidden',
    }));

    const BannerWrapper = styled('div', {
        name: 'ImageBanner',
        slot: 'wrapper'
    })(({theme}) => ({
        width: '7500px',
        height: '100%',
        maxHeight: 600,
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        animation: `${myEffect} 70s linear infinite`,
        '&:hover': {
            'animationPlayState': 'paused'
        }
    }));

    const ImageWrapper = styled('div', {
        name: 'ImageBanner',
        slot: 'wrapper'
    })<ImageWrapperProps>(({theme, imageurl}) => ({
        width: '1500px',
        height: '100%',
        border: '2px solid white',
        backgroundImage: `url(${imageurl})`,
        backgroundPosition: '0% 7%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }));

    const Block = React.forwardRef<HTMLDivElement, ImageBannerProps>(
        function Block(inProps, ref){
            const props = useThemeProps({props: inProps, name: 'CategoryBlock'});
            const { ...other} = props;
            return(
                <BannerLimiter>
                    <BannerWrapper>
                    <ImageWrapper color="black" imageurl='/belinda-images/banner-images/belindaspromo1.jpg'>
                    </ImageWrapper>
                    <ImageWrapper color="blue"  imageurl='/belinda-images/banner-images/belindaspromo2.jpg'>
                    </ImageWrapper>
                    <ImageWrapper color="white"  imageurl='/belinda-images/banner-images/belindaspromo3.jpg'>
                    </ImageWrapper>
                    <ImageWrapper color="grey"  imageurl='/belinda-images/banner-images/belindaspromo4.jpg'>
                    </ImageWrapper>
                    <ImageWrapper color="red"  imageurl='/belinda-images/banner-images/belindaspromo5.jpg'>
                    </ImageWrapper>

                    <ImageWrapper color="black" imageurl='/belinda-images/banner-images/belindaspromo1.jpg'>
                    </ImageWrapper>
                    <ImageWrapper color="blue"  imageurl='/belinda-images/banner-images/belindaspromo2.jpg'>
                    </ImageWrapper>
                    <ImageWrapper color="white"  imageurl='/belinda-images/banner-images/belindaspromo3.jpg'>
                    </ImageWrapper>
                    <ImageWrapper color="grey"  imageurl='/belinda-images/banner-images/belindaspromo4.jpg'>
                    </ImageWrapper>
                    <ImageWrapper color="red"  imageurl='/belinda-images/banner-images/belindaspromo5.jpg'>
                    </ImageWrapper>
                </BannerWrapper>
                </BannerLimiter>
                
            );
        },
    );

    return (
        <Block />
    )
}