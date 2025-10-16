# Debugging 500 Error - Quick Guide

## 🔍 What I Fixed

### 1. **Added Safe JSON Parsing for Team Members**
**File**: `src/app/api/user/registrations/route.ts`

**Problem**: If `teamMembers` field is null or contains invalid JSON, `JSON.parse()` throws an error causing 500.

**Solution**: Added try-catch block around JSON parsing:
```typescript
let teamMembersCount = 0;
try {
  const members = hack.teamMembers ? JSON.parse(hack.teamMembers) : [];
  teamMembersCount = Array.isArray(members) ? members.length : 0;
} catch (e) {
  console.error("Error parsing team members:", e);
  teamMembersCount = 0;
}
```

### 2. **Enhanced Error Logging**
Added detailed error logging to both API routes:
- `/api/user/registrations` - Now logs error message and stack trace
- `/api/user/dashboard` - Now logs error message and stack trace

## 🧪 How to Debug Further

### Step 1: Check Browser Console
Open your browser's DevTools (F12) and look at the **Console** and **Network** tabs:
1. Go to the page that's showing the error
2. Look for red error messages
3. Click on the failed request in the Network tab
4. Check the **Response** tab to see the detailed error message

### Step 2: Check Terminal/Server Logs
Look at your terminal where `pnpm dev` is running. You should now see detailed error messages like:

```
Error fetching registrations: [Error details]
Error details: {
  message: "...",
  stack: "..."
}
```

### Step 3: Common Issues and Solutions

#### Issue: "Cannot read property 'name' of undefined"
**Cause**: Event data is missing when fetching registrations
**Solution**: User has registered for an event that no longer exists in the database

#### Issue: "Unexpected token in JSON"
**Cause**: `teamMembers` field contains invalid JSON
**Solution**: Already fixed with try-catch block

#### Issue: "hackathon is not defined"
**Cause**: Schema not properly exported or imported
**Solution**: Check that `src/database/db.ts` includes `hackathonSchema`

#### Issue: "Cannot find module"
**Cause**: Import path is wrong
**Solution**: Verify all imports at the top of the files

### Step 4: Test Each Endpoint Individually

#### Test Dashboard API:
Open browser and go to:
```
http://localhost:3000/api/user/dashboard
```

Expected response if working:
```json
{
  "registeredEvents": [...],
  "upcomingEvents": [...],
  "payments": [...],
  "user": {...},
  "membership": {...},
  "stats": {...}
}
```

#### Test Registrations API:
Open browser and go to:
```
http://localhost:3000/api/user/registrations
```

Expected response if working:
```json
[
  {
    "id": "...",
    "type": "hackathon",
    "title": "...",
    ...
  }
]
```

### Step 5: Check Database Connection

Run this command to verify your database is accessible:
```bash
pnpm db:studio
```

This opens Drizzle Studio where you can:
1. Check if `hackathon` table exists
2. View data in `hackathon` table
3. Check if `teamMembers` field has valid JSON

## 🛠️ Quick Fixes

### If error persists, try these:

1. **Clear Next.js cache**:
```bash
rm -rf .next
pnpm dev
```

2. **Restart dev server**:
Press `Ctrl+C` in terminal, then run:
```bash
pnpm dev
```

3. **Check environment variables**:
Make sure `.env` has:
```
TURSO_DATABASE_URL=...
TURSO_AUTH_TOKEN=...
UPLOADTHING_TOKEN=...
```

4. **Verify database schema is up to date**:
```bash
pnpm db:push
```

## 📊 What Page Is Showing the Error?

### If error shows on `/dashboard`:
- Issue is likely in `/api/user/dashboard`
- Check server logs for `[DASHBOARD_GET_ERROR]:`

### If error shows on `/dashboard/registrations`:
- Issue is likely in `/api/user/registrations`
- Check server logs for `Error fetching registrations:`

### If error shows on `/dashboard/payments`:
- Issue is likely in `/api/user/payments`
- Check if hackathon payment screenshot URLs are valid

## 🔧 Emergency Rollback

If issues persist, you can temporarily disable hackathon registration display:

### In `/api/user/registrations/route.ts`:
Comment out hackathon fetching:
```typescript
// const hackathonRegistrations = await db.query.hackathon.findMany({
//   where: (hack, { eq }) => eq(hack.userId, session.user.id),
// });

const hackathonRegistrations = []; // Return empty array
```

### In `/api/user/dashboard/route.ts`:
Comment out hackathon fetching:
```typescript
// db.select().from(hackathon).where(eq(hackathon.userId, userId)),
Promise.resolve([]), // Return empty array
```

## 📝 Next Steps

1. **Check terminal logs** - Look for specific error messages
2. **Check browser console** - Look for client-side errors
3. **Test API endpoints directly** - Use the URLs above
4. **Report back** - Share the error message you see in terminal

---

**The fix should resolve the most common cause (JSON parsing error). If you still see 500 error, check the terminal logs for the detailed error message!**
