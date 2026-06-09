from fastapi import Header, HTTPException
from app.core.firebase import verify_firebase_token
from app.core.database import SessionLocal
from app.models.user import User

def get_current_user(authorization: str = Header(None)):
    
    print("Authorization Header:", authorization)
    
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    # Extract token from header
    token = authorization.split(" ")[1] #Bearer <token>
    
    if not token:
        raise HTTPException(status_code=401, detail="Authorization token missing")
    
    # Verify Firebase token
    decoded = verify_firebase_token(token)
    
    if not decoded:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    email = decoded.get("email")
    
    # Fetch user from DB
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user