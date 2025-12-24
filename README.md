# 🚀 AI Code Reviewer

An intelligent, real-time code analysis tool powered by **Google Gemini 2.5 Flash**.  
This application acts as a **Senior Developer with 7+ years of experience**, providing constructive feedback, security checks, and performance optimizations for your code snippets.

---

## ✨ Features

- **Senior-Level Feedback**  
  Detailed reviews focusing on code quality, scalability, maintainability, and best practices.

- **Modern AI Stack**  
  Uses the latest `@google/genai` SDK for high-performance AI-driven content generation.

- **Dual-Pane Interface**  
  Clean side-by-side layout for writing code and viewing AI reviews simultaneously.

- **Async Processing**  
  Handles complex code analysis without blocking the user interface.

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Vite  
- CSS3  

### Backend
- Node.js  
- Express.js  

### AI Integration
- Google Generative AI (**Gemini 2.5 Flash**)

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** v18 or higher  
- **Gemini API Key** from Google AI Studio  

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/code-reviewer-ai.git
cd code-reviewer-ai
```
### 2️⃣ Backend Setup
```bash
Copy code
cd BackEnd
npm install
```

#### Create a .env file inside the BackEnd directory:

``` GEMINI_API_KEY=your_api_key_here
PORT=3000
```
#### Start the backend server:

``` npm start
```
#### Or for development mode:

```
npx nodemon server.js
```

### 3️⃣ Frontend Setup
```
cd ../Frontend
npm install
npm run dev
```
## 📖 Usage

1. Open the application in your browser:  
   👉 **http://localhost:5173**

2. Paste the code snippet you want reviewed into the **black editor panel** on the left.

3. Click the **"Review"** button.

4. View the detailed AI analysis on the right panel, including:
   - ❌ **Bad Code Examples**
   - ✅ **Recommended Fixes**
   - 🔒 **Security Suggestions**
   - ⚡ **Performance Improvements**

---

## 📁 Project Structure

```plaintext
├── BackEnd/
│   ├── src/
│   │   ├── controllers/   # Logic for handling requests
│   │   ├── routes/        # API endpoint definitions
│   │   ├── services/      # AI integration logic
│   │   └── app.js         # Express app configuration
│   │
│   └── server.js          # Entry point
│
├── Frontend/              # React application
│
└── README.md
