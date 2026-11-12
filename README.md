# KP Home loans quiz

The Fundwise Capital home loans quiz for Kien Phan (version B of the home loans ad test): six questions, one per screen, then contact details, then a short "done" screen before it sends people on to the home loans landing page, which then shows without its form.
Static HTML, CSS and JS, no build step. Deploy on Vercel as a static site (framework preset "Other").

Run locally: `npx -y serve -l 3011 .` then open http://localhost:3011

Where it sends people when they finish is the `data-thanks` value on `#quiz` in `index.html`, currently `https://demo-homeloans-landingpage.vercel.app/`. Change it to the landing page's real domain once that exists.
The quiz is not connected yet: finishing it does not send the lead anywhere (see `assets/js/lead.js`).
