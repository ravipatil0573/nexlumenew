# How to Run Frontend and Backend Together

## Quick Start

### Option 1: Run Both Together (Recommended)

```bash
# Install dependencies for both
npm install
cd backend && npm install && cd ..

# Run both frontend and backend together
npm run dev:all
```

This will start:
- Frontend at: `http://localhost:5173`
- Backend at: `http://localhost:5000`

### Option 2: Run Separately (in different terminals)

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run backend:dev
```

## Available Scripts

### Root Folder (Frontend + Backend):
- `npm run dev` - Run frontend only
- `npm run dev:all` - Run both frontend and backend together
- `npm run backend` - Run backend only (production mode)
- `npm run backend:dev` - Run backend only (development mode with auto-reload)

### Backend Folder:
- `cd backend && npm start` - Run backend (production)
- `cd backend && npm run dev` - Run backend (development with auto-reload)

## First Time Setup

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Create backend/.env file:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/nexlume
   PORT=5000
   EMAIL_USER=nexlume.co@gmail.com
   EMAIL_PASS=cypcmfkighzwmidz
   ```

4. **Make sure MongoDB is running** (or use MongoDB Atlas)

5. **Run both:**
   ```bash
   npm run dev:all
   ```

## Troubleshooting

**Port 5000 already in use:**
- Change PORT in `backend/.env` to a different port (e.g., 5001)
- Or stop the process using port 5000

**Backend not starting:**
- Make sure MongoDB is running
- Check `backend/.env` file exists and has correct values
- Check backend dependencies are installed: `cd backend && npm install`

**Frontend can't connect to backend:**
- Make sure backend is running on port 5000
- Check `VITE_API_BASE` in frontend `.env` (if you have one)
- Default is `http://localhost:5000`

