---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Unix"
pubDate: 09/11/2025
status: "Completed"
description: "The software philosophy."
author: "bladeacer"
tags: ["linux", "gnu", "os", "unix"]
---

## Foreword
UNIX can mean a lot of things to different people, but I believe that there is
quite a bit I have learnt from it. It can refer to the suite of operating
systems, though that will not be the focus of this post. UNIX has a good bit of
lore that deserves its own post.

## Links
- [Wikipedia on the Unix operating systems](https://en.wikipedia.org/wiki/Unix)
- [Wikipedia on the Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy)
- [Wikipedia on Software Bloat](https://en.wikipedia.org/wiki/Software_bloat)
- [Wikipedia on FFmpeg](https://en.wikipedia.org/wiki/FFmpeg)

## The Software Philosophy
UNIX as a software philosophy encourages minimalist and modular software.
"Minimalist" not in the sense of lacking features, but rather **fully
understanding** the niche one wants their software to cater to.

Specifically[^1]:

1. Make each programmes do *one thing well*. To do a new job, **build afresh**
rather than complicate old programmes by adding new "features".

2. Expect the output of every programme to **become the input to another**, as yet
unknown, programme. Don't clutter output with extraneous information.
Avoid stringently columnar or binary input formats. Don't insist on interactive input.

3. Design and build software, even operating systems, to be tried early, ideally
within weeks. Don't hesitate to throw away the clumsy parts and rebuild them.

4. Use tools in preference to unskilled help to lighten a programming task, even
if you have to detour to build the tools and expect to throw some of them out after
you've finished using them.

> How applicable this philosophy is today depends very much on how your
> interpret it. Most of us would not have the luxury to "build operating
> systems within weeks".

### The Evergreen Ideas
1. Write programmes that one thing and do it well.

2. Write programmes that work together.

3. Write programmes to handle text streams, because that is a universal interface.

For context, this was written after Linux came out. Linux itself is Unix-like, hence
attracting those which largely agreed to these views to write software for Linux.
In addition, I feel that these ideas also contributed to the large ecosystem of libraries
and packages in popular programming languages, most of which are free or open source.

Writing software with a specific purpose and general enough use case in mind helps.
You would not be the only one using the software, but other developers would appreciate
that you took the effort to make your outputs sane. This helps in the long run with
other software integrating your own.

> For example, there is basically an uncountable amount of software depending on
> `ffmpeg`'s existence. FFmpeg helps you handle video and audio files formats.
> You can find it used in media players like VLC or processing logic for YouTube.
>
> 'Another example would be the ubiquitous `curl`.

## On software bloat
With how software development has evolved over time, the line between what
is "bloat" and what is "essential" is increasingly blurred. Programmes like
[vim](/portfolio/posts/vim#why-this-key-bind-for-that-motion) used to be
considered "bloated". Nowadays, we have widely used programmes going over
**gigabytes like nothing**.

We have come a long way with hardware capabilities. However, it should
not be the case where developers expect users to have better hardware.
Developers should **be realistic** about the hardware specifications a typical
user of their software can have access to.

### Is it that bad?
This still begs the question: why is bloat a bad thing, if the users themselves
can live with it? A larger codebase as it turns out makes it more tedious for
developers to:
- Manage dependencies
- Introduce new features without making overtly breaking changes
- Finding and fixing software vulnerabilities

It also does not help that plenty of well established FOSS software have codebases
which are extremely difficult to decipher other to their core contributors.
> E.g. the [Visual Studio Code codebase](https://github.com/microsoft/vscode)

## Credits
Credits to Ken Thompson, Dennis Ritchie; inventors of UNIX and the C
programming language. Without them, the world of programming as we know it
would be very different.

## Conclusion
The original UNIX software philosophy may feel dated today, though it has lived on
especially in the eyes of Linux users and software developers. These set of
ideas[^2] have lasted from the UNIX days till now for good reason. It encourages
the kind of healthy software ecosystem that can be found today.

Even the older UNIX and GNU software still hold up today. The practicality and
versatility of such software is so great there is incentive
to have them or their derivatives ported over to Windows.
> E.g. there are efforts to add `sudo` to Windows[^3]

To end off, I feel that this quote sums up the appeal of the UNIX philosophy well.
"The power of a system comes more from the relationships among programmes than
from the programmes themselves"[^4]

[^1]: Doug McIlroy; E. N. Pinson; B. A. Tague (8 July 1978). "Unix Time-Sharing System: Foreword". The Bell System Technical Journal. Bell Laboratories: 1902–1903.
[^2]: Summarized by Peter H. Salus in A Quarter-Century of Unix (1994)
[^3]: [sudo for Windows](https://learn.microsoft.com/en-us/windows/advanced-settings/sudo/)
[^4]: Kernighan, Brian W. Pike, Rob. The UNIX Programming Environment. 1984.
