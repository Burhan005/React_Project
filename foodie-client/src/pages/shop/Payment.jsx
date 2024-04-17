import React from 'react'
import{Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import useCart from '../../hooks/useCart';


const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);

//console.log(stripePromise)
const Payment = () => {
    const [cart]=useCart();
    //console.log(cart)
    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
      };
    // calculate ammmount
    const cartTotal = cart.reduce((total, item) => {
        return total + calculateTotalPrice(item);
      }, 0);
   const total=parseFloat(cartTotal.toFixed(2))
   //console.log(total)
  return (
    <div className='section-container py-28'>
       <Elements stripe={stripePromise}>
      <CheckoutForm price={total} cart={cart} />
    </Elements>
    </div>
  )
}

export default Payment
