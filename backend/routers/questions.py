from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from database import SessionLocal
from auth import get_current_user, get_db
import schemas
from models import Question, User
from datetime import datetime

router = APIRouter(prefix="/questions", tags=["questions"])

@router.post("/", response_model=schemas.QuestionRead)
def create_question(question: schemas.QuestionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_question = Question(user_id=current_user.id, text=question.text)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

@router.get("/", response_model=list[schemas.QuestionRead])
def get_questions(db: Session = Depends(get_db)):
    questions = db.query(Question).order_by(Question.created_at.desc()).all()
    for q in questions:
        q.user
    return questions

@router.put("/{question_id}", response_model=schemas.QuestionRead)
def update_question(question_id: int, question: schemas.QuestionUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_question = db.query(Question).filter(Question.id == question_id).first()
    if not db_question:
        raise HTTPException(status_code=404, detail="Вопрос не найден")
    if db_question.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Нет доступа к изменению этого вопроса")
    if question.text is not None:
        db_question.text = question.text
    db.commit()
    db.refresh(db_question)
    return db_question

@router.delete("/{question_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_question(question_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_question = db.query(Question).filter(Question.id == question_id).first()
    if not db_question:
        raise HTTPException(status_code=404, detail="Вопрос не найден")
    if db_question.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Нет доступа к удалению этого вопроса")
    db.delete(db_question)
    db.commit()
    return None

@router.patch("/{question_id}/reply", response_model=schemas.QuestionRead)
def admin_reply_question(question_id: int, reply: str = Body(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Требуются права администратора")
    db_question = db.query(Question).filter(Question.id == question_id).first()
    if not db_question:
        raise HTTPException(status_code=404, detail="Вопрос не найден")
    db_question.admin_reply = reply
    db.commit()
    db.refresh(db_question)
    return db_question

@router.post("/guest", response_model=schemas.QuestionRead)
def create_guest_question(question: schemas.QuestionCreate, db: Session = Depends(get_db)):
    if not question.guest_name or not question.guest_phone:
        raise HTTPException(status_code=400, detail="Имя и телефон обязательны для гостевого вопроса")
    db_question = Question(
        user_id=None,
        guest_name=question.guest_name,
        guest_phone=question.guest_phone,
        text=question.text
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question 
