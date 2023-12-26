import React, { useState, useEffect } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import img from "../assets/apj.webp";
import { useParams } from "react-router-dom";

const ProductDetails = () => {

    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState();
    // console.log(singleProduct);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/view-product?_id=${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const completeRes = await response.json();
                    const productData = completeRes.data;
                    setSingleProduct(productData);
                } else {
                    const errorResponse = await response.json();
                }
            } catch (error) {
                console.log("Error on delete user function:", error);
            }
        };
        getProduct();
    }, [singleProduct]);

    // console.log(singleProduct);
    return (
        <>
            {singleProduct && <div className="single-product">
                <div className="single-product-img">
                    <img src={singleProduct.image[0]} alt="product image" />
                </div>
                <div className="single-product-details">
                    <div className="single-product-name">{singleProduct.name}</div>
                    <div className="single-product-price">&#8377; {singleProduct.price}</div>
                    <div className="single-product-description">{singleProduct.description}</div>
                    <button><FaCartShopping />Add To Cart</button>
                </div>
            </div>}
        </>
    )
}

export default ProductDetails;