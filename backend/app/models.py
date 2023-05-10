from sqlalchemy import Boolean, Column, Integer, String

from .database import Base

class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    location = Column(String)
    type_food= Column(String)
    calification = Column(String, default=None)
    location = Column(String)
    visited = Column(Boolean, default=False)
