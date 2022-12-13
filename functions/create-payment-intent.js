// domain/.netlify/functions/hello
require("dotenv").config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  const { total, cartItems, user } = JSON.parse(event.body);
  // console.log(cartItems[0][0].name + cartItems[0][0].amount);
  let cartDesc = [];
  cartItems.map((item) => {
    console.log(item[0].name);

    cartDesc.push(`${item[0].name + " " + item[0].amount}`);
  });
  console.log(typeof cartDesc.join(" "));

  if (event.body) {
    try {
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: "cad",
        description: cartDesc.join("+"),
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          clientSecret: paymentIntent.client_secret,
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: "create payemnt intent",
  };
};
