This project is hosted at: https://zealous-desert-0541d1303.3.azurestaticapps.net/
# Unhide Nepal — Client

This is the React client for the Unhide Nepal project — a listing/explore web app built with Vite, React and Tailwind CSS. The client communicates with the server API for authentication, listings, reviews and admin functions.

**Quick summary**
- **Tech stack:** `React`, `Vite`, `Tailwind CSS`, `Redux` (`@reduxjs/toolkit`), `axios`.
- **Routing:** `react-router-dom`.
- **Map library:** `maplibre-gl`.

**Features**
- Explore listings with filters and map support.
- User authentication, profile and session refresh flow.
- Create and manage listings (including image upload).
- Reviews and rating system per listing.
- Admin endpoints for listing/user management.

**Repository**
This README covers the client app located at the repository root of `unhide-Nepal-client`.

**Prerequisites**
- Node.js (v16+ recommended)
- npm (or yarn/pnpm) installed

**Install**
1. Clone the repo and change into the client folder:

```bash
git clone https://github.com/Rishi-Rijal/unhide-Nepal-client.git
cd unhide-Nepal-client
```

2. Install dependencies:

```bash
npm install
# or
 # yarn
```

**Available scripts** (from `package.json`)
- `npm run dev` — Start the dev server (Vite).
- `npm run build` — Build production assets.
- `npm run preview` — Preview the production build locally.
- `npm run lint` — Run ESLint.

Example dev run:

```bash
npm run dev
# open http://localhost:5173
```

**Configuration / Environment**
- The client currently uses a default API base URL set in `src/api/axios.api.js`. The file contains:

```js
const baseURL = your backend url;
```

- Requests are made with `withCredentials: true` which means the client expects cookie-based authentication from the API. If you run the server locally, update the `baseURL` value to point at your local server (example: `http://localhost:5000/`) or refactor `axios.api.js` to read from a Vite environment variable:

```js
// recommended change (optional)
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/';
```

If you switch to environment variables, create a `.env` file in the client root with:

```
VITE_API_BASE_URL=http://localhost:5000/
```

Then restart the dev server.

**How authentication works (overview)**
- The client calls `GET /api/v1/user/me` on load (see `src/App.jsx`) to fetch the current user.
- On `401` responses the client attempts to refresh the access token via `GET /api/v1/user/refresh-token` (see `src/api/user.api.js`) and retries the user profile request.
- Because `axios` is set with `withCredentials: true`, authentication is done using cookies (server must set appropriate cookies and CORS/credentials headers).

**API client files**
- `src/api/axios.api.js` — Axios instance (baseURL and `withCredentials`).
- `src/api/listing.api.js` — Listing endpoints (get, create, filter, like, images, update, delete).
- `src/api/user.api.js` — User endpoints (login, register, logout, refresh token, password reset, profile).
- `src/api/review.api.js` — Review endpoints (add/update/delete/get by listing).
- `src/api/admin.api.js` — Admin endpoints (users/listings management).

**Project structure (high level)**
- `index.html` — Vite entry.
- `src/main.jsx` — App bootstrapping and Redux provider.
- `src/App.jsx` — Routing and top-level auth/profile refresh logic.
- `src/pages/` — Route pages (Home, Explore, Listing, Auth pages, Admin pages).
- `src/Components/` — Reusable UI components and layout.
- `src/api/` — API client modules.
- `src/utils/` — Redux store, authSlice and small helpers.

**Maps**
- Map functionality uses `maplibre-gl`. See `src/Map.jsx` (map usage and markers) and related components.

**Styling**
- Tailwind CSS is configured in `tailwind.config.js`. Vite plugin `@tailwindcss/vite` is used.

**Building & Deploying**
- Build the app using `npm run build`. The output is in the `dist/` folder created by Vite.
- Deploy the `dist/` folder to any static host (Netlify, Vercel, Azure Static Web Apps, S3 + CloudFront, etc.). Ensure the API base URL in production points to the server and CORS/credentials are configured properly.

**Linting**
- `npm run lint` will run ESLint across the project. Configure your editor to use the project ESLint settings.

**Troubleshooting**
- If API requests fail with CORS or credentials errors, confirm the server allows requests from the client origin and sets cookies with appropriate `SameSite`/`Secure` attributes.
- If the app does not load maps, check that `maplibre-gl` is installed and any required CSS is imported where needed.

**Contributing**
- Fork and open a PR with a clear description.
- Run `npm install` then `npm run dev` to work locally.

**Notes & TODOs**
- Consider moving `baseURL` in `src/api/axios.api.js` to an environment variable (`VITE_API_BASE_URL`) for easier local development and deployments.
- Add README sections for component conventions and testing if/when tests are added.

---

If you'd like, I can:
- add `.env`-based `VITE_API_BASE_URL` support to `src/api/axios.api.js` and update documentation,
- or run the dev server to verify everything works locally.
