# Variables

.PHONY:  release

# Default target: show help
help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  release       Release new version with helper shell script."
	@echo "  watch         Build with watch resume with rendercv."

release:
	@./scripts/version.sh

watch: 
	rendercv render -w ./resume/resume_CV.yaml --pdf-path ../static/resume.pdf
