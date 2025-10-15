# EMAIL FIX - DO THIS NOW

## ⚡ QUICK FIX:

### Step 1: Update Vercel Environment Variable

Go to: https://vercel.com/yussufgangat-sketchs-projects/true-religion/settings/environment-variables

Find `EMAIL_PASSWORD` → Edit → Change value to:

```
ALC@Capone2025
```

Save it!

### Step 2: Redeploy

After saving the password, redeploy your latest deployment.

## ✅ What I Changed in Code:

- Hardcoded Gmail settings
- Added email verification
- Better error handling
- Uses regular Gmail password: ALC@Capone2025

## 🚀 Then Deploy:

```bash
npm run build
npx vercel --prod --yes
```

## ⚠️ IMPORTANT:

Make sure "Less secure app access" is enabled in your Gmail account OR use the app password with spaces.

If neither works, we'll switch to a different email service (SendGrid/Mailgun).




