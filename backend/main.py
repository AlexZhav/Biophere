from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, SessionLocal
from auth import router as auth_router
from routers.users import router as users_router
from routers.reviews import router as reviews_router
from routers.questions import router as questions_router
from models import User, Review, Question

# ВАЖНО: Для запуска на Render используйте команду:
# uvicorn backend.main:app --host 0.0.0.0 --port $PORT
# (если main.py лежит в папке backend)

app = FastAPI(title="biosphere API")

# CORS: временно разрешаем все источники для теста (можно потом сузить)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://biosfera-frontend.onrender.com"],
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

@app.on_event("startup")
def on_startup():
    print("=== BIOSPHERE API STARTED ===")

@app.get("/")
def root():
    return {"message": "biosphere API is running"}

@app.post("/admin/clear_all")
def clear_all():
    db = SessionLocal()
    db.query(Review).delete()
    db.query(Question).delete()
    db.query(User).delete()
    db.commit()
    db.close()
    return {"status": "ok"}

# TODO: Подключить роутеры для specialists, testimonials, faq, если они появятся в будущем

