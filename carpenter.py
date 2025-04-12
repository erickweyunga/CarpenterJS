#!/usr/bin/env python
"""
Carpenter CLI - Command line interface for the Carpenter framework
"""
import sys
import os
import dotenv
import argparse
from typing import Optional, List

sys.dont_write_bytecode = True
dotenv.load_dotenv()

from carpenter.settings import CarpenterConfig
from carpenter.log import logger
from carpenter import build
from carpenter import dev


def parse_args(args: Optional[List[str]] = None) -> argparse.Namespace:
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(
        description="Carpenter - A web application framework",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )

    parser.add_argument(
        "command",
        nargs="?",
        default=os.environ.get("CARPENTER_CMD", "dev"),
        choices=["dev", "build", "migrate", "shell"],
        help="Command to run",
    )

    parser.add_argument(
        "--port",
        "-p",
        type=int,
        default=int(os.environ.get("CARPENTER_PORT", 8000)),
        help="Port number for the server",
    )

    parser.add_argument(
        "--host",
        default=os.environ.get("CARPENTER_HOST", "127.0.0.1"),
        help="Host address to bind the server",
    )

    parser.add_argument(
        "--env-file",
        default=os.environ.get("CARPENTER_ENV_FILE", ".env"),
        help="Path to environment file",
    )

    parser.add_argument(
        "--log-level",
        default=os.environ.get("CARPENTER_LOG_LEVEL", "info"),
        choices=["debug", "info", "warning", "error", "critical"],
        help="Logging level",
    )

    parser.add_argument(
        "--no-minify", action="store_true", help="Skip minification during build"
    )

    return parser.parse_args(args)


def run_dev_server(args: argparse.Namespace, config: CarpenterConfig) -> None:
    """Run the development server"""
    dev.run(
        host=args.host,
        port=args.port,
        debug=config.DEBUG,
        log_level=config.LOG_LEVEL,
        reload=True,
        reload_dirs=[
            "carpenter",
            "app",
            "pages",
        ],
        factory=True,
    )


def run_build(args: argparse.Namespace, config: CarpenterConfig) -> None:
    """Build the application for production"""
    logger.info("Building application for production...")
    build.build(prod=True, minify=not args.no_minify)
    logger.info("Build completed successfully")


def run_migrate(args: argparse.Namespace, config: CarpenterConfig) -> None:
    """Run database migrations"""
    logger.info("Running database migrations...")
    # Example implementation - replace with actual migration logic
    from carpenter import migrations

    migrations.run_migrations()
    logger.info("Migrations completed successfully")


def run_shell(args: argparse.Namespace, config: CarpenterConfig) -> None:
    """Start an interactive shell with the application context"""
    logger.info("Starting interactive shell...")
    # Example implementation - replace with actual shell logic
    import code

    variables = {
        "config": config,
        "logger": logger,
    }
    code.interact(local=variables, banner="Carpenter Interactive Shell")


def main(args: Optional[List[str]] = None) -> int:
    """Main entry point for the Carpenter CLI"""
    parsed_args = parse_args(args)

    # Set up logging based on args
    logger.setLevel(parsed_args.log_level.upper())

    # Initialize config with env file from args
    config = CarpenterConfig(env_file=parsed_args.env_file or ".env")

    # Command dispatcher
    commands = {
        "dev": run_dev_server,
        "build": run_build,
        "migrate": run_migrate,
        "shell": run_shell,
    }

    # Run the requested command
    try:
        if parsed_args.command in commands:
            commands[parsed_args.command](parsed_args, config)
            return 0
        else:
            logger.error(f"Unknown command: {parsed_args.command}")
            return 1
    except Exception as e:
        logger.exception(f"Error running command {parsed_args.command}: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
