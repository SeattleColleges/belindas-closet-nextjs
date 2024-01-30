"use client";

import InputField from "@/components/InputFields";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./signin-page.module.css";
import Image from "next/image";
import mascot from "../../nsc_mascot_green_cropped.png";

const Signin = () => {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  
  const router = useRouter();

  const { email, password } = userInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Fetch sign in
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!res.ok) {
      alert("Invalid email or password"); // error message for now
      throw new Error(await res.text());
    }
    const { token } = await res.json();
    const userRole = JSON.parse(atob(token.split(".")[1])).role; // decode token to get user role
    // Redirect to user page
    if (userRole === "admin") {
      router.push("/admin-page"); // redirect to admin-page which is not created yet
    } else if (userRole === "creator") {
      router.push("/creator-page"); // redirect to creator-page
    } else {
      router.push("/profile"); // TODO: change profile to user-page
    }
  };

  return (
    <div className={styles.container}>
    <div className={styles.centerContainer}>
      <div className={styles.logoContainer}>
        <Image src={mascot} alt="mascot" />
      </div>
    <form className={`${styles.formContainer} ${styles['sign-in-form']}`} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Sign In</h1>
        <InputField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button className={styles.submitButton} type="submit">
          Sign In
        </button>
        <div className={styles.linkContainer}>
        <p className={styles.textCenter}>
          <a href="/auth/forgot-password" className={styles.link}>
            Forgot Password
          </a>
        </p>
        <p className={styles.textCenter}>
          <a href="/auth/sign-up" className={styles.link}>
            Sign Up
          </a>
        </p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Signin;