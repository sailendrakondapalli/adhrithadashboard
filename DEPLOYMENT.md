# 🚀 Deployment Guide - Hackathon Dashboard

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Backend Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Backend**
   ```bash
   cd backend
   vercel
   ```
   - Follow prompts
   - Set environment variables in Vercel dashboard:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your JWT secret key
     - `PORT`: 5000

3. **Get Backend URL**
   - Copy the deployment URL (e.g., `https://your-backend.vercel.app`)

### Frontend Deployment

1. **Update API URL**
   - Edit `frontend/src/services/api.js`
   - Change `baseURL: '/api'` to `baseURL: 'https://your-backend.vercel.app/api'`

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel
   ```

3. **Done!** Your app is live at the Vercel URL

---

## Option 2: Deploy to Render

### Backend Deployment

1. **Go to [Render.com](https://render.com)**
2. **Create New Web Service**
3. **Connect GitHub repo** or upload code
4. **Configure:**
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret
     - `PORT`: 10000

5. **Deploy** and copy the URL

### Frontend Deployment

1. **Update API URL** in `frontend/src/services/api.js`
2. **Deploy to Vercel or Netlify:**
   ```bash
   cd frontend
   npm run build
   ```
3. **Upload `dist` folder** to Vercel/Netlify

---

## Option 3: Deploy to Railway

### Backend Deployment

1. **Go to [Railway.app](https://railway.app)**
2. **New Project** → Deploy from GitHub
3. **Add Environment Variables:**
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT`
4. **Deploy** automatically

### Frontend Deployment

Same as Option 2 - use Vercel or Netlify for frontend

---

## Option 4: Single Server Deployment (VPS/DigitalOcean)

### Prerequisites
- Ubuntu VPS with Node.js installed
- Domain name (optional)

### Steps

1. **SSH into your server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install dependencies**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

3. **Clone/Upload your code**
   ```bash
   git clone your-repo-url
   cd hackathon-dashboard
   ```

4. **Install dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install && npm run build
   ```

5. **Setup environment**
   ```bash
   cd backend
   nano .env
   # Add your MongoDB URI and JWT secret
   ```

6. **Serve frontend from backend**
   - Update `backend/server.js` to serve static files:
   ```javascript
   import path from 'path';
   import { fileURLToPath } from 'url';
   
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
   
   // After routes
   app.use(express.static(path.join(__dirname, '../frontend/dist')));
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
   });
   ```

7. **Start with PM2**
   ```bash
   cd backend
   pm2 start server.js --name hackathon-api
   pm2 save
   pm2 startup
   ```

8. **Setup Nginx (optional)**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/hackathon
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

9. **Enable site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/hackathon /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

---

## Quick Deploy Commands

### Vercel (Fastest)
```bash
# Backend
cd backend
vercel --prod

# Frontend (update API URL first!)
cd frontend
vercel --prod
```

### Render
- Push to GitHub
- Connect repo on Render.com
- Add environment variables
- Deploy

### Railway
- Push to GitHub
- Connect repo on Railway.app
- Add environment variables
- Deploy

---

## Environment Variables Needed

**Backend:**
- `MONGODB_URI`: mongodb+srv://sailendrakondapalli_db_user:67KBL6Fo8zOS4clV@cluster0.ojltqx7.mongodb.net/hackathon?retryWrites=true&w=majority&appName=Cluster0
- `JWT_SECRET`: hackathon_jwt_secret_2024_secure_key
- `PORT`: 5000 (or platform default)

**Frontend:**
- `VITE_API_URL`: Your backend URL + /api

---

## Post-Deployment

1. **Test the deployment**
   - Visit your frontend URL
   - Try logging in as teacher
   - Try student view

2. **Create teachers** (if needed)
   ```bash
   # SSH into backend server or use Vercel CLI
   node scripts/createTeacher.js
   ```

3. **Monitor logs**
   - Vercel: Check dashboard
   - Render: Check logs tab
   - VPS: `pm2 logs`

---

## Troubleshooting

**CORS Issues:**
- Add your frontend URL to CORS whitelist in `backend/server.js`

**MongoDB Connection:**
- Verify IP whitelist in MongoDB Atlas (use 0.0.0.0/0 for all IPs)

**API Not Found:**
- Check API URL in `frontend/src/services/api.js`
- Verify backend is running

---

## Recommended: Vercel for Both

**Pros:**
- Free tier available
- Automatic HTTPS
- Easy deployment
- GitHub integration
- Fast CDN

**Steps:**
1. Deploy backend to Vercel
2. Copy backend URL
3. Update frontend API URL
4. Deploy frontend to Vercel
5. Done!
