import React, { useEffect, useState } from 'react';

import axios from 'axios';

import './Home.css';

function Home() {

    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(() => {

        axios.get(
            'http://localhost:5000/api/products'
        )
        .then((res) => {

            setProducts(res.data);

        });

    }, []);

    const addToCart = (product) => {

        setCart([...cart, product]);

        alert('Added To Cart');
    };

    const placeOrder = async () => {

        try {

            await axios.post(
                'http://localhost:5000/api/orders',
                {

                    userId: '12345',

                    products: cart,

                    total: cart.reduce(
                        (total, item) =>
                            total + item.price,
                        0
                    )
                }
            );

            alert('Order Placed Successfully');

            setCart([]);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className='container'>

            <h1 className='title'>
                E-Commerce Store
            </h1>

            <h2 style={{ color:'white' }}>
                Cart Items: {cart.length}
            </h2>

            <div className='product-container'>

                {
                    products.map((product) => (

                        <div
                            className='card'
                            key={product._id}
                        >

                            <img
                                src={product.image}
                                alt=''
                                className='image'
                            />

                            <h2>{product.name}</h2>

                            <p className='price'>
                                ₹ {product.price}
                            </p>

                            <p className='desc'>
                                {product.description}
                            </p>

                            <button
                                className='btn'
                                onClick={() =>
                                    addToCart(product)
                                }
                            >
                                Add To Cart
                            </button>

                        </div>
                    ))
                }

            </div>

            <button
                className='btn'
                style={{ marginTop:'40px' }}
                onClick={placeOrder}
            >
                Place Order
            </button>

        </div>
    );
}

export default Home;