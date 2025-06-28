from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from auth import get_db, get_current_user
from models import Specialist
from schemas import SpecialistCreate, SpecialistUpdate, SpecialistRead

router = APIRouter(prefix="/specialists", tags=["specialists"])

def get_current_admin_user(current_user = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Недостаточно прав для выполнения операции"
        )
    return current_user

@router.get("/", response_model=List[SpecialistRead])
def get_specialists(db: Session = Depends(get_db)):
    """Получить всех специалистов"""
    specialists = db.query(Specialist).order_by(Specialist.name).all()
    return specialists

@router.get("/{specialist_id}", response_model=SpecialistRead)
def get_specialist(specialist_id: int, db: Session = Depends(get_db)):
    """Получить специалиста по ID"""
    specialist = db.query(Specialist).filter(Specialist.id == specialist_id).first()
    if not specialist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Специалист не найден"
        )
    return specialist

@router.post("/", response_model=SpecialistRead)
def create_specialist(
    specialist: SpecialistCreate,
    db: Session = Depends(get_db),
    current_admin: dict = Depends(get_current_admin_user)
):
    """Создать нового специалиста (только для админов)"""
    db_specialist = Specialist(**specialist.model_dump())
    db.add(db_specialist)
    db.commit()
    db.refresh(db_specialist)
    return db_specialist

@router.put("/{specialist_id}", response_model=SpecialistRead)
def update_specialist(
    specialist_id: int,
    specialist_update: SpecialistUpdate,
    db: Session = Depends(get_db),
    current_admin: dict = Depends(get_current_admin_user)
):
    """Обновить специалиста (только для админов)"""
    db_specialist = db.query(Specialist).filter(Specialist.id == specialist_id).first()
    if not db_specialist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Специалист не найден"
        )
    
    update_data = specialist_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_specialist, field, value)
    
    db.commit()
    db.refresh(db_specialist)
    return db_specialist

@router.delete("/{specialist_id}")
def delete_specialist(
    specialist_id: int,
    db: Session = Depends(get_db),
    current_admin: dict = Depends(get_current_admin_user)
):
    """Удалить специалиста (только для админов)"""
    db_specialist = db.query(Specialist).filter(Specialist.id == specialist_id).first()
    if not db_specialist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Специалист не найден"
        )
    
    db.delete(db_specialist)
    db.commit()
    return {"message": "Специалист успешно удален"} 