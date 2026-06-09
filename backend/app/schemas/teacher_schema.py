from pydantic import BaseModel

class CreateTeacher(BaseModel):
    email: str
    name: str