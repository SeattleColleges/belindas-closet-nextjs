'use client';
import React, { Component } from 'react';

class AddProduct extends Component {
  state = {
    productName: '',
    showText: false
  }

  handleChange = (e: { target: { value: any; }; }) => {
    let updatedProductName = e.target.value;
    this.setState({ productName: updatedProductName });
    //console.log(updatedProductName); 
    this.setState({
      showText: false,
    });
  }

  handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    this.setState({
      showText: true,
    });
  }

  render() {
    return (
      <div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <h1>Add a Product</h1>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <form onSubmit={this.handleSubmit}>
            <label>Add a Product</label>
            <input type="text" name="productName" onChange={this.handleChange} value={this.state.productName} style={{color: 'black'}} />
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <p>{this.state.showText && <p>Product Name: {this.state.productName}</p>}</p>
        </div>
      </div>
    );
  }
}

export default AddProduct;


