🚆 Yatra Guide
A Modern Railway Reservation System inspired by IRCTC




🌟 Overview
Full-stack railway booking system with real-time seat availability, secure payments, and intuitive UI. Built for seamless train reservations with automatic booking management.
🔗 Live Demo: yatraguide.vercel.app

✨ Key Features
For Users:

🔐 Secure authentication with JWT
🎫 Real-time train search & seat booking
⏰ Auto-cancellation after 30 minutes
💳 Integrated payment system
📱 Personal booking dashboard

For Admins:

📊 Analytics dashboard
🚄 Train & route management
👥 User management system


🛠️ Tech Stack
Frontend: React, Tailwind CSS, React Router
Backend: Node.js, Express.js, MySQL
Auth: JWT, bcrypt

🚀 Quick Start
Frontend Setup
bashgit clone https://github.com/your-username/yatra-guide.git
cd yatra-guide/client
npm install && npm run dev
Backend Setup
bashcd server
npm install

# Create .env file:
# DB_HOST=your_mysql_host
# DB_USER=your_mysql_user  
# DB_PASSWORD=your_mysql_password
# DB_NAME=yatra_guide
# JWT_SECRET=your_jwt_secret

npm start


🔧 API Endpoints
Auth:     POST /api/auth/{register,login}
Trains:   GET  /api/trains
Bookings: GET  /api/bookings, POST /api/bookings

🤝 Contributing

Fork the repo
Create feature branch: git checkout -b feature/name
Commit changes: git commit -m 'Add feature'
Push and create Pull Request


📄 License
MIT License - feel free to use this project!

👨‍💻 Author
Pratik Tiwari
