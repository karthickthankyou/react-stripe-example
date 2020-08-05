import React, { useState } from 'react'
import axios from 'axios'
import StripeCheckout from "react-stripe-checkout"
import { CopyToClipboard } from 'react-copy-to-clipboard'


import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [products] = useState([
    {
      name: 'Magic Pencil',
      price: 350,
      description: 'This pencil brings drawn things to life.',
      image: require('./asset/img/pencil.jpg')
    },
    {
      name: 'Magic Cycle',
      price: 52300,
      description: 'This cycle will take you to the moon.',
      image: require('./asset/img/cycle.jpg')
    },
    {
      name: 'Magic Umbrella',
      price: 2300,
      description: 'This pencil brings drawn things to life.',
      image: require('./asset/img/umbrella.jpg')
    },
    {
      name: 'Magic Umbrella',
      price: 2300,
      description: 'This pencil brings drawn things to life.',
      image: require('./asset/img/umbrella.jpg')
    },
  ])

  const handleToken = async (token, product) => {
    const response = await axios.post(process.env.REACT_APP_SERVER_CHECKOUT_URL, {
      token,
      product
    })

    const { success } = response.data
    if (success) {
      console.log('Success', response.data)
      // NotificationManager.info('Payment successful')
      toast.success('🦄 Payment Successful')
    } else {
      console.log('Error', response.data)
      toast.error('Payment Failed')
    }
  }

  const copyCardNumber = (phoneNumber) => {
    toast.info(`Card number ${phoneNumber} copied.`)
  }

  return (


    <div>
      <div className="container">
        {
          products.map(product => (
            <div className="card">
              <img src={product.image} alt="Avatar" style={{ width: "100%" }} />
              <h4><b>{product.name}</b></h4>
              <p>${product.price / 100}</p>

              <StripeCheckout
                stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                token={(token) => handleToken(token, product)}
                amount={product.price}
                name={product.name}
                billingAddress
                shippingAddress
              />
            </div>)
          )
        }
        <ToastContainer position="top-right" autoClose={3000} />


      </div>
      <div className="card_hint">
        <h1>Card Numbers</h1>
        <CopyToClipboard text="4242424242424242"
          onCopy={() => toast.info(`Card number 4242424242424242 copied.`)}>
          <button>Copy valid card number</button>
        </CopyToClipboard>
        <CopyToClipboard text="4000008260003178"
          onCopy={() => toast.info(`Card number 4000008260003178 copied.`)}>
          <button>Copy invalid card number</button>
        </CopyToClipboard>





      </div>
    </div>
  )
}

export default App



