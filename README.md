# Brainwalk 🚶‍♂️

> A mindful stroll through ideas worth knowing

Brainwalk is a minimalist content discovery app that helps you explore curated content across various topics—one thoughtful piece at a time. No endless scrolling, no distractions, just meaningful ideas.

## Features

- **Personalized Onboarding**: Select your interests from topics like 15th century poetry, 1600s history, tech news, short stories, philosophy, and science
- **One-at-a-Time Content**: Focus on a single piece of content without distractions
- **Deep Dive Mode**: Expand articles to read the full content
- **Smooth Transitions**: Beautiful animations and transitions throughout the app
- **Mobile Responsive**: Works seamlessly on all device sizes
- **Persistent State**: Your preferences and progress are saved locally
- **Beautiful Typography**: Different fonts for literary vs technical content

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Backend**: Supabase (optional - works with mock data by default)
- **State Management**: React hooks + localStorage

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd brainwalk
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The app will work immediately with mock data! No configuration needed to try it out.

## Supabase Setup (Optional)

If you want to use Supabase for backend storage instead of mock data:

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

3. Fill in your Supabase credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

4. Run the database schema in your Supabase SQL Editor:
```bash
# The schema is in supabase-schema.sql
# Copy and paste it into the Supabase SQL Editor
```

The schema file includes:
- Content table creation
- Row Level Security policies
- Sample content for all categories

## Project Structure

```
brainwalk/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx             # Main app logic and routing
│   │   └── globals.css          # Global styles and animations
│   ├── components/
│   │   ├── WelcomeScreen.tsx    # Initial welcome screen
│   │   ├── InterestSelection.tsx # Interest selection UI
│   │   ├── ContentCard.tsx      # Content blurb display
│   │   └── ExpandedView.tsx     # Full content view
│   ├── hooks/
│   │   └── useLocalStorage.ts   # localStorage hook
│   └── lib/
│       ├── supabase.ts          # Supabase client & types
│       └── contentService.ts    # Content fetching logic
├── supabase-schema.sql          # Database schema
└── next.config.js               # Next.js configuration
```

## How It Works

### Onboarding Flow

1. **Welcome Screen**: Users are greeted with the app tagline
2. **Interest Selection**: Choose at least 2 topics from 6 categories
3. **Content Feed**: Browse personalized content based on selections

### Content Feed

- View one content blurb at a time
- Click "Deep Dive" to read the full article
- Click "Next →" to skip to the next item
- Use navigation arrows to go back/forward
- See your position with a counter (e.g., "3 of 12")

### Data Flow

The app uses a smart data service that:
1. Checks if Supabase is configured
2. Falls back to mock data if Supabase isn't available
3. Filters content based on selected interests
4. Persists user preferences in localStorage

## Customization

### Adding Content

**With Mock Data:**
Edit `src/lib/contentService.ts` and add items to the `MOCK_CONTENT` array.

**With Supabase:**
Insert directly into the Supabase database or use the SQL Editor.

### Styling

- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components for UI changes
- Animations are defined in globals.css

### Fonts

The app uses system fonts by default for fast loading:
- **Sans-serif**: System UI fonts (for tech content)
- **Serif**: Georgia, Cambria (for literary content)

To use Google Fonts (requires internet connection during build):
1. Install fonts in `src/app/layout.tsx`
2. Update font variables in `globals.css`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

### Deployment

Deploy to Vercel (recommended for Next.js):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or deploy to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | No | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Your Supabase anonymous key |

Note: The app works without these using mock data.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Inspired by the need for mindful, distraction-free content consumption
- Built with Next.js 15 and Tailwind CSS 4
- Sample content is original and created for educational purposes

---

**Built with focus, designed for mindfulness** 🧘‍♂️
