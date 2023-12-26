import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { RotatingLines } from 'react-loader-spinner';
import { NavLink } from "react-router-dom";

const Products = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // console.log(productData);


    useEffect(() => {

        const fetchAllProducts = async () => {
            try {

                const response = await fetch("http://localhost:5000/api/view-product", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const completeRes = await response.json();
                    const completeData = completeRes.getProduct;
                    setProductData(completeData);
                    setLoading(false);
                } else {
                    const errorResponse = await response.json();
                    setLoading(false);
                }
            } catch (error) {
                console.log("Error on Product Page:", error);
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, [productData]);



    return (
        <>
            <RotatingLines
                visible={loading}
                height="45"
                width="45"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />

            <div className="products">
                {
                    productData.map((currentProduct, i) => {
                        const { _id, name, price, image } = currentProduct;
                        return (
                            <div className="product" key={i} onClick={() => singleProduct(_id)} >
                                <div className="product-img">
                                    <img src={image[0]} alt="product image" />
                                </div>
                                <div className="product-details">
                                    <div className="product-name">{name}</div>
                                    <div className="product-price">&#8377; {price}</div>
                                </div>
                                <NavLink to={`/product-details/${_id}`} className="btn-main">
                                    <button className="btn btn-submit">
                                        Read More
                                    </button>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Products