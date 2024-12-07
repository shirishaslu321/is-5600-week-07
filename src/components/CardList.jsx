// CardList.js
import React, { useState, useEffect } from "react";
import Card from './Card'
import Button from './Button'
import { BASE_URL } from '../config';

// Remove the `data` prop - we won't use that anymore
const CardList = ({}) => {

  const limit = 10;
  const [offset, setOffset] = useState(0);

  // Define the state object for product data
  const [products, setProducts] = useState([]);

  // Create a function to fetch the products
  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  // Use the useEffect hook to fetch the products when the component boots
  useEffect(() => {
    fetchProducts();
  }, [offset]);

  

  // Define the handlePrevious function
  const handlePrevious = () => {
    // set the offset to the previous 10 products
    setOffset(offset - limit);
  }

  // Define the handleNext function
  const handleNext = () => {
    // set the offset to the next 10 products
    setOffset(offset + limit);
  }

  const getPaginatedProducts = () => {
    return products.slice(offset, offset + limit);
  }

  
  // Update the return method to use the `products` state object
  return (
    <div className="cf pa2">
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );

}

export default CardList;