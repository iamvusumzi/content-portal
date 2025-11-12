# 📰 Content Portal (Frontend)

A **React + TypeScript** frontend for the **Content Manager API**, enabling users to view, create, and manage content posts with authentication and role-based access.

---

## 🚀 Features

- **Public Home Page (`/`)**

  - Displays all **public contents** fetched from the Content Manager API
  - Authenticated users can **manage (edit/delete)** their own contents
  - Admins can **delete any public content**

- **Authentication**

  - `/login` – Login with username and password
  - `/register` – Register as either **User** or **Admin**
    - Selecting **Admin** reveals an **Admin Secret** field
  - On login, the app stores `{ token, username, role }` in **localStorage** as `authResponse`
  - All authenticated requests include the JWT token in request headers (via Axios interceptor)

- **Protected Routes**

  - `/my-content` – Authenticated users can perform full CRUD operations on their own content
  - `/admin` – Reserved for admin-only functionality (coming soon)

- **Logout**
  - Clears session from `localStorage`
  - Redirects back to the home page (`/`)

---

## 🧭 Route Overview

| Route         | Description                          | Auth Required | Role Required |
| ------------- | ------------------------------------ | ------------- | ------------- |
| `/`           | Home page showing all public content | ❌ No         | None          |
| `/login`      | Login page                           | ❌ No         | None          |
| `/register`   | Register page (User/Admin)           | ❌ No         | None          |
| `/my-content` | User’s content management area       | ✅ Yes        | Any           |
| `/admin`      | Admin dashboard (coming soon)        | ✅ Yes        | `ADMIN`       |

---

## 🧠 Core Logic

- **Authentication**: Managed via JWT (token stored in local storage)
- **Axios Instance**: Automatically appends the token to request headers
- **Role-Based Access**:
  - Routes `/my-content` and `/admin` protected with guards
  - Conditional rendering based on `role` and `isAuthenticated`
- **Logout Flow**:
  - Removes `authResponse` from local storage
  - Redirects to `/`

---

## 🛠️ Tech Stack

- **React 19 + TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** for utility-first styling
- **Material UI (MUI)** for components and layout
- **React Router v7** for routing
- **Axios** for API integration
- **LocalStorage** for authentication state

---

## ⚙️ Configuration

This frontend relies on the **Content Manager API**.  
👉 Clone and set up the backend before starting the frontend:

> [Content Manager API Repository](https://github.com/iamvusumzi/content-manager)

Then update the API base URL in `src/utils/axios.ts` as needed:

```ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // update as needed
});

export default api;
```

---

## 🧪 Getting Started

```bash
#  Clone repo
https://github.com/iamvusumzi/content-portal.git

#  Open directory
cd content-portal

# Install dependencies
npm install

#  Start the development server
npm run dev

#  Open the app in your browser
http://localhost:5173
```

Make sure the **Content Manager API** is running locally (default port: `8080`).

---

## 🧰 Development Notes

- Authentication state is persisted via **localStorage**
- `api.ts` injects the JWT token into all authorized requests
- `logout()` clears all local session data and redirects to `/`
- The backend API is not yet hosted, but the app can run locally using a dev server

---

## 📦 Upcoming Features

- Admin dashboard for content and user management
- Pagination and filtering on home page
- Dockerized deployment with **Nginx reverse proxy**
- Hosting on **AWS Free Tier**

---

## 🧑‍💻 Author

**Vusumzi Msengana**  
🌍 [Portfolio](https://iamvusumzi.netlify.app)
💻 [GitHub: iamvusumzi](https://github.com/iamvusumzi)

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE).
