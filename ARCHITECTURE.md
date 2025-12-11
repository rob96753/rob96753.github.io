# Website Architecture & Content Organization

## Overview

This document describes the architecture and organization of **Rob Nelson's Portfolio Website** (`rob96753.github.io`), a personal portfolio showcasing professional experience, skills, and project accomplishments.

## Site Purpose & Goals

- **Primary Purpose**: Professional portfolio and personal branding website
- **Target Audience**: Potential employers, collaborators, and professional contacts
- **Key Content**: CV/Resume, project summaries, contact information, and professional background
- **Hosting**: GitHub Pages (rob96753.github.io)

## Technical Architecture

### Foundation
- **Base Framework**: HTML5 Boilerplate v8.0.0
- **Build Tool**: Parcel bundler for development and build processes
- **Hosting Platform**: GitHub Pages
- **Browser Support**: Modern browsers with progressive enhancement

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: Custom styles with normalize.css foundation
- **JavaScript Libraries**: 
  - jQuery 1.12.4 (for CV page interactions)
  - jQuery UI 1.12.1 (for tooltips and enhanced UX)
  - Font Awesome 6.x (icon library)
- **Build Tools**: 
  - Parcel bundler v1.12.4
  - NPM scripts for development workflow

## Directory Structure & Organization

```
/
├── index.html                 # Homepage/landing page
├── package.json              # Build dependencies and scripts
├── README.md                 # Basic project information
├── LICENSE.txt               # Project license
├── 404.html                  # Custom 404 error page
├── robots.txt                # Search engine crawling instructions
├── site.webmanifest         # Web app manifest for PWA features
├── browserconfig.xml        # Browser configuration
├── humans.txt               # Development credits
│
├── pages/                   # All secondary pages
│   ├── about-me.html        # Personal background and philosophy
│   ├── cv.html              # Professional CV/resume
│   ├── contact-me.html      # Contact information and form
│   ├── fun-page.html        # Casual/personal content
│   └── summary-acomplishments.html # Detailed project portfolio
│
├── css/                     # Stylesheets organization
│   ├── styles.css           # Main/global styles
│   ├── main.css             # HTML5 Boilerplate base styles
│   ├── normalize.css        # CSS reset/normalization
│   ├── about.css            # About page specific styles
│   ├── cv-styles.css        # CV page specific styles
│   ├── contact-styles.css   # Contact page specific styles
│   ├── fun-page.css         # Fun page specific styles
│   └── more-text.css        # Text-heavy content styles
│
├── js/                      # JavaScript organization
│   ├── main.js              # Main application logic (currently empty)
│   ├── more-button.js       # Expandable content functionality
│   ├── plugins.js           # Third-party plugin integration
│   └── vendor/              # External libraries
│       └── modernizr-3.11.2.min.js
│
├── img/                     # Image assets
│
└── doc/                     # HTML5 Boilerplate documentation
    ├── TOC.md               # Documentation table of contents
    ├── html.md              # HTML structure guidelines
    ├── css.md               # CSS organization guidelines
    ├── js.md                # JavaScript guidelines
    ├── usage.md             # Usage instructions
    ├── faq.md               # Frequently asked questions
    ├── extend.md            # Extension guidelines
    └── misc.md              # Miscellaneous documentation
```

## Content Architecture

### Navigation Structure
The site follows a simple, flat navigation hierarchy:

```
Home (index.html)
├── About (pages/about-me.html)
├── CV (pages/cv.html)
├── Contact (pages/contact-me.html)
└── Project Summaries (pages/summary-acomplishments.html)
```

### Content Organization

#### 1. **Homepage (`index.html`)**
- **Purpose**: Landing page and site introduction
- **Key Elements**:
  - Hero section with professional tagline
  - Brief personal introduction
  - Navigation to main sections
  - Call-to-action for project summaries
- **Design Features**: Parallax scrolling effects, hero image

#### 2. **About Page (`pages/about-me.html`)**
- **Purpose**: Personal background and professional philosophy
- **Content Focus**:
  - Leadership and team collaboration approach
  - Technical expertise overview
  - Learning mindset and AI/technology perspective
- **Styling**: Custom styles in `about.css`

#### 3. **CV Page (`pages/cv.html`)**
- **Purpose**: Comprehensive professional resume
- **Features**:
  - Interactive tooltips (jQuery UI)
  - Structured professional experience
  - Skills and technical competencies
- **Enhanced UX**: Tooltip functionality for detailed information
- **Styling**: Dedicated `cv-styles.css`

#### 4. **Contact Page (`pages/contact-me.html`)**
- **Purpose**: Professional contact information and communication
- **Styling**: Custom contact form styles in `contact-styles.css`

#### 5. **Project Summaries (`pages/summary-acomplishments.html`)**
- **Purpose**: Detailed portfolio of professional projects
- **Features**:
  - Expandable content sections
  - Dark theme styling
  - Interactive "read more" functionality
- **JavaScript**: `more-button.js` for content expansion
- **Styling**: `more-text.css` for text-heavy content

## CSS Architecture

### Styling Strategy
- **Base Styles**: HTML5 Boilerplate foundation (`main.css`, `normalize.css`)
- **Global Styles**: Site-wide styling in `styles.css`
- **Page-Specific Styles**: Dedicated CSS files for each major page
- **Modular Approach**: Separate stylesheets for different content types

### Responsive Design
- Mobile-first approach with viewport meta tags
- Flexible layouts using modern CSS techniques
- Progressive enhancement for different screen sizes

## JavaScript Architecture

### Current Implementation
- **Minimal JavaScript**: Lightweight approach focusing on essential functionality
- **jQuery Integration**: Used specifically for CV page tooltips and interactions
- **Modular Structure**: Separate files for different functionality
- **Progressive Enhancement**: JavaScript enhances but doesn't break basic functionality

### Key Scripts
- `more-button.js`: Handles expandable content on project summaries
- `plugins.js`: Third-party plugin integration point
- `main.js`: Reserved for core application logic (currently unused)

## Development Workflow

### Build Process
```bash
npm run dev      # Development server with hot reload
npm run build    # Production build
npm run start    # Build and serve
```

### Development Setup
1. **Package Management**: NPM for dependency management
2. **Build Tool**: Parcel bundler for asset processing
3. **Development Server**: Local development with auto-reload
4. **Deployment**: Direct push to GitHub Pages

## Performance Considerations

### Optimization Strategies
- **Minimal Dependencies**: Only essential JavaScript libraries loaded
- **CSS Organization**: Page-specific stylesheets reduce unused CSS
- **Image Optimization**: Dedicated `img/` directory for optimized assets
- **Progressive Loading**: Core content loads first, enhancements follow

### SEO & Accessibility
- **Semantic HTML**: Proper HTML5 semantic structure
- **Meta Tags**: Appropriate viewport and meta information
- **Progressive Enhancement**: Works without JavaScript
- **Font Awesome**: Icon accessibility through semantic icon library

## Browser Support & Compatibility

### Target Browsers
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive degradation for older browsers

### Compatibility Features
- **Modernizr**: Feature detection for progressive enhancement
- **Normalize.css**: Cross-browser consistency
- **Viewport Meta**: Mobile responsiveness

## Future Considerations

### Potential Enhancements
1. **Content Management**: Consider adding a simple CMS for project updates
2. **Performance**: Image lazy loading and additional optimization
3. **Accessibility**: Enhanced ARIA labels and keyboard navigation
4. **Analytics**: Integration of web analytics for visitor insights
5. **PWA Features**: Enhanced progressive web app capabilities

### Scalability
- **Modular CSS**: Easy to extend with additional page-specific styles
- **JavaScript Architecture**: Ready for additional interactive features
- **Content Structure**: Easily expandable for new sections or pages

---

## Maintenance Notes

- **Dependencies**: Regularly update Parcel and development dependencies
- **Content Updates**: Update project summaries and CV information as needed
- **Performance Monitoring**: Periodic review of load times and optimization opportunities
- **Browser Testing**: Regular testing across target browser matrix

**Last Updated**: December 11, 2025  
**Version**: 1.0  
**Maintainer**: Rob Nelson