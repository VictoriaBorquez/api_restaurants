from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
#from . import crud

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

restaurants_data = [
    {
        "id": 1,
        "name": "KFC",
        "location": "Santiago, Chile",
        "type_food": "fast food",
        "calification": 5,
        "visited": True
    },
    {
        "id": 2,
        "name": "Mcdonalds",
        "location": "Valparaiso, Chile",
        "type_food": "fast food",
        "calification": 0,
        "visited": False
    }
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/restaurants", tags=["restaurants"])
def get_restaurants():
    #restaurants = restaurants_data #get_restaurants()
    #return {"data": restaurants}
    return restaurants_data

@app.get("/restaurants/{id}", tags=["restaurants"])
def get_restaurants(id: int):
    for item in restaurants_data:
        if item["id"] == id:
            return item
    return []

@app.get("/calification", tags=["restaurants"])
def get_by_calification(calification: int):
    return list(filter(lambda item: item["calification"] == calification, restaurants_data))

@app.post("/restaurants", tags=["restaurants"])
def create_restaurant(id: int, name: str, location: str, type_food: str, calification: int, visited: bool):
    restaurants_data.append({
        "id": id,
        "name": name,
        "location": location,
        "type_food": type_food,
        "calification": calification,
        "visited": visited
    })
    return restaurants_data

@app.put("/restaurants/{id}", tags=["restaurants"])
def update_restaurants(id: int, name: str, location: str, type_food: str, calification: int, visited: bool):
    for item in restaurants_data:
        if item["id"] == id:
            item["name"] == name
            item["location"] == location
            item["type_food"] == type_food
            item["calification"] == calification
            item["visited"] == visited
    return restaurants_data


@app.delete("/restaurants/{id}", tags=["restaurants"])
def delete_restaurants(id: int):
    for item in restaurants_data:
        if item["id"] == id:
            restaurants_data.remove(item)
            return restaurants_data