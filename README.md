# Personal Portfolio Website

A stunning personal portfolio website built with Next.js, featuring a Palantir-inspired dark UI with geometric patterns and golden ratio layouts.

## Features

- 🎨 **Palantir-Inspired Design**: Dark theme with geometric patterns and data visualization aesthetics
- ✨ **Golden Ratio Layouts**: Typography and spacing based on the golden ratio (φ = 1.618)
- 🎭 **Smooth Animations**: Framer Motion powered animations throughout
- 📱 **Responsive Design**: Fully responsive and mobile-friendly
- 🚀 **GitHub Pages Ready**: Configured for automatic deployment

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vedantnaiduu/personalwebsite.git
cd personalwebsite
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The site is configured for GitHub Pages deployment. Simply push to the `main` branch and GitHub Actions will automatically build and deploy the site.

### Manual Deployment

1. Build the static export:
```bash
npm run build
```

2. The `out` directory contains the static files ready for deployment.

## Customization

- Update personal information in the respective page components
- Modify colors in `tailwind.config.ts`
- Adjust geometric patterns in `components/GeometricBackground.tsx`
- Update project data in `app/projects/page.tsx`
- Update experience data in `app/experience/page.tsx`

## License

MIT

