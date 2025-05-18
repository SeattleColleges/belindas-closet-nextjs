import { Stack, Typography, Box } from "@mui/material";
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

const ResponsiveWrapper = styled('div')(() => ({
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    position: 'relative',
}));


const CarouselComponentWrapper = styled('div', {
    name: 'CarouselElement',
    slot: 'overallWrapper',
})(({ theme }) => ({
    height: 'fit-content',
    width: '100%',
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
    width: '100%',
    position: 'relative',
}));

const CarouselContainer = styled('div', {
    name: 'CarouselElement',
    slot: 'container',
})(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    overflowX: 'auto',
    maxWidth: '100%',
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
    zIndex: 2,
        }
    )
);

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
    zIndex: 2,
        }
    )
);

const CarouselElement = React.forwardRef<HTMLDivElement, CarouselProps>(
    function Stat(inProps, ref) {
        const props = useThemeProps({ props: inProps, name: 'CarouselElement' });
        const { children, carouselID, products, title, ...other } = props;

        function slide(interval: number) {
            var container = document.getElementById(carouselID);
            let scrollCompleted = 0;
            var slideVar = setInterval(function () {
                container!.scrollLeft += interval;
                scrollCompleted += 10;
                if (scrollCompleted >= 100) {
                    window.clearInterval(slideVar);
                }
            }, 25);
        }

        return products.length > 0 ? (
            <ResponsiveWrapper>
                <CarouselComponentWrapper>
                    <Typography color="#114FA3" variant="h4" mt={2} sx={{ fontWeight: 900, textAlign: 'center' }}>
                        {title}
                    </Typography>
                    <CarouselContainerWrapper>
                        <CarouselArrowLeft onClick={() => slide(-70)}>
                            <IconContext.Provider value={{ color: "#114FA3", size: '60' }}>
                                <MdArrowBackIos aria-label="Toggle Light Theme" />
                            </IconContext.Provider>
                        </CarouselArrowLeft>
                        <CarouselContainer id={carouselID}>
                            {children}
                        </CarouselContainer>
                        <CarouselArrowRight onClick={() => slide(70)}>
                            <IconContext.Provider value={{ color: "#114FA3", size: '60' }}>
                                <MdArrowBackIos aria-label="Toggle Light Theme" />
                            </IconContext.Provider>
                        </CarouselArrowRight>
                    </CarouselContainerWrapper>
                </CarouselComponentWrapper>
            </ResponsiveWrapper>
        ) : (
            <ResponsiveWrapper>
                <CarouselComponentWrapper>
                    <Typography color="#114FA3" variant="h4" mt={2} sx={{ fontWeight: 900, textAlign: 'center' }}>
                        {title}
                    </Typography>
                    <CarouselContainerWrapper>
                        <CarouselContainer id={carouselID}>
                            {children}
                        </CarouselContainer>
                    </CarouselContainerWrapper>
                </CarouselComponentWrapper>
            </ResponsiveWrapper>
        );
    },
);

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

export function Carousel({ carouselID, products, title }: { carouselID: string; products: Product[]; title: string }){
    return (
        <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
            <ThemeProvider theme={theme}>
                <CarouselElement carouselID={carouselID} products={products} title={title}>
                    { products &&
                        products.map((product, index)=>(
                            <SimpleItemPreview product={product} key={index} />
                        ))
                    }
                </CarouselElement>
            </ThemeProvider>
        </Stack>
    );
}