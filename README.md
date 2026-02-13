# SyncPay (MERN Trip Expense Planner)

A modern glassmorphism MERN-style app for friend groups to track travel expenses, split bills by participants, and compute **who pays whom** instantly.

## Features
- Add trip members (friends)
- Log expenses with:
  - title
  - amount
  - payer
  - selected participants in that purchase
- Automatic net balance per person
- Smart settlement suggestions (minimum transfers)
- Redux Toolkit state management
- Vite + React frontend with glassy UI

## Run locally
```bash
npm install
npm run dev
```
- API runs at `http://localhost:4000`
- UI runs at `http://localhost:5173`

## Stack
- Frontend: React + Vite + Redux Toolkit
- Backend: Node + Express
- Data: In-memory seeded store (ready to swap with MongoDB models)
