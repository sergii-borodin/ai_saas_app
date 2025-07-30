# Clerk Integration Setup Guide

This project has been configured with Clerk authentication using the **current App Router approach**. Follow these steps to complete the setup:

## ✅ What's Already Done

1. **Installed** `@clerk/nextjs@latest` package
2. **Created** `middleware.ts` with `clerkMiddleware()` from `@clerk/nextjs/server`
3. **Wrapped** the app with `<ClerkProvider>` in `app/layout.tsx`
4. **Added** Clerk components (`<SignInButton>`, `<SignUpButton>`, `<UserButton>`) to the navbar
5. **Created** sign-in and sign-up pages using Clerk's `<SignIn>` and `<SignUp>` components
6. **Protected** routes using `<SignedIn>` and `<SignedOut>` components

## 🔧 Next Steps

### 1. Create Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Get these values from your Clerk Dashboard: https://dashboard.clerk.com/
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# Optional: Configure your sign-in and sign-up URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### 2. Get Your Clerk Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application or select an existing one
3. Navigate to **API Keys** in the sidebar
4. Copy your **Publishable Key** and **Secret Key**
5. Replace the placeholder values in your `.env.local` file

### 3. Configure Your Application

In your Clerk Dashboard:

1. Go to **User & Authentication** → **Email, Phone, Username**
2. Configure your preferred authentication methods
3. Go to **Paths** to customize your sign-in/sign-up pages if needed

## 🚀 Current Implementation

### Authentication Components

- **Sign In/Up Buttons**: Available in the navbar for unauthenticated users
- **User Button**: Shows user profile and sign-out option for authenticated users
- **Protected Routes**: Companions page shows different content based on authentication status

### Pages Created

- `/sign-in` - Clerk's sign-in page
- `/sign-up` - Clerk's sign-up page
- `/companions` - Protected route example

### Middleware Configuration

The `middleware.ts` file uses the current `clerkMiddleware()` approach with proper matchers for:

- Static files (images, CSS, JS, etc.)
- API routes
- All other routes

## 🔒 Protecting Routes

To protect additional routes, wrap your components with Clerk's authentication components:

```tsx
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function ProtectedPage() {
  return (
    <div>
      <SignedIn>
        {/* Content for authenticated users */}
        <h1>Welcome, authenticated user!</h1>
      </SignedIn>
      <SignedOut>
        {/* Content for unauthenticated users */}
        <h1>Please sign in to access this page</h1>
      </SignedOut>
    </div>
  );
}
```

## 📚 Additional Resources

- [Clerk Next.js Documentation](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Components Reference](https://clerk.com/docs/components/overview)
- [Clerk API Reference](https://clerk.com/docs/references/backend/overview)

## ⚠️ Important Notes

- This implementation uses the **current App Router approach** (not the deprecated Pages Router)
- Uses `clerkMiddleware()` (not the deprecated `authMiddleware()`)
- All imports are from `@clerk/nextjs` or `@clerk/nextjs/server`
- No references to `_app.tsx` or `pages/` directory structure
