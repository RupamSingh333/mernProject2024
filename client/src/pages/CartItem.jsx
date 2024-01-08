import React, { useState, useEffect, useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../store/auth';
import Swal from 'sweetalert2';
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const CartItem = () => {

    const { token, API_BASE_URL, addToCart, cartCount } = useContext(AuthContext);
    const [cartItemDetail, setCartItemDetail] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    // console.log(singleItem);

    const increaseCartItem = async (productId) => {
        const response = await addToCart({
            "quantity": 1,
            "productId": productId
        });
        fetchCartItems();
        if (response.ok) {
            const completeRes = await response.json();
        } else {
            const errorResponse = await response.json();
        }
    };

    const decreaseCartItem = async (_id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/decrease-cart-item?_id=${_id}`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                },
            });
            fetchCartItems()
            if (response.ok) {
                const completeRes = await response.json();
                cartCount();
            } else {
                const errorResponse = await response.json();
            }
        } catch (error) {
            console.log("Error on decreaseCartItem function", error);
        }
    };

    const fetchCartItems = async () => {
        try {
            const response = await fetch(API_BASE_URL + "/get-cart-item-details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });
            if (response.ok) {
                const completeRes = await response.json();
                const cartData = completeRes.data;
                // console.log(cartData[1].grandTotal);
                setGrandTotal(cartData[1].grandTotal);
                setCartItemDetail(cartData);
            } else {
                const errorResponse = await response.json();
            }
        } catch (error) {
            console.log("Error on fetchCartItems function", error);
        }
    };

    const deleteCartItem = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:5000/api/delete-cart-item?_id=${_id}`, {
                        method: "GET",
                        headers: {
                            "Authorization": token,
                        },
                    });

                    if (response.ok) {
                        const completeRes = await response.json();
                        Swal.fire({
                            title: "Deleted!",
                            text: completeRes.message,
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        const errorResponse = await response.json();
                        Swal.fire({
                            title: "Deleted!",
                            text: errorResponse.message,
                            icon: "error",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } catch (error) {
                    console.log("Error on deleteCartItem function:", error);
                    Swal.fire({
                        title: "Deleted!",
                        text: error,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    };

    useEffect(() => {
        fetchCartItems();
    }, [])
    // console.log(cartItemDetail[1].grandTotal);

    return (
        <>
            <div className='cartitems'>
                <div className="cartItems-format-main">
                    <p>Image</p>
                    <p>Product Name</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />
                <div>
                    {cartItemDetail[0] &&
                        cartItemDetail[0]['cartitem'].map((eachElement, index) => {
                            const { productId, _id } = eachElement;
                            return (

                                <div className="cartitems-format cartItems-format-main" key={index}>
                                    <img src={eachElement.productImage} alt="product image" className='carticon-product-icon' />
                                    <p>{eachElement.productName}</p>
                                    <p>&#8377;{eachElement.productPrice}</p>
                                    <p>
                                        <span><CiCircleMinus className='qty' onClick={() => { decreaseCartItem(_id) }} /></span>
                                        <span className='qty-num'>{eachElement.quantity}</span>
                                        <span><CiCirclePlus className='qty' onClick={() => { increaseCartItem(productId) }} /></span>
                                    </p>
                                    <p>&#8377;{eachElement.quantity * eachElement.productPrice}</p>
                                    <DeleteIcon onClick={() => deleteCartItem(eachElement._id)} className='delete-icon' />
                                </div>
                            )
                        })
                    }
                    <hr />
                </div>

                <div className="cartitems-down">
                    <div className="cartitems-total">
                        <h1>Cart Totals</h1>
                        <div>
                            <div className="cartitems-total-item">
                                <p>Subtotal</p>
                                <p>&#8377;{grandTotal && grandTotal}</p>
                            </div>
                            <hr />
                            <div className="cartitems-total-item">
                                <p>Shipping fee</p>
                                <p>Free</p>

                            </div>
                            <hr />
                            <div className="cartitems-total-item">
                                <h3>Total</h3>
                                <h3>&#8377;{grandTotal && grandTotal}</h3>
                            </div>
                        </div>
                        <button>Checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem