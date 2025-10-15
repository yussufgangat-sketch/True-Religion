# Gmail Email Setup for Order Notifications

## ✅ Email Configuration Complete

Your Gmail account is configured: **trdrop2025@gmail.com**

## 🚀 Add Environment Variables to Vercel

Go to your Vercel dashboard and add these environment variables:

1. Go to: https://vercel.com/yussufgangat-sketchs-projects/true-religion/settings/environment-variables

2. Add these variables (one by one):

| Name | Value |
|------|-------|
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | `trdrop2025@gmail.com` |
| `EMAIL_PASSWORD` | `kadqimwxkqscjmhd` (remove spaces) |
| `EMAIL_FROM` | `trdrop2025@gmail.com` |
| `EMAIL_TO` | `trdrop2025@gmail.com` |

3. For each variable:
   - Set Environment: **Production, Preview, Development** (check all)
   - Click **Save**

4. After adding all variables, click **Redeploy** on your latest deployment

## 📧 What Will Happen

When a customer completes an order:
1. **You receive an email** at trdrop2025@gmail.com with:
   - Customer details
   - Order items
   - Shipping address
   - Total amount

2. **Customer receives confirmation** at their email with:
   - Order confirmation
   - Order ID
   - Total amount

## ✅ Email Features

- Professional HTML templates
- Order details table
- Customer information
- Shipping details
- True Religion branding
- Automatic sending

## 🧪 Test It

1. Add products to cart
2. Go through checkout
3. Complete the order
4. Check trdrop2025@gmail.com for the order notification!




