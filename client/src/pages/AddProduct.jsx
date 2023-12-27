import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../store/auth"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
    const { token } = useContext(AuthContext);

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        categoryId: "",
        subCategoryId: "",
        companyId: ""
    });
    // lets tackle our handleInput
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setProduct({
            ...product,
            [name]: value,
        });
    };

    const fileHandleInput = (e) => {
        let name = e.target.name;
        let value = e.target.files[0];
        setProduct({
            ...product,
            [name]: value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(product);
        // return false;

        try {
            const formData = new FormData();
            formData.append("name", product.name);
            formData.append("price", product.price);
            formData.append("description", product.description);
            formData.append("image", product.image);
            formData.append("categoryId", product.categoryId);
            formData.append("subCategoryId", product.subCategoryId);
            formData.append("companyId", product.companyId);


            const response = await fetch("http://localhost:5000/api/create-product", {
                method: 'POST',
                headers: {
                    "Authorization": token,
                },
                body: formData,
            });

            if (response.ok) {
                const completeRes = await response.json();
                setProduct({
                    name: "",
                    price: "",
                    description: "",
                    image: "",
                    categoryId: "",
                    subCategoryId: "",
                    companyId: ""
                })
                toast.success(
                    completeRes.message
                );
            } else {
                const errorResponse = await response.json();
                toast.error(
                    errorResponse.message
                );
            }

        } catch (error) {
            console.log("error in AddProduct page", error);
            toast.error("An unexpected error occurred.");
        }

    };


    // handle fomr getFormSubmissionInfo

    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Add Product</h1>
                </div>
                {/* contact page main  */}
                <div className="container grid grid-two-cols">
                    <div className="contact-img">
                        <img src="/images/support.png" alt="we are always ready to help" />
                    </div>

                    {/* contact form content actual  */}
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="off"
                                    value={product.name}
                                    onChange={handleInput}
                                    placeholder="Name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    autoComplete="off"
                                    value={product.price}
                                    onChange={handleInput}
                                    placeholder="Price"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="image">Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={fileHandleInput}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="category">Category</label>
                                <select name="categoryId" id="categoryId" required onChange={handleInput}>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="subCategory">Sub Category</label>
                                <select name="subCategoryId" id="subCategoryId" required onChange={handleInput}>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="company">Company</label>
                                <select name="companyId" id="companyId" required onChange={handleInput}>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    autoComplete="off"
                                    value={product.description}
                                    onChange={handleInput}
                                    placeholder="description write here..."
                                    required
                                    cols="30"
                                    rows="6"
                                ></textarea>
                            </div>


                            <div>
                                <button type="submit">Add</button>
                            </div>
                        </form>
                    </section>
                </div>

                <section className="mb-3">


                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.757969317278!2d75.76627951115248!3d26.847649362786154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5dc708acf6d%3A0x539c5582951a6645!2sDAAC%20-%20Training%20and%20Development%20Course%20%7C%20Industrial%20Training%20%7C%20Programming%20training!5e0!3m2!1sen!2sin!4v1702324725001!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </section>
            </section>
        </>
    )
}

export default AddProduct