# Charity Events – API + Web App

## Prereqs
- Node 18+
- MySQL 8+

## 1) Database
Import `API/schema.sql` in MySQL Workbench (creates `charityevents_db` with sample data).

## 2) API
```bash
cd API
cp .env.example .env    
npm install
npm start               # starts on http://localhost:3060
