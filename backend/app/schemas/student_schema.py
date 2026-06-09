from pydantic import BaseModel

class CreateStudent(BaseModel):
    email: str
    name: str
    