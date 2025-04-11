import sys

sys.dont_write_bytecode = True

from carpenter import dev, build

if __name__ == "__main__":
    # Parse command line arguments
    cmd = sys.argv[1] if len(sys.argv) > 1 else "dev"
    port = int(sys.argv[2]) if len(sys.argv) > 2 else 8000

    # Route to appropriate command
    if cmd == "dev":
        dev.run(port=port)
    elif cmd == "build":
        build.build(prod=True)
    else:
        print(f"Unknown command: {cmd}")
        print("Available commands: dev, build")
        sys.exit(1)
