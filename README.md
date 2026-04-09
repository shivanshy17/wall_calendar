# Wall Calendar

A beautiful, interactive, purely frontend-driven web application featuring a stunning UI. It serves as both a responsive calendar display and a functional date-selection and task-management tool. It leverages zero external framework dependencies—built exclusively using **Vanilla JavaScript, HTML, and CSS**.

## Features

### 1. 🎨 Dynamic Aesthetic Themes
Easily swap between specially curated color palettes and corresponding inspirational hero images using the floating theme navigation bar (e.g., Alpine, Forest, Desert).  The application immediately adapts link colors, dynamic highlight rings, and the hero image context gracefully.

### 2. 🌗 Adaptive Dark & Light Modes
Toggle between a sleek, vibrant dark mode and a crisp light mode environment via the upper corner toggle. The dark setting dynamically overrides primary texture walls, shadows, scroll surfaces, and syntax highlighting properties.

### 3. 🗓️ 3D Page Flip Transitions
Using advanced CSS keyframe animations and `transform-origin` configurations, shifting to a new or previous month triggers a stunning pseudo-3D page-flip presentation, emulating physical wall calendar hardware.

### 4. 🖱️ Smart Range Selection & Hover Preview
Instead of rigidly tapping isolated dates, users can select comprehensive time ranges. 
- Click once on a given coordinate to secure a `Start Date`.
- Before commiting to a final range span, softly dragging your cursor acts as a visual preview tool, casting a shadow (hover preview) mapping out the impending block. 
- Click again to complete your selection loop and generate a solid `End Date`.

### 5. 📝 Bound Note Management & Range Tooltips
Users can easily jot down notes and append them safely formatted against either discrete selections or drawn ranges. 
- To avoid clutter, hovering over the originating `Start Date` for an active sequence gracefully generates a modern, glassmorphic tooltip, reading out the bound tasks seamlessly over the grid!

### 6. 📱 Side-by-Side Responsive Flex View
The overarching calendar components natively divide structural real estate into a `calendar-main` section (for spatial day grids) and a clean `calendar-sidebar` setup. It actively looks beautiful in its side-by-side mode on desktop monitors. When downscaling below `768px`, media queries cleanly stack these features back to a vertical presentation seamlessly tailored for mobile interaction.

## Design Patterns & Choices

*   **No Frameworks**: Keeping it completely standard Vanilla Javascript keeps loading times infinitely lightweight and ensures it is deeply compatible cross-browser without transpilation requirements. 
*   **CSS Grid & Flexbox**: Utilizing modern `display: grid` calculations on the core daily sequences allows for a fluid 7-column snap behavior that perfectly offsets leap years and varying start-days per month easily.
*   **On-the-Fly DOM Rendering**: Instead of rendering massive HTML blocks upfront, the `render()` method efficiently calculates days and appends necessary DOM elements per respective month natively upon user interactions. Let the Javascript handle the hard lifting instead of hardcoding HTML frames visually.

## How to Run Locally

Because this project is strictly static assets containing no compile requirements or heavy bundlers, running the tool locally is extremely easy!

### Method 1: Direct File Path
You can easily jump into interactive mode just by opening the master index frame.
1. Right click `wall_calendar_interactive.html` within your directory.
2. Select **Open With...**
3. Choose modern browsers (Chrome, Edge, Firefox).

### Method 2: Live Server Extension (Recommended)
If you utilize VS Code, utilizing a localhost bridge tracks live CSS changes dynamically instead of requiring a manual refresh loop.
1. Install the `Live Server` plugin through the VS Code Extensions tab.
2. Open `wall_calendar_interactive.html`.
3. Select `Go Live` dynamically from the bottom right editor corner. 
4. The calendar perfectly launches to `http://127.0.0.1:5500/`.
