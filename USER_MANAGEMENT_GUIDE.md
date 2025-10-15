# User Management System Guide

## Overview
The True Religion e-commerce platform now includes a comprehensive user management system for administrators to manage user accounts, emails, and passwords.

## Features

### 🔐 Authentication System
- **Admin Login**: Secure login system for administrators
- **Role-based Access**: Different permission levels (Admin/User)
- **Session Management**: Persistent login sessions
- **Password Protection**: Secure password storage

### 👥 User Management
- **Add Users**: Create new user accounts with email and password
- **Edit Users**: Update user information, roles, and status
- **Delete Users**: Remove user accounts
- **User Roles**: Admin and User permission levels
- **Status Management**: Activate/deactivate user accounts

### 📊 Admin Dashboard
- **Statistics Overview**: Total users, active users, orders, inventory
- **Quick Actions**: Direct access to common administrative tasks
- **Navigation**: Easy access to all admin features

## Getting Started

### 1. Initialize Admin Users
Run the following command to create default admin accounts:

```bash
npm run init-admin-users
```

This creates three default users:
- **Admin**: `admin@truereligion.com` / `admin123`
- **Manager**: `manager@truereligion.com` / `manager123`
- **User**: `user@truereligion.com` / `user123`

### 2. Access Admin Panel
Navigate to `/admin/login` to access the admin login page.

### 3. Login and Manage Users
1. Enter your credentials
2. Access the dashboard at `/admin`
3. Navigate to "Users" to manage user accounts

## Admin Panel Structure

### 📁 File Structure
```
src/app/admin/
├── layout.tsx              # Admin layout with authentication
├── page.tsx                # Admin dashboard
├── login/page.tsx          # Admin login page
└── users/page.tsx          # User management page

src/app/api/
├── auth/login/route.ts     # Authentication API
└── admin/users/route.ts    # User CRUD operations
```

### 🔧 API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
  - Body: `{ email, password }`
  - Returns: `{ success, user }`

#### User Management
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users` - Update user
- `DELETE /api/admin/users?id={id}` - Delete user

## User Roles

### 👑 Admin Role
- Full access to all admin features
- Can manage other users
- Access to all dashboard features
- Can modify inventory and orders

### 👤 User Role
- Limited access to admin features
- Cannot manage other users
- Basic dashboard access

## Security Features

### 🔒 Authentication
- Email and password validation
- Active user status checking
- Session management with localStorage
- Automatic logout on invalid sessions

### 🛡️ Data Protection
- Secure password storage
- Role-based access control
- Input validation and sanitization
- Error handling and logging

## Usage Examples

### Adding a New User
1. Navigate to `/admin/users`
2. Click "Add User"
3. Fill in the form:
   - Email: `newuser@example.com`
   - Password: `securepassword123`
   - Role: `Admin` or `User`
   - Status: `Active`
4. Click "Add User"

### Editing a User
1. Go to `/admin/users`
2. Click "Edit" next to the user
3. Modify the information
4. Click "Update User"

### Deleting a User
1. Go to `/admin/users`
2. Click "Delete" next to the user
3. Confirm the deletion

## Navigation

### Admin Menu
- **Dashboard**: Overview and statistics
- **Users**: User management
- **Inventory**: Stock management
- **Upload Images**: Image management
- **Upload Folders**: Bulk image uploads
- **Bulk Upload**: Mass upload operations
- **Firebase Upload**: Firebase storage management

## Troubleshooting

### Common Issues

#### Login Issues
- Verify email and password are correct
- Check if user account is active
- Clear browser localStorage if needed

#### Permission Errors
- Ensure user has admin role
- Check if user account is active
- Verify session is valid

#### Data Not Loading
- Check Firebase connection
- Verify database permissions
- Check browser console for errors

## Database Schema

### Users Collection
```typescript
interface User {
  id: string;           // Document ID
  email: string;        // User email
  password: string;     // User password
  role: 'admin' | 'user'; // User role
  isActive: boolean;    // Account status
  createdAt: string;    // Creation timestamp
  lastLogin?: string;   // Last login timestamp
  updatedAt?: string;   // Last update timestamp
}
```

## Best Practices

### Security
- Use strong passwords
- Regularly update user credentials
- Monitor user activity
- Deactivate unused accounts

### User Management
- Assign appropriate roles
- Keep user information updated
- Regular cleanup of inactive users
- Document user permissions

## Support

For issues or questions regarding the user management system:
1. Check the browser console for errors
2. Verify Firebase connection
3. Ensure proper permissions are set
4. Contact system administrator

---

**Note**: This system is designed for internal use only. Ensure proper security measures are in place before deploying to production.



