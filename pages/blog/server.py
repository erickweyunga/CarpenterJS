
from carpenter.actions import action
from starlette.requests import Request


@action()
async def send(request: Request):
    return {"status": "Message sent!", "from": request.json()["name"]}