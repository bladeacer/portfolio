---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Python"
pubDate: 10/10/2025
status: "Draft"
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
of the programming language in my work.

## What Python excels at

### Being Concise

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

<!-- ## Screenshots -->

<!-- ## Links -->

<!-- ## Credits -->

<!-- ## Conclusion -->

[^1]: I took this from the official site's example code snippets, specifically the first example.
[^2]: For more on Fibonacci, you can read the [Wikipedia article](https://en.wikipedia.org/wiki/Fibonacci_sequence).
[^3]: Depending on the coding style enforced, explicitly assigning on each line might be better.
[^4]: If my memory serves me, the default would be adding a new line after each print statement.
