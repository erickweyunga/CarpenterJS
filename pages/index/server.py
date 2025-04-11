from typing import Any
from starlette.requests import Request
from carpenter.actions import action

from pydantic import BaseModel

class AddRequest(BaseModel):
    number: int

@action(AddRequest)
async def plus_one(data: AddRequest, req: Request) -> Any:
    result = data.number + 1
    return {"result": result, "status": "success"}

@action
async def get_status(request: any):
    return {"status": "online"}