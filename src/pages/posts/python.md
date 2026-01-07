---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Python"
pubDate: 10/10/2025
status: "Completed"
description: "The versatile programming language"
author: "bladeacer"
tags: ["python", "programming", "prolang", "scripting"]
---

## Foreword

Python is perhaps one of the most famous programming languages out there.

To quote [`python.org`](https://python.org), the official site for the language itself:

> "Python is a programming language that lets you work quickly and integrate
> systems more effectively."

I hope that after reading this post, you would better understand how I make use
of the programming language in my work, such as in [pdf-fmt](/portfolio/posts/python).

Disclaimer: I am by no means an "expert", there are those who are far more knowledgeable
on the matter than I am. This is a culmination of my personal opinion and experience
with the programming language I happen to use the most (as of January 2026).

## What Python excels at

Here are some things Python excels at.

## Being Concise

Python is a programming language where you can write code that is rather succinct.

```python
def fib(n):
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a + b
    print()
```

This prints numbers up to 1000[^1] in the Fibonacci Series[^2].

Even if I do not really know Python syntax, I still can somewhat
understand what the code is trying to do.

### Explaining the Fibonacci code snippet

1. A function `fib(n)` is defined
2. `a` and `b` are assigned values `0` and `1` respectively[^3]
3. A chunk of code is reassigning and printing stuff

* There is a `while` condition where `a` is required to be less than `n`
* The `print()` function *prints* stuff we specify (in this case the current
  value of `a`) to the console.
* We pass the value of `' '` to the `end` parameter. This is to tell Python to
a single space after each printed number.[^4]

## Not too opinionated on syntax

I say this not as a bad thing, but rather something that is nice to have for
most of us which have learnt Python as our first programming language.

C is objectively a better language for understanding computers, though the
lack of static typing and indentation has made Python more resemble "English"
or psuedo-code at some point. The setup and "on-boarding" process to start
learning Python is relatively simple[^5]

You have multiple ways to write an `if else`, whether with the normal syntax,
the "one-liner" syntax, `switch case` or other alternatives. You can write
object oriented code like in Java or C#, but you can also write code which is C
or Go styled with the extensive use of functions.

It leaves that up to the programmer, which will have changing preferences and habits
in how they write the code. They could have found a design pattern or system to organise
their source code that stuck with them, which they then bring to other programming
languages.

## Evolving Developer experience

Developer experience in Python has always been a bit of a mixed bag. There are
things I hope can be better, though the same can be said for every language.

We have gone from `requirements.txt` and `setup.py` to `conda`, and more recently
`pyproject.toml` with `uv`. Changes which are to be expected as the community comes
together and collectively decide the standards and improvements they want.

Testing frameworks and linters for the same programming language have come and gone,
it is a testimony to both the willingness to try new things and the ability to adapt
in a way.

> This has mostly been positive for me, which is why it is in this section.

## Having a well established ecosystem

Tooling and PEP standard[^6] changes aside, there is a Python package for almost
**anything you can imagine**. I believe the numbers show it better than me on this.

| Statistic | Value |
| --- | --- |
| Projects | 721 693 |
| Releases | 7 866 639 |
| Files | 16 717 367 |
| Users | 994 741 |

> Statistics as of 7 January 2026, around 21 00 hours (GMT+8).

In short, you can use Python for web services (`flask`, `fastapi`, `django`), building
games (`pygame`), PDF content extraction, AI, machine learning and many other stuff.
Having a library or existing tooling to work on almost any use case one can
think of is a luxury, which I think only it and JavaScript have.

### Note on versioning

Numbers aside, Python has been out since the 90s. The major semantic version (SemVer)
has been bumped at least thrice (most are on Python 3 now), Python 2.7's End of
Life was in 2019.

tldr; Semantic Versioning is the industry standard for versioning software properly.
> However, there are cases where versioning is used more liberally or with
> variants. For example, website like this which are continually deployed and
> updated like this one. When only the latest version of software is considered without
> backwards compatibility in mind, versioning tends to be much less of a headache.

What I mean here is that a version number for this site is much less meaningful
than something like iOS 26. One is a mere snapshot in time or version control
for a personal site, the other has to support that version for millions of
iPhone users for some number of years.

## Credits

Sources which made this post possible.

* [W3Schools' Python tutorial](https://www.w3schools.com/python/)
* [Python Software Foundation](https://www.python.org/)
* [Python Package Index](https://pypi.org/)
* [Python Enhancement Proposals](https://peps.python.org/)
* [Python Developer's Guide - Status of Python Versions](https://devguide.python.org/versions/#full-chart)
* [Wikipedia on Python](https://en.wikipedia.org/wiki/Python_(programming_language))
* [Semantic Versioning](https://semver.org/)

## Conclusion

I probably have more to add to this as I learn more about the language itself.
However, I think this is sufficient from me for now.

[^1]: I took this from the official site's example code snippets, specifically the first example.
[^2]: For more on Fibonacci, you can read the [Wikipedia article](https://en.wikipedia.org/wiki/Fibonacci_sequence).
[^3]: Depending on the coding style enforced, explicitly assigning on each line might be better.
[^4]: If my memory serves me, the default would be adding a new line after each print statement.
[^5]: Perhaps compared to installing C++ Build Tools for Rust/`chromadb` on Windows. Granted WSL2 is quite usable, not without its own quirks.
[^6]: Python Enhancement Proposals, I think we are at the 800s or so range at this point.
