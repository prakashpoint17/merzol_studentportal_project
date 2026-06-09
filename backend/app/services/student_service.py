from app.core.database import SessionLocal
from app.models.user import User

def create_student(data,current_user):
    db = SessionLocal()
    
    # 🚨 Only teacher can add students
    if current_user.role != "teacher":
        return {
            "status" : "error",
            "message" : "Access Denied. Only teacher can add students."
        }
        
    # Check if student already exists
    existing = db.query(User).filter(User.email == data.email).first()
    
    if existing:
        return{
            "status" : "error",
            "message" : "Student with this email already exists."
        }
        
    #Create new student
    
    new_student = User(
        email = data.email,
        role = "student",
        created_by = current_user.email,
        name = data.name,
    )
    
    db.add(new_student)
    db.commit()
    
    return {
        "status" : "success",
        "message" : "Student Added successfully."
    }
    
def delete_student(email: str, current_user):
    db = SessionLocal()

    # 🚨 Only teacher can delete students
    if current_user.role != "teacher":
        return {"status": "error", "message": "Only teacher can delete students"}

    student = db.query(User).filter(User.email == email).first()

    if not student:
        return {"status": "error", "message": "Student not found"}

    # 🚨 Ensure student belongs to this teacher
    if student.created_by != current_user.email:
        return {"status": "error", "message": "Not authorized"}

    db.delete(student)
    db.commit()

    return {"status": "success", "message": "Student deleted"}