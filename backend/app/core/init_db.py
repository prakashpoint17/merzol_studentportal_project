from app.core.database import engine
from app.models.user import User

def init_db():
    # Create the database tables
    User.metadata.create_all(bind=engine)