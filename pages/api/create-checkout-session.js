import Stripe from 'stripe';
import axios from 'axios';

const stripe = new Stripe("sk_test_51P5uDeP84FUA7AxbkbP6dHQmbtL2VtyZlm60sP2E5rge9pICEzRgYqRL27nCSzZ7XQyZ9xIy5tx4K8n1TkTGRhCq004p0A8P4u");

export default async (req, res) => {
  try {
    const userId = req.query.userId;
    const token = req.query.token;

    const axiosOptions = {
      headers: {
        Authorization: `${token}`
      }
    };

    const clientPlanResponse = await axios.get(`http://localhost:8000/plans/getPlanByclientId/${userId}`, axiosOptions);
    const planId = clientPlanResponse.data.plan_id;

    const planResponse = await axios.get(`http://localhost:8000/plans/getPlanById/${planId}`, axiosOptions);
    const prixAsString = planResponse.data.prix;
    const prix = parseInt(prixAsString, 10);

    if (isNaN(prix)) {
      throw new Error('Le prix renvoyé par l\'API n\'est pas un entier valide');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Renouvelement du plan SMS',
          },
          unit_amount: prix,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `http://localhost:3002/dashboardpage?success=true`, // Pass planId and payment method to success URL
      cancel_url: `http://localhost:3002/`,
    });

    if (session) {
      res.json({ id: session.id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la création de la session de paiement' });
  }
};
