## Instagram Profile Analyzer

Detect fake Instagram profiles using advanced analysis algorithms. Choose between real Instagram API integration or simulation mode.

### Features
- Real-time Instagram profile analysis using Graph API
- Simulation mode for testing
- Advanced metrics and risk analysis
- Beautiful, responsive UI
- Detailed profile insights

### Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. For Real Instagram API mode:
   - Register your app at https://developers.facebook.com
   - Create an Instagram Basic Display API application
   - Copy `.env.example` to `.env`
   - Add your Instagram access token to `.env`

4. Start the development server:
```bash
npm run dev
```

### Environment Variables
- `VITE_INSTAGRAM_ACCESS_TOKEN`: Your Instagram API token (optional, only for real API mode)

### Tech Stack
- React
- TypeScript
- Tailwind CSS
- Vite
- Axios
- Date-fns
- Lucide Icons