'use client';
import React from "react";
import styles from "./home.module.css";
import Image from "next/image";
import logo from "./logo.png";
import google_play from "./google_play.png";
import CategoryCard from "@/components/CategoryCard";
import { useRouter } from "next/navigation";

// TEMPORARY CATEGORIES LIST
const placeholderImg = google_play
const categories = [
  {'type': 'Shirts', 'image': placeholderImg},
  {'type': 'Shoes', 'image': placeholderImg},
  {'type': 'Pants', 'image': placeholderImg},
  {'type': 'Skirts', 'image': placeholderImg},
  {'type': 'Suits', 'image': placeholderImg},
  {'type': 'Dress', 'image': placeholderImg},
  {'type': 'Casual Wear', 'image': placeholderImg},
  {'type': 'Accessories', 'image': placeholderImg},
  {'type': 'Jacket/Blazer', 'image': placeholderImg},
]


const Home = () => {
  const router = useRouter();
  const onCardClick=(type: string)=>{
    const encodedCategoryId = encodeURIComponent(type); //sanitize item name for route
    router.push(`/category-page/${encodedCategoryId}`);
  }
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="logo" />
        </div>
        <h1 className={styles.title}>Welcome to Belinda&apos;s Closet</h1>
        <div className={styles.buttonContainer}>
          <a href="/auth/sign-in">
            <button className={styles.loginButton}>Sign In</button>
          </a>
          <a href="/auth/sign-up">
            <button className={styles.signUpButton}>Sign Up</button>
          </a>
        </div>
        {/* download mobile app link */}
        <div className={styles.downloadContainer}>
          <p className="textCenter">
            <a href="" className={styles.link}>
              <button className={styles.downloadButton}>
                <Image src={google_play} alt="google_play" />
                Download App
              </button>
            </a>
          </p>
        </div>
        <div className={styles.categoryContainer}>
          {categories.map((category, index)=>(
            <CategoryCard title={category.type} image={category.image} onCardClick={()=>onCardClick(category.type)} key={category.type}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
