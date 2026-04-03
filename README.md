# Gym Logger 🏋️‍♂️

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-v11-FFCA28?logo=firebase)](https://firebase.google.com/)

**Gym Logger** is a minimal, mobile-first Progressive Web App (PWA) designed for speed and efficiency in the weight room. Built with the latest technical stack, it focuses on reducing friction so you can focus on your sets.

<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/9db5d89d-5b8c-4bfe-a7fd-509ed45cfde2" />

## 🎯 Key Features

- **🚀 Lightning Fast Logging**: Large touch targets and intuitive input for reps and weight.
- **📱 Mobile-First Design**: Optimized for one-handed use on the gym floor.
- **🕒 Real-time History**: Instant access to today's workout and past sessions.
- **⚡ Persistent State**: Powered by Firebase Firestore for robust data sync.
- **🎨 Premium UI**: Sleek dark mode using **shadcn/ui** and **Tailwind CSS v4**.

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [Firebase Firestore](https://firebase.google.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/rojinasafavi/Gym-Logger.git
cd Gym-Logger/gym_program
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

### 4. Run the development server
```bash
pnpm run dev
```

## 🏗 Project Structure

```text
src/
├── app/            # Next.js App Router (Layouts & Pages)
├── components/     # Reusable UI components (shadcn/ui)
├── lib/            # Firebase initialization and helpers
├── types/          # TypeScript interfaces/types
└── styles/         # Global styles and Tailwind configuration
```

## 📜 License
This project is for educational purposes. All rights reserved.
