# 🔍 Debug Instructions - 500 Error

## ✅ What I Just Added

I've added **detailed logging** to both API routes to help us identify exactly where the error is happening.

### Routes with Enhanced Logging:
1. `/api/user/dashboard`
2. `/api/user/registrations`

---

## 📋 How to See the Error

### Step 1: Open Your Terminal
Look at the terminal where `pnpm dev` is running (the PowerShell window).

### Step 2: Refresh the Page That's Showing the Error
Go to the page in your browser and refresh it (F5 or Ctrl+R).

### Step 3: Look for These Log Messages

#### If the error is on the **Dashboard page**, you'll see:
```
[DASHBOARD] Starting dashboard request...
[DASHBOARD] User ID: xxx
[DASHBOARD] Fetching user registrations...
[DASHBOARD] User registrations count: X
[DASHBOARD] All data fetched successfully
[DASHBOARD] Hackathon registrations: X
```

#### If the error is on the **Registrations page**, you'll see:
```
[REGISTRATIONS] Starting registrations request...
[REGISTRATIONS] User ID: xxx
[REGISTRATIONS] Fetching event registrations...
[REGISTRATIONS] Event registrations count: X
[REGISTRATIONS] Fetching hackathon registrations...
[REGISTRATIONS] Hackathon registrations count: X
[REGISTRATIONS] Formatting event registrations...
[REGISTRATIONS] Formatting hackathon registrations...
[REGISTRATIONS] Combining and sorting registrations...
[REGISTRATIONS] Returning X registrations
```

### Step 4: Find Where It Stops
Look at which log message appears **last** before the error. This tells us exactly where the problem is.

---

## 🎯 Common Error Patterns

### Pattern 1: Stops at "Fetching"
```
[DASHBOARD] Fetching user registrations...
[DASHBOARD_GET_ERROR]: ...
```
**Meaning**: Database query is failing
**Likely cause**: Database connection issue or table doesn't exist

### Pattern 2: Stops at "Formatting"
```
[REGISTRATIONS] Formatting hackathon registrations...
Error parsing team members: ...
```
**Meaning**: Data parsing error
**Should be fixed**: Already added try-catch for JSON parsing

### Pattern 3: Stops at "All data fetched"
```
[DASHBOARD] All data fetched successfully
[DASHBOARD_GET_ERROR]: ...
```
**Meaning**: Error in response formatting
**Likely cause**: Missing or malformed data

---

## 🚀 Quick Fixes to Try

### Fix 1: Clear Next.js Cache
```powershell
# Stop the dev server (Ctrl+C in terminal)
# Then run:
Remove-Item -Recurse -Force .next
pnpm dev
```

### Fix 2: Push Database Schema
```powershell
pnpm db:push
```

### Fix 3: Check Database Connection
```powershell
pnpm db:studio
```
This should open Drizzle Studio. If it doesn't, your database connection is broken.

---

## 📝 What To Tell Me

After you refresh the page, **copy and paste** the terminal output here, especially:

1. **All log messages** starting with `[DASHBOARD]` or `[REGISTRATIONS]`
2. **The error message** (the part after `[DASHBOARD_GET_ERROR]:` or `Error fetching registrations:`)
3. **Which page** you're on when you see the 500 error

---

## 🔧 Manual Test

You can also test the API directly by opening these URLs in your browser:

- Dashboard API: `http://localhost:3000/api/user/dashboard`
- Registrations API: `http://localhost:3000/api/user/registrations`

If you see JSON data, it's working. If you see an error message, copy it and share it with me.

---

**With these logs, we'll be able to pinpoint the exact issue and fix it!** 🎯
