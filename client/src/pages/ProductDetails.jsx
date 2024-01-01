import React, { useState, useEffect } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { RotatingLines } from 'react-loader-spinner';


const ProductDetails = () => {

    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState();

    // console.log(singleProduct.image);


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
                    // console.log(productData);
                    // return false;
                    setSingleProduct(productData);
                } else {
                    const errorResponse = await response.json();
                }
            } catch (error) {
                console.log("Error on delete user function:", error);
            }
        };

        setTimeout(() => {
            getProduct();
        }, 500);
    }, [singleProduct]);

    {/* <div className="single-products">

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
            <div className="product-category">Category : {singleProduct.categoryId.name}</div>
            <div className="product-company">Company : {singleProduct.companyId.name}</div>
            <div className="single-product-description">{singleProduct.description}</div>
            <button><FaCartShopping />Add To Cart</button>
        </div>
    </div>}
</div> */}
    return (
        <>
            {!singleProduct && <div className="loader">
                <RotatingLines
                    visible={true}
                    height="60"
                    width="60"
                    color="grey"
                    strokeWidth="3"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>}

            {singleProduct && <section className="product-container">
                <div className="img-card">
                    <img className="big-img" src={singleProduct.image[0]} alt="" id="featured-image" />

                    <div className="small-Card">

                        {singleProduct.image.map((curImg) => (
                            <img key={'rtytyt'} src={curImg} alt="" className="small-Img" />
                        ))
                        }
                    </div>
                </div>

                <div className="product-info">
                    <h3>{singleProduct.name}</h3>
                    <h5>{singleProduct.price}<del>$170</del></h5>
                    <p>{singleProduct.description}</p>


                    <div className="sizes">
                        <p>Size:</p>
                        <select name="Size" id="size" className="size-option">
                            <option value="xxl">XXL</option>
                            <option value="xl">XL</option>
                            <option value="medium">Medium</option>
                            <option value="small">Small</option>
                        </select>
                    </div>

                    <div className="quantity">
                        <input type="number" value="1" min="1" />
                        <button>Add to Cart</button>
                    </div>

                    <div>
                        <p>Delivery:</p>
                        <p>Free standard shipping on orders over $35 before tax, plus free returns.</p>
                        <div className="delivery">
                            <p>TYPE</p> <p>HOW LONG</p> <p>HOW MUCH</p>
                        </div>
                        <hr />
                        <div className="delivery">
                            <p>Standard delivery</p>
                            <p>1-4 business days</p>
                            <p>$4.50</p>
                        </div>
                        <hr />
                        <div className="delivery">
                            <p>Express delivery</p>
                            <p>1 business day</p>
                            <p>$10.00</p>
                        </div>
                        <hr />
                        <div className="delivery">
                            <p>Pick up in store</p>
                            <p>1-3 business days</p>
                            <p>Free</p>
                        </div>
                    </div>
                </div>
            </section>}
        </>
    )
}

export default ProductDetails;