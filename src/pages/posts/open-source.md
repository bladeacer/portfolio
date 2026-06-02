---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Open Source"
pubDate: 10/10/2025
status: "Draft"
description: "A bit more nuanced than code made freely available"
author: "bladeacer"
tags: ["open-source", "programming"]
---


WIP.

<!-- Themes: Community, AI Usage, user expectations etc. -->

<!-- Yap about low effort AI contributions, open source governance (BDFL vs committee etc). -->

## Foreword

I have been contemplating writing the post for a while now.
I hope the information here can be useful to you, especially if you are
contemplating on whether to contribute to open source yourself.

## Why open source?

### Useful software for all

`ffmpeg` used in streaming backends, `curl` installed on millions of production
servers, `git` being the de facto version control software developers use.

I can probably list more examples, though there are probably even more that
neither you or I have heard of.

<!-- ### Alternatives to commercial products -->


### Open source benefits everyone

There is inexplicable joy in sharing code with others, as well as using software
that fits one's use case as an end user.

## On Software Licensing

Before going into licenses, note that: **I am not a Lawyer, this is not legal advice.**

Open source licenses are generally permissive in usage and redistribution.
Here are some of the more commonly used licenses with things to note on each:

- MIT/Apache-2.0 licenses
  - Permissive licenses

- Mozilla Public License
  - Copyleft license

- GPL family of licenses:
  - Copyleft license
  - Requires redistribution of source code in the same GPL license
  - "GPLv2" and "GPLv3 or later" are the most commonly used variants.
  - Variants include the less strict LGPL, the more strict AGPL (patches GPL
loophole of SaaS/web usage without redistribution of source code).

- Unlicense
  - Authors dedicate their work to the public domain

No matter the license, they generally achieve the following
(*unless otherwise stated* by the license itself):

- No liability clauses (e.g. no warranty/fitness for use for a particular purpose)
- Define how and to what extent the end user can distribute, modify or use the software.
- Implicity require attribution to the original author and project name

<!-- ### Open source vs source available -->

<!-- ### Open source is a great way to learn -->

<!-- Open source projects are often used as a learning tool. -->

<!-- - Learning new languages/frameworks/technologies -->
<!-- - Learning how to use existing tools and libraries -->
<!-- - Learning how to contribute to open source projects -->
<!-- - Learning how to work with other developers -->
<!-- ### Competition fosters innovation -->

### Mitigating supply chain risk

There have been plenty of targeted cyber attacks carried out using either
malicious dependencies, or critical CVEs/zero-days which may affect many projects

This is why it is important to lock software dependencies to a known working
version. Future major updates upstream might break API definitions or rename
interface call methods.
> Yes, this is very possible even with conventional semantic versioning

Vendoring dependencies is a great option when:
- the software is in production or is mission critical
- the software dependency is known to make backwards incompatible changes between
major updates (quite often the case)

or the code relies on specific API quirks or a target dependency version.

---

<!-- 

"Competition fosters innovation" (well somewhat) 

Whether between 

or between open source projects (nvim features encouraging vim to improve alongside it)
-->

<!-- ### Why open source: End user -->

<!-- ### Why open source: Developers -->

<!-- ## Open Source is free, for the end user -->

<!-- ### On Maintainers -->

<!-- ### On Contributors -->

<!-- ## On Gatekeeping -->
<!-- How easy should it be for an end user to contribute code? -->

<!-- ## Tech Stack and Design Decision -->
<!-- Some nitpick on others' tech stack, choices and reasons for not implementing -->
<!-- some feature. -->

<!-- ## Licensing woes -->

<!-- ## AI Usage in Open Source -->

<!-- ## Credits -->

<!-- ## Conclusion -->
