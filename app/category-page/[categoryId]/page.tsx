"use client";

import React, {useState, useEffect, Dispatch, SetStateAction} from "react";
import ProductCard from "@/components/ProductCard";
import logo from "@/public/belinda-images/logo.png";
import {
    Checkbox,
    Container,
    Divider,
    FormGroup,
    Grid,
    Paper,
    Typography,
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Breadcrumbs,
    Link,
    Stack,
    FormControlLabel,
    Radio,
    RadioGroup,
    Pagination,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import {productList} from "@/components/productList";
import {ProductGenderList} from "@/app/add-product-page/product-prop-list";
import {SelectChangeEvent} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;
const placeholderImg = logo;
const ITEMS_PER_PAGE = 9;

interface Product {
    _id: string;
    productImage: typeof placeholderImg;
    productType: string;
    productGender: string;
    productSizeShoe: string;
    productSizes: string;
    productSizePantsWaist: string;
    productSizePantsInseam: string;
    productDescription: string;
    isHidden: Boolean;
    isSold: Boolean;
    createdAt: string;
    productColor?: string;
}

async function fetchData(categoryId: string, setProducts: Dispatch<SetStateAction<Product[]>>) {
    // If categoryId is empty (All Categories), use the general products endpoint
    const apiUrl = categoryId ? `${URL}/products/findByType/` : `${URL}/products`;
    const fetchUrl = categoryId ? `${apiUrl}${encodeURIComponent(categoryId)}` : apiUrl;

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
            setProducts(filteredData);
        }
    } catch (error) {
        console.error("Error getting product:", error);
    }
}

const ViewProduct = ({categoryId}: { categoryId: string }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [genderFilters, setGenderFilters] = useState<String[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(categoryId);
    const [sortBy, setSortBy] = useState("newest");
    const [page, setPage] = useState(1);
    const [selectedColors, setSelectedColors] = useState<string[]>(['red', 'yellow', 'green', 'blue', 'purple', 'pink', 'orange', 'cyan', 'magenta', 'black', 'white']);
    const [stockStatus, setStockStatus] = useState<string[]>(['inStock']);
    const [selectedSizes, setSelectedSizes] = useState<string[]>(['XS', 'S', 'M', 'L', 'XL', 'XXL']);

    // Search and filter handling
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(1); // Reset to first page when searching
    };

    const clearSearch = () => {
        setSearchQuery("");
        setPage(1); // Reset to first page when clearing search
    };

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        const newCategory = event.target.value;
        setSelectedCategory(newCategory);
        setPage(1); // Reset to first page when changing category
        fetchData(newCategory, setProducts); // Fetch new data for the selected category
    };

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortBy(event.target.value);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleColorClick = (color: string) => {
        setSelectedColors(prev =>
            prev.includes(color)
                ? prev.filter(c => c !== color)
                : [...prev, color]
        );
    };

    const handleStockStatusChange = (status: string) => {
        setStockStatus(prev =>
            prev.includes(status)
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };

    const handleSizeChange = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size)
                ? prev.filter(s => s !== size)
                : [...prev, size]
        );
    };

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
        fetchData(categoryId, setProducts);
    }, [categoryId]);

    useEffect(() => {
        let filtered = products.filter((product) => !product.isHidden && !product.isSold);

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(product =>
                (product.productType?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
                (product.productDescription?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
            );
        }

        // Apply category filter
        if (selectedCategory) {
            filtered = filtered.filter(product => product.productType === selectedCategory);
        }

        // Apply gender filter
        if (genderFilters.length > 0) {
            filtered = filtered.filter(product => !genderFilters.includes(product.productGender));
        }

        // FUTURE LOGIC FOR FILTERING ON THE SIDEBAR
        // Stock status
        /*if (stockStatus.length > 0) {
            filtered = filtered.filter(product => {
                if (stockStatus.includes('inStock') && stockStatus.includes('outOfStock')) return true;
                if (stockStatus.includes('inStock')) return !product.isSold;
                if (stockStatus.includes('outOfStock')) return product.isSold;
                return true;
            });
        }

        // Apply size filter
        if (selectedSizes.length > 0) {
            filtered = filtered.filter(product => 
                selectedSizes.includes(product.productSizes) ||
                selectedSizes.includes(product.productSizeShoe)
            );
        }

        // Apply color filter
        if (selectedColors.length > 0) {
            filtered = filtered.filter(product => 
                product.productColor && selectedColors.includes(product.productColor)
            );
        }*/

        // Apply sorting
        switch (sortBy) {
            case "oldest":
                filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            default:
                // Newest sorting (default)
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
        }

        setFilteredProducts(filtered);
    }, [products, searchQuery, selectedCategory, sortBy, genderFilters, stockStatus, selectedSizes, selectedColors]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    return (
        <Container maxWidth="xl" sx={{py: 4, bgcolor: '#ffffff'}}>
            {/* Search Header */}
            <Box sx={{mb: 4, bgcolor: '#ffffff'}}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    '& .MuiTextField-root': {
                        flexGrow: 1,
                        '& .MuiOutlinedInput-root': {
                            height: '48px',
                            borderRadius: '8px',
                            bgcolor: '#eceff1',
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                                borderColor: 'transparent',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'transparent',
                            },
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '16px',
                            '&::placeholder': {
                                color: '#9E9E9E',
                            },
                        },
                    },
                }}>
                    <TextField
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search for products..."
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FormControl sx={{minWidth: '120px', mr: 1}}>
                                        <Select
                                            value={selectedCategory}
                                            onChange={handleCategoryChange}
                                            displayEmpty
                                            size="small"
                                            sx={{
                                                '&:before': {display: 'none'},
                                                '&:after': {display: 'none'},
                                                '& .MuiSelect-select': {
                                                    padding: '0 8px',
                                                    fontSize: '16px',
                                                    color: '#9E9E9E',
                                                },
                                            }}
                                        >
                                            <MenuItem value="">All Categories</MenuItem>
                                            <MenuItem value="Shirts">Shirts</MenuItem>
                                            <MenuItem value="Shoes">Shoes</MenuItem>
                                            <MenuItem value="Pants">Pants</MenuItem>
                                            <MenuItem value="Skirts">Skirts</MenuItem>
                                            <MenuItem value="Suits">Suits</MenuItem>
                                            <MenuItem value="Dress">Dress</MenuItem>
                                            <MenuItem value="Casual Wear">Casual Wear</MenuItem>
                                            <MenuItem value="Accessories">Accessories</MenuItem>
                                            <MenuItem value="Jacket/Blazer">Jacket/Blazer</MenuItem>
                                        </Select>
                                    </FormControl>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon sx={{color: '#9E9E9E', cursor: 'pointer'}}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Box>

            {/* Main Content */}
            <Grid container spacing={3}>
                {/* Filters Sidebar */}
                <Grid item md={3} xs={12}>
                    <Paper sx={{
                        p: 2,
                        // bgcolor: '#ffffff',
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                        borderRight: '1px solid #e0e0e0',
                        boxShadow: 'none'
                    }}>
                        <Typography variant="h6" sx={{
                            mb: 2,
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <FilterListIcon sx={{fontSize: '1.25rem'}}/>
                            Filters
                        </Typography>

                        {/* Gender Section */}
                        <Accordion defaultExpanded sx={{
                            boxShadow: 'none',
                            '&:before': {
                                display: 'none',
                            },
                        }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                sx={{
                                    px: 0,
                                    '& .MuiAccordionSummary-content': {
                                        margin: '8px 0',
                                    }
                                }}
                            >
                                <Typography variant="subtitle1" sx={{fontWeight: 500}}>Gender</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{px: 0}}>
                                <FormGroup>
                                    {Object.values(ProductGenderList).map((item) => (
                                        <FormControlLabel
                                            key={item}
                                            control={<Checkbox defaultChecked onChange={() => flipEntryGender(item)} />}
                                            label={item}
                                        />
                                    ))}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>

                        <Divider sx={{my: 1}}/>

                        {/* Stock Status Section */}
                        <Accordion defaultExpanded sx={{
                            boxShadow: 'none',
                            '&:before': {
                                display: 'none',
                            },
                        }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                sx={{
                                    px: 0,
                                    '& .MuiAccordionSummary-content': {
                                        margin: '8px 0',
                                    }
                                }}
                            >
                                <Typography variant="subtitle1" sx={{fontWeight: 500}}>Stock Status</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{px: 0}}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={stockStatus.includes('inStock')} onChange={() => handleStockStatusChange('inStock')}/>}
                                        label="In Stock"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={stockStatus.includes('outOfStock')} onChange={() => handleStockStatusChange('outOfStock')}/>}
                                        label="Out of Stock"
                                    />
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>

                        <Divider sx={{my: 1}}/>

                        {/* Size Section */}
                        <Accordion defaultExpanded sx={{
                            boxShadow: 'none',
                            '&:before': {
                                display: 'none',
                            },
                        }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                sx={{
                                    px: 0,
                                    '& .MuiAccordionSummary-content': {
                                        margin: '8px 0',
                                    }
                                }}
                            >
                                <Typography variant="subtitle1" sx={{fontWeight: 500}}>Size</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{px: 0}}>
                                <FormGroup>
                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                        <FormControlLabel
                                            key={size}
                                            control={<Checkbox checked={selectedSizes.includes(size)} onChange={() => handleSizeChange(size)}/>}
                                            label={size}
                                        />
                                    ))}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>

                        <Divider sx={{my: 1}}/>

                        {/* Color */}
                        <Accordion defaultExpanded sx={{
                            boxShadow: 'none',
                            '&:before': {
                                display: 'none',
                            },
                        }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                sx={{
                                    px: 0,
                                    '& .MuiAccordionSummary-content': {
                                        margin: '8px 0',
                                    }
                                }}
                            >
                                <Typography variant="subtitle1" sx={{fontWeight: 500}}>Color</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{px: 0}}>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                    {['red', 'yellow', 'green', 'blue', 'purple', 'pink', 'orange', 'cyan', 'magenta', 'black', 'white'].map((color) => (
                                        <Box
                                            key={color}
                                            onClick={() => handleColorClick(color)}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: '50%',
                                                bgcolor: color,
                                                border: '1px solid #7C7C7C',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 1,
                                                '&:hover': {
                                                    opacity: 0.8,
                                                },
                                            }}
                                        >
                                            {selectedColors.includes(color) && (
                                                <CheckIcon
                                                    sx={{
                                                        fontSize: 16,
                                                        color: color === 'white' || color === 'yellow' ? 'black' : 'white',
                                                        filter: color === 'yellow' ? 'drop-shadow(0px 0px 1px rgba(0,0,0,0.5))' : 'none'
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    ))}
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </Paper>
                </Grid>

                {/* Product Grid */}
                <Grid item md={9} xs={12}>
                    <Box sx={{bgcolor: '#ffffff', p: 2, borderRadius: 1}}>
                        {/* Breadcrumb */}
                        <Breadcrumbs aria-label="breadcrumb" sx={{mb: 2}}>
                            <Link color="inherit" href="/" sx={{textDecoration: 'underline'}}>
                                Home
                            </Link>
                            <Typography sx={{textDecoration: 'underline'}}>
                                Search
                            </Typography>
                            <Typography color="text.primary">{selectedCategory || "All"}</Typography>
                        </Breadcrumbs>

                        {/* Results count and Sort */}
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
                            <Typography variant="h4" component="h1" sx={{fontStyle: 'italic', mb: 3}}>
                                {searchQuery ? <>&ldquo;{searchQuery}&rdquo;</> : <></>}
                                <Typography color="text.primary" sx={{fontStyle: 'italic', display: 'inline'}}>
                                    {searchQuery ? <>—</> : <></>} {filteredProducts.length} Results
                                </Typography>
                            </Typography>

                            <FormControl sx={{minWidth: 120}}>
                                <Select
                                    value={sortBy}
                                    onChange={handleSortChange}
                                    displayEmpty
                                    size="small"
                                    sx={{bgcolor: '#ffffff'}}
                                >
                                    <MenuItem value="newest">Newest</MenuItem>
                                    <MenuItem value="oldest">Oldest</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Grid container spacing={2}>
                            {paginatedProducts.map((product, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4}>
                                    <ProductCard
                                        image={logo}
                                        categories={product.productType}
                                        gender={product.productGender}
                                        sizeShoe={product.productSizeShoe}
                                        size={product.productSizes}
                                        sizePantsWaist={product.productSizePantsWaist}
                                        sizePantsInseam={product.productSizePantsInseam}
                                        description={product.productDescription}
                                        href={`/category-page/${categoryId}/products/${product._id}`}
                                        _id={product._id}
                                        isHidden={false}
                                        isSold={false}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
                                    sx={{bgcolor: '#ffffff'}}
                                />
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default function ProductList({params}: { params: { categoryId: string } }) {
    const decodedCategoryId = decodeURIComponent(params.categoryId);
    return <ViewProduct categoryId={decodedCategoryId}/>;
}
