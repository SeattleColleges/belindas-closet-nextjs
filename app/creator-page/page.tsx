import styles from "../home.module.css";

const Creator = () => {
    // Temporary boilerplate code to make it compile
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
       
        <div >
            <div className={styles.loginButton}>
                <a href="/">
                <button>All Products</button>
                </a>
            </div>
            
            <div className={styles.loginButton}>
                <a href="/add-product-page">
                <button>Add Products</button>
                </a>
            </div>

        </div>

            <h1>Placeholder creators page.</h1>
            <p>Place holder text to fill in the space.</p>
        </div>
    );
};

export default Creator;