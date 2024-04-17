import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaPaypal } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import{useNavigate} from 'react-router-dom';


const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate=useNavigate();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if(typeof price !=='number' ||price<1){
      //console.log("Price is not a  number or less than ")
      return;

    }
    // Fetch client secret from the server
    axiosSecure.post('/create-payment-intent', { price })
      .then(res => {
        ///console.log(res.data)
        

        setClientSecret(res.data.clientSecret);
      })
      .catch(error => {
        console.error('Error fetching client secret:', error);
      });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message);
     
    }else{
      setCardError("Success")
    }

    // Handle payment confirmation
    try {
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || 'anonymous',
              email: user?.email || 'unknown'
            },
          },
        },
      );

      if (confirmError) {
        //console.log(confirmError)
        setCardError(confirmError.message);
        //return;
      }
      //console.log(paymentIntent)
      if(paymentIntent.status==='succeeded'){
        console.log(paymentIntent.id)
        setCardError(`Your transaction id is ${paymentIntent.id}`)
        // payment info
        const paymentInfo={
          email:user.email,
          transitionId:paymentIntent.id,
            price,
            quantity:cart.length,
            status:"Order Pending",
            itemName:cart.map(item=>item.name),
            cartItems:cart.map(item=>item._id),
            menuItems:cart.map(item=>item.menuItemId)
        }
        console.log(paymentInfo)
        // send info backend
        axiosSecure.post('/payment',paymentInfo)
        .then(res=>{
          console.log(res.data)
          alert("Payment SuccesFull")
          navigate('/order')
          

        })

      };

     // console.log('[PaymentMethod]', paymentMethod);
    } catch (confirmationError) {
      console.error('Error confirming card payment:', confirmationError);
      setCardError('An error occurred while processing your payment. Please try again.');
    }
  };

  return (
    <div className='flex flex-col sm:flex-row justify-start gap-8'>
    {/* left */}
    <div className='md:w1/2 w-full space-y-3'>
      <h4 className='text-lg font-semibold'>Order Summary</h4>
      <p>Total Price: ${price}</p>
      <p>Number of Items: {cart.length}</p>
    </div>
    {/* right */}
    <div className='md:w1/2 w-full py-8 space-y-5 card shrink-0 max-w-sm shadow-2xl bg-base-100'>
      <h4 className='text-lg font-semibold'>Process Payment</h4>
      <h5 className=' font-medium'>Credit/Debit Card</h5>
      {/* form */}
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe} className='btn mt-5 text-white bg-green w-full'>
          Pay with Card
        </button>
        {setCardError && <p className="text-red-600">{cardError}</p>}
      </form>
      {/* PayPal */}
      <div className='mt-5 text-center'>
        <hr />
        <button type="button" className='btn mt-5 text-white bg-orange-500'>
          <FaPaypal /> Pay with PayPal
        </button>
      </div>
    </div>
  </div>
  );
};

export default CheckoutForm;
