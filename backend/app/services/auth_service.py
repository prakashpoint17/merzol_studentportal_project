from app.core.firebase import verify_firebase_token
from app.core.database import SessionLocal
from app.models.user import User

def login_user(data):
    
    # Create DB session (connection to database)
    db = SessionLocal()
    
    # 🔐 Step 1: Verify Firebase token (Google login check)
    decoded = verify_firebase_token(data.token)
    
    # If token is invalid → reject login
    if not decoded:
        return {"status": "error", "message": "Invalid token"}
    
    # Extract user info from token
    email = decoded.get("email")
    uid = decoded.get("uid")
    name = decoded.get("name")
    
    # 🔍 Step 2: Check if user already exists in DB
    user = db.query(User).filter(User.email == email).first()
    
    # 🚨 CASE 1: USER DOES NOT EXIST
    
    if not user:
        # Check if any school already exists
        school_exists = db.query(User).filter(User.role == "school").first()
        
        # ✅ Allow ONLY if:
        # - role = school
        # - no school exists yet (first user)
        if data.role == "school" and not school_exists:
            new_user = User(
                firebase_uid=uid,
                email=email,
                role="school",
                name=name
            )
            db.add(new_user)
            db.commit()
            
            return {
                "status" : "success",
                "message" : "School created"
            }
            
        # ❌ Otherwise reject (teacher/student not allowed to self-register)
        return {
            "status" : "error",
            "message" : "Access Denied , User not found. Please contact the administrator."
        }
    
    # 🚨 CASE 2: USER EXISTS

    # Check if selected role matches stored role
    if user.role != data.role:
        return {
            "status" : "error",
            "message" : "Role mismatch. Please contact the administrator."
        }
        
    return {
        "status" : "success",
        "message" : "Login successful",
    }
    
