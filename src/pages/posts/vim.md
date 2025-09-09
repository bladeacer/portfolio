---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Vim"
pubDate: 09/06/2025
status: "Completed"
description: "A text editor that works well for me."
author: "bladeacer"
tags: ["text-editor", "vim", "vim-motions", "unix"]
---

## Foreword
It has been about a year since I started using *Vim motions*.
As for using the text editor itself, I have been using it for almost **6 months**
at this point.

This `text editor` has changed quite a bit about me. I hope that after reading this
post, you might be interested to try it out and see if you like it. This article
was written using Vim.

Vim as a text editor is very much **"acquired taste"**, in that those that do enjoy
it only do so after using it for a while.

> In short, Vim as a CLI[^1] centric text editor is not for everyone.
> However, those that do end up liking it really embrace it.
>
> There is also the banter between `vi > vim > nvim` users and `emacs` users[^2].

## Links
- [Vim's Official Site](https://www.vim.org/)

## Screenshots
![This post opened in Vim](/portfolio/vim.png)

Here is a screenshot of this exact post within Vim, with the vim fzf
integration plugin opened as a popup to render a fuzzy finder from the user's
history of opened files.

## Why Vim?
As intimidating as a command line text editor may sound, here are some of the
pros that it has. Vim itself is a rather tried and tested piece of software,
having been used in numerous production servers. It also starts almost instantly.

### Typing at the speed of thought
When one is used to [Vim Motions](#vim-vs-vim-motions), they can precisely type out
the exact text manipulation they wish to perform.

For example, you can paste the same chunk of text 20 times with `20p`.
`p` here refers to the paste motion, and `20` is you telling Vim to perform said
motion (pasting text) 20 times.

There are probably more elegant examples of this, but this happened to be the
one I thought of.

### Modal editor
Vim is text editor with different modes.
- `NORMAL` mode is where the motions for navigating and manipulating text are typed.

- `INSERT` mode is like the normal state
of other text editors where you can type stuff as expected.

- `COMMAND` mode is where you type commands

- Other modes including, `REPLACE`, `VISUAL`, `VISUAL BLOCK`, `VISUAL LINE`

There a section on [using these modes together](#using-the-different-modes).

This primarily helps with separation of concerns, which also means a single key
bind can do different things in each mode.

> For example:
> y in Insert mode just types the literal character into the file
>
> y in Normal mode is used for copying text.
>
> Variants could include yw (yank to end of current word),
> yi" (yank text inside quotation marks), yy (yank whole line)
> and y$ (yank to end of line)
>
> y in the Visual modes and their variants just copies the selected text chunk


### Ergonomics
Vim is designed primarily with the `QWERTY` keyboard layout in mind. Plenty of
the motion keys are placed on or near the home row. Personally, it has got me to
be more acquainted with the keys on the right side of the keyboard more.

This has helped me type slightly faster, because the muscle memory means I can somewhat
touch type when needed.

> If you are using an alternate keyboard layout like Dvorak or that of another language.
>
> Be prepared to either remap half your keys or be able to switch keyboard
> layouts quickly when performing vim motions.

### Customisation
Speaking of remapping keybinds, vim has its own VimScript for customising the
`.vimrc` file.

Here is a non-exhaustive list of what you can customise in said configuration file:

- Plugins (pick your own plugin manager and set of plugins)
  - E.g. Status bar, text completion, focus mode and many others.

- Auto Commands (text expansion snippets, useful for correcting typos)

- Remapping existing shortcuts/motions

- Mapping new shortcuts/motions
  - E.g. centering the screen after navigating

- Other editor settings
  - character set used (generally UTF-8)
  - syntax highlighting
  - theme, colour scheme
  - font used
  - clipboard registers to use (varies between UNIX and Windows)

### UNIX Software Philosophy
Vim excels at one specific thing: being a text editor. Its command line based nature
and basically universal availability on UNIX devices means that various other command
line applications have built integrations around it.

> It also happens to be much more flexible and extensible than GUI text editors.

The universal availability means that it (or its predecessor `vi`) would be
available whenever you SSH into a remote server, on your UNIX (Linux and Mac) or
even Windows.

My favourite integration with Vim has to be `fzf`, a general purpose command
line fuzzy finder. I would love to go into detail about it, but `fzf` deserves
it own post.

___

## Vim vs Vim Motions
Vim is the text editor derived from `vi` and `ed`, two of the first text editors.
The name Vim comes from "Vi IMproved", which was what
[Bram Moolenaar](https://en.wikipedia.org/wiki/Bram_Moolenaar) set out to do
all those years ago. He may have passed on, but the legacy of his text editor
will continue to live on.

Vim motions are the commands associated with a modal editor like Vim.
You can find plenty an emulation of Vim Motions in popular text editors like
VS Code, but there are differences between using Vim Motions in another text
editor and using vim itself.[^4]

However, they are made with the same underlying principles.

### Why this key bind for that motion?
Vim itself followed along with the evolution of keyboards. It used to be
considered bloated a long time ago, but is now unimaginably light compared to
some software out there.

This also means that the motions had to be concise and clearly represent what
they did.

E.g. `p` Pasting `y`: Yanking `c`: Change `d`: Delete and so on...

### Example of Vim Motions
Here an example of vim motions.

> h - Vim's equivalent of the left arrow key
>
> j - Vim's equivalent of the down arrow key
>
> k - Vim's equivalent of the up arrow key
>
> l - Vim's equivalent of the right arrow key
>
> { - Navigate up an entire text block
>
> } - Navigate down an entire text block

By default, you still can use the arrow keys and mouse on modern versions of vim.

However, overtly relying on the "non-Vim" way of navigating text sort of defeats
the purpose of using vim in the first place.

## Using the different modes
Here is an example of using the different modes together.

1. One types their text as usual in Insert mode.

### Deleting a character
2. When there a typo, one can press the `Esc` key to enter normal mode. They
can then navigate to the said typo character and delete it with `x`.

### Copying selected text
3. They then want to select multiple lines to copy. They can do so in normal mode
with `V` to enter `VISUAL LINE` mode. They can then use `j, k, {, }` to select which
lines they wish to copy.

4. Then the user can choose whether they wish to copy or delete the text chunk selected

    4.1 If the user chooses to delete the text chunk with `d`, they can choose
    to paste it somewhere else later.

    4.2 If the user chooses to copy the text chunk, they can just use `y`.
    `y` is short for yank which just mean copying the text.

5. After said operation, the user can navigate to some other line in the file
and paste said content with `p`.

### Navigating cursor
6. The user then can navigate to where their cursor was previously with `Ctrl O`
to return to the original line of text they were editing.

### Search and replace
7. Now the user realised they misspelt a phrase multiple times without realising.
They can press `Esc` if they are not already in normal mode and
type: `:%s/registrs/registers/gc`.

    7.1 `:%s` is the string search and replace command.

    7.2 `registrs` is the target string to replace. In this case, it is our typo.

    7.3 `registers` is the target string we will replace our typo string with.

    7.4 `gc` is telling vim to perform this search and replace globally
    (within the whole file), and `c` is to ask the user for confirmation on each
    replacement occurrence. This means you can *selectively search and replace*.

    7.5 It supports regular expressions too :D

### Undoing changes
8. The user then accidentally deletes too many a line. They can undo this edit by
using `u`. They can also use `Ctrl R` to redo a change.

9. Then, they can save their changes with `:w` and exit the file with `:q`.

    9.1 Much like other vim motions, the user can choose to chain/combine them
    with `:wq`.

### About yank registers
In Vim,
**yanking and deleting sends the copied text content to the same buffer**
[^3]. This applies whether you delete or yank a single character, a word or a
whole paragraph.

Do note that for certain Linux distributions, you would need to install `gvim`
instead for system clipboard support.

### About buffers
`Ctrl O` also helps you quickly navigate to a previous buffer of vim if you do
open multiple buffers at the same time. A buffer is just an instance of vim
currently opened. In each instance, you can have different files opened.

Vim also has tabs and sessions, although they are separate concepts.

### Motions have inverses
Some motions have inverses.

The `p` motion by default pastes text below the current line the user's cursor
is at. To do the opposite, the user can use `P` instead.

As for `Y`, it acts as a shorthand for `yy`, which means yanking the current line.

## All roads lead to Rome
Like the earlier examples, there are many different ways you can edit text and
navigate files.

- One may prefer to navigate to line 20 by using `:20`.

- Another might use `gg19j` (go to start of file, meaning line 1, then going
down 19 lines).

- Another might remember text content on line 20 and just search the file for it.

For example, I can search for the string "acquired" in this blog post within Vim
with `/acquired`.

## Credits
- [Bram Moolenaar, creator of Vim](https://www.moolenaar.net/)
- Various tech YouTubers and online articles from which I discovered Vim

## Conclusion
I hope that I have not bored you to death with the specifics of Vim.
My experience with it has been really enjoyable, and I hope that you would enjoy
it too.

> Spoiler alert: It takes *a while* to get used to.

[^1]: Short for Command Line Interface.
[^2]: See [this Wikipedia article on the editor rivalry](https://en.wikipedia.org/wiki/Editor_war).
[^3]: Or registers.
[^4]: Mostly when certain keyboard shortcuts clash between the host text editor and Vim emulation.
