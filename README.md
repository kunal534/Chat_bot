# 🚀 Next.js RAG Chatbot (Meta Llama) 

A **Retrieval-Augmented Generation (RAG) Chatbot** built with **Next.js**, **LangChain.js**, **Redis**, and **Meta Llama**. This chatbot enhances responses by retrieving relevant contextual data before generating answers.   

---

## 📂 Project Structure  

```plaintext
📁 my-chatbot-project
│-- 📂 src
│   ├── 📂 app
│   │   ├── 📂 [...url]  # Dynamic route for chat sessions
│   │   ├── 📂 api      # API routes
│   │   ├── 📜 layout.tsx
│   │   ├── 📜 page.tsx
│   ├── 📂 components  # Reusable React components
│   ├── 📂 lib         # Utility functions (RAG, Redis)
│   ├── 📂 styles      # Styling (CSS, Tailwind, etc.)
│-- .gitignore
│-- package.json
│-- next.config.js
│-- README.md
```

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the repository  
```sh
git clone https://github.com/kunal534/Chat_bot.git 
cd YOUR_REPO
```

### 2️⃣ Install dependencies  
```sh
npm install
```

### 3️⃣ Set up environment variables  
Create a `.env.local` file and add:  
```env
OPENAI_API_KEY=your_openai_api_key 
REDIS_URL=your_redis_url 
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### 4️⃣ Run the development server  
```sh
npm run dev
```
Your chatbot should now be running at **http://localhost:3000** 🎉  

---

## 🛠️ Tech Stack  

- **Frontend:** Next.js, React  
- **Backend:** Next.js API routes  
- **AI Model:** Meta Llama for response generation  
- **Database:** Redis for caching and session management  

---

## 🔧 Features  

✅ Supports RAG-based responses  
✅ Stores chat history in Redis  
✅ Handles multi-session conversations  
✅ Supports dynamic URL-based contexts  
✅ Easy to deploy on Vercel or Railway  

---

## 🚀 Deployment  

### Deploy to Vercel  
```sh
vercel
```

### Deploy to Railway  
```sh
railway up
```

---

## 🤝 Contributing  
Feel free to submit PRs or report issues!  

---

## 📜 License  
This project is licensed under **MIT**.  
