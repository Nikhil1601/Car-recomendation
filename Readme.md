# 🚗 Car Recommendation AI System

## What did you build and why?

I built a **Car Recommendation System** that helps users find suitable cars based on structured preferences such as:

* Fuel type
* Price range
* Variant
* Mileage
* Safety ratings
* User-defined priorities

The goal was to design a **lightweight recommendation engine** that replaces complex ML models with a **transparent, rule-based scoring system** that is easy to understand, debug, and extend.

--------------------------------------------------------

## Core Idea

Instead of using machine learning, the system ranks cars using a **deterministic scoring algorithm**:

* Basic preference matching (fuel, price, variant)
* Weighted ranking using user priorities (mileage, safety)
* Slight implicit bias toward EV-friendly cars through scoring behavior

----------------------------------------------------

## What did you deliberately cut?

To keep the system simple and fast, I intentionally avoided:

* Machine learning / AI models
* External databases (used JSON instead of SQL/NoSQL)
* Authentication and user accounts
* Real-time car market data APIs
* Advanced analytics dashboards or comparisons

This project focuses on **core recommendation logic + full-stack integration**, not production-level infrastructure.

------------------------------------------------------

## Tech Stack & Why

### Frontend

* **React with Vite**

  * Fast and modular UI development
  * Easy API integration with FastAPI backend

### Backend

* **FastAPI**

  * High-performance Python backend
  * Clean REST API design
  * Built-in validation using Pydantic
  * Easy debugging via auto Swagger docs

### Data Layer

* **JSON file storage**

  * Lightweight and flexible for prototyping
  * No schema migration overhead
  * Fast iteration on recommendation logic

----------------------------------------------------------------

## API Overview

### POST `/recommend`

Request model:

```python
class RecommendationRequest(BaseModel):
    user_fuel: Optional[str] = None
    user_price: Optional[float] = 999.0
    user_variant: Optional[str] = None
    priorities: Optional[List[str]] = None
    limit: Optional[int] = 5
```

Response:

* Returns top-ranked cars sorted by computed score

----------------------------------------------------------------


## Recommendation Logic

Cars are scored using a **rule-based weighted system**:

### Base Scoring

* Fuel match → 50 pts

* Fuel mismatch → 20 pts

* Price within budget → 40 pts

* Price exceeded → 25 pts

* Variant match → 30 pts

* Variant mismatch → 15 pts

------------------------------------------------------

### Priority System

Users can define up to 3 priorities:

* mileage
* safety

Each priority is weighted by rank:

| Priority Rank | Weight |
| ------------- | ------ |
| P1            | 30     |
| P2            | 20     |
| P3            | 10     |

These priorities directly modify final score:

* Mileage → scaled by weight
* Safety → scaled by weight

--------------------------------------------------------------

## Design Notes

* The system is **deterministic (no randomness)**
* Rankings are fully explainable
* Slight bias exists toward EV-like characteristics due to scoring behavior
* JSON dataset drives all recommendations

-------------------------------------------------------------

## AI Tools vs Manual Work

### AI-assisted:

* FastAPI boilerplate structure
* Debugging scoring logic edge cases
* README formatting and documentation
* Sample data structuring

### Manually built:

* Core recommendation algorithm
* Scoring logic design
* Priority weighting system

### AI helped most with:

* Documentation clarity
* Code explanation and debugging support
* Rapid scaffolding of backend structure

--------------------------------------------------------------

## Where AI tools got in the way

* Suggested unnecessary ML-based recommendation systems
* Over-complicated architecture suggestions
* Misaligned optimization ideas that conflicted with rule-based design
* Required correction to keep logic simple and deterministic

---------------------------------------------------------------

## Known Limitation (Important)

The current system may produce **similar types of recommendations repeatedly** because:

* Mileage and safety are unnormalized values
* Priority scaling is not normalized against base score
* Base scoring still dominates in some cases

This makes results **cluster around high mileage + high safety vehicles**.

----------------------------------------------------------

## If I had another 4 hours

I would improve:

* 🧠 **Explainable AI layer (rule-based)**

  * “Why this car was recommended”
  * Example:

    * “High mileage → Fuel efficient option”
    * “High safety rating → safer choice”

* 📊 **Score breakdown per car**

  * Visual breakdown of fuel / price / safety / mileage contributions

* ⚡ **Normalization layer**

  * Normalize mileage and safety before scoring

* 🚗 **Explicit EV reasoning boost**

  * Controlled EV preference instead of implicit bias

-----------------------------------------------------------------

## Closing Note

Thanks for your time and consideration.

----------------------------------------------------------------
