# Security Guide - True Religion Application

## 🔒 Firebase Security Rules Overview

This guide covers the security rules implemented to protect your True Religion e-commerce application.

## 📋 Firestore Security Rules

### User Data Protection
- **User Profiles**: Users can only access their own profile data
- **Orders**: Users can only view and manage their own orders
- **Carts**: Users can only access their own shopping cart
- **Wishlists**: Users can only manage their own wishlist
- **Addresses**: Users can only manage their own addresses
- **Payment Methods**: Users can only access their own payment information

### Product Data
- **Products**: Anyone can read, only admins can modify
- **Categories**: Anyone can read, only admins can modify
- **Inventory**: Anyone can read, only admins can modify

### Reviews & Ratings
- **Reviews**: Anyone can read, users can only write their own
- **Ratings**: Anyone can read, users can only write their own

### Admin Access
- **Admin Settings**: Only admin users can access
- **Analytics**: Only admin users can access

## 📁 Storage Security Rules

### File Upload Restrictions
- **Profile Images**: 5MB max, image files only
- **Product Images**: 10MB max, image files only
- **Category Images**: 5MB max, image files only
- **Receipts**: 2MB max, PDF or image files
- **User Uploads**: 10MB max, images, PDFs, or text files

### Access Control
- **User Files**: Users can only access their own files
- **Product Images**: Anyone can view, only admins can upload
- **Admin Files**: Only admin users can access

## 🛡️ Security Best Practices

### 1. Authentication
```javascript
// Always check authentication before accessing data
if (!auth.currentUser) {
  // Redirect to login or show error
}
```

### 2. Data Validation
```javascript
// Validate data before writing to Firestore
const validateUserData = (data) => {
  if (!data.email || !data.name) {
    throw new Error('Missing required fields');
  }
  return data;
};
```

### 3. Input Sanitization
```javascript
// Sanitize user inputs to prevent XSS
const sanitizeInput = (input) => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};
```

### 4. Rate Limiting
```javascript
// Implement rate limiting for API calls
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
};
```

## 🔐 Environment Variables Security

### Required Environment Variables
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Security Keys (if needed)
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
```

### Security Notes
- ✅ `NEXT_PUBLIC_` variables are safe to expose in browser
- ❌ Never expose server-side secrets with `NEXT_PUBLIC_`
- 🔒 Keep `.env.local` file secure and never commit to git

## 🚨 Security Checklist

### Before Deployment
- [ ] Firebase security rules are deployed
- [ ] Storage rules are configured
- [ ] Authentication is enabled
- [ ] Environment variables are set
- [ ] HTTPS is enabled
- [ ] CORS is configured properly

### Regular Security Audits
- [ ] Review user permissions monthly
- [ ] Monitor Firebase usage logs
- [ ] Check for suspicious activity
- [ ] Update dependencies regularly
- [ ] Review security rules quarterly

## 🛠️ Admin User Setup

### Creating Admin Users
1. Create a custom claim for admin users:
```javascript
// In Firebase Functions or Admin SDK
admin.auth().setCustomUserClaims(uid, {admin: true});
```

2. Verify admin status in your app:
```javascript
const isAdmin = user?.token?.admin === true;
```

## 📊 Monitoring & Logging

### Firebase Analytics
- Track user behavior
- Monitor authentication events
- Log security incidents

### Error Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor failed authentication attempts
- Track unusual data access patterns

## 🔧 Security Tools

### Recommended Tools
- **Firebase Security Rules Simulator**: Test your rules
- **Firebase Emulator**: Local development with security
- **Firebase CLI**: Deploy rules and functions
- **Security Headers**: Implement CSP, HSTS, etc.

### Testing Security Rules
```bash
# Test Firestore rules
firebase emulators:start --only firestore

# Test Storage rules
firebase emulators:start --only storage
```

## 🚀 Deployment Security

### Production Checklist
- [ ] Enable Firebase App Check
- [ ] Configure domain allowlist
- [ ] Set up monitoring alerts
- [ ] Enable audit logging
- [ ] Configure backup strategies

### Domain Security
```javascript
// Configure allowed domains
const allowedDomains = [
  'yourdomain.com',
  'www.yourdomain.com'
];
```

## 📞 Security Support

### Emergency Contacts
- Firebase Support: https://firebase.google.com/support
- Security Issues: Report to Firebase Security Team
- Documentation: https://firebase.google.com/docs/rules

### Incident Response
1. **Immediate**: Disable affected features
2. **Investigate**: Review logs and identify cause
3. **Fix**: Apply security patches
4. **Notify**: Inform users if necessary
5. **Prevent**: Update security measures

---

**Remember**: Security is an ongoing process. Regularly review and update your security measures to protect your users and data.
