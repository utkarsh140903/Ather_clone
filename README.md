# 🛵 Ather Energy Clone

A modern, responsive React application that replicates and enhances the Ather Energy electric scooter website with additional interactive features like a scooter compatibility quiz and sustainability calculator.

![Ather Clone Banner](https://www.atherenergy.com/favicon.ico)

## ✨ Key Features

- **Interactive UI**: Modern, responsive design built with Tailwind CSS and shadcn/ui components
- **Find Your Match Quiz**: Interactive quiz to help users find their perfect Ather scooter match
- **Sustainability Calculator**: Calculate environmental impact and cost savings of switching to electric vehicles
- **Enhanced Animations**: Smooth animations and transitions using Framer Motion
- **Error Handling**: Comprehensive error boundary implementation for improved UX

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe codebase
- **Vite**: Fast and optimized build tool
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **Framer Motion**: Animation library for React
- **React Router**: Client-side routing
- **React Query**: Data fetching and state management
- **Recharts**: Chart library for visualizing data
- **Zod**: Schema validation
- **React Hook Form**: Form handling with validation

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/utkarsh140903/Ather_clone.git
   cd ATHER-Clone
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
ATHER-Clone/
├── public/         # Static assets
├── src/
│   ├── components/ # Reusable UI components
│   │   ├── ui/     # Base UI components from shadcn/ui
│   │   ├── quiz/   # Components for the compatibility quiz
│   │   └── SustainabilityCalculator/ # Sustainability calculator components
│   ├── hooks/      # Custom React hooks
│   ├── pages/      # Page components
│   ├── styles/     # Global styles and theme configuration
│   ├── types/      # TypeScript type definitions
│   ├── utils/      # Utility functions
│   ├── App.tsx     # Main application component
│   └── main.tsx    # Application entry point
├── index.html      # HTML template
├── package.json    # Project dependencies and scripts
├── tsconfig.json   # TypeScript configuration
└── vite.config.ts  # Vite configuration
```

## 🔍 Features in Detail

### Find Your Match Quiz

The interactive quiz helps users find the perfect Ather scooter for their needs:

- **Personalized Questions**: Multiple question types covering commute, budget, and preferences
- **Dynamic Scoring**: Sophisticated scoring algorithm to match users with the ideal scooter model
- **Results Analysis**: Detailed breakdown of compatibility across different categories
- **Cost & Environmental Impact**: Calculate potential savings and environmental benefits
- **Mobile-Friendly**: Responsive design works seamlessly on all devices

### Sustainability Calculator

Calculate the environmental and financial impact of switching to electric vehicles:

- **Emissions Comparison**: Compare CO₂ emissions between different vehicle types
- **Cost Analysis**: Calculate monthly and annual cost differences
- **Interactive Charts**: Visualize the comparison data with interactive charts
- **Savings Estimation**: Estimate total savings and environmental impact over time
- **Export & Share**: Save results, download as CSV, or share on social media

### UI Components and Animation

- **Framer Motion Integration**: Smooth page transitions and micro-interactions
- **Custom Theme**: Cohesive design system with Ather's brand colors
- **Accessibility**: ARIA-compliant components with keyboard navigation support
- **Error Boundaries**: Graceful error handling with helpful recovery options

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgements

- [Ather Energy](https://www.atherenergy.com/) for the inspiration
- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for the animation library

