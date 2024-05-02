// import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom
import Button from '@mui/material/Button';

const Admin = () => {
  const handleAddProduct = () => {
    // Add code here to handle the "Add Product" button click event
  };

  return (
    <div>
      <h1> Welcome to the PAGE      </h1>
      <p>FIX: allow only users with admin role to be routed to this page</p>
        
        {/* Changed button styling to match with Creator page's buttons */}
        <div>
                <Button variant="contained" href="/add-product-page"> 
                   Add Product
                </Button>
            </div>
      
        {/* <Link to="/add-product-page"> */}
        {/* <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', marginTop: '20px' }}> */}
        <button>
          All Products
        </button>
        {/* </Link> */}

        
        <div>
                <Button variant="contained" href="/edit-user-role-page"> 
                    Contact Page
                </Button>
            </div>
      
        <div>
                <Button variant="contained" href="/contact-page"> 
                    Contact Page
                </Button>
            </div>
      <div>
                <Button variant="contained" href="/dashboard"> 
                    Dashboard
                </Button>
            </div>
    </div>
  );
};

export default Admin;
