# Sunbow Insulation E-Commerce Platform

A production-grade, full-stack B2B e-commerce platform built for Sunbow Insulation. This application transforms standard product browsing into an interactive, highly-optimized e-commerce experience with advanced 3D visualizers, AI integrations, and a high-performance backend architecture.

## 🚀 Key Features

* **Advanced Product Visualization:** Integrates a dynamic 2D-to-3D texture mapping system using React Three Fiber, allowing users to inspect insulation products interactively in 3D directly in their browser.
* **Smart B2B "Quote Cart":** Tailored for wholesale operations, offering a specialized bulk order and quotation flow optimized for lead conversion.
* **Customer-Facing AI Chatbot:** An intelligent, context-aware chatbot designed for immediate customer support and seamless lead generation.
* **Omnichannel Communication:** Persistent WhatsApp integration for direct, low-friction sales communication with global clients.
* **Admin Event Engine:** Configurable, dynamic festival popup engine to rapidly deploy seasonal campaigns and announcements.
* **Modern UX/UI:** Fully responsive design utilizing glassmorphism, fluid micro-animations, and automatic Dark/Light mode user preference toggling.

## 🏗️ Technical Architecture

The platform uses a decoupled, modern web architecture, connecting a high-speed React footprint with an asynchronous Python API.

### Frontend (User Interface & 3D Layer)
The frontend is structurally optimized for Core Web Vitals, SEO, and robust client-side state management.
* **Framework:** Next.js (App Router Architecture)
* **View Layer:** React 19
* **3D Rendering:** Three.js / React Three Fiber / Drei
* **Styling & Theming:** Custom CSS/CSS Variables combined with TailwindCSS and `next-themes`.
* **Icons:** Lucide React

### Backend (API & Business Logic)
The backend is strictly typed and built to handle high concurrency, serving as the bridge to the PostgreSQL database and third-party services.
* **Framework:** FastAPI (Python)
* **Database & ORM:** PostgreSQL managed via SQLAlchemy 2.0 (Async) and Alembic for automated migrations.
* **Data Validation:** Pydantic 2.0 ensuring strict type safety and request/response validation.
* **Security & Auth:** OAuth2 password hashing with BCrypt and secure stateless JWT tracking.
* **Integrations:** `httpx` for external asynchronous webhooks and WhatsApp API integrations.

## 📁 Repository Structure

```text
📦 sunbow-insulation
 ┣ 📂 frontend/              # Next.js Application
 ┃ ┣ 📂 app/                 # Next.js Pages & Routing (Next 13+)
 ┃ ┣ 📂 components/          # Reusable UI, 3D Canvas, and AI features
 ┃ ┣ 📂 public/              # Static assets, textures, and models
 ┃ ┗ 📜 package.json         # Node dependencies
 ┣ 📂 backend/               # FastAPI Application
 ┃ ┣ 📂 app/
 ┃ ┃ ┣ 📂 models/            # SQLAlchemy Database Models
 ┃ ┃ ┣ 📂 routers/           # Dedicated API Endpoints (Controllers)
 ┃ ┃ ┣ 📂 schemas/           # Pydantic Schemas for Validation
 ┃ ┃ ┗ 📂 services/          # Core Business Logic & 3rd Party APIs
 ┃ ┣ 📜 docker-compose.yml   # Container orchestration
 ┃ ┗ 📜 requirements.txt     # Python backend dependencies
 ┗ 📜 README.md              # Project Overview (You are here!)
```

## 🛠️ Local Development

### 1. Start the Backend API
Requires Python 3.10+ and a SQL Database.
```bash
cd backend
python -m venv venv
# Activate virtual environment (Windows)
venv\Scripts\activate
# Install dependencies
pip install -r requirements.txt
# Start ASGI server
uvicorn app.main:app --reload
```

### 2. Start the Frontend Application
Requires Node.js 18+.
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000` and the interactive Backend API documentation (Swagger UI) at `http://localhost:8000/docs`.
