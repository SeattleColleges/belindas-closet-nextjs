import { Stack, Typography } from "@mui/material";
import { styled, useThemeProps, createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import * as React from 'react';
import { OverridesStyleRules } from "@mui/material/styles/overrides";
import { SimpleItemPreview } from './SimpleItemPreview';
import { MdArrowBackIos } from "react-icons/md";
import { IconContext } from "react-icons";
import Product from '../models/productModel';

export interface CarouselProps {
    children: React.ReactNode;
    carouselID: string;
    products: Product[];
    title: string;
}

type CarouselElementClassKey = "left" | "right";

const CarouselComponentWrapper = styled('div', {
    name: 'CarouselElement',
    slot: 'overallWrapper',
})(({ theme }) => ({
    height: 'fit-content',
    width: '100%', // full width
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 24,
}));

const CarouselContainerWrapper = styled('div', {
    name: 'CarouselElement',
    slot: 'wrapper',
})(({ theme }) => ({
    height: 'fit-content',
    width: '100%', // full width
    position: 'relative',
    // NO overflow hidden here!
}));

const CarouselContainer = styled('div', {
    name: 'CarouselElement',
    slot: 'container',
})(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    overflowX: 'auto',
    maxWidth: '100%', // full width
    scrollSnapType: 'x mandatory',
    paddingBottom: 8,
    '&::-webkit-scrollbar': {
        width: 0,
        background: 'transparent',
        height: 0,
    },
}));

const CarouselArrowLeft = styled('div', {
    name: 'CarouselElement',
    slot: 'leftarrow',
    overridesResolver: (props, styles) => styles.left,
})(({ theme }) => ({
    position: 'absolute',
    top: 55,
    height: 70,
    width: 70,
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    paddingLeft: 20,
    backgroundColor: "transparent",
    boxShadow: "inset 0 0 8px rgba(0, 0, 0, .75)",
    zIndex: 2, // Make sure arrows stay above content
}));

const CarouselArrowRight = styled('div', {
    name: 'CarouselElement',
    slot: 'rightarrow',
    overridesResolver: (props, styles) => styles.right,
})(({ theme }) => ({
    position: 'absolute',
    top: 55,
    height: 70,
    width: 70,
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    paddingLeft: 20,
    backgroundColor: "transparent",
    boxShadow: "inset 0 0 8px rgba(0, 0, 0, .75)",
    zIndex: 2, // Make sure arrows stay above content
}));

const CarouselElement = React.forwardRef<HTMLDivElement, CarouselProps>(function CarouselElement(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: 'CarouselElement' });
    const { children, carouselID, products, title, ...other } = props;

    function slide(interval: number) {
        const container = document.getElementById(carouselID);
        if (!container) return;
        let scrollCompleted = 0;
        const slideInterval = setInterval(() => {
            container.scrollLeft += interval;
            scrollCompleted += 10;
            if (scrollCompleted >= 100) {
                clearInterval(slideInterval);
            }
        }, 25);
    }

    return (
        <CarouselComponentWrapper {...other}>
            <Typography color="#114FA3" variant="h4" mt={2} sx={{ fontWeight: 900 }}>
                {title}
            </Typography>
            <CarouselContainerWrapper>
                {products.length > 0 && (
                    <>
                        <CarouselArrowLeft onClick={() => slide(-70)}>
                            <IconContext.Provider value={{ color: "#114FA3", size: '60' }}>
                                <MdArrowBackIos aria-label="Slide Left" />
                            </IconContext.Provider>
                        </CarouselArrowLeft>
                        <CarouselArrowRight onClick={() => slide(70)}>
                            <IconContext.Provider value={{ color: "#114FA3", size: '60' }}>
                                <MdArrowBackIos aria-label="Slide Right" />
                            </IconContext.Provider>
                        </CarouselArrowRight>
                    </>
                )}
                <CarouselContainer id={carouselID}>
                    {children}
                </CarouselContainer>
            </CarouselContainerWrapper>
        </CarouselComponentWrapper>
    );
});

declare module "@mui/material/styles" {
    interface Components {
        CarouselElement?: {
            styleOverrides?: Partial<
                OverridesStyleRules<CarouselElementClassKey, "CarouselElement", Theme>
            >;
        };
    }
}

const theme = createTheme({
    components: {
        CarouselElement: {
            styleOverrides: {
                left: {
                    left: -40,
                },
                right: {
                    right: -40,
                    transform: "rotate(0.5turn)",
                },
            },
        },
    },
});

export function Carousel({ carouselID, products, title }: { carouselID: string; products: Product[]; title: string }) {
    return (
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
            <ThemeProvider theme={theme}>
                <CarouselElement carouselID={carouselID} products={products} title={title}>
                    {products.map((product, index) => (
                        <SimpleItemPreview key={index} product={product} />
                    ))}
                </CarouselElement>
            </ThemeProvider>
        </Stack>
    );
}
