import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contact from './Contact-Page'; // Import the Contact component
import AdminPage from './AdminPage';

const Admin = () => {
  const handleAddProduct = () => {
    // Add code here to handle the "Add Product" button click event
  };

  return (
    <div>
      <h1> Wellcome to the PAGE </h1>
      <p>FIX: allow only users with admin role to be routed to this page</p>
      <Link to="/add-product-page">
        <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', marginTop: '20px' }}>
          Add Product
        </button>
      </Link>
      <Link to="/products">
        <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', marginTop: '20px' }}>
          All Products
        </button>
      </Link>
      <Link to="/edit-user-roles">
        <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', marginTop: '20px' }}>
          Edit User Roles
        </button>
      </Link>
      <Link to="/contact-page"> {/* Add a link to the contact page */}
        <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', marginTop: '20px' }}>
          Contact Page
        </button>
      </Link>
    </div>
  );
};

export default Admin;