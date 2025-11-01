# Cory Fitzpatrick Portfolio

Modern portfolio website showcasing development, design, and photography work with an AI-powered chatbot assistant.

🌐 **Live Site**: [coryfitzpatrick.com](https://coryfitzpatrick.com)

## Features

### 🤖 AI Chatbot Assistant
- Interactive chatbot interface powered by AI to answer questions about skills, experience, and projects
- Real-time streaming responses for natural conversation flow
- Custom vintage robot icon design
- Mobile-responsive chat interface

### 📁 Portfolio Categories
- **Dev**: Software development projects and professional experience
- **Design**: Graphic design and creative work
- **Photo**: Photography portfolio

### 🎨 Modern UI/UX
- Responsive grid layout that works on all devices
- Smooth animations and hover effects
- Vintage-inspired design aesthetic
- Custom SCSS styling

## Tech Stack

- **Frontend**: React 19, React Router v5
- **Build Tool**: Vite
- **Styling**: SCSS (Sass)
- **Testing**: Jest, React Testing Library
- **Deployment**: GitHub Pages with GitHub Actions CI/CD
- **DNS & CDN**: Cloudflare (proxied with SSL/TLS)
- **AI Backend**: Google Cloud Run (separate repository)

## Project Structure

```
fitzmx6.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions deployment workflow
├── public/
│   ├── images/          # Portfolio images and assets
│   ├── CNAME            # Custom domain configuration
│   └── 404.html         # SPA routing for direct URL access
├── src/
│   ├── components/      # React components
│   │   ├── chatbot-page.jsx      # AI chatbot interface
│   │   ├── robot-icon.jsx        # Custom SVG robot icon
│   │   ├── category-list.jsx     # Portfolio grid display
│   │   ├── detail-item.jsx       # Individual project details
│   │   ├── about-page.jsx        # About page
│   │   ├── header.jsx            # Site navigation
│   │   └── footer.jsx            # Site footer
│   ├── styles/          # SCSS stylesheets
│   ├── data/           # Portfolio data (data.json)
│   └── main.tsx        # App entry point
├── package.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 24.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fitzmx6/fitzmx6.github.io.git
cd fitzmx6.github.io
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Building for Production

Build the optimized production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

### Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## Configuration

### AI Chatbot API

The chatbot automatically switches between local and production API endpoints:

- **Local Development**: `http://localhost:8000/api/chat/stream`
- **Production**: `https://coryfitzpatrick-ai-backend-fcwbtvbnfa-uc.a.run.app/api/chat/stream`

To run with a local backend:
1. Start the backend server on port 8000
2. Run the frontend dev server
3. The app will automatically detect localhost and use the local API

### Portfolio Data

Portfolio content is managed in `/src/data/data.json`. Update this file to add or modify:
- Project information
- Images and thumbnails
- Project descriptions
- Project URLs

## Deployment

### Current Deployment: GitHub Pages

The site is automatically deployed to GitHub Pages using GitHub Actions whenever code is pushed to the `master` branch.

**Automatic Deployment:**

Simply push to the master branch:
```bash
git add .
git commit -m "Your commit message"
git push origin master
```

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
1. Build the project
2. Deploy to GitHub Pages
3. Make the site live at [coryfitzpatrick.com](https://coryfitzpatrick.com)

**Custom Domain Setup:**

The site uses `coryfitzpatrick.com` as a custom domain, configured with:

1. **GitHub Pages Configuration:**
   - Repository name: `fitzmx6.github.io` (enables apex domain support)
   - Custom domain setting: `coryfitzpatrick.com`
   - Enforce HTTPS: Enabled

2. **Cloudflare DNS Configuration:**
   - **A Records** (apex domain `@`):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME Record** (www subdomain):
     - Name: `www`
     - Target: `fitzmx6.github.io`
   - **Proxy Status**: Orange cloud (proxied) for all records
   - **SSL/TLS Mode**: Full
   - **Always Use HTTPS**: Enabled

3. **SPA Routing Solution:**
   - `public/404.html` redirects direct URL access to index.html
   - Enables routes like `/dev`, `/photo`, `/design` to work on page refresh
   - Uses [spa-github-pages](https://github.com/rafgraph/spa-github-pages) technique

**Manual Deployment (Alternative):**

If you prefer to deploy manually:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

**Compatible hosting platforms:**
- **GitHub Pages** (currently used)
- Netlify
- Vercel
- Cloudflare Pages
- Any static hosting service

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Serve production build locally |
| `npm run preview` | Preview production build |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |
| `npm run build-css` | Compile SCSS to CSS |

## Key Features Implementation

### Chatbot Interface
- Streaming API responses with real-time updates
- Loading spinner during AI response generation
- Auto-scrolling to latest messages
- Example questions for quick start
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 1024px
- Touch-friendly interface for mobile devices
- Optimized images and assets

### Portfolio Grid System
- Custom responsive grid using RWD Grid
- Hover animations on project cards
- Category-based filtering
- Detail pages for each project

### SPA Routing on GitHub Pages
- Custom 404.html handles direct navigation to routes
- Redirects preserve the path using query parameters
- index.html restores clean URLs using History API
- Enables bookmarking and sharing of specific portfolio pages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private portfolio project - All rights reserved

## Contact

Cory Fitzpatrick - Software Tech Lead

For questions about this portfolio or to discuss opportunities, use the AI chatbot on the site or visit [coryfitzpatrick.com](https://coryfitzpatrick.com)
