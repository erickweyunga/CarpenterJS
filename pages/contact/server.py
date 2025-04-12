from pydantic import BaseModel
from carpenter.actions import action
from starlette.requests import Request


class ContactForm(BaseModel):
    name: str
    email: str
    message: str


@action(ContactForm)
async def submit(form: ContactForm, request: Request):
    return {"status": "Message received!", "from": form.name}

@action()
async def send(request: Request):
    return {"status": "Message sent!", "from": request.json()["name"]}