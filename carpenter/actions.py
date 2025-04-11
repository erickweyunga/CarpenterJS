import inspect
import os
import importlib
from starlette.routing import Route
from starlette.requests import Request
from starlette.responses import JSONResponse
from typing import Callable, Awaitable
from pydantic import BaseModel
from typing import Type, Callable, Awaitable, Optional, Any

action_registry = {}


def action(model: Optional[Type[BaseModel]] = None):
    def decorator(
        fn: Callable[..., Awaitable[Any]],
    ) -> Callable[[Request], Awaitable[JSONResponse]]:
        async def wrapper(request: Request) -> JSONResponse:
            validated = None
            if model:
                body = await request.json()
                validated = model(**body)
                result = await fn(validated, request)
            else:
                result = await fn(request)

            if isinstance(result, BaseModel):
                return JSONResponse(content=result.model_dump())
            return JSONResponse(content=result)

        # Register route path
        module = inspect.getmodule(fn)
        if not module:
            raise ValueError("Could not determine module for function")
        route_base = module.__name__.replace("pages.", "").replace(".server", "")
        route_path = f"{route_base}/{fn.__name__}"
        action_registry[route_path] = wrapper

        return wrapper

    return decorator


def get_action_routes() -> list[Route]:
    """
    Generates routes from the registered actions.
    """
    routes = []
    for path, fn in action_registry.items():

        async def endpoint(request: Request, fn=fn):
            result = await fn(request)
            if isinstance(result, BaseModel):
                result = result.model_dump()
                return JSONResponse(result)
            if isinstance(result, JSONResponse):
                return result
            return JSONResponse(content=result)

        routes.append(Route(f"/_actions/{path}", endpoint, methods=["POST"]))
    return routes


def import_page_actions():
    for root, dirs, files in os.walk("pages"):
        if "server.py" in files:
            path = os.path.join(root, "server.py")
            module_path = path.replace(os.path.sep, ".").replace(".py", "")
            importlib.import_module(module_path)
