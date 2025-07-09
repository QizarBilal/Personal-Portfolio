# Personal Portfolio Website

## Overview

This is a modern, responsive personal portfolio website built with React.js, TypeScript, and Tailwind CSS. The application showcases Mohammed Qizar Bilal's professional profile as a web developer with a futuristic black and white theme featuring advanced animations and interactive elements.

## System Architecture

### Frontend Architecture
- **Framework**: React.js with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions and entrance animations
- **Build Tool**: Vite for fast development and optimized builds
- **Font**: Space Grotesk and Inter for modern typography

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Connect-pg-simple for session storage
- **Development**: Hot module replacement with Vite integration

## Key Components

### Portfolio Sections
1. **Landing Page**: Full-screen hero section with animated background
2. **About Section**: Professional bio with profile picture and interests
3. **Skills Section**: Interactive grid showcasing technical skills with hover effects
4. **Education Timeline**: Academic background presentation
5. **Projects Showcase**: Project cards with GitHub and live demo links
6. **Contact Form**: Functional contact form with validation

### UI Components
- **Navigation**: Smooth scroll navigation with active section tracking
- **Scroll Indicator**: Progress bar showing scroll position
- **Back to Top**: Floating action button for quick navigation
- **Toast Notifications**: User feedback system
- **Form Validation**: React Hook Form with Zod schema validation

### Visual Effects
- **Neon Glow Effects**: Cyan and electric blue accent colors
- **Hover Animations**: Shimmer and glow effects on interactive elements
- **Entrance Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile-first approach with breakpoint optimization

## Data Flow

### Contact Form Process
1. User fills out contact form (name, email, message)
2. Client-side validation using Zod schema
3. Form submission to `/api/contact` endpoint
4. Server-side validation and processing
5. Success/error feedback via toast notifications

### Navigation Flow
1. User clicks navigation links or scrolls
2. Active section tracking updates based on scroll position
3. Smooth scroll behavior for enhanced UX

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Data fetching and caching
- **@hookform/resolvers**: Form validation integration
- **@radix-ui/***: Headless UI components
- **framer-motion**: Animation library
- **drizzle-orm**: Type-safe database queries
- **@neondatabase/serverless**: PostgreSQL database connection

### Development Tools
- **TypeScript**: Type safety and better developer experience
- **ESBuild**: Fast bundling for production
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Database: Drizzle migrations handle schema changes

### Environment Configuration
- **Development**: Hot reload with Vite dev server
- **Production**: Express serves static files and API routes
- **Database**: PostgreSQL connection via environment variables

### Scripts
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build
- `npm run start`: Production server
- `npm run db:push`: Database schema sync

## Changelog
- June 30, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.