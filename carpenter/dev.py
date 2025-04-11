import sys

sys.dont_write_bytecode = True

from .server import run_server
from .log import logger


def run(port: int = 8000):
    """
    Run the development server
    This is a simplified wrapper around run_server that adds any development-specific functionality
    """
    try:
        run_server()
    except KeyboardInterrupt:
        logger.info("Development server stopped by user")
    except Exception as e:
        logger.error(f"Development server failed: {str(e)}")
        sys.exit(1)
