from pydantic import BaseModel, EmailStr, field_serializer
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    is_admin: bool = False

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
    admin_reply: str | None = None
    guest_name: str | None = None
    guest_phone: str | None = None

class ReviewCreate(ReviewBase):
    pass

class ReviewUpdate(BaseModel):
    rating: int | None = None
    text: str | None = None

class ReviewRead(ReviewBase):
    id: int
    user_id: int | None = None
    user: UserRead | None = None
    model_config = {
        "from_attributes": True
    }

class QuestionBase(BaseModel):
    text: str
    admin_reply: str | None = None
    guest_name: str | None = None
    guest_phone: str | None = None
    is_read: bool = False

class QuestionCreate(QuestionBase):
    pass

class QuestionUpdate(BaseModel):
    text: str | None = None

class QuestionRead(QuestionBase):
    id: int
    user_id: int | None = None
    user: UserRead | None = None
    created_at: datetime

    @field_serializer("created_at")
    def serialize_created_at(self, value):
        return value.isoformat() if value else None

    model_config = {
        "from_attributes": True
    }

class SpecialistBase(BaseModel):
    name: str
    position: str
    specialization: str | None = None
    workplace: str | None = None
    education: str | None = None
    extra_qual: str | None = None
    photo: str | None = None

class SpecialistCreate(SpecialistBase):
    pass

class SpecialistUpdate(BaseModel):
    name: str | None = None
    position: str | None = None
    specialization: str | None = None
    workplace: str | None = None
    education: str | None = None
    extra_qual: str | None = None
    photo: str | None = None

class SpecialistRead(SpecialistBase):
    id: int
    created_at: datetime
    updated_at: datetime

    @field_serializer("created_at")
    def serialize_created_at(self, value):
        return value.isoformat() if value else None

    @field_serializer("updated_at")
    def serialize_updated_at(self, value):
        return value.isoformat() if value else None

    model_config = {
        "from_attributes": True
    } 
