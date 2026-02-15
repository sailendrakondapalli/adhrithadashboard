# ✅ Team Names - Globally Unique

## How It Works Now

Team names are **globally unique** across ALL rooms in the hackathon.

### Rules:
- ✅ Each team name can only be used ONCE across the entire hackathon
- ❌ Same team name in different rooms is NOT allowed
- ✅ Teachers must choose unique team names

## Examples

### ❌ NOT Allowed:
```
Room A: "Roko Team" ✅ (first one added)
Room B: "Roko Team" ❌ (duplicate - rejected)
Error: "Team name already exists. Please choose a different name."
```

### ✅ Allowed:
```
Room A: "Roko Team" ✅
Room B: "Alpha Team" ✅
Room C: "Beta Squad" ✅
All different names - all allowed!
```

## Why This Design?

In a hackathon:
- Each team has a unique identity
- Teams compete across all rooms
- Leaderboard shows all teams together
- No confusion with duplicate names

## Database Structure

```javascript
{
  teamName: String (unique globally),
  room: String,
  phase1Marks: Number,
  phase2Marks: Number,
  totalMarks: Number (auto-calculated)
}
```

### Index:
```javascript
teamName: unique index (across all documents)
```

## Testing

### Test 1: Add Team in Room A
1. Login as teacher1@roomA.com
2. Add team "Test Team"
3. Success! ✅

### Test 2: Try Same Name in Room B
1. Logout
2. Login as teacher1@roomB.com
3. Try to add "Test Team"
4. Error: "Team name already exists. Please choose a different name." ❌

### Test 3: Add Different Name
1. Still logged in as Room B teacher
2. Add team "Different Team"
3. Success! ✅

## Error Messages

### When Duplicate Detected:
- **Frontend**: "❌ Team name already exists. Please choose a different name."
- **Backend**: 400 status code
- **Database**: Unique constraint violation prevented

## Migration

Database was cleared and recreated with:
- Unique index on `teamName` only
- No compound index with room
- Global uniqueness enforced

## Live URL

**Frontend**: https://frontend-kappa-umber-75.vercel.app
**Backend**: https://backend-one-rho-65.vercel.app

## Summary

✅ Team names: **GLOBALLY UNIQUE**
❌ Same name in different rooms: **NOT ALLOWED**
✅ Error handling: **USER-FRIENDLY**
✅ Database: **ENFORCED WITH UNIQUE INDEX**

Each team in the hackathon has a unique name! 🎉
