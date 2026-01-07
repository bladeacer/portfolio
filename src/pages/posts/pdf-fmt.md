---
layout: ../../layouts/MarkdownPostLayout.astro
title: "pdf-fmt"
pubDate: 10/24/2025
status: "Completed"
description: "A small Python script to extract and format text content from PDF files, with filter rules and other niceties."
author: "bladeacer"
tags: ["python", "pdf", "pdf-text-extraction", "programming", "scripting"]
---

## Foreword

pdf-fmt is a PDF text extraction utility. It supports features like regex based
filtering and document format conversion (via LibreOffice or pandoc).

### Project Status

The project is currently under active development. However, there is an MVP[^1]
executable and script installer. The script installer at the main branch might
not work at the moment, as I am in the process of rewriting the parser.

I plan to continue working on it, although development might be slow as I am in
the process of rewriting the parser to `pdfplumber` instead of `pdfminer.six`.
Technicalities are discussed below, and I will update this post once the rewrite
is complete.

## Links

- [GitHub repository](https://github.com/bladeacer/pdf-fmt)
- [Built executables](https://github.com/bladeacer/pdf-fmt/releases/latest)

## Screenshots

![pdf-fmt on a sample PDF](/portfolio/pdf-fmt-preview.png)

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
would be much better solved with an OCR. Not just any OCR, but picking one that targets
my own use case. For example, some OCRs are much better at figuring out table content
than others are at diagrams and mathematical equations written in LaTeX or some
other typesetting software.

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

For example, Docker and micro-services is well known to be handled well by the
Go programming language and its ecosystem. Python's main appeal for our purpose of
PDF text extraction was simply the large plethora of related libraries already
out there.

While languages like Rust and Go may have some PDF related libraries, but they
are quite few and limited.
Most of them seem to be bindings for MuPDF, which we will mention later.

#### What about performance?

After testing, performance does not seem to be much of an issue since we are
primarily doing text extraction. Although some milliseconds of processing time should
not be expected here. It will also not be "blazingly fast" like a Rust or Go binary,
though no matter the language there is always a way to write non performant code.

Python also happens to be easier to install and is more compatible with almost
every platform or architecture that is used out there, which is a trade off I am
willing to make at the cost of some performance. This will also be mentioned later.

If you are interested, there is a configuration option for the number of CPU cores
one can use when performing text extraction. After all, text extraction via a Python
library has been becoming more of an I/O bound operation if you maximise the CPU
cores you use. Very large files with complex layouts are also naturally going to
take longer to be processed.

### Enter the regex

The use of regular expressions is a recurring theme in a project like this.
Regular expressions and loading specific parts of the configuration schema has
allowed me to add logic targeting specific formatting and filtering utilities.

tldr; these are some of the configuration options you can customise

- Regex for allowed characters (Use case: Discard random Unicode characters in
the output)
- Additional list of target "footer regex" (Use case: Remove repetitive module
codes, footer content from output)
- Locale linting (e.g. `en-US` or `en-UK`, you can ignore specific locale strings)
- Output formatting options like minimum and maximum number of characters per line
(terminal/pager contexts), a configurable page separator (useful for Markdown)

> For the full list of available configuration options, you can [view them on GitHub](https://github.com/bladeacer/pdf-fmt/blob/main/pdf-fmt.yaml).

### What can I do with the software?

Currently, `pdf-fmt` lets you either copy the output to your system clipboard
or write to a target file. I mostly use it to get quick text dumps from my
lecture notes. The formatting could be better albeit with [Vim motions](/portfolio/posts/vim)
and the niceties the configuration schema it has been more manageable.

You can also make use of LibreOffice or Pandoc's Command Line Interface (CLI) to
have `pdf-fmt` convert
document formats like `.pptx` to `.pdf` at runtime before text extraction. These
two were chosen as both are useful software in their own right and already have
the existing robust capabilities for format conversion in built.[^2]

There are also plans to add image extraction capabilities, which is currently in
development. Image extraction was tested to be working before the parser rewrite.

### Parsing the PDF content

Speaking of the parser, finding the right library for parsing and extracting
text content has been tricky.
PyMuPDF is great and has a large feature set, however it falls short with very
large compilation times[^3] and plenty of dependencies my tool does not need.

The Lichess developer has a [great blog post on this](https://lichess.org/@/thibault/blog/we-dont-want-all-the-features/q3nOzv4n).
Dependencies and libraries added without consideration on maintenance or utility
will only add up technical debt and bloat in the long run.
`pdfminer.six` is a really nice basis, although having to delve into lower level
parts of the library to configure the format of the extracted images' filename was
not the most intuitive. It also has very nice utility with extracting tables, though
on the whole the developer experience was good.

`pdfplumber` seems to have taken the best parts of `pdfminer.six` and added
direct methods and other quality of life improvements to it.

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
requiring platform specific dependencies and "just work" out of the box. Further
testing would be required, albeit initial testing[^4] suggests that it should work
on Windows 11, Arch and Fedora based systems (both are Linux distributions).

## Credits

This side project of mine is built on the shoulder of giants. I have immense
gratitude to the existing ecosystem of tools, dependencies and sources of
inspiration, as well as tools like LibreOffice and Pandoc which integrate seamlessly.

Without them, this would not be possible.

- [LibreOffice](https://www.libreoffice.org/)
- [Pandoc](https://pandoc.org/)
- [Lichess' developer thibault - We don't want all the features](https://lichess.org/@/thibault/blog/we-dont-want-all-the-features/q3nOzv4n)
- [pdfplumber](https://github.com/jsvine/pdfplumber)
- [pdfminer.six](https://github.com/pdfminer/pdfminer.six)
- [PyMuPDF](https://github.com/pymupdf/PyMuPDF)
- [BentoPDF](https://github.com/alam00000/bentopdf)
- My friends Floodlight and Potato for testing the project

## Conclusion

I hope that by going through and explaining the decisions I made when writing
the code, that you can be inspired to work on something you find meaningful.
Not everything needs to be a perfect SaaS, though you need to know who you are
making the software for. It would be yourself first, then the target audience
of your niche would come in as a community to see the project through with you.

> To end off, I find that good software is timeless[^5], nuanced and user centric.

[^1]: Minimum Viable Product
[^2]: Pandoc is like `ffmpeg`, but for documents instead of media and audio formats. LibreOffice has its own CLI for converting between Word documents and other related file formats.
[^3]: My theory is that it has to do with Nuitka expecting user provided libraries to be purely Python, being a library that compiles *Python* code. Since PyMuPDF embeds MuPDF under the hood where the latter is written in C, one can probably expect long compilation times.
Compilation time and binary size might be a sane trade-off for some, unfortunately I do not really need the bells and whistles that it comes with.
[^4]: Shout out to my friends Floodlight and Potato for testing the project
[^5]: Stuff like `vim` or UNIX utilities that would probably outlive both you and I.
