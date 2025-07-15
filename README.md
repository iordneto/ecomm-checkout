# E-commerce Checkout Page

A modern, fully-featured checkout page for an e-commerce application built with Next.js and TypeScript. This project demonstrates a complete checkout flow including product display, shipping options, address validation, and cart calculations.

## 🚀 Features

- **Product Cart Display**: Shows selected products with images, quantities, and pricing
- **Address Lookup**: Automatic address completion based on ZIP code
- **Shipping Options**: Multiple delivery methods with different pricing and timeframes
- **Real-time Calculations**: Dynamic cart totals including shipping costs
- **Form Validation**: Comprehensive form validation with error handling
- **Responsive Design**: Mobile-first responsive design
- **Accessibility**: Built with accessibility best practices using Radix UI

## 🛠️ Technologies & How They're Used

### Core Framework

- **[Next.js 15](https://nextjs.org)** - React framework with App Router for file-based routing and server-side rendering
- **[TypeScript](https://www.typescriptlang.org/)** - Provides type safety throughout the application, with custom interfaces for products, shipping options, and cart data

### UI & Styling

- **[TailwindCSS v4](https://tailwindcss.com/)** - Utility-first CSS framework for responsive design and consistent styling
- **[Radix UI](https://www.radix-ui.com/)** - Accessible, unstyled UI primitives used for:
  - Form controls (checkboxes, radio groups, inputs)
  - Interactive components (collapsible sections, separators)
  - Accessible component behavior
- **[Lucide React](https://lucide.dev/)** - Icon library for consistent iconography
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library for smooth transitions and micro-interactions

### Form Management & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant form library handling:
  - Form state management
  - Input validation
  - Error handling
  - Form submission
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation for:
  - Form input validation
  - API response validation
  - Runtime type checking
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Connects Zod schemas with React Hook Form

### Data Management

- **[TanStack Query](https://tanstack.com/query)** - Server state management for:
  - API data caching
  - Background refetching
  - Optimistic updates
- **[SWR](https://swr.vercel.app/)** - Data fetching library for real-time data synchronization
- **[MirageJS](https://miragejs.com/)** - API mocking library that provides:
  - Mock backend for development
  - Realistic API endpoints for cart, shipping, and address data
  - Simulated network delays and responses

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting with Next.js configuration
- **[PostCSS](https://postcss.org/)** - CSS processing for TailwindCSS compilation

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── checkout/          # Checkout page and layout
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (Button, Input, etc.)
│   └── icons/            # Custom icon components
├── lib/                  # Utility libraries
│   ├── mirage.ts         # Mock API server configuration
│   ├── utils.ts          # Utility functions
│   └── validations.ts    # Zod validation schemas
└── modules/
    └── checkout/         # Checkout-specific components and logic
        ├── components/   # Checkout form, header, and summary
        ├── schemas/      # Form validation schemas
        ├── services/     # API service functions
        └── types/        # TypeScript type definitions
```

## 🎯 Key Implementation Details

### Mock API with MirageJS

The project uses MirageJS to simulate a real backend with endpoints for:

- `/api/cart` - Retrieves cart contents and calculates totals
- `/api/address/:zipCode` - Address lookup by ZIP code
- `/api/shipping` - Available shipping options
- `/api/cart/calculate` - Real-time cart calculation with shipping

### Form Validation Flow

1. **Zod schemas** define validation rules for form inputs
2. **React Hook Form** manages form state and triggers validation
3. **Real-time validation** provides immediate feedback to users
4. **TypeScript integration** ensures type safety throughout the form flow

### State Management Strategy

- **Local component state** for UI interactions (form inputs, toggles)
- **TanStack Query** for server state (cart data, shipping options)
- **SWR** for real-time data synchronization
- **Form state** managed by React Hook Form

## 🚦 Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd front-end-challenge-1-gacndb
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open the application**
   Visit [http://localhost:3000](http://localhost:3000) to see the checkout page

## 📱 Features in Action

- **Address Autocomplete**: Enter a ZIP code to automatically populate address fields
- **Shipping Calculator**: Select different shipping options to see real-time price updates
- **Form Validation**: Experience comprehensive validation with helpful error messages
- **Responsive Design**: Test the interface across different screen sizes
- **Accessibility**: Navigate using keyboard and screen reader-friendly interactions

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

The application is optimized for deployment on [Vercel](https://vercel.com), but can be deployed to any platform that supports Next.js applications.
