# Divo - Online Medical Appointment Management System

A modern, intuitive, and responsive web application for online medical appointment management. Built with React, Next.js, and TailwindCSS, featuring dark mode support and accessibility-first design.

## ✨ Features

### 🏥 For Patients
- Create and manage personal health profiles
- Search for doctors by specialty, location, or availability
- Book, reschedule, or cancel appointments
- View upcoming and past appointments
- Receive appointment reminders via email/SMS
- Access medical records and prescriptions
- Track health metrics
- Dark mode support for comfortable viewing

### 👨‍⚕️ For Doctors
- Manage professional profiles and specializations
- Set availability and schedule preferences
- View and manage appointments
- Access patient medical history (with consent)
- Issue prescriptions and medical notes
- Communicate with patients securely
- Customizable dashboard

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js 18 with Next.js 13
- **Styling**: TailwindCSS 3, HeadlessUI
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form v7
- **Animations**: Framer Motion
- **Data Fetching**: React Query v4
- **Type Safety**: TypeScript 5

### Backend (Demo Implementation)
- Mock API with MSW (Mock Service Worker)
- Local storage for persistence
- Simulated latency for realistic experience

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or newer
- npm 8+ or yarn 1.22+

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/divo-medical.git
cd divo-medical
```

2. Install dependencies
```bash
npm install
# or
yarn install

npm install react-intersection-observer

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
divo-medical/
├── public/                  # Static assets
├── src/
│   ├── components/         
│   │   ├── common/         # Shared components
│   │   ├── layout/         # Layout components
│   │   ├── auth/           # Authentication components
│   │   └── features/       # Feature-specific components
│   ├── pages/              # Next.js pages
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── store/              # Redux store
│   ├── styles/             # Global styles
│   └── utils/              # Utilities
├── tests/                  # Test files
└── config/                 # Configuration files
```

## 🎨 Design Features

- **Dark Mode**: Full dark mode support with system preference detection
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Accessibility**: WCAG 2.1 AA compliant
- **Animations**: Smooth transitions and micro-interactions
- **Error Handling**: Comprehensive error states and feedback

## 📱 Screenshots

<details>
<summary>Click to view screenshots</summary>

- Dashboard (Light/Dark)
- Appointment Booking
- Doctor Search
- Patient Profile
- Mobile Views

</details>

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run accessibility tests
npm run test:a11y
```

## 📈 Development Roadmap

### Phase 1 (Completed)
- [x] Project setup and configuration
- [x] Core UI components
- [x] Authentication system
- [x] Dark mode implementation
- [x] Patient dashboard

### Phase 2 (In Progress)
- [ ] Doctor dashboard
- [ ] Appointment system
- [ ] Notifications
- [ ] Medical records

### Phase 3 (Planned)
- [ ] Real-time chat
- [ ] Video consultations
- [ ] Mobile app
- [ ] Integration with health devices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Project Link: [https://github.com/ZHX4/Divo](https://github.com/ZHX4/Divo)