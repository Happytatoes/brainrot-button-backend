# Brainrot Button (Backend)

Backend service for the Brainrot Button app. It maintains a simple global press counter using Express.js and MongoDB.

## Purpose
Provide a persistent API for a silly webapp where pressing a button increases a global number shared by all users.

## Stack
- Node.js
- Express.js
- MongoDB (via Mongoose)

## Endpoints

### GET /counter
Returns the current global counter value.

### POST /counter/increment
Increments the counter by 1 and returns the new value.

## How to Run Locally
git clone https://github.com/your-repo/brainrot-button-backend
cd brainrot-button-backend
npm install
node index.js
Make sure MongoDB is running and accessible via a connection string.

## Notes
No login system yet. Do not use in production without rate limiting.