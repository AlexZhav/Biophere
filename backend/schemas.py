from pydantic import BaseModel, EmailStr, field_serializer
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: str

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    model_config = {
        "from_attributes": True
    }

class ReviewBase(BaseModel):
    rating: int
    text: str

class ReviewCreate(ReviewBase):
    pass

class ReviewUpdate(BaseModel):
    rating: int | None = None
    text: str | None = None

class ReviewRead(ReviewBase):
    id: int
    user_id: int
    user: UserRead | None = None
    model_config = {
        "from_attributes": True
    }

class QuestionBase(BaseModel):
    text: str

class QuestionCreate(QuestionBase):
    pass

class QuestionUpdate(BaseModel):
    text: str | None = None

class QuestionRead(QuestionBase):
    id: int
    user_id: int
    user: UserRead | None = None
    created_at: datetime

    @field_serializer("created_at")
    def serialize_created_at(self, value):
        return value.isoformat() if value else None

    model_config = {
        "from_attributes": True
    } 