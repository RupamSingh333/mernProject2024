import React, { useState, useEffect } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { RotatingLines } from 'react-loader-spinner';


const ProductDetails = () => {

    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState();
    const [loading, setLoading] = useState(true);


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
                    setLoading(false);
                } else {
                    const errorResponse = await response.json();
                    setLoading(false);
                }
            } catch (error) {
                console.log("Error on delete user function:", error);
                setLoading(false);
            }
        };
        setTimeout(() => {

            getProduct();
        }, 500);
    }, [singleProduct]);

    return (
        <>
            <div className="single-products">

                <div className="loader">
                    <RotatingLines
                        visible={loading}
                        height="60"
                        width="60"
                        color="grey"
                        strokeWidth="3"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
                {singleProduct && <div className="single-product">
                    <div className="single-product-img">
                        <img src={singleProduct.image[0]} alt="Product Image" />

                    </div>
                    <div className="single-product-details">
                        <div className="single-product-name">{singleProduct.name}</div>
                        <div className="single-product-price">&#8377; {singleProduct.price}</div>
                        <div className="single-product-description">{singleProduct.description}</div>
                        <button><FaCartShopping />Add To Cart</button>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default ProductDetails;