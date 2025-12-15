---
layout: ../../layouts/MarkdownPostLayout.astro
title: "pdf-fmt"
pubDate: 10/24/2025
status: "Draft"
description: "A small Python script to extract and format text content from PDF files, with filter rules and other niceties."
author: "bladeacer"
tags: ["python", "pdf", "pdf-text-extraction", "programming", "scripting"]
---

## Foreword

pdf-fmt is a PDF text extraction utility. It supports features like regex based
filtering and document format conversion (via LibreOffice or pandoc).

### Project Status

The project is currently under active development. However, there is an MVP[^1]
executable and script installer.

I plan to continue working on it, although development might be slow as I am in
the process of refactoring the codebase.

## Links

- [GitHub repository](https://github.com/bladeacer/pdf-fmt)
- [Built executables](https://github.com/bladeacer/pdf-fmt/releases/latest)

<!-- ## Screenshots -->

## Retrospect

The project was quite fun to work on, with various challenges and technical
decisions that had to be considered along the way.

### Why this is not an OCR

There are plenty of Optical Character Recognition (OCR) tools out there.
However, they might not always be the best use for primarily text based documents.

For example, a use case of mine involves extracting text from lecture slides.
I am generally more interested in the text content, which makes up a large part
of the lecture slides.

If I were mostly interested in the non-text content e.g. equations and diagrams
would be much better solved with an OCR.

OCRs are also inherently much larger in binary size, and the large plethora of
existing tools means that my project would need a lot more polish to even be considered.

It also somewhat contravenes the [Unix](/portfolio/posts/unix) software philosophy.
Bundling every feature without knowing whether users would want to use them is
not good. The added maintenance overhead and increased friction with not using
existing well established tools is quite the antithesis to a command line
application. There might be disagreements with what the philosophy entails,
but it is very much borne out of practicality.

### Why Python?

Many programming languages exist out there. There are many factors for why a
language is chosen for a specific project. One of the major aspect considered is
the existing ecosystem of well-made libraries for a specific purpose.

For example, Docker and microservices is well known to be handled well by the
Go programming language and its ecosystem. Python strength for our purpose of
PDF text extraction was simply the large plethora of related libraries already
out there.

Rust and Go may have some PDF related libraries, but they are quite few and limited.
Most of them seem to be bindings for MuPDF, which we will mention later.

After testing, performance does not seem to be much of an issue since we are
primarily doing text extraction. Although milliseconds of processing time should
not be expected here.

### Enter the regex
TBC.

### Parsing the PDF content

Finding the right library for this has been tricky. MuPDF is great and has a
large feature set, however it falls short with very large compilation times
and a large set of dependencies my tool does not need.

### Compiling Python

Python is not usually compiled to an executable. Some of the
reasons I wanted to implement binaries include:

- Distributable
- Relatively painless setup
- One-file
- Potential future integrations with package managers

Cython, PyInstaller and Nuitka were considered for this purpose. Nuitka was chosen
as it compiled fully to binary, not just bytecode or an intermediate format.
It was also much easier to set up Continuous Integration for with the use of GitHub
Actions to automatically build the binaries on a tagged release.

The final executable size may be larger, but the compiler is able to avoid
requiring platform specific dependencies and "just work". Further testing would
be required, albeit initial testing suggests that it should work on Windows 11,
Arch and Fedora based systems (both are Linux distributions).

## Credits

- [LibreOffice](https://www.libreoffice.org/)
- [Pandoc](https://www.libreoffice.org/)

<!-- ## Conclusion -->
[^1]: Minimum Viable Product
