
# NoteNest | Personal Notes & Task Management App

**NoteNest** is a feature-rich personal notes and task management application designed to help you stay organized and productive. Built with a robust client-server architecture, NoteNest allows users to:
- Create, edit, and manage **notes**.
- Organize and track **tasks** effectively.
- Provide and receive **feedback** for collaborative improvements.
- Enjoy a sleek and responsive UI powered by **ShadCN components**.

---

## Features

1. **Notes Management**:
   Effortlessly create, edit, delete, and search through your notes.

2. **Task Tracking**:
   Organize your tasks with status updates, due dates, and priority management.

3. **Feedback System**:
   Submit feedback to enhance your experience or report issues.

4. **Modern UI**:
   Built with **ShadCN components**, ensuring a clean, accessible, and responsive design.

5. **Secure Backend**:
   Utilizes salted hashing with **PEPPER** and secure JWT tokens for user authentication.

---

## Prerequisites

Before running the app, ensure you have the following installed:

- **Node.js**
- **npm** (Node Package Manager)
- **MongoDB**

---

## Installation

To set up NoteNest, clone this repository and install dependencies for both the **client** and **server**.

### Client Setup

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` directory with the following content:

   ```env
   VITE_SERVER=<YOUR_SERVER_URL>
   ```

4. Run the client application:

   ```bash
   npm run dev
   ```

   The client app will run on `http://localhost:5173`.

---

### Server Setup

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory with the following content:

   ```env
   DATABASE_URI=<YOUR_MONGODB_URI>
   PORT=<YOUR_SERVER_PORT>
   CLIENT_URL=<YOUR_CLIENT_URL>
   PEPPER=<YOUR_PEPPER_VALUE>
   JWT_SECRET=<YOUR_JWT_SECRET>
   ```

4. Run the server application:

   ```bash
   npm run dev
   ```

   The server app will run on `http://localhost:5000`.

---

## Accessing the App

Once the client and server are running, you can access NoteNest by navigating to:

[http://localhost:5173](http://localhost:5173)

---

## Key Technologies Used

- **Frontend**: React with **ShadCN UI components**.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.
- **Authentication**: JWT with salted password hashing using **PEPPER**.
- **Environment Management**: `.env` for secure configurations.

---

## Contributing

We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Commit your changes and submit a pull request.

---

## Feedback & Support

Encounter issues or have suggestions? Submit your feedback through the app or raise an issue on the GitHub repository.

---