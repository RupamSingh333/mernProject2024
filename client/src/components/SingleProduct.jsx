import React, { useState, useEffect } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import img from "../assets/apj.webp";

const SingleProduct = () => {

    const [singleProduct, setSingleProduct] = useState();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/view-product?_id=650a7fcc629b22b4b347b522`, {
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


    return (
        <>
            <div className="single-product">
                <div className="single-product-img">
                    <img src={img} alt="" />
                </div>
                <div className="single-product-details">
                    <div className="single-product-name">Name</div>
                    <div className="single-product-price">&#8377; Price</div>
                    <div className="single-product-description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse beatae omnis similique minima perferendis vel, minus corporis deleniti qui, consectetur labore aliquid cum, ex earum. Et beatae consequuntur corrupti id.</div>
                    <button><FaCartShopping />Add To Cart</button>
                </div>
            </div>
        </>
    )
}

export default SingleProduct