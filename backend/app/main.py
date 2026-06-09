from fastapi import FastAPI
from app.api.routes import auth
from app.core.init_db import init_db
from app.api.routes import auth,teacher
from app.api.routes import student
from app.api.routes import school_dashboard_stats
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

init_db()

app.include_router(auth.router, prefix="/api")
app.include_router(teacher.router, prefix="/api")
app.include_router(student.router, prefix="/api")
app.include_router(school_dashboard_stats.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Backend running"}