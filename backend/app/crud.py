from sqlalchemy.orm import Session

from . import models

def get_restaurants(db: Session):
    return db.query(models.Restaurant).all()

def get_restaurant(db: Session, restaurant_id: int):
    return db.query(models.Restaurant).filter(models.Restaurant,id == restaurant_id).first()
