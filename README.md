
Contact Management System API

Welcome to the Contact Management System API! This project is a CRUD API for managing contacts. Each user can only access their own contact information, which includes name, email, and phone number. The API is built using Express.js for the server and MongoDB for the database. JWT is used for authentication.
Getting Started

Prerequisites
Node.js: Ensure Node.js is installed on your machine. You can download it from [here](https://nodejs.org/).
MongoDB: MongoDB should be installed and running locally or accessible remotely. You can download it from [here](https://www.mongodb.com/try/download/community).

Installation

1. Clone the repository:
   git clone <repository-url>

2. Navigate to the project directory:
   cd ContactManagementSystem_ExpressAPI

3. Install dependencies:
   npm install express mongoose bcrypt jsonwebtoken dotenv
   
   This command will install Express.js, Mongoose (MongoDB object modeling tool), Bcrypt (for password hashing), Jsonwebtoken (for JWT authentication), and dotenv (for loading environment variables).

5. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:
   PORT=3000
   MONGODB_URI=<your-mongodb-uri>
   JWT_ACCESS_TOKEN_SECRET=<your-jwt-access-token-secret>

   Replace `<your-mongodb-uri>` with the connection URI for your MongoDB database. Choose a secure `<your-jwt-access-token-secret>` for JWT token generation and verification.

Starting the Server

To start the server, run:
npm start

The server will start running on the specified port (default is 3000).

Testing Endpoints

Use Postman or any other API testing tool to test the implemented endpoints. The following endpoints are available:

- `POST /api/auth/login`: Authenticates a user and returns a JWT token.
- `POST /api/auth/register`: Registers a new user.
- `GET /api/contacts`: Retrieves all contacts for the authenticated user.
- `GET /api/contacts/:id`: Retrieves a specific contact by ID for the authenticated user.
- `POST /api/contacts`: Creates a new contact for the authenticated user.
- `PUT /api/contacts/:id`: Updates a specific contact by ID for the authenticated user.
- `DELETE /api/contacts/:id`: Deletes a specific contact by ID for the authenticated user.

Ensure that you include the JWT token received after logging in as a Bearer token in the Authorization header for authenticated routes.

Contributor
[Your Name](https://github.com/AthrvaNaik)

