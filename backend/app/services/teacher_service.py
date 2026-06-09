from app.core.database import SessionLocal
from app.models.user import User

def create_teacher(email:str,name:str,current_user):
    db = SessionLocal()
    
    # 🚨 Only school can add teachers
    if current_user.role != "school":
        return {
            "status" : "error",
            "message" : "Access Denied. Only school can add teachers."
        }
        
    # Check if teacher already exists
    existing = db.query(User).filter(User.email == email).first()
    
    if existing:
        return{
            "status" : "error",
            "message" : "Teacher with this email already exists."
        }
        
    #Create new teacher
    
    new_teacher = User(
        email = email,
        role = "teacher",
        created_by = current_user.email,
        name= name,
    )
    
    db.add(new_teacher)
    db.commit()
    
    return {
        "status" : "success",
        "message" : "Teacher Added successfully."
    }
    
def delete_teacher(email: str, current_user):
    db = SessionLocal()

    # 🚨 Only school can delete
    if current_user.role != "school":
        return {"status": "error", "message": "Only school can delete teachers"}

    teacher = db.query(User).filter(User.email == email).first()

    if not teacher:
        return {"status": "error", "message": "Teacher not found"}

    # 🚨 Ensure teacher belongs to this school
    if teacher.created_by != current_user.email:
        return {"status": "error", "message": "Not authorized"}

    db.delete(teacher)
    db.commit()

    return {"status": "success", "message": "Teacher deleted"}