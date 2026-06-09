# Merzol Student Portal

A modern full-stack web platform for schools that provides role-based access for **students**, **teachers**, and **school administrators**. Built as the **Online Test System**, it streamlines user management, authentication, and school-level analytics through a centralized dashboard.

---

## Overview

Merzol Student Portal is a full-stack web application designed to simplify communication and management between students, teachers, and school administrators.

The platform provides:

- Google-based authentication via Firebase
- Role-based dashboards (School, Teacher, Student)
- Hierarchical user management (School → Teachers → Students)
- School analytics and dashboard statistics
- RESTful API backend with protected routes

**Who uses it**

| Role | Description |
|------|-------------|
| **School** | Primary administrator; registers first, manages teachers, views analytics |
| **Teacher** | Manages students assigned under their account |
| **Student** | Accesses student dashboard and academic features |

---

## Features

### Authentication
- Google Sign-In via Firebase Authentication
- Role selection at login (School / Teacher / Student)
- JWT token verification on the backend
- Role mismatch and unauthorized access protection

### School Administration
- School dashboard with live statistics (teachers, students, tests)
- Add, list, and delete teachers
- First-user school registration flow

### Teacher Features
- Add and delete students under their account
- Teacher dashboard (student management)

### Student Features
- Student dashboard (profile and academic views — in progress)

### Planned
- Online exam and test module (see `exam_test_platform_mockup.html`)
- Test creation and analytics

---

## Screenshots

> Add screenshots to `docs/screenshots/` and uncomment the lines below.

```text
docs/
└── screenshots/
    ├── login.png
    ├── school-dashboard.png
    └── add-teacher.png
```

<!--
### Login Page
![Login](docs/screenshots/login.png)

### School Dashboard
![School Dashboard](docs/screenshots/school-dashboard.png)

### Manage Teachers
![Manage Teachers](docs/screenshots/add-teacher.png)
-->

---

## Tech Stack

### Frontend
- React 19
- Vite 8
- Material UI (MUI)
- React Router
- Zustand (state management)
- Axios

### Backend
- Python 3.13
- FastAPI
- SQLAlchemy
- Uvicorn

### Database
- PostgreSQL

### Authentication
- Firebase Authentication (Google Sign-In)
- Firebase Admin SDK (backend token verification)

### Version Control
- Git
- GitHub

---

## Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                  Frontend (React + Vite)                │
│         Google Sign-In  →  Firebase Auth Token        │
└────────────────────────────┬────────────────────────────┘
                             │  HTTP (REST API)
                             ▼
┌─────────────────────────────────────────────────────────┐
│                  Backend (FastAPI)                    │
│     Token verification  →  Role checks  →  CRUD       │
└──────────────┬──────────────────────────┬─────────────┘
               │                          │
               ▼                          ▼
     ┌─────────────────┐       ┌─────────────────────┐
     │   PostgreSQL    │       │  Firebase Admin SDK │
     │  (user records) │       │  (token validation) │
     └─────────────────┘       └─────────────────────┘
```

**Request flow**

1. User signs in with Google on the frontend (Firebase Auth).
2. Frontend sends the Firebase ID token and selected role to `POST /api/login`.
3. Backend verifies the token, checks the user in PostgreSQL, and validates the role.
4. Protected API calls include `Authorization: Bearer <token>` in the header.

---

## Project Structure

```text
student-project/
├── backend/
│   ├── app/
│   │   ├── api/routes/       # API route handlers
│   │   ├── core/             # Database, Firebase, settings
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic request/response schemas
│   │   ├── services/         # Business logic
│   │   └── main.py           # FastAPI application entry point
│   ├── firebase.json         # Firebase service account (not in git)
│   ├── requirements.txt
│   └── pyproject.toml
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page-level views
│   │   ├── routes/           # React Router configuration
│   │   ├── services/         # API and Firebase clients
│   │   └── store/            # Zustand auth store
│   ├── package.json
│   └── vite.config.js
├── docs/
│   └── screenshots/          # Add project screenshots here
├── exam_test_platform_mockup.html
└── README.md
```

---

## Prerequisites

Before running the project locally, ensure you have:

| Tool | Version | Purpose |
|------|---------|---------|
| [Node.js](https://nodejs.org/) | 18+ | Frontend |
| [npm](https://www.npmjs.com/) | 9+ | Frontend dependencies |
| [Python](https://www.python.org/) | 3.13+ | Backend |
| [PostgreSQL](https://www.postgresql.org/) | 14+ | Database |
| [Firebase project](https://console.firebase.google.com/) | — | Google Authentication |

You also need:

- A **PostgreSQL database** (local or hosted)
- A **Firebase project** with Google Sign-In enabled
- A **Firebase service account key** saved as `backend/firebase.json`
- **Firebase web config** in `frontend/src/services/firebase.js`

Gdrive sources --- https://drive.google.com/drive/folders/1CJgVLuo_f7PK1zuKNN6Q9C76XfctFZ-3?usp=sharing
---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/prakashpoint17/merzol_studentportal_project.git
cd merzol_studentportal_project
```

### 2. Backend setup

```bash
cd backend

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate        # Linux / macOS
# .venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Create environment file (see Environment Variables section)
cp .env.example .env
# Edit .env with your PostgreSQL connection string

# Place your Firebase service account key at:
# backend/firebase.json

# Start the API server
uvicorn app.main:app --reload
```

Backend runs at: **http://127.0.0.1:8000**

API docs (auto-generated): **http://127.0.0.1:8000/docs**

### 3. Frontend setup

Open a **new terminal**:

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at: **http://localhost:5173**

### 4. First-time usage

1. Start PostgreSQL and ensure `DATABASE_URL` in `backend/.env` is correct.
2. Start the backend — tables are created automatically on startup.
3. Start the frontend.
4. Open http://localhost:5173 and sign in with Google as **School** (first user only).
5. Add teachers from the school dashboard, then teachers can add students.

---

## Environment Variables

Never commit real secrets. The following files are gitignored:

- `backend/.env`
- `backend/firebase.json`

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://username:password@localhost:5432/student_portal
```

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |

### Firebase service account (`backend/firebase.json`)

Download from **Firebase Console → Project Settings → Service Accounts → Generate new private key**.

Place the downloaded JSON file at `backend/firebase.json`.

### Frontend Firebase config (`frontend/src/services/firebase.js`)

Update `firebaseConfig` with your Firebase web app credentials from **Firebase Console → Project Settings → Your apps**.

---

## API Endpoints

Base URL: `http://127.0.0.1:8000/api`

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/login` | No | Login with Firebase token and role |

**Request body**

```json
{
  "token": "<firebase_id_token>",
  "role": "school | teacher | student"
}
```

### Teachers

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `GET` | `/teachers` | Bearer | School | List teachers |
| `POST` | `/teachers` | Bearer | School | Add a teacher |
| `DELETE` | `/teachers?email=` | Bearer | School | Remove a teacher |

### Students

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/students` | Bearer | Teacher | Add a student |
| `DELETE` | `/students?email=` | Bearer | Teacher | Remove a student |

### School Dashboard

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `GET` | `/school/dashboard/stats` | Bearer | School | Teachers, students, and tests count |

### Health check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Backend health check |

---

## User Roles

### School (Administrator)
- First Google user can register as the school account
- View dashboard statistics
- Add, list, and delete teachers
- Full control over teachers under the school

### Teacher
- Must be created by a school administrator
- Add and delete students under their account
- Access teacher dashboard

### Student
- Must be created by a teacher
- Access student dashboard
- Cannot self-register

---

## Documentation

### Project Documents

| Document | Link |
|----------|------|
| Software Requirements Specification (SRS) | _Add Google Drive link_ |
| System Design Document | _Add Google Drive link_ |
| User Manual | _Add Google Drive link_ |
| School Login Guide | _Add Google Drive link_ |

### Google Drive Resources

| Resource | Link |
|----------|------|
| Project Documentation Folder | _Add Google Drive link_ |
| Presentation Slides | _Add Google Drive link_ |
| Demo Video | _Add Google Drive / YouTube link_ |

> Replace the placeholder links above with your actual Google Drive and video URLs.

---

## Demo

**Video demonstration:** _Add YouTube or Drive link here_

---

## Future Enhancements

- Online exam and test creation module
- Attendance tracking
- Push / email notifications
- AI-based performance analytics
- Student profile and academic record management
- Mobile-responsive improvements and PWA support

---

## Contributors

| Name | Role |
|------|------|
| Prakash | Backend Development, Project Lead |
| _Team Member_ | Frontend Development |

---

## License

This project is licensed under the **MIT License**.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Invalid token` on login | Ensure `backend/firebase.json` matches your Firebase project |
| `Authorization header missing` | Frontend must send `Bearer <token>` on protected routes |
| Database connection error | Verify PostgreSQL is running and `DATABASE_URL` is correct |
| `Access Denied, User not found` | Teachers/students must be added by school/teacher first |
| CORS errors | Backend allows all origins in development; check backend is running on port 8000 |
| Port already in use | Change Vite port with `npm run dev -- --port 3000` or use another uvicorn port |

---

## .gitignore Notes

The repository `.gitignore` excludes files you must create locally before running:

| Ignored path | Why |
|--------------|-----|
| `backend/.venv/` | Python virtual environment (create per machine) |
| `frontend/node_modules/` | npm dependencies (run `npm install`) |
| `backend/.env` | Database credentials |
| `backend/firebase.json` | Firebase service account secret |
| `.env` | Root-level env files |
| `frontend/dist/` | Production build output |

See the root `.gitignore` for the full list.
