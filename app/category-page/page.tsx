"use client";
import { useSearchParams } from 'next/navigation'

const Category=()=>{
    const searchParams = useSearchParams();
    const category = searchParams.get('category')
    return <p>{category}</p>
}

export default Category;


