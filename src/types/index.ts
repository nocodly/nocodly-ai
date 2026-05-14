export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: "starter" | "pro";
  status: "active" | "canceled" | "past_due" | "trialing";
  stripe_subscription_id: string;
  stripe_customer_id: string;
  current_period_end: string;
  created_at: string;
}

export interface Generation {
  id: string;
  user_id: string;
  prompt: string;
  output: string;
  model: string;
  tokens_used: number;
  created_at: string;
}

export interface UsageStats {
  total_generations: number;
  tokens_used: number;
  tokens_limit: number;
  generations_limit: number;
  plan: "free" | "starter" | "pro";
}
