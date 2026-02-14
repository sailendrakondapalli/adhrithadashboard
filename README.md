# 🏆 Hackathon Evaluation Dashboard

Full-stack application for evaluating hackathon teams with role-based access control.

## 🚀 Features

- **Teacher Dashboard**: Add/update team marks, remarks for assigned rooms
- **Student Dashboard**: View leaderboard, phase results, and charts
- **JWT Authentication**: Secure login with bcrypt password hashing
- **Real-time Leaderboard**: Auto-sorted by marks, highlights top 3
- **Interactive Charts**: Recharts visualization for Phase 1 & 2
- **Role-based Access**: Teachers can only modify their room's data

## 📦 Tech Stack

- **Frontend**: React 18, Vite, Recharts, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Auth**: JWT, bcryptjs
- **Database**: MongoDB

## 🛠 Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or MongoDB Atlas)

### Backend Setup

```bash
cd backend
npm install
```

Update `.env` file with your MongoDB URI:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hackathon
JWT_SECRET=your_secret_key_here
```

Start backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## 👥 Creating Teachers

Use MongoDB Compass or mongosh to create teachers:

```javascript
// Example: Create teachers for Room A
db.teachers.insertMany([
  {
    name: "Teacher 1",
    email: "teacher1@roomA.com",
    password: "$2a$10$hashed_password_here",
    room: "Room A",
    role: "teacher"
  },
  {
    name: "Teacher 2",
    email: "teacher2@roomA.com",
    password: "$2a$10$hashed_password_here",
    room: "Room A",
    role: "teacher"
  }
])
```

Or use the register endpoint:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teacher 1",
    "email": "teacher1@roomA.com",
    "password": "password123",
    "room": "Room A"
  }'
```

## 🎯 Usage

### Teacher Login
1. Go to login page
2. Select "Teacher Login"
3. Enter email and password
4. Add/edit teams in your assigned room

### Student View
1. Go to login page
2. Select "Student View"
3. Click "Enter as Student"
4. View leaderboard and charts

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - Teacher login
- `POST /api/auth/register` - Register new teacher

### Teams
- `GET /api/teams` - Get all teams (public)
- `GET /api/teams/phase/:phase` - Get teams by phase (public)
- `POST /api/teams` - Create team (teacher only)
- `PUT /api/teams/:id` - Update team (teacher only)

## 🔒 Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens for authentication
- Protected routes with middleware
- Teachers can only modify their room's data

## 🎨 Features Implemented

✅ Teacher Dashboard with room-specific access
✅ Student read-only dashboard
✅ JWT authentication with bcrypt
✅ MongoDB with Mongoose schemas
✅ Leaderboard with top 3 highlighting
✅ Recharts bar charts for Phase 1 & 2
✅ Responsive UI with modern design
✅ Role-based access control
✅ Automatic sorting (marks desc, name asc)

## 🚀 Bonus Features

- Clean, animated UI with gradient backgrounds
- Phase filtering (All/Phase 1/Phase 2)
- Top 3 teams highlighted with gold gradient
- Responsive design for mobile/desktop
- Auto-updating charts

## 📝 Database Schema

### Teacher
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  room: String,
  role: String (default: "teacher")
}
```

### Team
```javascript
{
  teamName: String,
  room: String,
  phase: String (enum: ["Phase 1", "Phase 2"]),
  marks: Number,
  remarks: String,
  evaluatedBy: ObjectId (ref: Teacher),
  createdAt: Date
}
```

## 🎯 Project Structure

```
hackathon-dashboard/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Teacher.js
│   │   └── Team.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── teams.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Charts.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   └── TeamForm.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── TeacherDashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```
