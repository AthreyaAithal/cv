# Athreya KotaRajarama — Professional CV Website

> A futuristic, dark-theme personal CV website built for GitHub Pages.
> Senior Technical Specialist · SDK Quality Engineering · Automation Architecture.

---

## 🚀 Live Site

Once deployed on GitHub Pages:  
`https://AthreyaAithal.github.io`  
*(or your custom domain if configured)*

---

## 📁 Repository Structure

```
/
├── index.html          ← Main HTML page (all content here)
├── style.css           ← Full stylesheet (dark futuristic theme)
├── script.js           ← Interactions, animations, scroll behavior
├── README.md           ← This file
└── assets/
    ├── profile.jpg     ← ⬅️ ADD YOUR PROFILE PHOTO HERE
    └── resume.pdf      ← ⬅️ ADD YOUR RESUME PDF HERE (optional)
```

---

## 🖼️ Adding Your Profile Photo

1. Create the `assets/` folder in the repo root if it doesn't exist
2. Add your professional photo as **`assets/profile.jpg`**
3. The website is already wired to load from this exact path
4. If the image fails to load, an elegant fallback with your initials (AKR) will display automatically

**Photo tips:**
- Use a **square or portrait** crop — the frame is circular, so center your face
- Recommended size: `600×600px` or larger (will be scaled down)
- Professional headshot style works best with the dark futuristic theme
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp` *(rename to `profile.jpg`)*

---

## 📄 Adding Your Resume PDF (Optional)

Place your resume file at **`assets/resume.pdf`**  
The "Download Resume" button in the hero section will automatically trigger a download when clicked.

---

## 🌐 Deploying to GitHub Pages

### Option A — Quick Setup (New Repo)

1. Create a new GitHub repository named `AthreyaAithal.github.io`
2. Push all files to the `main` branch
3. GitHub Pages will automatically serve `index.html` from the root
4. Your site will be live at `https://AthreyaAithal.github.io`

### Option B — Existing Repo

1. Push all files to the repo
2. Go to **Settings → Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose `main` branch, `/ (root)` folder
5. Click **Save**
6. Your site will be live at `https://AthreyaAithal.github.io/<repo-name>`

---

## ✏️ Customizing Content

All content lives in **`index.html`** — it's straightforward to edit:

| What to change | Where in index.html |
|---|---|
| Name, title, tagline | Hero section (`#hero`) |
| Professional summary | About section (`#about`) |
| Job roles and dates | Experience section (`#experience`) |
| Skills and tools | Expertise section (`#expertise`) |
| Achievements and metrics | Achievements section (`#achievements`) |
| Education | Education section (`#education`) |
| Email, LinkedIn, GitHub | Contact section (`#contact`) |

---

## 🎨 Design System Reference

```css
/* Key colors (in style.css :root) */
--bg-void:   #05080F   /* Main background */
--cyan:      #00E5C8   /* Primary accent */
--indigo:    #818CF8   /* Secondary accent */
--amber:     #F59E0B   /* Highlight / warmth */

/* Fonts loaded from Google Fonts */
Chakra Petch  → Display / headings
Plus Jakarta Sans → Body text
Space Mono    → Code, labels, timestamps
```

---

## ⚡ Performance Notes

- **No frameworks** — pure HTML, CSS, JavaScript
- **No build step** — deploy directly
- **Fonts from Google Fonts CDN** — cached by browsers
- **Canvas animation is GPU-accelerated**
- **Lazy scroll-reveal** uses IntersectionObserver (no layout thrashing)

---

## 🔒 Privacy Note

This public site does not expose any confidential, proprietary, or internal organizational information.  
All content is public-facing and safe for sharing with recruiters, hiring managers, and professional connections.

---

## 📬 Contact

**Athreya KotaRajarama**  
📧 krathreya@gmail.com  
💼 [linkedin.com/in/athreya-k-r-75034167](https://www.linkedin.com/in/athreya-k-r-75034167)  
🐙 [github.com/AthreyaAithal](https://github.com/AthreyaAithal)

---

*Built for GitHub Pages · No frameworks · No dependencies · Deploy and share.*
