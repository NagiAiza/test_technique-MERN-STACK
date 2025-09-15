# Fouquet's Restaurant - MERN Stack Reservation Platform

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

---

## 📜 About The Project

This project is a full-stack web application developed as a technical test for JEECE, the Junior-Enterprise of ECE Paris. It serves as an online reservation and menu consultation platform for the restaurant "Fouquet," allowing customers to easily book a table and pre-order their meals to reduce waiting times. The application is built entirely on the MERN stack (MongoDB, Express.js, React.js, Node.js) as per the project requirements.

---

## ✨ Features

The platform is divided into two main parts: a user-facing side and an administrator dashboard.

### User Features

* **Secure Authentication**: Users can create an account or log in to a personal dashboard. The registration process requires an email, name, and a secure password (minimum 8 characters, with one uppercase letter, one number, and one special character). The authentication system is secured using Tokens.
* **Menu Consultation**: A dedicated page displays the restaurant's menu, including starters, main courses, desserts, and wines, along with their prices. This page is for viewing only.
* **Table Reservation**: A calendar system shows restaurant availability for the next 7 days, with distinct slots for lunch and dinner. Each time slot is limited to 5 reservations.
* **Meal Pre-ordering**: When booking, users must select an entrée, a main course, and a dessert for each person in their party. They can also add bottles of wine to their order.
* **Personal Dashboard**: Once logged in, users can access their personal space to:
    * View and edit their profile information (name, first name, profile picture).
    * See a list of all their past and upcoming reservations.
    * Cancel a reservation or modify the pre-ordered menu for an existing booking.

### Administrator Features

* **Admin Dashboard**: Administrators have access to a separate interface to manage the restaurant's operations. Admin accounts are pre-registered directly in the database.
* **Calendar Management**: View a comprehensive calendar showing all reservations, including customer names, party size, and pre-ordered menus.
* **Menu Management (CRUD)**: A dedicated module allows admins to add, modify, or delete dishes and prices on the restaurant's menu.
* **Client Management**: Admins can view a list of all registered clients and have the ability to delete user accounts.

### Bonus Features

* **Redux Integration**: The project was encouraged to use Redux for state management.
* **Table Selection**: Users can choose a specific table from a visual plan during the reservation process.

---

## 🛠️ Tech Stack

* **Frontend**: React.js (likely via Next.js, based on file structure).
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB with Mongoose for object data modeling.
* **Authentication**: Token-based (implied JWT).
* **Styling**: Material-UI was recommended for UI components.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v14 or higher)
* npm or yarn
* A running MongoDB instance (local or on a service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```

2.  **Backend Setup**
    ```sh
    # Navigate to the backend directory
    cd backend

    # Install NPM packages
    npm install

    # Create a .env file and add your database connection string and port
    # MONG_URI=your_mongodb_connection_string
    # PORT=4000
    
    # Start the backend server
    npm run dev
    ```

3.  **Frontend Setup**
    ```sh
    # Navigate to the frontend directory from the root
    cd ../frontend

    # Install NPM packages
    npm install

    # Start the frontend development server
    npm run dev
    ```
4.  Open your browser and navigate to `http://localhost:3000` (or the port specified by Next.js).

## 📁 Project Structure

The repository is organized into two main directories: `frontend` and `backend`.
