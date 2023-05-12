from fastapi import FastAPI, Depends, HTTPException
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
    "http://localhost:3001",
    "localhost:3001"
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

@app.get("/restaurants/{id}", tags=["restaurants"], response_model=schemas.Restaurant)
def get_restaurants(id: int, db: Session = Depends(get_db)):
    restaurant = db.query(Restaurant).filter(Restaurant.id == id).first()
    if restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant

@app.post("/restaurants/", response_model=schemas.Restaurant)
def create_restaurant(restaurant: schemas.Restaurant, db: Session = Depends(get_db)):
    restaurant = Restaurant(
        id=restaurant.id,
        name=restaurant.name,
        location=restaurant.location,
        type_food=restaurant.type_food,
        calification=restaurant.calification,
        visited=restaurant.visited
    )
    db.add(restaurant)
    db.commit()
    db.refresh(restaurant)
    return restaurant

@app.put("/restaurants/{id}", tags=["restaurants"], response_model=schemas.Restaurant)
def update_restaurant(id: int, restaurant: schemas.RestaurantUpdate, db: Session = Depends(get_db)):
    db_restaurants = db.query(Restaurant).filter(Restaurant.id == id).first()
    if db_restaurants:
        db_restaurants.name = restaurant.name
        db_restaurants.location = restaurant.location
        db_restaurants.type_food = restaurant.type_food
        db_restaurants.calification = restaurant.calification
        db_restaurants.visited = restaurant.visited
        db.commit()
        db.refresh(db_restaurants)
        return db_restaurants
    else:
        raise HTTPException(status_code=404, detail="Restaurant not found")


@app.delete("/restaurants/{id}", tags=["restaurants"])
def delete_restaurant(id: int, db: Session = Depends(get_db)):
    restaurant = db.query(Restaurant).filter(Restaurant.id == id).first()
    if restaurant:
        db.delete(restaurant)
        db.commit()
        return {"message": "Restaurant deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Restaurant not found")
