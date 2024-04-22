// import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

const Admin = () => {
  const handleAddProduct = () => {
    // Add code here to handle the "Add Product" button click event
  };

  return (
    <div>
      <h1> Welcome to the PAGE      </h1>
      <p>FIX: allow only users with admin role to be routed to this page</p>
        
        {/* Changed button styling to match with Creator page's buttons */}

        <a href="/add-product-page">
        {/* <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', marginTop: '20px' }}> */}
        <button>
          Add Product
        </button>
        </a>
      
        {/* <Link to="/add-product-page"> */}
        {/* <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', marginTop: '20px' }}> */}
        <button>
          All Products
        </button>
        {/* </Link> */}

        <a href="/edit-user-role-page">
        {/* <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', marginTop: '20px' }}> */}
        <button>
          Edit User Roles
        </button>
        </a>

    </div>
  );
};

export default Admin;