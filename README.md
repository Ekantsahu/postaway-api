# 🚀 Postaway API

A social media backend built using Node.js and Express that allows users to create posts, like posts, and comment on posts.

---

## 🧱 Tech Stack

- Node.js
- Express.js
- JWT Authentication
- Multer (File Upload)
- UUID (Unique IDs)
- In-memory data storage

---

## 📁 Project Structure
```
src/
├── features/
│   ├── user/
│   ├── post/
│   ├── comment/
│   └── like/
├── middleware/
│   ├── auth.middleware.js
│   ├── logger.middleware.js
│   ├── error.middleware.js
│   └── fileUpload.middleware.js
└── utils/
    └── customError.js
```

---

## 🔐 Authentication

- JWT-based authentication
- Protected routes require token in header:

---

## 📌 API Endpoints

### User
- POST `/api/signup`
- POST `/api/signin`

---

### Posts
- GET `/api/posts/all`
- GET `/api/posts/:id`
- GET `/api/posts`
- POST `/api/posts`
- PUT `/api/posts/:id`
- DELETE `/api/posts/:id`
- GET `/api/posts/filter?caption=xyz`

---

### Comments
- GET `/api/comments/:id`
- POST `/api/comments/:id`
- PUT `/api/comments/:id`
- DELETE `/api/comments/:id`

---

### Likes
- GET `/api/likes/:postId`
- GET `/api/likes/toggle/:postId`

---

## ⚙️ Features

- User authentication (JWT)
- Create, update, delete posts
- Image upload using multer
- Add, update, delete comments
- Like/unlike posts
- Pagination for posts
- Filter posts by caption
- Logger middleware
- Centralized error handling

---

## 🧪 Edge Case Handling

- Unauthorized access restricted
- Invalid IDs handled
- Empty input validation
- Duplicate likes prevented

---

## ▶️ How to Run

```bash
npm install
npm run dev
