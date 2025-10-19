# 🔧 Google Sheets Integration - Troubleshooting Guide

## ❓ Common Questions

### Q: How does Apps Script know about my website?

**A: It doesn't need to!** 

Your website **sends data TO** the Apps Script (not the other way around).

```
Flow:
1. User submits form on engineeringindiaycce.live
2. Next.js API (on your server) receives the data
3. Next.js calls the Google Apps Script URL via HTTP POST
4. Apps Script receives data and adds it to Google Sheet
```

**Think of it like this:**
- Your website = Sender 📤
- Apps Script = Receiver 📥
- Google Sheets Web App URL = Mailbox address 📬

---

## 🐛 Error: "Cannot read properties of undefined (reading 'postData')"

### What This Means

This error happens when Apps Script's `doPost(e)` function is called but the `e` parameter is empty or doesn't have `postData`.

### Common Causes

#### 1. **Testing in Apps Script Editor**
```
❌ WRONG: Running doPost() manually in editor
✅ RIGHT: Deploy as Web App and test via URL
```

#### 2. **Calling via GET instead of POST**
```
❌ WRONG: Opening URL in browser (GET request)
✅ RIGHT: Send POST request with data in body
```

#### 3. **Empty Request Body**
```
❌ WRONG: POST with no body
✅ RIGHT: POST with JSON data in body
```

#### 4. **Apps Script Not Deployed Correctly**
```
❌ WRONG: "Test deployment" or "Execute as User accessing the web app"
✅ RIGHT: "New deployment" → Web app → Execute as "Me" → Anyone can access
```

---

## ✅ Step-by-Step Fix

### Step 1: Redeploy Apps Script (IMPORTANT!)

1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. **IMPORTANT**: Make sure you have the latest code from `google-apps-script.gs.txt`
4. Click **Deploy** → **Manage deployments**
5. Click **✏️ Edit** (pencil icon) on your existing deployment
6. Change **Version** to "New Version"
7. Click **Deploy**
8. Copy the **NEW Web App URL** (it will be the same as before, but redeployed)

### Step 2: Verify Deployment Settings

Make sure these settings are correct:

```
Type: Web app
Description: Hackathon Registration Sync
Execute as: Me (your email)
Who has access: Anyone ← CRITICAL!
```

**Why "Anyone"?** Your Next.js server needs to be able to call the URL without authentication.

### Step 3: Test with GET Request

Open your Web App URL in a browser:
```
https://script.google.com/macros/s/AKfycbz.../exec
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Hackathon Registration Google Sheets API is running!",
  "instructions": "Send POST requests with registration data to sync with sheet.",
  "timestamp": "2025-01-15T06:49:28.000Z"
}
```

If you see this, your Apps Script is working! ✅

### Step 4: Test from Your Next.js App

Restart your dev server:
```bash
pnpm run dev
```

Register a test team and check:
1. Console logs in terminal
2. Apps Script logs (View → Logs in Apps Script editor)
3. Google Sheet for new row

---

## 🔍 Debugging Checklist

### Check 1: Apps Script Logs

1. Go to Apps Script editor
2. Click **View → Executions**
3. Look at recent executions
4. Click on any execution to see detailed logs

**What to look for:**
```
✅ "Received POST request"
✅ "Request object: {...}"
✅ "Parsed data: {...}"
✅ "Successfully added registration: [Team Name]"
```

**Red flags:**
```
❌ "No data received in POST request"
❌ "TypeError: Cannot read properties..."
❌ "Sheet 'Registrations' not found"
```

### Check 2: Sheet Name

Your sheet MUST be named exactly:
```
"Registrations"
```

**Not:** "Registration", "registrations", "Sheet1", etc.

To check:
1. Look at the tab name at bottom of Google Sheet
2. Right-click tab → Rename if needed

### Check 3: Headers

Make sure Row 1 has these exact headers (or run `setupHeaders()` function):

```
Registration ID | Timestamp | Team Name | Leader Name | Leader Email | 
Leader Phone | Leader Gender | Institute | Branch | Year | Team Size | 
Member 1 Name | Member 1 Email | Member 1 Phone | Member 1 Gender | 
Member 1 Branch | Member 1 Year | Member 2 Name | Member 2 Email | 
Member 2 Phone | Member 2 Gender | Member 2 Branch | Member 2 Year | 
Member 3 Name | Member 3 Email | Member 3 Phone | Member 3 Gender | 
Member 3 Branch | Member 3 Year | Transaction ID | Payment Screenshot URL | Status
```

### Check 4: Environment Variable

In your `.env` file:
```bash
GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/AKfycbzsjkxmrpQmH_pQKckmRCWd6qQAJBuHPXwfvy3YJyAdWofWpcToiAB1_gsw6FY4VIiPpw/exec
```

**Common mistakes:**
- ❌ Extra spaces
- ❌ Missing `/exec` at the end
- ❌ Wrong URL (from wrong deployment)
- ❌ Not restarting dev server after changing `.env`

### Check 5: Next.js Logs

When you submit a registration, check terminal for:

```bash
✅ "Google Sheets sync successful: {...}"
```

Or:

```bash
❌ "Google Sheets sync failed: ..."
❌ "Error syncing to Google Sheets: ..."
```

---

## 🧪 Manual Testing Methods

### Method 1: Test with curl (Command Line)

**Windows PowerShell:**
```powershell
$body = @{
    registrationId = "TEST-123"
    timestamp = (Get-Date).ToString("o")
    teamName = "Test Team"
    leaderName = "John Doe"
    leaderEmail = "john@test.com"
    leaderPhone = "+91 1234567890"
    leaderGender = "Male"
    institute = "Test College"
    branch = "CS"
    year = "3rd"
    teamSize = 1
    transactionId = "TXN123"
    paymentScreenshotUrl = "https://test.com/image.png"
    status = "pending"
} | ConvertTo-Json

Invoke-WebRequest -Uri "YOUR_WEBAPP_URL_HERE" -Method POST -Body $body -ContentType "application/json"
```

**Expected:** New row appears in your Google Sheet

### Method 2: Test via Postman

1. Open Postman
2. Create new POST request
3. URL: Your Web App URL
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):
```json
{
  "registrationId": "TEST-456",
  "timestamp": "2025-01-15T12:00:00.000Z",
  "teamName": "Postman Test Team",
  "leaderName": "Jane Doe",
  "leaderEmail": "jane@test.com",
  "leaderPhone": "+91 9876543210",
  "leaderGender": "Female",
  "institute": "Test Institute",
  "branch": "IT",
  "year": "2nd",
  "teamSize": 2,
  "member1Name": "Bob",
  "member1Email": "bob@test.com",
  "member1Phone": "+91 1111111111",
  "member1Gender": "Male",
  "member1Branch": "CS",
  "member1Year": "3rd",
  "transactionId": "TXN456",
  "paymentScreenshotUrl": "https://test.com/payment.png",
  "status": "pending"
}
```
6. Click **Send**
7. Check Google Sheet for new row

### Method 3: Use Apps Script Test Function

Add this to your Apps Script:

```javascript
function testWithSampleData() {
  const sampleRequest = {
    postData: {
      contents: JSON.stringify({
        registrationId: "TEST-789",
        timestamp: new Date().toISOString(),
        teamName: "Apps Script Test",
        leaderName: "Test User",
        leaderEmail: "test@example.com",
        leaderPhone: "+91 5555555555",
        leaderGender: "Male",
        institute: "YCCE",
        branch: "Computer Science",
        year: "3rd",
        teamSize: 1,
        transactionId: "TEST789",
        paymentScreenshotUrl: "https://example.com/test.png",
        status: "pending"
      })
    }
  };
  
  const result = doPost(sampleRequest);
  Logger.log(result.getContent());
}
```

Run this function from Apps Script editor and check your sheet.

---

## 🔄 Complete Reset (If All Else Fails)

### 1. Delete and Recreate Deployment

1. Apps Script → **Deploy** → **Manage deployments**
2. Click **🗑️ Archive** on existing deployment
3. Click **Deploy** → **New deployment**
4. Type: **Web app**
5. Execute as: **Me**
6. Who has access: **Anyone**
7. Click **Deploy**
8. **Copy new URL**
9. Update `.env` with new URL
10. Restart dev server

### 2. Verify Sheet Setup

Run this in Apps Script editor:

```javascript
function setupEverything() {
  setupHeaders();
  formatSheet();
  testSheetAccess();
}
```

### 3. Test Again

Try registering a team from your website.

---

## 📊 Success Indicators

### You know it's working when:

✅ **In Browser:** Registration form submits successfully
✅ **In Terminal:** See "Google Sheets sync successful" log
✅ **In Apps Script Logs:** See "Successfully added registration: [Team Name]"
✅ **In Google Sheet:** New row with all data appears
✅ **Timestamp:** Matches registration time (or close to it)

---

## 🚨 Common Mistakes to Avoid

### 1. Using Test Deployment
```
❌ Deploy → Test deployments
✅ Deploy → New deployment → Web app
```

### 2. Wrong Access Settings
```
❌ "Only myself"
❌ "Only users in my organization"
✅ "Anyone"
```

### 3. Not Redeploying After Code Changes
```
Every time you update the Apps Script code:
1. Save the file
2. Deploy → Manage deployments
3. Edit → New version → Deploy
```

### 4. Wrong Sheet Name
```
❌ "Sheet1", "Registration", "Hackathon"
✅ "Registrations" (exact match, case-sensitive)
```

### 5. Forgetting to Restart Dev Server
```
After changing .env file:
1. Stop dev server (Ctrl+C)
2. Run: pnpm run dev
```

---

## 🎯 Quick Diagnosis

### Error: "Sheet 'Registrations' not found"
**Fix:** Rename your sheet tab to exactly "Registrations"

### Error: "Authorization required"
**Fix:** Redeploy with "Anyone" access

### Error: "Cannot read properties of undefined"
**Fix:** 
1. Check deployment settings
2. Make sure you're sending POST (not GET)
3. Verify request has JSON body

### No error, but no data in sheet
**Fix:**
1. Check `.env` has correct URL
2. Restart dev server
3. Check Apps Script logs for errors
4. Verify sheet name is "Registrations"

### Data appears but in wrong columns
**Fix:** 
1. Run `setupHeaders()` function in Apps Script
2. Or manually add/fix headers as shown above

---

## 📞 Need More Help?

1. **Check Apps Script Logs**
   - Apps Script editor → View → Executions
   
2. **Check Next.js Terminal Logs**
   - Look for Google Sheets sync messages
   
3. **Test with Manual POST Request**
   - Use curl or Postman to isolate the issue
   
4. **Verify All Settings**
   - Sheet name: "Registrations"
   - Deployment: Web app, Anyone
   - Headers: Row 1, all 31 columns
   - URL: In `.env`, with `/exec`

---

**🎉 Once working, it will sync automatically for every registration!**
