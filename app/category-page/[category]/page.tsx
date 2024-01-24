"use client";

const Category=({ params }: { params: { category: string } })=>{
    return <p>{params.category}</p>
}

export default Category;


