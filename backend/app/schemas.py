from pydantic import BaseModel

class Restaurant(BaseModel):
    id : int
    name : str
    location : str
    type_food : str
    calification : int
    location : str
    visited : bool

    class Config:
        orm_mode = True