import Stripe from "stripe";

export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia",
  });
}

export const PLANS = {
  starter: {
    name: "Starter",
    price: 9,
    priceId: process.env.STRIPE_STARTER_PRICE_ID ?? "",
    tokens: 50000,
    generations: 100,
    features: [
      "100 AI generations/month",
      "50K tokens included",
      "GPT-4o Mini model",
      "Save & export history",
      "Email support",
    ],
  },
  pro: {
    name: "Pro",
    price: 29,
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? "",
    tokens: 250000,
    generations: 500,
    features: [
      "500 AI generations/month",
      "250K tokens included",
      "GPT-4o model",
      "Priority processing",
      "API access",
      "Priority support",
    ],
  },
};
