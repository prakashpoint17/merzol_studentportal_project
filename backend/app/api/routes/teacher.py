from fastapi import APIRouter, Depends
from app.schemas.teacher_schema import CreateTeacher
from app.services.teacher_service import create_teacher,delete_teacher
from app.core.dependencies import get_current_user
from app.core.database import SessionLocal
from app.models.user import User

router = APIRouter()

@router.post("/teachers")
def add_teacher(data: CreateTeacher, current_user=Depends(get_current_user)):
    return create_teacher(data.email,data.name,current_user)

@router.delete("/teachers")
def remove_teacher(email: str, current_user=Depends(get_current_user)):
    return delete_teacher(email, current_user)

@router.get("/teachers")
def get_teachers(current_user=Depends(get_current_user)):
    
    if current_user.role != "school":
        return {"status": "error", "message": "Unauthorized access"}
    
    db = SessionLocal()
    
    try:
        teachers = db.query(User).filter(
            User.role == "teacher",
            User.created_by == current_user.email
        ).all()
        
        return {
            "teachers": [
                {
                    "name": t.name,
                    "email": t.email
                } for t in teachers
            ]
        }
    
    finally:
        db.close()
