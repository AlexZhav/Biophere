from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: str

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    class Config:
        orm_mode = True

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
    class Config:
        orm_mode = True 