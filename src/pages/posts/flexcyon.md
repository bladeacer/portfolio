---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Flexcyon"
pubDate: 09/01/2025
status: "Completed"
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

### The Beginning

I made the Discord thread about my theme on *9 Feb 2025*. However, when I
actually started this developing this theme was much earlier.
The first commit was on **5 Sep 2024**.

> I spent the first 6 months on and off trying to create a basic
> working version of this theme.

It may have taken me a while, but it was definitely worth it.

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

[Halcyon](https://halcyon-theme.netlify.app/) was great but was *a bit
saturated* for my taste.

[Flexoki](https://stephango.com/flexoki) was really neat with its **inky
aesthetics**, but sometimes colours felt out of place for me.

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

> As much as I wish I could, I did not just throw everything into an online
> CSS colour mixer and call it a day. Some colours had to be *manually tweaked*.

### Performance
Performance for this theme may not always be the best, but most of the time
a simple app reload after changing Style Settings configuration should fix the
issue.

As much as I try to avoid using CSS selectors which hurt performance, they
are sometimes *a necessary evil*.

> Style Settings itself also has the funny quirk of not unloading specific
> Style Settings options when you switch between different styles.

### Passion Project

Flexcyon has and always will be a passion project for me to build the theme
I am comfortable with daily driving and features I enjoy. Customisation may
feel like anti-productivity at some point, but if this theme **sparks joy**
for you then I have achieved what I set out to do.

### Current State

As for the state of the theme now, I personally think that it is almost done.
I have added nearly all the features and ideas I can come up with.

> Most of the better ideas actually came directly from the wonderful community
> of on the Obsidian Members' Group Discord.

___

## Design Principles

### Font Agnostic

The overall aesthetics of the theme are *terminal inspired*, but should look
fine no matter your chosen font. This is due to the font agnostic nature of
the theme itself. I also do not wish to go down the path of forcing a certain
font on the user. If they want a font, they should **install it themselves**.

### Love Letter

This theme is a love letter to the Obsidian.md community.
They have been really supportive and helpful, whether it was personal knowledge
management or CSS snippets.

The naming of the theme is somewhat silly. `flex` from `flexoki` and
`cyon` from `halcyon`. However, I made the theme as a love letter tribute to
these great themes and colour schemes.

### EXtensible

Flexcyon officially supports a number of plugins. "Official support" means that,
I as the developer have used said plugin at some point and have styled said plugins
to better fit the theme's aesthetics.

[View the documentation](https://flexcyon.github.io/docs-en/README/page-3/) on
which plugins are supported. Most plugins not directly styled by my theme should
look fine. If not, feel free to 
[open an issue](https://github.com/bladeacer/flexcyon/issues) or comment in the
documentation.

### Creative
Adding customisable **ASCII art to new tabs**, setting callout and note background,
hide until hover status bar, writing mode. Setting text font weight, vertical
alignment and extended colour palette tweaks within callouts.

Speaking of which, callout metadata utilities in general follow a syntax similar
to Tailwind CSS. You can combine the callout metadata to something like
`>[!info|title-purple-cyan bg-transparent rtl-content]`.

> This translates to "set the title to the extended colour palette mix of purple
> and cyan, the callout background colour to transparent and the vertical alignment
> of the callout content to right-to-left.
>
> There are perhaps more complicated examples out there, but I hope this can show
> the callout metadata can be used together

These are some of the many niche uses the theme covers.

### Yours to Customise

I made the theme itself with customisation in mind. There is about over **240
Style Settings options** when I last checked. Source:
`rg --count-matches 'default:'` on my theme's root directory.

Some other features I have yet to mentioned include workspace layouts.
There is a TUI (Terminal User Interface) add on to the *Cards Layout*,
a *Powerlevel10k inspired layout*, and an *Angled layout*
(UI elements are tilted).

Each layout generally has an equivalent status bar style.

There are also some icons sets (mostly in ASCII characters):
- Smiley Icons
- ASCII Icon Set
- ASCII checkboxes
- Clip Path checkboxes

I think you get the idea that you can really customise my theme :D

### Not Perfect
I am working on and maintaining this theme in my own free time, so there may be
some UI bug with a specific plugin. Some stylistic choices may not be everyone's
preference as well.

Theming is a rather subjective thing, and perfection is basically impossible to
achieve or measure. I could style every pixel and detail of the theme perfectly,
but that would take me years.

#### About: Flex Max

There is a "reasonably opinionated"[^4] mode called Flex Max for users just starting
out.

> For further customisation of the theme, I recommend disabling this mode and
> selecting the options you like with help from the documentation.

### Opacity Oriented

I personally found that dimming inactive navigation items, tabs and other
information not immediately useful helps[^5]. It reduces visual fatigue in the
long run (at least for myself).

___

## Credits

This theme would not be possible without the work of many CSS wizards
in the community, and the users who have suggested features.

See the
[credits section of the theme's documentation](https://flexcyon.github.io/docs-en/credits/)
for specifics.

> Snippets and stylistic ideas have been heavily inspired by the following themes:
>
> - [Flexoki](https://github.com/kepano/flexoki-obsidian)
> - [Halcyon](https://github.com/dbarenholz/halcyon-obsidian)
> - [Origami](https://github.com/7368697661/Origami)
> - [Shimmering Focus](https://github.com/chrisgrieser/shimmering-focus)
> - [Fancy-a-Story](https://github.com/ElsaTam/obsidian-fancy-a-story)

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
[^5]: So called "opacity oriented".
