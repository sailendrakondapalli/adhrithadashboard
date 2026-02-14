# ⚡ Quick Deploy Guide

## 🚀 Fastest Method: Vercel (5 minutes)

### Step 1: Deploy Backend

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy backend
cd backend
vercel --prod
```

When prompted:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? **hackathon-backend**
- Directory? **./backend** (or just press Enter)
- Override settings? **N**

**Copy the deployment URL** (e.g., `https://hackathon-backend-xxx.vercel.app`)

### Step 2: Add Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add:
- `MONGODB_URI`: `mongodb+srv://sailendrakondapalli_db_user:67KBL6Fo8zOS4clV@cluster0.ojltqx7.mongodb.net/hackathon?retryWrites=true&w=majority&appName=Cluster0`
- `JWT_SECRET`: `hackathon_jwt_secret_2024_secure_key`
- `NODE_ENV`: `production`

Click **Redeploy** after adding variables.

### Step 3: Deploy Frontend

```bash
cd frontend

# Update .env.production with your backend URL
echo "VITE_API_URL=https://your-backend-url.vercel.app/api" > .env.production

# Deploy
vercel --prod
```

### Step 4: Create Teachers

```bash
# Use Vercel CLI to run script on backend
cd backend
vercel env pull
node scripts/createTeacher.js
```

Or manually create via API:
```bash
curl -X POST https://your-backend-url.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Teacher 1","email":"teacher1@roomA.com","password":"password123","room":"Room A"}'
```

### ✅ Done!

Your app is live at:
- Frontend: `https://your-frontend-url.vercel.app`
- Backend: `https://your-backend-url.vercel.app`

---

## 🎯 Alternative: Render (Backend) + Vercel (Frontend)

### Backend on Render

1. Go to [render.com](https://render.com)
2. **New** → **Web Service**
3. Connect GitHub or upload code
4. Settings:
   - **Name**: hackathon-backend
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables (same as above)
6. **Create Web Service**

### Frontend on Vercel

Same as Step 3 above, but update `.env.production` with Render backend URL.

---

## 📱 Test Your Deployment

1. Visit your frontend URL
2. Click "Student View" to see leaderboard
3. Login as teacher: `teacher1@roomA.com` / `password123`
4. Add a test team

---

## 🔧 Troubleshooting

**CORS Error:**
Update `backend/server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app'],
  credentials: true
}));
```

**MongoDB Connection Failed:**
- Check MongoDB Atlas Network Access
- Add `0.0.0.0/0` to IP whitelist

**API 404:**
- Verify `VITE_API_URL` in frontend `.env.production`
- Check backend deployment logs

---

## 💡 Pro Tips

1. **Custom Domain**: Add in Vercel/Render dashboard
2. **HTTPS**: Automatic on Vercel/Render
3. **Monitoring**: Check deployment logs in dashboard
4. **Updates**: Just run `vercel --prod` again to redeploy
