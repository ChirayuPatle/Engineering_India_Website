# UploadThing Setup Guide

This guide will help you set up UploadThing for payment screenshot uploads in the EI Website project.

## 🚀 Quick Setup

### 1. Get Your UploadThing API Key

1. Visit [uploadthing.com](https://uploadthing.com)
2. Sign up or log in with your account
3. Create a new app or select an existing one
4. Go to the **API Keys** section
5. Copy your **Secret Key** (it starts with `sk_...`)

### 2. Add Environment Variable

Add the following to your `.env` file:

```bash
UPLOADTHING_TOKEN=your_uploadthing_secret_key_here
```

Replace `your_uploadthing_secret_key_here` with your actual UploadThing secret key.

### 3. Restart Your Development Server

After adding the environment variable, restart your Next.js development server:

```bash
pnpm dev
```

## ✅ What's Already Configured

The following files have been set up for you:

### Core Configuration
- **`src/lib/uploadthing.ts`** - UploadThing client components (UploadButton, UploadDropzone)
- **`src/app/api/uploadthing/core.ts`** - File upload configuration and middleware
- **`src/app/api/uploadthing/route.ts`** - API route handler

### Integration Points
- **Hackathon Registration Form** - Uses UploadButton for payment screenshot uploads
- **Payment Display** - Shows uploaded screenshots in payment cards
- **Dashboard** - Displays hackathon registrations with payment screenshots

## 📝 How It Works

### Upload Flow

1. **User uploads file** via UploadButton in registration form
2. **Authentication check** - Middleware verifies user is logged in
3. **File upload** - File is uploaded to UploadThing's CDN
4. **URL storage** - File URL is saved in database
5. **Display** - Screenshot is shown in payment cards and dashboard

### File Constraints

- **Allowed file types**: Images (JPG, PNG)
- **Max file size**: 4MB
- **Max files per upload**: 1

### Security

- **Authentication required** - Only logged-in users can upload
- **User-scoped uploads** - Each upload is associated with the uploading user
- **Secure URLs** - Files are stored on UploadThing's secure CDN

## 🔧 Customization

### Change File Size Limit

Edit `src/app/api/uploadthing/core.ts`:

```typescript
paymentScreenshot: f({
  image: { maxFileSize: "8MB", maxFileCount: 1 }, // Changed to 8MB
})
```

### Add PDF Support

Edit `src/app/api/uploadthing/core.ts`:

```typescript
paymentScreenshot: f({
  image: { maxFileSize: "4MB" },
  pdf: { maxFileSize: "4MB" },
  maxFileCount: 1,
})
```

### Customize Upload Button Appearance

Edit `src/app/events/hackathon/register/page.tsx`:

```tsx
<UploadButton
  endpoint="paymentScreenshot"
  appearance={{
    button: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg",
    allowedContent: "text-gray-600 text-sm",
  }}
  // ...other props
/>
```

## 🐛 Troubleshooting

### "Missing UPLOADTHING_TOKEN" Error

**Solution**: Make sure you've added `UPLOADTHING_TOKEN` to your `.env` file and restarted your dev server.

### "Unauthorized" Error During Upload

**Solution**: Ensure the user is logged in before accessing the upload page. The middleware checks for authentication.

### Upload Fails Silently

**Solution**: Check the browser console for errors. Common issues:
- File too large (max 4MB)
- Wrong file type (only JPG, PNG allowed)
- Network issues

### Uploaded Images Not Showing

**Solution**: 
1. Check that `paymentScreenshotUrl` is being saved in the database
2. Verify the URL is valid and accessible
3. Check browser console for CORS or loading errors

## 📚 Additional Resources

- [UploadThing Documentation](https://docs.uploadthing.com)
- [UploadThing React Documentation](https://docs.uploadthing.com/getting-started/react)
- [Next.js App Router Integration](https://docs.uploadthing.com/getting-started/appdir)

## 💡 Tips

1. **Test in development** - Upload a few test images to verify everything works
2. **Monitor usage** - Check your UploadThing dashboard for storage usage
3. **Set up webhooks** - Configure webhooks in UploadThing dashboard for advanced features
4. **Rate limiting** - UploadThing has built-in rate limiting to prevent abuse

## 🆘 Need Help?

If you encounter issues:
1. Check the UploadThing [Discord server](https://discord.gg/uploadthing)
2. Review the [troubleshooting guide](https://docs.uploadthing.com/errors)
3. Check this project's GitHub issues

---

**Note**: The free tier of UploadThing includes 2GB storage and 10GB bandwidth per month, which should be sufficient for most use cases.
