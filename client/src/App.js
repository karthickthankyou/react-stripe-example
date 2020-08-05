import React, { useState } from 'react'
import axios from 'axios'
import StripeCheckout from "react-stripe-checkout"

import './App.css'

function App() {
  const [product] = useState({
    name: 'Magic Pencil',
    price: 2300,
    description: 'This pencil brings drawn things to life.'
  })

  const handleToken = async (token) => {
    const response = await axios.post(process.env.REACT_APP_SERVER_CHECKOUT_URL, {
      token,
      product
    })

    const { status } = response.data
    if (status == 'success') {
      console.log('Success', response.data)
    } else {
      console.log('Error', response.data)
    }
  }

  return (
    <div className="App">
      Magic Pencil
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
        token={handleToken}
        amount={product.price * 100}
        name={product.name}
        billingAddress
        shippingAddress
      />
    </div>
  )
}

export default App
