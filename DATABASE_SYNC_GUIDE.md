# 🔄 Database-to-Google-Sheets Sync - Complete Guide

## 🎯 What This Does

This system ensures your **Google Sheets and Turso Database are ALWAYS in sync**!

### Two Sync Modes:

1. **Real-Time Sync** 🚀
   - When a user registers → Data instantly goes to Sheet
   - Same as before (via doPost)

2. **Database Sync** 🔄 **[NEW!]**
   - Fetches ALL registrations from database
   - Adds missing registrations to Sheet
   - Updates changed registrations
   - Can run hourly or on-demand

---

## 🚀 Quick Setup (10 minutes)

### Step 1: Add API Key to .env

Open your `.env` file and add (if not already present):

```env
GOOGLE_APP_SCRIPT_API_KEY=your_secret_key_here_12345
```

**Important:** 
- Choose a strong, random string (at least 32 characters)
- Keep it secret!
- Example: `hackathon_sync_key_2025_very_secret_xyz123abc456`

### Step 2: Update Apps Script

1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. **Delete old code**
4. Copy **ALL** code from `google-apps-script-with-sync.gs.txt`
5. Paste into editor
6. Click **Save** (💾)

### Step 3: Configure Script Properties (IMPORTANT!)

1. In Apps Script editor, click **⚙️ Project Settings** (gear icon)
2. Scroll down to **Script Properties**
3. Click **+ Add script property**

Add these TWO properties:

| Property name | Value |
|--------------|-------|
| `VERCEL_APP_URL` | `https://engineeringindiaycce.live` |
| `GOOGLE_APP_SCRIPT_API_KEY` | Same value as in your .env file |

**Critical:** Make sure the API key is EXACTLY the same in both places!

### Step 4: Setup Sheet Headers

1. In Apps Script editor, find the `setupHeaders` function
2. Click **Run** (▶️ play button)
3. Authorize when prompted
4. Check your sheet - headers should appear!

### Step 5: Test the Sync

1. In Apps Script editor, find the `testSync` function
2. Click **Run** (▶️)
3. Check **View → Executions** for logs
4. Should see: ✅ All checks passed

### Step 6: Redeploy Web App

1. Click **Deploy → Manage deployments**
2. Click **✏️ Edit** on existing deployment
3. Version → **New version**
4. Click **Deploy**
5. Make sure "Anyone" can access

### Step 7: Setup Automatic Sync (Optional but Recommended)

1. Click **⏰ Triggers** (clock icon on left sidebar)
2. Click **+ Add Trigger**
3. Configure:
   - Function: `syncFromDatabase`
   - Event source: `Time-driven`
   - Type: `Hour timer`
   - Interval: `Every hour` (or your preference)
4. Click **Save**

✅ Done! Your sheet will now sync automatically every hour!

---

## 🔍 How It Works

### Real-Time Sync (When User Registers)

```
User submits form
    ↓
Next.js API receives data
    ↓
Saves to Turso database
    ↓
Also sends to Google Sheets Web App URL
    ↓
Apps Script doPost() receives data
    ↓
Adds row to Google Sheet
```

### Database Sync (Hourly or Manual)

```
Apps Script trigger fires
    ↓
syncFromDatabase() function runs
    ↓
Calls /api/hackathon/sync on your website
    ↓
Next.js API fetches ALL registrations from database
    ↓
Returns data to Apps Script
    ↓
Apps Script compares with existing sheet data
    ↓
Adds missing registrations
    ↓
Updates changed registrations
    ↓
Sheet is now in perfect sync!
```

---

## 📊 Testing the Sync

### Test 1: Manual Sync

Run the sync manually to check if it works:

1. Open Apps Script editor
2. Find `syncFromDatabase` function
3. Click **Run** (▶️)
4. Go to **View → Executions**
5. Check the logs

**Expected logs:**
```
🔄 Starting database sync...
📊 Found X registrations in database
➕ Will add new record: [Team Name]
✅ Added X new records
✅ Database sync completed successfully!
```

### Test 2: Check What's Missing

If you want to see what's in the database but not in the sheet:

1. Count rows in your Google Sheet (excluding header)
2. Run this SQL on your Turso database:
   ```sql
   SELECT COUNT(*) FROM hackathon;
   ```
3. If database count > sheet count → Run sync!

### Test 3: Real-Time Sync

1. Register a new team from your website
2. Check sheet immediately
3. New row should appear within seconds

---

## 🛠️ Manual Sync Commands

### Run Sync Now

```javascript
// In Apps Script editor, run this:
syncFromDatabase();
```

### Check Sync Status

```javascript
// In Apps Script editor, run this:
testSync();
```

### View All Logs

1. Apps Script editor → **View → Executions**
2. Click on any execution to see detailed logs
3. Look for ✅ success or ❌ error messages

---

## 🔐 Security

### API Key Protection

✅ **DO:**
- Use a strong, random API key
- Keep it secret (don't commit to Git)
- Store in Script Properties (not in code)
- Use same key in both .env and Script Properties

❌ **DON'T:**
- Use simple keys like "123456"
- Share the API key publicly
- Commit .env file to Git
- Hardcode the key in your code

### Why "Anyone" Can Access Web App?

The Web App needs "Anyone" access so your Next.js server can call it. But:
- Only accepts valid JSON data
- Validates structure before saving
- Logs all attempts for monitoring

For the sync API endpoint:
- Protected by API key
- Only Apps Script can call it
- Returns 401 Unauthorized without valid key

---

## 📋 Sync Scenarios

### Scenario 1: New Registration

```
✅ Real-time sync adds it immediately
✅ Next hourly sync sees it exists, skips it
Result: One row in sheet ✓
```

### Scenario 2: Real-Time Sync Failed

```
❌ User registered but real-time sync failed (network issue)
✅ Row saved to database
✅ Next hourly sync detects missing row
✅ Adds the missing registration
Result: Sheet catches up automatically ✓
```

### Scenario 3: Payment Status Updated in Database

```
✅ Admin verifies payment → Updates database
✅ Sheet still shows "pending"
✅ Next hourly sync detects change
✅ Updates the row in sheet
Result: Sheet shows "verified" ✓
```

### Scenario 4: Sheet Accidentally Deleted

```
❌ Someone deletes all data from sheet
✅ Next hourly sync runs
✅ Detects ALL registrations are missing
✅ Adds all registrations back
Result: Full recovery! ✓
```

---

## 🎛️ Sync Frequency Options

Choose what works best for you:

### Option 1: Every Hour (Recommended)
```
Trigger: Hour timer → Every hour
Pro: Good balance of freshness and quota usage
Con: Up to 1 hour delay for updates
```

### Option 2: Every 15 Minutes
```
Trigger: Minute timer → Every 15 minutes
Pro: Very fresh data
Con: Uses more quota
```

### Option 3: Once Daily
```
Trigger: Day timer → Every day at 2 AM
Pro: Minimal quota usage
Con: Updates only once per day
```

### Option 4: Manual Only
```
Trigger: None (run manually when needed)
Pro: Full control, zero quota usage
Con: Have to remember to run it
```

To change:
1. Apps Script → Triggers (⏰)
2. Click ⚙️ on existing trigger
3. Modify settings
4. Save

---

## 📊 Monitoring & Logs

### Check Last Sync Time

Add this function to your Apps Script:

```javascript
function getLastSyncTime() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Registrations');
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const timestamp = sheet.getRange(lastRow, 3).getValue(); // Column C (Timestamp)
    Logger.log('Last registration timestamp: ' + timestamp);
  }
}
```

### View All Executions

1. Apps Script → **View → Executions**
2. Filter by Function: `syncFromDatabase`
3. See all sync runs with status

### Email Notifications

Add email alerts for failed syncs:

```javascript
function syncFromDatabase() {
  try {
    // ... existing sync code ...
    
  } catch (e) {
    // Send email on error
    MailApp.sendEmail({
      to: 'your-email@example.com',
      subject: '❌ Hackathon Sync Failed',
      body: 'Sync error: ' + e.toString()
    });
    throw e;
  }
}
```

---

## 🧪 Testing Checklist

### Pre-Deployment Tests

- [ ] API key set in .env
- [ ] API key set in Script Properties
- [ ] VERCEL_APP_URL set in Script Properties
- [ ] Headers created in sheet (run setupHeaders)
- [ ] testSync() runs without errors
- [ ] Sheet named exactly "Registrations"

### Post-Deployment Tests

- [ ] Real-time sync works (register test team)
- [ ] Database sync works (run syncFromDatabase manually)
- [ ] Duplicate detection works (sync twice, no duplicates)
- [ ] Update detection works (change status in DB, sync, see update)
- [ ] Hourly trigger is active (check Triggers page)

### Production Verification

- [ ] Check sheet has all existing registrations
- [ ] Check logs for errors (View → Executions)
- [ ] Verify payment status updates sync
- [ ] Test with team member to confirm real-time sync
- [ ] Wait 1 hour and verify automatic sync ran

---

## 🐛 Troubleshooting

### "Unauthorized" Error in Sync

**Problem:** API returns 401 Unauthorized

**Solution:**
1. Check API key matches in both places
2. Check for extra spaces or quotes
3. Verify .env was saved
4. Restart dev server: `pnpm run dev`

### "No registrations found"

**Problem:** Sync returns 0 registrations

**Solution:**
1. Check database has data: `SELECT * FROM hackathon;`
2. Verify VERCEL_APP_URL is correct
3. Check /api/hackathon/sync endpoint works
4. Test endpoint in browser: `https://your-site.com/api/hackathon/sync`

### Sync Runs But Nothing Happens

**Problem:** Logs say "All data is already in sync"

**Solution:**
This is actually good! It means:
- All database records are in the sheet
- No updates needed
- System working perfectly ✓

### Duplicates in Sheet

**Problem:** Same registration appears multiple times

**Solution:**
1. Check if "id" column exists (first column)
2. Make sure ID values are unique
3. Run setupHeaders() to fix column structure
4. Delete duplicate rows manually

### Sync Stopped Working

**Problem:** Automatic sync not running

**Solution:**
1. Check Triggers page (⏰) - is trigger still there?
2. Check trigger error rate - hover over trigger
3. Re-create trigger if needed
4. Check quota limits (usually not an issue)

---

## 📈 Advanced Features

### Get Sync Statistics

```javascript
function getSyncStats() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Registrations');
  const data = sheet.getDataRange().getValues();
  
  const stats = {
    totalRegistrations: data.length - 1, // Exclude header
    pending: 0,
    verified: 0,
    rejected: 0
  };
  
  for (let i = 1; i < data.length; i++) {
    const status = data[i][32]; // Status column
    if (status === 'pending') stats.pending++;
    if (status === 'verified') stats.verified++;
    if (status === 'rejected') stats.rejected++;
  }
  
  Logger.log(JSON.stringify(stats, null, 2));
  return stats;
}
```

### Export Missing Records

Find what's in database but not in sheet:

```javascript
function findMissingRecords() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const vercelAppUrl = scriptProperties.getProperty('VERCEL_APP_URL');
  const apiKey = scriptProperties.getProperty('GOOGLE_APP_SCRIPT_API_KEY');
  
  const dbData = fetchRegistrationsFromDatabase(vercelAppUrl, apiKey);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Registrations');
  const sheetData = sheet.getDataRange().getValues();
  
  const sheetIds = new Set();
  for (let i = 1; i < sheetData.length; i++) {
    sheetIds.add(sheetData[i][0].toString()); // ID column
  }
  
  const missing = dbData.filter(record => !sheetIds.has(record.id.toString()));
  
  Logger.log('Missing records: ' + missing.length);
  missing.forEach(record => Logger.log('- ' + record.teamName));
  
  return missing;
}
```

---

## 🎉 Summary

### What You Get

✅ **Real-time sync** - Instant updates when users register
✅ **Automatic sync** - Hourly backup sync from database
✅ **Duplicate prevention** - Smart ID-based checking
✅ **Update detection** - Syncs changed payment status
✅ **Self-healing** - Recovers from failures automatically
✅ **Monitoring** - Detailed logs for every sync
✅ **Security** - API key protection

### Maintenance

- **Zero maintenance** if everything works
- Check logs occasionally to verify syncs
- Monitor for email alerts (if configured)
- Database and Sheet always in perfect sync!

---

## 📞 Need Help?

### Diagnostic Commands

Run these in Apps Script editor:

```javascript
// 1. Test everything
testSync();

// 2. Get statistics
getSyncStats();

// 3. Find missing records
findMissingRecords();

// 4. Run manual sync
syncFromDatabase();
```

### Check Logs

View → Executions → Click on any execution for details

### Verify API Endpoint

Visit in browser:
```
https://engineeringindiaycce.live/api/hackathon/sync
```

Should return:
```json
{
  "success": false,
  "error": "Unauthorized"
}
```
(This is correct - means API key is required)

---

**🚀 Your data is now bulletproof! Both systems stay in sync automatically! 🚀**
