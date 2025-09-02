---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Flexcyon"
pubDate: 09/01/2025
status: "Draft"
description: "An Obsidian.md theme combining the colour schemes of Halcyon and Flexoki."
author: "bladeacer"
tags: ["obsidian.md", "theme", "css", "scss"]
---

## Foreword
When I first started using [Obsidian](https://obsidian.md/), I went down the
rabbit hole of customisation, CSS snippets and all. There were plenty a
useful snippet, but not many themes integrated the snippets I liked.

## Links
- [GitHub Repository](https://github.com/bladeacer/flexcyon)
- [Original Reddit Post](https://www.reddit.com/r/ObsidianMD/comments/1n2gctr/flexcyon_10_a_theme_i_daily_drive/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
- [English Documentation](https://flexcyon.github.io/docs-en/)
- [中文文档](https://flexcyon.github.io/docs-en/zh/)

## Screenshots

![Dark mode thumbnail](/portfolio/dark_thumb.webp)

Here is a preview of some of the features for dark mode.

![Light mode thumbnail](/portfolio/light_thumb.webp)

As well as light mode.

## In Retrospect
Here is me looking back at what I have experienced and learnt while developing
my theme.

### User Experience
The issue was not that there were no customisation options, it was that I had to
choose between too much or too little customisation. With my theme, I hope to
be somewhere in the middle on this spectrum.

It was a very personal choice to make a theme not only geared towards the
fanciful UI found in others, but also placing emphasis on the **UX related
customisations** I have grown to enjoy. I also found that dimming certain UI
elements helped me reduce information overload.

### Niche Features
The theme itself has some niche features like *custom ASCII Art, Vim Mode status,
cursor smoothing, window animations* and the list goes on. Quite a bit of the
source code is also dedicated to providing callout metadata providers.

These range from letting you change font weight to vertical alignment of text
and adding a grid background to your callouts. I can tell you about every other
feature this theme has, but I would be here all day. That is also the purpose of
[the documentation](https://flexcyon.github.io/docs-en/).

tdlr[^1] there is the commonly found Rainbow Folders, colour variable
configuration and other niche features.

### Colours Schemes
There were some existing themes with really great colour schemes, such as
Halcyon and Flexoki.

[Halcyon](https://halcyon-theme.netlify.app/) was great but was a bit
saturated for my taste.

[Flexoki](https://stephango.com/flexoki) was really neat with its inky
aesthetics, but sometimes colours felt out of place for me.

I found myself switching quite a bit between the two themes, hence
a mix of the colours resulted in this colour scheme that you see in
this site.

#### About: Light Theme
At some point during the theme's development, I thought of adding
light mode support to my theme.

I was stuck on this for a while until the [Origami](https://github.com/7368697661/Origami)
theme caught my eye. The rest is history.[^2]

#### About: Originality
I would have loved to make my own colour scheme[^3], but the existing colour schemes
I mentioned were already very *good in their own right*. Objectively good colour
schemes take years upon years of work.

The naming is somewhat silly. `flex` from `flexoki` and `cyon` from `halcyon`.
However, I made the theme as a love letter tribute to these great themes
and colour schemes.

> As much as I wish I could, I did not just throw everything into an online
> CSS colour mixer and call it a day. Some colours had to be *manually tweaked*.

___

## Design Principles

### Font Agnostic
The overall aesthetics of the theme are *terminal inspired*, but should look
fine no matter your chosen font. This is due to the font agnostic nature of
the theme itself. I also do not wish to go down the path of forcing a certain
font on the user. If they want a font, they should **install it themselves**.

### Reasonably Opinionated
There is a "reasonably opinionated"[^4] mode called Flex Max for users just starting
out.

> For further customisation of the theme, I recommend disabling this mode and
> selecting the options you like with help from the documentation.

### Dim UI Elements
I personally found that dimming inactive navigation items, tabs and other
information not immediately useful helps. It reduces visual fatigue in the
long run (at least for myself).

___

## Conclusion
I guess I will leave this article here for now. It is a bit long for a first
post, but I hope that this was a decent read for you. I will not be writing
here frequently, although I may add stuff from time to time into my digital
garden (this site).

[^1]: Short for too long, didn't read.
[^2]: Like the dark theme's "parent" colour scheme Halcyon, I mixed Origami
and Flexoki's colour schemes.
[^3]: I unfortunately have mild [red-green colour vision deficiency](https://en.wikipedia.org/wiki/Congenital_red%E2%80%93green_color_blindness).
[^4]: Somewhat opinionated, actually.
