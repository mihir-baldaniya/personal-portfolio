# Mihir Baldaniya Portfolio

A premium one-page Full Stack Web Developer portfolio built with:

- HTML5
- CSS3
- Vanilla JavaScript

## Structure

```text
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── profile.jpg
│   │   ├── velo-school.jpg
│   │   └── alma-ai.jpg
│   └── resume/
│       └── resume.pdf
└── README.md
```

## Run locally

Open `index.html` directly in a modern browser. No build step or package installation is required.

For a local development server, you can also use VS Code Live Server.

## Replace later

- Profile image: update the `src=""` on the profile image in `index.html`.
- Resume: replace the `href="#"` values on the two resume buttons with the path or URL to your resume.
- Project visuals: the current project previews are CSS-built placeholders, so the site works without external images. If desired, replace those visual blocks with `<img>` elements pointing to the files in `assets/images/`.
- Contact form: the JavaScript currently validates the form and shows a success message only. Connect it to a real form service or backend when needed.

## Included interactions

- Sticky navbar with scroll state
- Mobile hamburger navigation
- Smooth section navigation
- Active section navigation state
- CSS marquee
- Scroll reveal using IntersectionObserver
- Project hover interactions
- Client-side contact form validation
- Current footer year
- Reduced-motion support
