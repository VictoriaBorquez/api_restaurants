from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import schemas, models
from .models import Restaurant
from .database import SessionLocal, engine
from .sample_data import generate_restaurants_data
from typing import List


app = FastAPI()



def create_restaurants_data(db: Session):
    restaurants_data = generate_restaurants_data()
    for restaurant in restaurants_data:
        new_restaurant = Restaurant(
            id=restaurant['id'],
            name=restaurant['name'],
            location=restaurant['location'],
            type_food=restaurant['type_food'],
            calification=restaurant['calification'],
            visited=restaurant['visited']
        )
        db.add(new_restaurant)
    db.commit()


@app.on_event("startup")
def get_db() -> Session:
    db = SessionLocal()
    try:
        models.Base.metadata.create_all(bind=engine)
        create_restaurants_data(db)
    finally:
        db.close()
    return db

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/restaurants", tags=["restaurants"], response_model=List[schemas.Restaurant])
def get_restaurants(db: Session = Depends(get_db)):
    restaurants = db.query(Restaurant).all()
    return restaurants
