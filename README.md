# Days Old

A responsive, dependency-free birthday calculator. Enter your date of birth to see your age in calendar days.

Use the separate Day, Month, and Year text fields; enter all four year digits (e.g. 1942). Your typing is not reformatted.

**Live app:** https://kameit00.github.io/days-old/

## Run locally

Open `index.html` in your browser. No installation or build step is needed.

## Deploy

GitHub Pages serves the root of the `main` branch. Push changes to `main` to update the app.

To set up deployment again, choose **Settings → Pages → Deploy from a branch → main → / (root)**.

## Privacy and calculation

- No analytics, cookies, browser storage, external dependencies, or birthday uploads.
- Today is determined using the visitor's local calendar date.
- Calendar dates are compared at UTC midnight to avoid daylight-saving errors.
- A birthday of today counts as zero days old.
- Results include the dates you turn 10,000, 20,000, and 30,000 days old, whether past or future.
- Missing, invalid, and future dates are rejected.
