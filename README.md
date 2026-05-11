📑 Full-Stack Invoice Portal
A modern, secure web application for managing invoices, built with a React frontend and a PHP/MySQL backend. This project features a high-end "Secure Portal" login interface with glassmorphism design and responsive layouts.

🚀 Features
Secure Authentication: Login and Registration system with real-time validation.

Modern UI/UX: Built with Tailwind CSS, featuring glassmorphism and smooth transitions.

Responsive Design: Fully optimized for mobile, tablet, and desktop screens.

Database Integration: Powered by MySQL via a PHP REST API.

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS, Lucide Icons.

Backend: PHP (XAMPP environment).

Database: MySQL.

State Management: React Context API (AuthContext).

<img width="600" height="317" alt="image" src="https://github.com/user-attachments/assets/542e2219-9c39-4ab4-a96a-5e9395860493" />


⚙️ Installation & Setup
1. Backend (XAMPP)
Move the backend folder to your XAMPP htdocs directory (or keep it in the project and link it).

Start Apache and MySQL from the XAMPP Control Panel.

Create a database named invoice_portal and import the provided SQL schema (if available).

2. Frontend (React)
Navigate to the frontend directory:

Bash
cd frontend
Install dependencies:

Bash
npm install
Generate the Tailwind CSS:

Bash
npm run build:css
Start the development server:

Bash
npm start
🛠️ Troubleshooting
UI/CSS Issues: If Tailwind styles are not appearing, ensure you are running the CSS watcher:
npx tailwindcss -i ./src/index.css -o ./public/output.css --watch

CORS Errors: Ensure your PHP headers allow requests from localhost:3000.

👤 Author
SRIDHARA P.

MCA Student & Full-Stack Developer

Specializing in MERN Stack & Java
