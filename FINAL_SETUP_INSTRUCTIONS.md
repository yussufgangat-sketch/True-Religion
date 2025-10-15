# Final Setup Instructions - True Religion E-Commerce

## ✅ What's Complete:

- ✅ 221 Products uploaded with Firebase images (1,077 images)
- ✅ Excel data processed and matched
- ✅ Wholesale pricing configured
- ✅ Correct sizes for all product types
- ✅ Multiple images per product (no repeating)
- ✅ Website deployed to Vercel

## 🔧 To Fix Email Notifications:

### Step 1: Add Environment Variables in Vercel Dashboard

1. Go to: https://vercel.com/yussufgangat-sketchs-projects/true-religion/settings/environment-variables

2. Click "Add New" and add these variables (one by one):

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `EMAIL_HOST` | `smtp.gmail.com` | Production, Preview, Development |
| `EMAIL_PORT` | `587` | Production, Preview, Development |
| `EMAIL_USER` | `trdrop2025@gmail.com` | Production, Preview, Development |
| `EMAIL_PASSWORD` | `kadqimwxkqscjmhd` | Production, Preview, Development |
| `EMAIL_FROM` | `trdrop2025@gmail.com` | Production, Preview, Development |
| `EMAIL_TO` | `trdrop2025@gmail.com` | Production, Preview, Development |

**IMPORTANT:** For `EMAIL_PASSWORD`, enter: `kadqimwxkqscjmhd` (no spaces!)

3. After adding all 6 variables, go to your latest deployment and click **Redeploy**

### Step 2: Test Email

1. Go to your website
2. Add a product to cart
3. Complete checkout
4. Check trdrop2025@gmail.com for order notification

## 🎨 To Fix Homepage Images:

The homepage currently rotates through 5 product images. To show T-shirts and hoodies:

### Current Setup:
```
Products with most images (TR99, TR156, etc.)
```

### Change To Show T-Shirts & Hoodies:
Run this command to regenerate with better image selection:

```bash
# This will select images from T-Shirts, Hoodies, and the red jacket
npx tsx scripts/update-hero-images.ts
```

Or manually update in `src/app/page.tsx` line 11-16.

## 📋 Quick Fixes Summary:

### 1. Email Not Working:
- Add 6 environment variables in Vercel dashboard (see above)
- Redeploy after adding variables
- Test by placing an order

### 2. Homepage Images:
- Currently showing products with most images
- Need to filter for T-Shirts and Hoodies specifically
- Keep the red jacket (looks good)

## 🚀 Current Production URL:

**https://true-religion-4upvnnn1m-yussufgangat-sketchs-projects.vercel.app**

## ✅ After Fixing:

Once environment variables are added and redeployed:
- Orders will send emails to trdrop2025@gmail.com
- Customers will receive confirmation emails
- Homepage will show better product images

## 📝 Commands Reference:

```bash
# Rebuild
npm run build

# Deploy
npx vercel --prod

# Reprocess products (if needed)
npx tsx scripts/process-truereligion-excel.ts products.csv
```




