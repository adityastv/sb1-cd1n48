## Quick Setup Guide

1. Prerequisites:
   - Node.js (v18 or higher)
   - npm (comes with Node.js)

2. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create environment file:
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` and add your Instagram API token if using Real API mode

5. Start development server:
   ```bash
   npm run dev
   ```

6. Open in browser:
   - The development server will start at http://localhost:5173

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Modes

1. Simulation Mode (default):
   - No API token required
   - Uses simulated data for testing

2. Real API Mode:
   - Requires Instagram API token in `.env`
   - Provides real-time analysis of actual profiles

## Troubleshooting

1. If you see module not found errors:
   ```bash
   rm -rf node_modules
   npm install
   ```

2. If the dev server fails to start:
   - Check if port 5173 is available
   - Ensure all dependencies are installed
   - Verify Node.js version (v18+)

3. For TypeScript errors:
   - Run `npm install` to ensure all type definitions are installed
   - Check `tsconfig.json` for proper configuration