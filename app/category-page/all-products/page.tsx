"use client";

import React, {useState, useEffect, Dispatch, SetStateAction} from "react";
import ProductCard from "@/components/ProductCard";
import logo from "@/public/belinda-images/logo.png";
import {Checkbox, Container, FormGroup, Grid, Paper, Typography} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {navItems} from "@/components/productList";
import {ProductGenderList} from "@/app/add-product-page/product-prop-list";

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;
const placeholderImg = logo;

interface Product {
    _id: string;
    productImage: typeof placeholderImg;
    productType: string[];
    productGender: string;
    productSizeShoe: string;
    productSizes: string;
    productSizePantsWaist: string;
    productSizePantsInseam: string;
    productDescription: string;
    isHidden: Boolean;
    isSold: Boolean;
}

async function fetchData(
    categoryId: string,
    setProducts: Dispatch<SetStateAction<Product[]>>
) {
    const apiUrl = `${URL}/products`;
    const fetchUrl = `${apiUrl}`;

    try {
        const res = await fetch(fetchUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error(res.statusText);
        } else {
            const data = await res.json();
            const filteredData = data.filter((product: Product) => !product.isHidden);
            setProducts(data);
            console.log(data);
        }
    } catch (error) {
        console.error("Error getting product:", error);
    }
}

const ViewProduct = ({categoryId}: { categoryId: string }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const [productFilters, setProductFilters] = useState<String[]>([]);
    const [genderFilters, setGenderFilters] = useState<String[]>([]);

    useEffect(() => {
        console.log("Product filters: ", productFilters)
    }, [productFilters])
    console.log("Product filters: ", productFilters)
    useEffect(() => {
        console.log("Gender filters: ", genderFilters)
    }, [genderFilters])

    // TODO: Re-attempt to combine the logic below later
    function flipEntryProduct(item: String) {
        console.log("Item: ", item);
        setProductFilters((products) => {
            if (!products.includes(item)) {
                return [...products, item];
            } else {
                return products.filter((value) => value !== item);
            }
        });
    }

    function flipEntryGender(item: String) {
        console.log("Item: ", item);
        setGenderFilters((gender) => {
            if (!gender.includes(item)) {
                return [...gender, item];
            } else {
                return gender.filter((value) => value !== item);
            }
        });
    }


    useEffect(() => {
        fetchData(categoryId, setProducts); // Pass categoryId to fetchData
    }, [categoryId]);

    useEffect(() => {
        setFilteredProducts(
            products.filter((product) => !product.isHidden && !product.isSold)
        );
    }, [products]);

    return (
        <Grid container spacing={3}>
            <Grid item md={3} xs={12}>
                <Paper
                    style={{
                        paddingLeft: "24px",
                        paddingRight: "24px",
                        paddingBottom: "4px",
                        paddingTop: "2rem"
                    }}
                >
                    <div>
                        <div style={{marginBottom: "1rem"}}>
                            Product Type
                            <FormGroup>
                                {navItems.filter(item => item !== 'All Products').map((item) => (
                                    <FormControlLabel
                                        key={item}
                                        control={<Checkbox defaultChecked onChange={() => flipEntryProduct(item)} />}
                                        label={item}
                                        style={{marginBottom: "0rem"}}
                                    />
                                ))}
                            </FormGroup>
                        </div>

                        <div style={{marginBottom: "1rem"}}>
                            Gender
                            <FormGroup>
                                {Object.values(ProductGenderList).map((item) => (
                                    <FormControlLabel
                                        key={item}
                                        control={<Checkbox defaultChecked onChange={() => flipEntryGender(item)} />}
                                        label={item}
                                    />
                                ))}
                            </FormGroup>
                        </div>

                        <div
                            style={{
                                width: "100%",
                                backgroundColor: "grey",
                                height: "1px",
                                marginBottom: "1.5rem"
                            }}
                        />

                        <Typography
                            gutterBottom
                            justifyContent={"center"}
                            align={"center"}
                            mb={2}
                            mt={1}
                        >
                            {filteredProducts.length} Products
                        </Typography>
                    </div>
                </Paper>
            </Grid>
            <Grid item md={9} xs={12}>
                <Container sx={{py: 4}}>
                    <Grid container spacing={2}>
                        {filteredProducts.filter((product) =>
                            !product.productType.some((typea) => productFilters.includes(typea)) &&
                            !genderFilters.includes(String(product.productGender))
                        ).map((product, index) => (
                            // <Grid item key={index} xs={12} sm={40} md={40}>
                            <Grid item key={index} xs={12} sm={4} md={3}>
                                <ProductCard
                                    image={logo}
                                    categories={product.productType}
                                    gender={product.productGender}
                                    sizeShoe=''
                                    size=''
                                    sizePantsWaist=''
                                    sizePantsInseam=''
                                    description={product.productDescription}
                                    href={`/category-page/${categoryId}/products/${product._id}`} // Construct the URL
                                    _id={product._id}
                                    isHidden={false}
                                    isSold={false}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Grid>
        </Grid>
)
    ;
};
export default function ProductList({
                                        params,
                                    }: {
    params: { categoryId: string };
}) {
    const decodedCategoryId = decodeURIComponent(params.categoryId);

    return <ViewProduct categoryId={decodedCategoryId}/>;
}
