# 🧠 AI-Powered Code Snippet Manager

![Project Preview](./public/preview-placeholder.png) <!-- Note: Add a screenshot of the app and place it in the public folder as preview-placeholder.png -->

A modern, fast, and sleek web application designed for developers to store, organize, and search their code snippets. Built with a focus on premium UI design and intelligent automation.

## ✨ Features

- **🤖 AI Auto-Tagging (Mock Integration)**: Paste your code, and the application automatically analyzes it to generate a relevant title, description, and tags (simulating an AI API like OpenAI or Gemini).
- **🎨 Premium Dark Mode UI**: A custom-built, glassmorphism-inspired interface utilizing modern CSS variables and flexbox layouts—no generic CSS frameworks used.
- **💾 Local Storage Persistence**: Utilizes custom React Hooks to save your snippets directly to your browser's local storage. Your data remains safe even after refreshing.
- **🌈 Real-Time Syntax Highlighting**: Integrated with `react-syntax-highlighter` using the VS Code Dark+ theme for a professional, IDE-like reading experience.
- **🔍 Instant Search & Filtering**: Quickly find the snippet you need by searching through titles, descriptions, and AI-generated tags.

## 🛠️ Tech Stack

- **Framework**: React 18 (Bootstrapped with Vite for lightning-fast HMR)
- **Styling**: Pure Vanilla CSS (Custom Design System, CSS Variables, Flexbox)
- **Syntax Highlighting**: `react-syntax-highlighter`
- **State Management**: React Hooks (`useState`, `useEffect`, Custom `useLocalStorage` Hook)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/your-username/snippet-sync.git
   ```
2. Navigate to the project directory
   ```sh
   cd snippet-sync
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start the development server
   ```sh
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.

## 💡 Why I Built This

I built this project to demonstrate my ability to construct full-featured React applications from the ground up. It showcases my understanding of component architecture, state persistence, modern CSS design without relying on UI libraries, and handling asynchronous simulated API calls.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
