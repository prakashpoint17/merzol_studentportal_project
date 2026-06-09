from fastapi import APIRouter, Depends
from app.schemas.student_schema import CreateStudent
from app.services.student_service import create_student
from app.core.dependencies import get_current_user
from app.services.student_service import delete_student

router = APIRouter()

@router.post("/students")
def add_student(data: CreateStudent, current_user=Depends(get_current_user)):
    return create_student(data,current_user)

@router.delete("/students")
def remove_student(email: str, current_user=Depends(get_current_user)):
    return delete_student(email, current_user)