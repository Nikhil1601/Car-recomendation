import json
from pathlib import Path


def load_cars():
    path = Path(__file__).resolve().parents[1] / "cars.json"
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def recommend_cars(
    user_fuel=None,
    user_price=999.0,
    user_variant=None,
    priorities=None,
    limit=5,
):
    if not priorities:
        priorities = ["mileage", "safety"]

    def score_car(car):
        fuel_score = 50 if user_fuel and car.get("fuel") == user_fuel else 20
        price_score = 40 if car.get("price", 0.0) <= user_price else 25
        variant_score = 30 if user_variant and car.get("variant") == user_variant else 15

        score = fuel_score + price_score + variant_score
        for index, priority in enumerate(priorities[:3]):
            weight = 30 if index == 0 else 20 if index == 1 else 10
            if priority == "mileage":
                score += car.get("mileage", 0.0) * weight
            elif priority == "safety":
                score += car.get("safety_ratings", 0.0) * weight
        return score

    cars = load_cars()
    cars.sort(key=score_car, reverse=True)
    return cars[:limit]
