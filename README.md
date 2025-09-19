# 🏥 Insurance Claims Processing App

A modern, responsive web application for managing insurance claims built with **React.js**. Features a professional interface with real-time data persistence and comprehensive claim management capabilities.

![Insurance Claims App](https://img.shields.io/badge/React-18.2.0-blue) ![Status](https://img.shields.io/badge/Status-Production%20Ready-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Features

- ✅ **Professional Dashboard** - Overview of claims statistics and analytics
- ✅ **Claim Submission** - Comprehensive form with file upload support
- ✅ **Data Persistence** - Claims saved to localStorage (survives browser restart)
- ✅ **Status Management** - Dynamic claim status updates (Pending, Under Review, Approved, Rejected)
- ✅ **File Upload** - Drag-and-drop file upload functionality
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Form Validation** - Real-time validation with error messaging
- ✅ **Delete Claims** - Remove claims with confirmation
- ✅ **Beautiful UI** - Modern gradient design with smooth animations

## 🛠 Technologies Used

- **Frontend:** React 18.x
- **Icons:** Lucide React
- **Styling:** Custom CSS with gradients and animations
- **State Management:** React Context API
- **Data Storage:** Browser localStorage
- **Build Tool:** Create React App

## 📸 Screenshots

### Dashboard View
![Dashboard](https://via.placeholder.com/800x400/2563eb/ffffff?text=Dashboard+View)

### Claim Submission Form
![New Claim](https://via.placeholder.com/800x400/059669/ffffff?text=Claim+Form)

### Claims Management
![Claims List](https://via.placeholder.com/800x400/ea580c/ffffff?text=Claims+Management)

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/insurance-claims-app.git
   cd insurance-claims-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Application Features

### 🏠 Dashboard
- Real-time statistics overview
- Total claims, amounts, and status breakdown
- Recent claims table with interactive elements

### 📋 New Claim Submission
- **Policy Number** - Required text input
- **Claim Type** - Dropdown with insurance categories
- **Claim Amount** - Numeric input with validation
- **Description** - Detailed textarea for incident description
- **File Upload** - Multi-file drag-and-drop support

### 📊 Claims Management
- Comprehensive table view of all claims
- Status management with dropdown selection
- Delete functionality with confirmation
- Persistent data storage

### 📈 Reports
- Claims statistics and analytics
- Status distribution overview

## 🎨 UI/UX Features

- **Modern Gradient Design** - Professional appearance
- **Smooth Animations** - Enhanced user experience
- **Hover Effects** - Interactive elements
- **Responsive Layout** - Works on all screen sizes
- **Form Validation** - Real-time error feedback
- **Loading States** - User feedback during operations

## 📁 Project Structure

```
insurance-claims-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Styling and animations
│   └── index.js        # Application entry point
├── package.json        # Dependencies and scripts
├── README.md          # Project documentation
└── .gitignore         # Git ignore rules
```

## 🔧 Available Scripts

```bash
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
npm run eject  # Eject from Create React App
```

## 🌟 Key Components

- **ClaimsProvider** - Context API for state management
- **Sidebar** - Navigation with active states
- **Header** - Title and user information
- **NewClaimForm** - Comprehensive claim submission
- **ClaimsList** - Table with CRUD operations
- **Dashboard** - Statistics and overview
- **FileUpload** - Drag-and-drop file handling

## 💾 Data Persistence

The application uses browser localStorage to maintain data persistence:
- Claims survive browser refresh
- Data persists after closing/opening browser
- No backend required for demo purposes

## 🔄 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Dark mode theme

## 🐛 Known Issues

- File uploads are stored in memory only (demo limitation)
- Data is local to browser (not shared across devices)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@YOUR-USERNAME](https://github.com/YOUR-USERNAME)
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Lucide React for beautiful icons
- Create React App for easy setup

---

⭐ **Star this repo if you found it helpful!** ⭐