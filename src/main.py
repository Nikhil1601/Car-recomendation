from typing import List, Optional

from fastapi import FastAPI
from pydantic import BaseModel
from recommed import recommend_cars
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecommendationRequest(BaseModel):
    user_fuel: Optional[str] = None
    user_price: Optional[float] = 999.0
    user_variant: Optional[str] = None
    priorities: Optional[List[str]] = None
    limit: Optional[int] = 5

@app.post("/recommend")
def get_recommendations(request: RecommendationRequest):
    return recommend_cars(
        user_fuel=request.user_fuel,
        user_price=request.user_price,
        user_variant=request.user_variant,
        priorities=request.priorities,
        limit=request.limit,
)


@app.get("/health")
def health_check():
    return {"status": "ok"}
