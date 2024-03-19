import WrapperDiv from '@/components/WrapperDiv'
// import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

const Admin = () => {
  const handleAddProduct = () => {
    // Add code here to handle the "Add Product" button click event
  };

  return (
    <WrapperDiv>
      <h1> Wellcome to the PAGE      </h1>
      <p>FIX: allow only users with admin role to be routed to this page</p>
      {/* <Link to="/add-product-page"> */}
        <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', marginTop: '20px' }}>
          Add Product
        </button>
      {/* </Link> */}
      {/* <Link to="/add-product-page"> */}
        <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', marginTop: '20px' }}>
          All Products
        </button>
      {/* </Link> */}
      {/* <Link to="/add-product-page"> */}
        <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', marginTop: '20px' }}>
          Edit User Roles
        </button>
      {/* </Link> */}
    </WrapperDiv>
  );
};

export default Admin;