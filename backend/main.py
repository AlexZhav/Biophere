from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, SessionLocal
from auth import router as auth_router
from routers.users import router as users_router
from routers.reviews import router as reviews_router
from routers.questions import router as questions_router
from models import User, Review, Question

# Импортировать и подключить роутеры позже
# from routers import users, specialists, testimonials, faq

app = FastAPI(title="Biosfera API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://biosfera-frontend.onrender.com",  # адрес твоего фронта
        "http://localhost:5173"                    # для локальной разработки (можно убрать на проде)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создать таблицы при первом запуске (для разработки)
Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(reviews_router)
app.include_router(questions_router)

@app.get("/")
def root():
    return {"message": "Biosfera API is running"}

@app.post("/admin/clear_all")
def clear_all():
    db = SessionLocal()
    db.query(Review).delete()
    db.query(Question).delete()
    db.query(User).delete()
    db.commit()
    db.close()
    return {"status": "ok"}

# TODO: Подключить роутеры для users, specialists, testimonials, faq 