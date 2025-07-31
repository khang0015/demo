# TikTok Ads Pro - Marketing Agency Website

## Overview

This is a full-stack web application for a TikTok advertising agency. The application is built using a modern React frontend with a Node.js/Express backend, featuring internationalization (i18n) support for English and Vietnamese languages, contact form functionality, and a responsive design optimized for marketing and lead generation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components built on top of Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API endpoints
- **Session Management**: Express sessions with PostgreSQL store

### Development Setup
- **Monorepo Structure**: Client, server, and shared code in separate directories
- **Shared Types**: Common TypeScript types and schemas in `/shared` directory
- **Path Mapping**: TypeScript path aliases for clean imports (@/, @shared/)

## Key Components

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Three main tables:
  - `users`: User authentication (id, username, password)
  - `translations`: Internationalization content (id, lang, key, value)
  - `contacts`: Contact form submissions (id, name, email, company, service, message, createdAt)
- **Validation**: Zod schemas for runtime type validation
- **Storage**: In-memory storage implementation for development with interface for future database integration

### API Endpoints
- `GET /api/translations/:lang`: Retrieve translations by language (en/vi)
- `POST /api/contact`: Submit contact form with validation

### Frontend Features
- **Landing Page**: Complete marketing website with sections:
  - Hero section with trust indicators
  - Services showcase (TikTok, Google, Microsoft, Facebook)
  - Partners section highlighting certifications
  - Customer testimonials
  - Blog/insights section
  - Contact form
  - Footer with company information
- **Internationalization**: Dynamic language switching between English and Vietnamese
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **Toast Notifications**: User feedback for form submissions

### UI/UX Design
- **Design System**: Dark theme with brand colors (red primary, dark backgrounds)
- **Component Library**: Comprehensive set of reusable UI components
- **Icons**: Lucide React icons and React Icons for social media
- **Typography**: Custom font configuration with proper hierarchy
- **Accessibility**: ARIA labels and semantic HTML structure

## Data Flow

1. **Page Load**: Client fetches translations based on browser/stored language preference
2. **Language Switch**: User can toggle between English and Vietnamese, triggering new translation fetch
3. **Form Submission**: Contact form data is validated client-side, sent to API, validated server-side, and stored
4. **Error Handling**: Both client and server implement proper error handling with user feedback

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL database connection
- **drizzle-orm**: Database ORM and query builder
- **drizzle-zod**: Integration between Drizzle and Zod for schema validation
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Zod resolver for React Hook Form

### UI Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for styling
- **clsx**: Conditional className utility
- **date-fns**: Date manipulation library

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development
- **esbuild**: Fast bundler for production server build

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Production Server**: Serves static files and API endpoints from single Express server

### Environment Configuration
- **Development**: Uses Vite dev server with proxy to Express API
- **Production**: Express serves both static files and API endpoints
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Scripts
- `dev`: Development mode with hot reloading
- `build`: Production build for both frontend and backend
- `start`: Production server startup
- `db:push`: Database schema migration using Drizzle

The application is designed to be deployed on platforms supporting Node.js with PostgreSQL databases, with particular optimization for Replit's environment including development banner integration and runtime error overlay.