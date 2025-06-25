from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    phone = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)

class Review(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    rating = Column(Integer, nullable=False)
    text = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    admin_reply = Column(Text, nullable=True)

    user = relationship('User', backref='reviews')

class Question(Base):
    __tablename__ = 'questions'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    admin_reply = Column(Text, nullable=True)

    user = relationship('User', backref='questions') 
