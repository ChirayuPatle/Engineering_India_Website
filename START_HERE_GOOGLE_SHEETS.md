# 🎉 Google Sheets Integration - Start Here!

## What's New?

Your hackathon registrations now **automatically sync to Google Sheets** in real-time! 🚀

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create new sheet: "Hackathon Registrations"
3. Rename Sheet1 to "Registrations"

### Step 2: Add Headers
Copy this to Row 1 of your sheet:
```
Registration ID | Timestamp | Team Name | Leader Name | Leader Email | Leader Phone | Leader Gender | Institute | Branch | Year | Team Size | Member 1 Name | Member 1 Email | Member 1 Phone | Member 1 Gender | Member 1 Branch | Member 1 Year | Member 2 Name | Member 2 Email | Member 2 Phone | Member 2 Gender | Member 2 Branch | Member 2 Year | Member 3 Name | Member 3 Email | Member 3 Phone | Member 3 Gender | Member 3 Branch | Member 3 Year | Transaction ID | Payment Screenshot URL | Status
```

### Step 3: Setup Apps Script
1. In your sheet: **Extensions** → **Apps Script**
2. Copy ALL code from: **`google-apps-script.gs.txt`**
3. Paste into Apps Script editor
4. Click **Save** (💾)

### Step 4: Deploy
1. Click **Deploy** → **New deployment**
2. Choose **Web app**
3. Set "Who has access" to **Anyone**
4. Click **Deploy** and authorize
5. **Copy the Web App URL**

### Step 5: Configure
1. Open your `.env` file
2. Find: `GOOGLE_SHEETS_WEBAPP_URL=`
3. Paste your Web App URL after the `=`
4. Save file
5. Restart your dev server: `pnpm dev`

### Step 6: Test
1. Register a test hackathon team
2. Check your Google Sheet
3. 🎉 Data should appear instantly!

## 📚 Need More Help?

### Quick References
- 📖 **[GOOGLE_SHEETS_QUICKSTART.md](./GOOGLE_SHEETS_QUICKSTART.md)** - Detailed 5-min guide
- ✅ **[GOOGLE_SHEETS_TESTING_CHECKLIST.md](./GOOGLE_SHEETS_TESTING_CHECKLIST.md)** - Testing checklist

### Detailed Guides
- 📘 **[GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)** - Complete setup + troubleshooting
- 📙 **[GOOGLE_SHEETS_INTEGRATION.md](./GOOGLE_SHEETS_INTEGRATION.md)** - Technical documentation
- 📋 **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What was built

### Code Files
- 📄 **`google-apps-script.gs.txt`** - Apps Script code (copy this to Google)
- 💻 **`src/lib/google-sheets.ts`** - TypeScript sync utility
- 🔌 **`src/app/api/hackathon/register/route.ts`** - API integration

## ❓ Troubleshooting

### No data in sheet?
1. ✅ Check Web App URL is correct in `.env`
2. ✅ Apps Script deployed with "Anyone" access
3. ✅ Dev server restarted after adding URL
4. ✅ Sheet named exactly "Registrations"

### Authorization error?
1. Redeploy Apps Script
2. Set "Who has access" to **Anyone**
3. Reauthorize when prompted

### Still stuck?
Check the detailed troubleshooting section in **`GOOGLE_SHEETS_SETUP.md`**

## ✨ Benefits

✅ **Real-time sync** - See registrations instantly  
✅ **Easy sharing** - Share sheet with your team  
✅ **Quick verification** - Verify payments in sheet  
✅ **Email export** - Get all emails with one click  
✅ **Safe** - Registration works even if sync fails  

## 🔐 Security

- 🔒 Keep your Web App URL private
- 🔒 Only share sheet with authorized team members
- 🔒 All data sent over HTTPS
- 🔒 For production: Consider adding secret key (see setup guide)

## 📊 What Data is Synced?

Every registration includes:
- Team info (name, size)
- Leader details (name, email, phone, institute, etc.)
- All team members (up to 3 additional members)
- Payment info (transaction ID, screenshot URL)
- Status (pending/verified/rejected)

## 🎯 Next Steps

1. ✅ Complete the 5-minute setup above
2. ✅ Test with a sample registration
3. ✅ Share sheet with your organizing team
4. ✅ Set up conditional formatting (optional)
5. ✅ Create filters for easy sorting (optional)

---

**Need Help?** Start with **`GOOGLE_SHEETS_QUICKSTART.md`** for detailed instructions!

**For Developers?** Check **`GOOGLE_SHEETS_INTEGRATION.md`** for technical details!
