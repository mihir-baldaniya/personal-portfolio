# Mihir Baldaniya – Portfolio

Personal portfolio website of a Full Stack Web Developer.
Live site: [mihirbaldaniya.site](https://mihirbaldaniya.site)

Built with plain **HTML**, **CSS** and **JavaScript**. There is no framework, build step or package to install.

## Features

- Animated page loader (two panels split open)
- Sticky header with a mobile menu and an active-section highlight
- Smooth scrolling between sections
- Scrolling ticker strip
- Scroll-reveal animations
- Project cards with hover and mouse-tilt effects
- Contact form with validation, sent through [Web3Forms](https://web3forms.com)
- Custom 404 page
- Reduced-motion support for visitors who prefer less animation

## Project structure

```text
portfolio/
├── index.html          Main page
├── 404.html            "Page not found" page
├── resume.pdf          Downloadable resume
├── css/
│   └── style.css       All styles
├── js/
│   └── script.js       All behavior (menu, animations, form)
├── assets/
│   └── images/
│       ├── Logo_B's.png     Favicon and loader logo
│       ├── Logo_Bs.svg      Header logo
│       ├── profile.png      Profile photo
│       ├── velo-school.png  Project preview
│       ├── alma-ai.png      Project preview
│       └── 404_bg.jpg       404 page background
└── README.md
```

## Run locally

Open `index.html` in any modern browser.

For a local server with auto-reload, use the **Live Server** extension in VS Code.

## Customize

| What | Where |
| --- | --- |
| Name, text, projects, skills, experience | `index.html` |
| Colors and fonts | `:root` variables at the top of `css/style.css` |
| Profile photo | Replace `assets/images/profile.png` |
| Resume | Replace `resume.pdf` |
| Project previews | Replace the images in `assets/images/` and edit the project blocks in `index.html` |
| Loader time | `LOADER_DELAY` in `js/script.js` |

## Contact form setup

The form sends messages with Web3Forms.

1. Create a free access key at [web3forms.com](https://web3forms.com).
2. Replace `WEB3FORMS_KEY` in `js/script.js` (and the hidden `access_key` field in `index.html`) with your key.
3. In the Web3Forms dashboard, restrict the key to your domain so nobody else can use it.

## Notes

- Image and file paths are relative. If you host `404.html` on a server that shows it at any URL, change them to start with `/` (for example `/assets/images/404_bg.jpg`) so images still load on nested URLs.
- The script blocks right-click on images and some shortcuts (F12, Ctrl+U, Ctrl+S). This is only a light deterrent and does not truly protect the page.
