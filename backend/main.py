from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from auth import router as auth_router
from routers.users import router as users_router

# Импортировать и подключить роутеры позже
# from routers import users, specialists, testimonials, faq

app = FastAPI(title="Biosfera API")

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создать таблицы при первом запуске (для разработки)
Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(users_router)

@app.get("/")
def root():
    return {"message": "Biosfera API is running"}

# TODO: Подключить роутеры для users, specialists, testimonials, faq 