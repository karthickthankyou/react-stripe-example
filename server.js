const express = require('express')
const cors = require('cors')
require('dotenv').config()
// TODO: Add stripe key

const { STRIPE_KEY } = process.env
const stripe = require('stripe')(STRIPE_KEY)
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Stripe Example')
})

app.post('/checkout', async (req, res) => {
    try {
        const { product, token } = req.body
        console.log(product)
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const idempotency_key = uuidv4()
        const charge = await stripe.charges.create({
            amount: product.price,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        },
            {
                idempotency_key
            }
        )
        res.json({ success: true, charge })
        console.log(charge)
    } catch (err) {
        console.log(err)
        res.json({ success: false, err })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`App listening at ${process.env.PORT}`)
})
