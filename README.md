# IdeaVault – Startup Idea Sharing Platform

**IdeaVault** is a modern, responsive web application where users can share innovative startup ideas, explore concepts posted by others, and engage through community interaction. The platform focuses on idea validation and collaborative refinement rather than traditional scheduling or booking.

👉 **Live Website URL:** [https://vercel.app](https://vercel.app) *(Replace this with your actual Vercel deployment link)*

---

## 🎥 Project Explanation Video
[Insert your Loom, Google Drive, or YouTube video link here]

---

## ✨ Key Features

- **Smart Route Protection & Dynamic Redirection:** Unauthenticated users attempting to access private routes (such as `/add-idea`) are instantly intercepted by the middleware. Once they sign up or log in, they are automatically redirected back to their originally intended destination. This tracking also works seamlessly when signing up directly from the navigation bar.
- **Full CRUD Idea Management:** Registered users can effortlessly publish new startup concepts. From their private dashboard (`My Ideas`), they can modify existing entries via dynamic update modals and delete posts securely through confirmation dialogs.
- **Interactive Comment System & Activity Tracking:** Users can engage with posts on the detailed idea view by adding, editing, or deleting their own comments. Every individual action and commented post is automatically logged and accessible under the `My Interactions` private tab.
- **Advanced Search & Category Filtering:** The public `Ideas` directory features a case-insensitive search mechanism that queries titles via MongoDB regex matching. Users can also narrow down lists dynamically using a built-in category dropdown (e.g., Tech, Health, AI, Education).
- **Global Theme Toggle & Dynamic Routing:** The navbar houses a universal dark/light theme switch that instantly adjusts the entire viewport interface. Additionally, browser titles morph dynamically across all page changes, ensuring a tailored user experience that reloads without route or private session failures.

---

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS / UIverse (For modern, clean component structures)
- **Authentication:** Auth.js (NextAuth) with JWT session tokens & Google OAuth Provider
- **Notifications:** React Hot Toast / React Toastify (Custom alert-free status indicators)
- **Icons:** Lucide React / React Icons (Utilizing the updated X branding icon)

---`

---

## ⚙️ Local Installation & Setup

Follow these steps to run the client-side environment locally:

### 1. Clone the Repository
```bash
git clone <your-client-side-github-repo-url>
cd ideavault-client
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory of the application and define the following variables:
```env
NEXTAUTH_SECRET=your_jwt_secret_key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=your_backend_server_api_url
```

### 4. Boot up the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to preview the project.

---
Developed with ❤️ for IdeaVault.
