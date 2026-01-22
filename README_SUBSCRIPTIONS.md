# Subscription & Payment System Setup

This guide explains how to set up the subscription and payment system for Characteria.

## Overview

The subscription system includes:
- **Free Plan**: 2 Characteria creations per rolling 24 hours
- **Pro Monthly**: $9/month, 10 creations per rolling 24 hours

- **Pro Yearly**: $59/year, 15 creations per rolling 24 hours
- **Ultimate Creator**: $399/year, "Unlimited" (100) creations, includes custom services

## Database Setup

1. Run the migration in Supabase SQL Editor:
   ```sql
   -- Copy and paste contents of supabase/migrations/002_create_subscriptions_table.sql
   ```

2. This creates:
   - `subscriptions` table - Stores user subscription info
   - `usage_tracking` table - Tracks daily creation counts
   - `creation_logs` table - Logs all creation attempts
   - Automatic triggers for new user signups

## PayPal Setup

### 1. Create PayPal App

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/)
2. Create a new app
3. Get your **Client ID** and **Client Secret**
4. Note: Use Sandbox for testing, Live for production

### 2. Create Subscription Plans

1. In PayPal Dashboard, go to **Products** > **Subscriptions**
2. Create two subscription plans:
   - **Monthly Plan**: $9/month

   - **Yearly Plan**: $59/year
   - **Ultimate Plan**: $399/year
3. Copy the **Plan IDs** (they start with `P-`)

### 3. Set Up Webhook

1. In PayPal Dashboard, go to **Webhooks**
2. Create a webhook with URL: `https://yourdomain.com/api/paypal/webhook`
3. Subscribe to these events:
   - `BILLING.SUBSCRIPTION.CREATED`
   - `BILLING.SUBSCRIPTION.ACTIVATED`
   - `BILLING.SUBSCRIPTION.CANCELLED`
   - `BILLING.SUBSCRIPTION.EXPIRED`
   - `BILLING.SUBSCRIPTION.SUSPENDED`
   - `PAYMENT.SALE.COMPLETED`
4. Copy the **Webhook ID**

### 4. Environment Variables

Add to your `.env.local`:

```env
# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox  # or "live" for production
PAYPAL_PLAN_ID_MONTHLY=P-XXXXXXXXXXXXX
PAYPAL_PLAN_ID_YEARLY=P-YYYYYYYYYYYYY
PAYPAL_WEBHOOK_ID=your_webhook_id

# App URL (for PayPal redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000  # or your production URL
```

## Usage Limit Logic

The system uses a **rolling 24-hour window**:
- When a user creates their first character, a timer starts
- 24 hours later, the count resets
- This is NOT a midnight reset - it's per-user, per-creation

### How It Works

1. User attempts to create a character
2. Backend checks:
   - Is user authenticated?
   - Is subscription active?
   - Has 24 hours passed since last reset?
   - Is current count below limit?
3. If all checks pass → creation proceeds
4. If limit reached → returns error with upgrade modal

## API Endpoints

### POST `/api/paypal/create-subscription`

Creates a PayPal subscription and returns approval URL.

**Request:**
```json
{
  "planType": "PRO_MONTHLY" | "PRO_YEARLY"
}
```

**Response:**
```json
{
  "subscriptionId": "I-XXXXXXXXXXXXX",
  "approvalUrl": "https://www.paypal.com/..."
}
```

### POST `/api/paypal/webhook`

Handles PayPal webhook events (called by PayPal, not directly).

### POST `/api/process-characters`

Now includes usage limit checks. Returns `USAGE_LIMIT_EXCEEDED` error if limit reached.

## Frontend Components

### UsageIndicator

Shows current usage in top-right corner:
- Displays current count / limit
- Shows progress bar
- Alerts when near/at limit
- Opens upgrade modal when clicked

### UpgradeModal

Modal shown when limit is reached:
- Shows current usage
- Displays upgrade options
- Handles PayPal subscription flow

### Pricing Page

Full pricing page at `/pricing`:
- Shows all plans
- Displays current usage
- Handles subscription creation

## Testing

### Test Free Plan Limits

1. Create 2 characters (should work)
2. Try to create a 3rd (should show upgrade modal)
3. Wait 24 hours or manually reset in database

### Test PayPal Flow

1. Go to `/pricing`
2. Click "Subscribe" on a Pro plan
3. Complete PayPal checkout (sandbox)
4. Verify subscription in database
5. Test that limits are now 10/day

### Test Webhooks

Use PayPal's webhook simulator or ngrok for local testing:
```bash
ngrok http 3000
# Use ngrok URL in PayPal webhook settings
```

## Troubleshooting

### "Failed to create subscription"

- Check PayPal credentials in `.env.local`
- Verify Plan IDs are correct
- Check PayPal app is in correct mode (sandbox/live)

### "Webhook verification failed"

- Verify webhook URL is accessible
- Check webhook ID matches in `.env.local`
- In development, webhook verification is skipped

### "Usage limit not resetting"

- Check `last_reset_at` in `usage_tracking` table
- Verify 24 hours have passed
- Manually reset: `UPDATE usage_tracking SET daily_creation_count = 0, last_reset_at = NOW() WHERE user_id = '...'`

### "Subscription not activating"

- Check webhook is receiving events
- Verify webhook handler is processing events correctly
- Check `subscriptions` table for status

## Security Notes

- **Never trust frontend** - All limits enforced on backend
- **Always verify PayPal webhooks** in production
- **Use HTTPS** for webhook endpoints
- **Log all creation attempts** for auditing
- **Rate limit** subscription creation endpoints

## Future Enhancements

- Add Stripe as alternative payment method
- Implement trial periods
- Add usage analytics dashboard
- Create admin panel for subscription management
- Add email notifications for subscription events
