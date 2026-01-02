# AI Resume Generator

An end-to-end, production-ready **AI-powered resume and cover letter generator** built with modern web technologies.
This application allows users to sign up, authenticate (including Google OAuth), submit their resume and a job description, and receive an optimized resume and cover letter powered by OpenAI.

---

## Features

*  **Authentication**

  * Email & password signup/login
  * Google OAuth login
*  **AI Resume Optimization**

  * Resume tailoring based on job description
  * Automatic cover letter generation
*  **Rate Limiting**

  * Prevents abuse per user
*  **Database Support**

  * PostgreSQL (primary via Prisma)
  * MongoDB preserved for optional/future use
*  **Clean Architecture**

  * Modular backend & frontend
  * Clear separation of concerns
*  **Deployment Ready**

  * Dockerized frontend & backend
  * AWS ECS + ALB support
  * Render deployment support
*  **CI/CD**

  * GitHub Actions pipeline
*  **Scalable**

  * Autoscaling infrastructure included

---

##  Architecture

```
Frontend (React + Vite)
   ↓
Backend API (Node.js + Express)
   ↓
Authentication (JWT / Google OAuth)
   ↓
AI Service (OpenAI Responses API)
   ↓
PostgreSQL (Prisma ORM)
```

---

##  Project Structure

```
ai-resume-generator/
│
├── .github/workflows/ci.yml         
│
├── infra/
│   ├── aws/                          
│   └── render/                       
│
├── docker/
│   ├── backend.Dockerfile
│   └── frontend.Dockerfile
│
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
│
├── frontend/                         
│   ├── src/
│   │   ├── api/                      
│   │   ├── components/               
│   │   ├── context/                  
│   │   ├── hooks/                    
│   │   ├── pages/                    
│   │   ├── routes/                   
│   │   ├── utils/                    
│   │   └── styles/                   
│
├── backend/                          
│   ├── prisma/                       
│   ├── mongo/                        
│   ├── src/
│   │   ├── config/                   
│   │   ├── controllers/              
│   │   ├── middleware/               
│   │   ├── routes/                   
│   │   ├── services/                 
│   │   ├── utils/                    
│   │   └── validators/               
│
├── mongo/                            
│
└── scripts/                          
```

---

##  Tech Stack

### Frontend

* React
* Vite
* Fetch
* Context API
* CSS Modules

### Backend

* Node.js
* Express
* Prisma ORM
* PostgreSQL
* MongoDB (optional)
* OpenAI Responses API
* JWT Authentication
* Google OAuth
* Express Rate Limit
* Firebase
* TailWind CSS

### DevOps & Infra

* Docker & Docker Compose
* GitHub Actions
* AWS ECS + ALB
* Terraform
* Render

---

## Authentication Flow

1. User signs up or logs in (email/password or Google)
2. Backend issues a JWT
3. JWT is stored securely on the frontend
4. Protected routes require a valid token
5. Rate limits are applied per authenticated user

---

## AI Resume Generation Flow

1. User submits resume + job description
2. Backend validates request
3. Prompt is constructed
4. OpenAI Responses API is called
5. Optimized resume + cover letter returned

---

##  Getting Started (Local)

### 1️⃣ Clone the repository

```bash
git clone xxxxxx
cd ai-resume-generator
```

### 2️⃣ Setup environment variables

```bash
xxxxx
```

Fill in:

* `OPENAI_API_KEY`
* `DATABASE_URL`
* `JWT_SECRET`
* `GOOGLE_CLIENT_ID`
* `GOOGLE_CLIENT_SECRET`

---

### 3️⃣ Start with Docker (Recommended)

```bash
docker-compose up --build
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:3000`

---

### Run without Docker (Optional)

**Backend**

```bash
cd backend
npm install
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## Database

### PostgreSQL (Active)

* Managed via Prisma
* Migrations in `backend/prisma/migrations`

```bash
npx prisma migrate dev
```

### MongoDB (Preserved)

* Optional / inactive
* Useful for future analytics or logging

---

## Deployment

### Render

* Uses `infra/render/render.yaml`

### AWS

* Terraform configs in `infra/aws`
* ECS + ALB + Autoscaling ready

---

## CI/CD

* GitHub Actions workflow in `.github/workflows/ci.yml`
* Runs:

  * Lint
  * Build
  * Docker image creation
  * Deployment hooks

---

## Roadmap

* PDF resume export
* Resume templates
* Subscription billing
* Admin dashboard
* Multi-language support

---

## License

MIT License

---

## 👤 Author

Kingsley Obioha

*full-stack, system design* project demonstrating:

* Clean architecture
* Scalable backend design
* Modern frontend patterns
* Real-world DevOps practices
