from faker import Faker
import random

fake = Faker()

def generate_restaurants_data():
    restaurants_data = []
    
    for _ in range(10):  
        restaurant = {
            'id': fake.unique.random_number(digits=8),
            'name': fake.company(),
            'location': fake.city() + ", " +  fake.country(),
            'type_food': fake.random_element(['Italian', 'Mexican', 'Chinese', 'Indian']),
            'calification': random.randint(1, 5),
            'visited': fake.boolean(chance_of_getting_true=50),
        }
        restaurants_data.append(restaurant)
    
    return restaurants_data
