import sys
sys.dont_write_bytecode = True

import os
import atexit
import subprocess
import contextlib
import uvicorn
import threading
from starlette.applications import Starlette
from starlette.staticfiles import StaticFiles
from .actions import get_action_routes, import_page_actions
from .log import logger

parcel_process = None


def _stream_output(process, prefix="Parcel"):
    """Stream output from subprocess to logger with handling for Unicode characters"""
    for line in iter(process.stdout.readline, b""):
        try:
            decoded = line.decode("utf-8").strip()
            if decoded and ("error" in decoded.lower() or "fail" in decoded.lower()):
                decoded = decoded.encode("cp1252", errors="replace").decode("cp1252")
                logger.error(f"{prefix}: {decoded}")
        except Exception:
            pass


def start_parcel():
    """Start the frontend build process"""
    global parcel_process
    try:
        cwd = os.getcwd()
        parcel_process = subprocess.Popen(
            ["npm.cmd", "start"],
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=False,
        )

        output_thread = threading.Thread(
            target=_stream_output, args=(parcel_process, "Frontend"), daemon=True
        )
        output_thread.start()

        logger.info("Frontend server running at http://localhost:1234")
    except Exception as e:
        logger.error(f"Failed to start frontend server: {str(e)}")


def stop_parcel():
    """Gracefully shut down the frontend build process"""
    global parcel_process
    if parcel_process and parcel_process.poll() is None:
        try:
            parcel_process.terminate()
            parcel_process.wait(timeout=5)
        except Exception:
            parcel_process.kill()
            parcel_process.wait()


@contextlib.asynccontextmanager
async def lifespan(app: Starlette):
    import_page_actions()
    routes = get_action_routes()
    for route in routes:
        app.router.routes.append(route)

    start_parcel()
    atexit.register(stop_parcel)

    yield


def create_app() -> Starlette:
    """Create and configure the Starlette application"""
    app = Starlette(debug=True, lifespan=lifespan)

    try:
        if not os.path.exists("public"):
            os.makedirs("public", exist_ok=True)

        app.mount("/static", StaticFiles(directory="public"), name="static")
    except Exception as e:
        logger.error(f"Failed to mount static files: {str(e)}")

    return app


def run_server(port=8000):
    """Run the server with the specified port"""
    try:
        logger.info(f"Starting Carpenter server on port {port}")
        app = create_app()
        uvicorn.run(app, host="0.0.0.0", port=port, log_level="debug")
    except Exception as e:
        logger.error(f"Server failed to start: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    run_server()
