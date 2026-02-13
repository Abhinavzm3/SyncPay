# SyncPay — Full MERN Trip Expense Splitter

SyncPay is a collaborative trip expense manager where friends can add expenses, choose only the participants for each expense, and instantly see net balances plus **who should pay whom**.

## What’s included
- **MongoDB-backed backend** (Express + Mongoose)
- **Vite + React frontend** with Redux Toolkit
- Member management
- Expense entry with payer, participants, category, note, date
- Real-time net balances and optimized settlements
- Modern glassmorphism UI

## Quick start
```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:4000`

## MongoDB
The server uses this URI by default (from your request):

`mongodb+srv://SeparateAdminDataBase:Kg3Fv3PG696YOP39@cluster0.u0geaag.mongodb.net`

You can still override it:

```bash
MONGO_URI=<your-uri>
MONGO_DB_NAME=syncpay
```

## Future enhancements
- User auth + trip invitations
- Per-user login and personal dashboard
- Expense receipt image uploads
- Multi-trip support
