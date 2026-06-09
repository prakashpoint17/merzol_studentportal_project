from sqlalchemy import Column, Integer, String
from app.core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String, unique=True)
    email = Column(String, unique=True)
    role = Column(String)
    created_by = Column(String, nullable=True)
    name = Column(String)
    
    