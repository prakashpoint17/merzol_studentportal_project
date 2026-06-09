from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user
from app.core.database import SessionLocal
from app.models.user import User

router = APIRouter()

@router.get("/school/dashboard/stats")
def get_school_dashboard_status(current_user=Depends(get_current_user)):
    db=SessionLocal()
    
    if current_user.role != "school":
        return {"status": "error", "message": "Unauthorized access"}
    
    #Count teachers under this school
    teachers_count = db.query(User).filter(
        User.role == "teacher",
        User.created_by == current_user.email
    ).count()
    
    #Count students under this sch📁 app/api/routes/dashboard.pyool under those teachers
    students_count = db.query(User).filter(
        User.role == "student",
        User.created_by.in_(db.query(User.email).filter(User.role == "teacher", User.created_by == current_user.email))
    ).count()
    
    tests_count = 0
    
    return{
        "teachers_count": teachers_count,
        "students_count": students_count,
        "tests_count": tests_count
    }
    