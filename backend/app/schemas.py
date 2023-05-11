from pydantic import BaseModel
from typing import Optional

class Restaurant(BaseModel):
    id : int
    name : str
    location : str
    type_food : str
    calification : int
    visited : bool

    class Config:
        orm_mode = True

class RestaurantUpdate(BaseModel):
    name: Optional[str]
    location: Optional[str]
    type_food: Optional[str]
    calification: Optional[int]
    visited: Optional[bool]