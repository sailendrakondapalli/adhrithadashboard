@echo off
echo 🚀 Hackathon Dashboard Deployment Script
echo ==========================================
echo.

REM Check if vercel is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
)

echo 📦 Step 1: Deploying Backend...
cd backend
call vercel --prod
echo.
echo ✅ Backend deployed!
echo 📝 Copy the backend URL and press Enter to continue...
set /p backend_url=Backend URL: 

echo.
echo 📦 Step 2: Deploying Frontend...
cd ..\frontend

REM Update .env.production
echo VITE_API_URL=%backend_url%/api > .env.production

call vercel --prod
echo.
echo ✅ Frontend deployed!
echo.
echo 🎉 Deployment Complete!
echo ==========================================
echo Next steps:
echo 1. Add environment variables in Vercel dashboard:
echo    - MONGODB_URI
echo    - JWT_SECRET
echo    - NODE_ENV=production
echo 2. Redeploy backend after adding variables
echo 3. Create teachers using the script or API
echo.
pause
