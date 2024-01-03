import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';


const CartItem = () => {
    return (
        <>
            <div className='cartitems'>
                <div className="cartItems-format-main">
                    <p>Product</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />
                <div>
                    <div className="cartitems-format cartItems-format-main">
                        <img src={''} alt="" className='carticon-product-icon' />
                        <p>smartWatch</p>
                        <p>&#8377;1100</p>
                        <button className='cartitems-quantity'>1</button>
                        <p>&#8377;1100</p>
                        <DeleteIcon className='cartitems-remove-icon' />
                    </div>
                    <hr />
                </div>

                <div className="cartitems-down">
                    <div className="cartitems-total">
                        <h1>Cart Totals</h1>
                        <div>
                            <div className="cartitems-total-item">
                                <p>Subtotal</p>
                                <p>&#8377;1100</p>
                            </div>
                            <hr />
                            <div className="cartitems-total-item">
                                <p>Shipping fee</p>
                                <p>Free</p>

                            </div>
                            <hr />
                            <div className="cartitems-total-item">
                                <h3>Total</h3>
                                <h3>&#8377;1100</h3>
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