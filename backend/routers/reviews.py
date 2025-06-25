from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from database import SessionLocal
from auth import get_current_user, get_db
import schemas
from models import Review, User
from datetime import datetime, timedelta

router = APIRouter(prefix="/reviews", tags=["reviews"])

@router.post("/", response_model=schemas.ReviewRead)
def create_review(review: schemas.ReviewCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        five_minutes_ago = datetime.utcnow() - timedelta(minutes=5)
        last_review = db.query(Review).filter(Review.user_id == current_user.id).order_by(Review.created_at.desc()).first()
        if last_review and last_review.created_at > five_minutes_ago:
            raise HTTPException(status_code=429, detail="Можно оставлять отзыв не чаще, чем раз в 5 минут")
    db_review = Review(user_id=current_user.id, rating=review.rating, text=review.text)
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

@router.get("/", response_model=list[schemas.ReviewRead])
def get_reviews(db: Session = Depends(get_db)):
    reviews = db.query(Review).all()
    for r in reviews:
        r.user  # подгружаем user
    return reviews

@router.put("/{review_id}", response_model=schemas.ReviewRead)
def update_review(review_id: int, review: schemas.ReviewUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_review = db.query(Review).filter(Review.id == review_id).first()
    if not db_review:
        raise HTTPException(status_code=404, detail="Отзыв не найден")
    if db_review.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Нет доступа к изменению этого отзыва")
    if review.rating is not None:
        db_review.rating = review.rating
    if review.text is not None:
        db_review.text = review.text
    db.commit()
    db.refresh(db_review)
    return db_review

@router.delete("/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_review(review_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_review = db.query(Review).filter(Review.id == review_id).first()
    if not db_review:
        raise HTTPException(status_code=404, detail="Отзыв не найден")
    if db_review.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Нет доступа к удалению этого отзыва")
    db.delete(db_review)
    db.commit()
    return None

@router.patch("/{review_id}/reply", response_model=schemas.ReviewRead)
def admin_reply_review(review_id: int, reply: str = Body(...), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Требуются права администратора")
    db_review = db.query(Review).filter(Review.id == review_id).first()
    if not db_review:
        raise HTTPException(status_code=404, detail="Отзыв не найден")
    db_review.admin_reply = reply
    db.commit()
    db.refresh(db_review)
    return db_review 
