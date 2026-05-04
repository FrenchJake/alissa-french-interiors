# Alissa French Interiors — Website Setup Guide

## OVERVIEW

This is a static HTML/CSS/JS website. No frameworks, no install steps, no build tools required.
You open the folder in VS Code, add your images, and open the files in a browser.

---

## STEP 1 — CREATE YOUR PROJECT FOLDER

1. On your computer, create a folder. Name it exactly:
   `alissa-french-interiors`

2. Inside that folder, create the following subfolders:
   ```
   alissa-french-interiors/
   ├── css/
   ├── js/
   └── images/
   ```

---

## STEP 2 — CREATE YOUR FILES

Copy and paste each file below into the correct location:

| File                  | Goes In                              |
|-----------------------|--------------------------------------|
| `index.html`          | `/alissa-french-interiors/`          |
| `about.html`          | `/alissa-french-interiors/`          |
| `services.html`       | `/alissa-french-interiors/`          |
| `portfolio.html`      | `/alissa-french-interiors/`          |
| `project.html`        | `/alissa-french-interiors/`          |
| `contact.html`        | `/alissa-french-interiors/`          |
| `style.css`           | `/alissa-french-interiors/css/`      |
| `main.js`             | `/alissa-french-interiors/js/`       |

Your final folder structure should look like this:

```
alissa-french-interiors/
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── project.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    ├── hero.jpg
    ├── project-1.jpg
    ├── project-2.jpg
    └── ... (your photos)
```

---

## STEP 3 — OPEN IN VS CODE

1. Open VS Code
2. Go to **File → Open Folder**
3. Select your `alissa-french-interiors` folder
4. You'll see all your files in the left sidebar

### Recommended VS Code Extension
Install the **"Live Server"** extension by Ritwick Dey:
- Click the Extensions icon (square icon on left sidebar)
- Search: `Live Server`
- Click Install

Once installed, right-click `index.html` in the sidebar and choose
**"Open with Live Server"** — your site will open in a browser and
auto-refresh every time you save a file.

---

## STEP 4 — ADD YOUR IMAGES

Place your photos inside the `/images/` folder. The site references
these filenames — either rename your photos to match, OR find and
replace the filenames in the HTML.

### Images used in the code:

| Filename                   | Used On            | Description                        |
|----------------------------|--------------------|------------------------------------|
| `hero.jpg`                 | Homepage           | Full-screen hero background        |
| `about-preview.jpg`        | Homepage           | About section image                |
| `headshot.jpg`             | About page         | Your professional photo            |
| `project-1.jpg`            | Portfolio + Home   | Cover image for Project 1          |
| `project-2.jpg`            | Portfolio + Home   | Cover image for Project 2          |
| `project-3.jpg`            | Portfolio + Home   | Cover image for Project 3          |
| `project-4.jpg`            | Portfolio + Home   | Cover image for Project 4          |
| `project-5.jpg`            | Portfolio          | Cover image for Project 5          |
| `project-6.jpg`            | Portfolio          | Cover image for Project 6          |
| `project-1-after-1.jpg`    | Project detail     | After photo 1 for Project 1        |
| `project-1-after-2.jpg`    | Project detail     | After photo 2 for Project 1        |
| `project-1-after-3.jpg`    | Project detail     | After photo 3 for Project 1        |
| `project-1-after-4.jpg`    | Project detail     | After photo 4 for Project 1        |
| `project-1-before-1.jpg`   | Project detail     | Before photo 1 for Project 1       |
| `project-1-before-2.jpg`   | Project detail     | Before photo 2 for Project 1       |

### Image Tips:
- Use `.jpg` for photos (best for web performance)
- Aim for images around 1200–1800px wide
- Keep file sizes under 500KB each (use squoosh.app to compress)
- The site will display placeholder gray boxes if an image is missing — that's fine while you're building

---

## STEP 5 — CUSTOMIZE YOUR CONTENT

Everything is plain HTML. Open any file and find/replace the placeholder text:

### Things to update in every HTML file:
- `hello@alissafrenchinteriors.com` → your real email
- `(555) 555-0100` → your real phone number
- `@alissafrenchinteriors` → your real Instagram handle
- `https://instagram.com` → your full Instagram URL
- `&copy; 2025` → update year if needed

### On the About page (`about.html`):
- Replace the bio paragraphs with your real story

### On the Services page (`services.html`):
- Edit service names, descriptions, and bullet points

### On the Portfolio page (`portfolio.html`):
- Update project names, categories, and links
- For each new project, duplicate the `.portfolio-item` block
- Change `data-category=""` to match one of: `kitchen`, `living-room`, `bedroom`, `office`

### On the Project detail page (`project.html`):
- Duplicate this file (e.g. `project-kitchen.html`, `project-bedroom.html`) for each project
- Update the title, description, image references
- IMPORTANT: After images always come first, before images second

### Colors / Fonts:
All controlled in `css/style.css` at the top inside `:root {}`:
```css
:root {
  --blush: #e8cfc8;       /* pink accent */
  --cream: #f7f3ef;       /* background */
  --charcoal: #2c2c2c;    /* dark text/backgrounds */
  --font-serif: 'Cormorant Garamond', ...
  --font-sans: 'Jost', ...
}
```

---

## STEP 6 — PREVIEW YOUR SITE

Using Live Server (recommended):
- Right-click `index.html` → Open with Live Server
- Navigate between pages using the menu

Without Live Server:
- Double-click `index.html` to open in your browser
- Note: some features may behave slightly differently without a local server

---

## STEP 7 — CONNECT YOUR CONTACT FORM

The contact form currently shows a success message but doesn't actually send emails.
To make it send real emails, you have a few free/easy options:

### Option A — Formspree (easiest, free)
1. Go to formspree.io and create a free account
2. Create a new form, copy your form endpoint URL
3. In `contact.html`, find:
   ```html
   <form class="contact-form" id="contact-form" action="#" method="POST">
   ```
4. Replace `action="#"` with your Formspree URL:
   ```html
   <form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
5. In `js/main.js`, remove or comment out the `e.preventDefault()` line in the form handler,
   or replace the form JS block entirely — Formspree handles the redirect/confirmation.

### Option B — Netlify Forms (if you host on Netlify)
Add `netlify` attribute to your form tag:
```html
<form class="contact-form" netlify name="contact" method="POST">
```
Netlify automatically handles submissions and emails you.

---

## STEP 8 — PUBLISH YOUR SITE

### Easiest free option: Netlify
1. Go to netlify.com — create a free account
2. Drag and drop your entire `alissa-french-interiors` folder onto the Netlify dashboard
3. Your site is live instantly with a free URL (e.g. `random-name.netlify.app`)
4. You can connect a custom domain (like `alissafrenchinteriors.com`) in Settings

### Other options:
- **GitHub Pages** (free) — requires a GitHub account
- **Squarespace / Wix** — not compatible (those are their own platforms)
- **Traditional hosting** (Bluehost, SiteGround) — upload via FTP

---

## ADDING NEW PORTFOLIO PROJECTS

To add a new project:

1. **Copy `project.html`**, rename it (e.g. `project-living-room.html`)
2. **Update the content**: title, description, image filenames
3. **Add your images** to the `/images/` folder
4. **Add a card to `portfolio.html`**: copy one `.portfolio-item` block and update:
   - `href="project-living-room.html"`
   - `data-category="living-room"`
   - Image `src` and `alt`
   - Label text
5. Optionally add it to the Featured section on `index.html`

---

## QUICK REFERENCE — FILE PURPOSES

| File              | Purpose                                      |
|-------------------|----------------------------------------------|
| `index.html`      | Homepage with hero, featured work, about preview |
| `about.html`      | Bio, philosophy, your story                  |
| `services.html`   | All service offerings                        |
| `portfolio.html`  | Full project grid with filter                |
| `project.html`    | Template for individual project detail pages |
| `contact.html`    | Contact form + your info                     |
| `css/style.css`   | All visual styling — colors, fonts, layout   |
| `js/main.js`      | Interactivity — menu, animations, lightbox   |
| `images/`         | All your photos go here                      |

---

## TROUBLESHOOTING

**Images not showing?**
→ Check that the filename in the HTML exactly matches the file in `/images/` (case-sensitive)

**Fonts not loading?**
→ You need an internet connection for Google Fonts to load

**Contact form not working?**
→ Set up Formspree (see Step 7) — the form won't send emails on its own

**Page looks broken/unstyled?**
→ Make sure `style.css` is in the `/css/` folder, not the root folder

**Links between pages broken?**
→ All HTML files must be in the same root folder, not in subfolders
