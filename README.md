# 🚀 Welcome to **Engineering India** Repo

## 📁 Folder Structure Details

### 🗂 Project Structure Overview

![Folder Structure](https://res.cloudinary.com/priyanshukayarkar/image/upload/v1738484614/Screenshot_2025-02-02_135244_yqdahn.png)

---

### 🧪 `test/` (Outside `src/`)

This folder contains **tests** for our services to ensure code reliability and correctness.

---

### 📂 `src/` - The Core Codebase

The `src` folder contains multiple subfolders, each serving a specific purpose.

![Inside Folder](https://res.cloudinary.com/priyanshukayarkar/image/upload/v1738485065/Screenshot_2025-02-02_135639_bgjodm.png)

#### 📌 Breakdown of `src/` Subfolders:

- **`app/`**  
  ➝ Handles **server components** and **routing logic** (if using the App Router in Next.js 13+).

- **`components/`**  
  ➝ Stores **reusable UI components** such as buttons, modals, and form elements.

- **`features/`**  
  ➝ Organizes code **by feature** rather than type.  
  ➝ Example: If working on an "Events" page, create an `events/` folder inside `features/`, containing both UI and server-related logic.

- **`hooks/`**  
  ➝ Contains **custom React hooks** to encapsulate reusable logic.  
  ➝ Example: `useAuth.ts` for authentication handling.

- **`libs/`**  
  ➝ Stores **third-party library integrations** or **utility functions**.  
  ➝ Example: API clients, authentication utilities, SDK wrappers.

- **`types/`**  
  ➝ Defines **TypeScript interfaces** and **types** for type safety and maintainability.

- **`utils/`**  
  ➝ Contains **helper functions** used throughout the project.  
  ➝ Example: Date formatting, string manipulations, and other common utilities.

---
