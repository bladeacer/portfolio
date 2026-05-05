# Variables

.PHONY:  release

# Default target: show help
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  release       Release new version with helper shell script."

release:
	@./scripts/version.sh
