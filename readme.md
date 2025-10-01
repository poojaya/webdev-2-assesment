Charity Events — API + Web App (Node.js + MySQL)

Two small Node.js apps:

API (Express + MySQL): CRUD endpoints for charity events

WEB (Express static site): HTML/JS pages that call the API

✅ Per unit requirement: no Angular / AngularJS used.

1) Prerequisites

Node.js 18+ (22 works)

MySQL 8.x running on localhost:3306

(Optional) MySQL Workbench for running SQL scripts

2) Database setup

Run the SQL script to create the database, tables and seed data.

Workbench (GUI)

Open API/schema.sql

Click the ⚡ (lightning) button to execute.

CLI

mysql -u root -p < API/schema.sql


This creates charityevents_db with sample rows.

3) Environment files

Create .env for both apps (don’t commit your real .env).
Use these examples as a guide:

API/.env

PORT=3060
NODE_ENV=development
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=charityevents_db


WEB/.env

PORT=8080
NODE_ENV=development
API_BASE=http://localhost:3060/api


Real .env is ignored by .gitignore. Add .env.example to each app in git if you want.

4) Install & run

Open two terminals.

API

cd API
npm install
npm run dev     # nodemon app.js -> http://localhost:3060


WEB

cd WEB
npm install
npm run dev     # nodemon server.js -> http://localhost:8080


Open: http://localhost:8080

Browse events: /events.html

Event detail: /event.html?id=1

Add event: /add.html

5) Repository layout
API/
  routes/
    events.js            # GET list, GET by id, POST, PUT, DELETE
  app.js                 # Express app, CORS + JSON, mounts routes
  db.js                  # MySQL pool helper (async/await)
  schema.sql             # DB + tables + seed data (idempotent)
  package.json
  .env.example

WEB/
  public/
    index.html           # Landing
    events.html          # Search + results table
    event.html           # Single event details
    add.html             # Create event form
    js/
      events.js          # Search UI -> GET /api/events
      event.js           # Detail page -> GET /api/events/:id
      add.js             # Create -> POST /api/events
    css/ (optional)
  server.js              # Serves /public
  package.json
  .env.example

README.md
.gitignore               # ignores node_modules/ and .env

6) API documentation

Base URL: http://localhost:3060/api

GET /events

Query params (all optional):

q — text search (title/description)

category — category_id

org — org_id

city, state

date — YYYY-MM-DD (exact day)

after — ISO datetime (>=)

Example

GET /api/events?q=run&category=1&date=2025-10-19

GET /events/:id

Returns one event (joined with category_name and org_name).

POST /events

Required: org_id, category_id, title, start_datetime (ISO).
Other optional fields are accepted (see schema).

{
  "org_id": 1,
  "category_id": 1,
  "title": "5K Spring Fun Run",
  "start_datetime": "2025-10-19T22:00:00.000Z",
  "description": "Family friendly run",
  "end_datetime": "2025-10-20T00:00:00.000Z",
  "venue": "River Park",
  "city": "Melbourne",
  "state": "VIC",
  "country": "Australia",
  "capacity": 500,
  "ticket_price": 10.00,
  "goal_amount": 20000
}

PUT /events/:id

Send only fields you want to change (same shape as POST).

DELETE /events/:id

Deletes an event.

Errors return JSON: { "error": "message" } with suitable HTTP status.

7) What the WEB app does

Search on /events.html (text/category/org/date/city/state) and render results table.

View a single event on /event.html?id=… with a small progress bar showing raised_amount / goal_amount.

Create a new event on /add.html with HTML5 validation. On success, redirect to the new detail page.

(Optional to extend for extra marks: add Edit/Delete in the UI using PUT/DELETE.)

8) Troubleshooting

Port already in use

lsof -i :8080   # or :3060
kill -9 <PID>


MySQL connection

Check API/.env credentials and DB_NAME=charityevents_db.

Ensure MySQL server is running on localhost:3306.

CORS

API uses cors(); keep WEB/.env API_BASE in sync with the API port.

Datetime inputs

<input type="datetime-local"> needs converting to ISO before POST (handled in add.js).

9) Demo checklist (for video)

Show charityevents_db in Workbench (tables + a few rows).

Start API (3060) and WEB (8080).

/events.html: run a couple of searches (by text, category, date).

Click into a result → /event.html?id=....

/add.html: create an event → redirected to its detail page.

Back to Workbench → show the inserted row.

Briefly explain the ERD (orgs ↔ events ↔ categories).