---
layout: ../../layouts/MarkdownPostLayout.astro
title: "EndeavourOS"
pubDate: 09/08/2025
status: "Completed"
description: "A DIY Linux experience."
author: "bladeacer"
tags: ["linux", "gnu", "os", "pacman", "unix"]
---

## Foreword
Enter Linux, the operating system. Used in basically all supercomputers and
production servers, but does not have the best reputation in the desktop and
home PC market. It has the potential for mass appeal, especially with the
advent of initiatives like SteamOS. Though Linux for now seems to be remaining
on the niche side as far as home or work desktop goes.

## Links
- [EndeavourOS Website](https://endeavouros.com/)
- [EndeavourOS Community Forum](https://forum.endeavouros.com/)
- [Free Software Foundation](https://www.fsf.org/)
- [GNU Software](https://www.gnu.org/software/software.en.html)
- [Linux Kernel Archives](https://www.kernel.org/)

## Screenshots
![Endeavour Desktop](/portfolio/endeavour.png)

Here is a screenshot of my desktop (on a monitor).

### Featured software
- [Cinnamon Desktop Environment](https://en.wikipedia.org/wiki/Cinnamon_(desktop_environment))
  - **Sane defaults**, a familiar interface to users coming from Windows
*Decently customisable*.

- [X.Org Server (X11)](https://en.wikipedia.org/wiki/X.Org_Server)
  - Broader **software compatibility**, especially with `fcitx5 + rime` (Chinese
keyboard input) and Espanso (text expander)

- [fastfetch](https://github.com/fastfetch-cli/fastfetch)
  - `neofetch` but actively maintained which can be **easily customised**.
  - Credits to this [Lain inspired](https://codeberg.org/LainOS/LainOS-ricer-arch)
configuration for the `fastfetch` config

- [cmatrix](https://github.com/abishekvashok/cmatrix)
  - *aesthetic* screensaver, there is also
[pipes.sh](https://github.com/pipeseroni/pipes.sh) for animated pipes instead

- [bottom](https://github.com/ClementTsang/bottom)
  - Cross platform terminal user interface system monitor

- [tmux](https://github.com/tmux/tmux)
  - A terminal multiplexer for managing multiple terminal sessions. `wezterm` is
a good alternative especially on Windows.

- [vim](https://github.com/vim/vim)
  - A text editor [that works well for me](./vim). Has a bit of a learning curve.

- [alacritty](https://alacritty.org/)
  - A cross platform terminal emulator which is extensible with good performance.

The above list is `non-exhaustive`, it is more of a list of software which has
greatly improved my experience on Linux. Most of the software chosen was **cross
platform**, as I started working on configuration before making the switch from
*Windows to Linux*.

### My configuration files
My configuration files (or *dotfiles*) are a constant work in progress. You can
find them over at [this repository](https://github.com/bladeacer/my_dotfiles).

This repository includes configuration files for the software mentioned above
like `vim`, `tmux` and `fastfetch`.

## GNU Linux
Linux itself, technically speak refers to the Linux kernel by Linus Torvalds.
This is why there are "distributions" of Linux with the relevant package manager
and/or software bundled together.

The operating system itself that we come to know as "Linux", actually comprises
a large collection of free GNU software[^1]. For example, just the kernel without
GRUB or any other bootloader would not be usable. Nor would users be able to
mount their file systems, have a desktop environment and the other things that
might be taken for granted in other operating systems.

> GNU Software itself is under the Free Software Foundation (FSF), which is a
> non-profit organisation which supports the free software movement
> with its preference that software be distributed under copyleft terms.

## Why Linux?
This begs the question - why Linux? Linux itself has some benefits and features
that would be difficult to come by in other operating systems.

### Lighter Binaries
Unlike Windows' `.exe` and `.dll` executable file formats. Linux makes use of system
binaries like `glibc` and `make` for compiling and handling executable calls. MacOS's
`dmg` file format also has slightly more overhead.

For example, `git` on Unix is less than a single megabyte. However, it is over
200 MB on Windows. This includes the bundled binaries and compatibility layer,
but the reliance on system binaries for compilation and executing certain instructions
means some software would never be officially supported on Linux.

Operating system updates might also break certain legacy software's reliance on
a specific version of a core dependency like `glibc`.

> [musl wiki](https://wiki.musl-libc.org/functional-differences-from-glibc.html)
> goes into more specifics on the differences.

Some Linux distributions which use another implementation of the C standard
library that is not `glibc` tend to run into compatibility issues with certain software.

For example, getting `onnx` or `langchain`'s Python packages to run on Alpine
Linux is a tall order. Compilation from source for specific software does not
work as well. This is due to the fundamental differences between `musl` and `glibc`.
`musl` is extremely lightweight at the cost of software compatibility.

### Customisable
Linux is very customisable. You can customise the bootloader, login screen, how
you tile and manage windows and panes. You can also manage and really customise how
the desktop looks. This is so prevalent among Linux users that the term "ricing"
was borrowed from car enthusiasts who liked to modify their vehicles.

Customisation may be anti-productivity to most, however it can be somewhat enjoyable
and actually spark joy.

> "What is the point of owning a device when you cannot fully customise it,
> should you wish to?"

## Linux Distributions
There are **many** Linux distributions, each with their own unique offerings.

### An experience you choose
You have distributions which work out of the box, such as Ubuntu, Linux Mint and
Fedora Linux. Then there distributions with a much higher learning curve; such
as Arch Linux, NixOS and Gentoo. Out of the three, Arch Linux is comparatively easy
to set up and troubleshoot.

However, the less beginner friendly distributions generally do not come with a GUI
installer. This specific design choice was made so that power users could fully
customise every minute detail of their operating system's installation. The trade-off
losing the familiarity and comfort of having an installation wizard like in other
Linux distributions or operating systems.

On the other hand, most Linux distributions come with a GUI installer. The
Calamares framework makes it less complicated for developers of Linux distributions
to bundle a standardised installation experience, with distribution specific settings
and other configuration possible for their users.

## Installing Software
Mobile devices have an App Store of some form, so do desktop operating systems.
What sets Linux apart is that installation of software by users is typically not
done by downloading and running some installer. Users tend to prefer that
applications provide an option to be installed with a package manager.

There are also some who prefer to make use of `curl` to invoke an installation script,
or to clone and compile the source code. However, these are generally last resort
options for the average Linux user.

### Package Managers
Package managers (at least in the Linux context), are primarily command line utilities
bundled as a core dependency of the distribution of Linux one is using. There
are GUI wrappers around some package managers, though they lack in the extensibility
and flexibility that has come to be expected from package managers.

## pacman
My experiences with the pacman package manager came before I tried out Windows
Subsystem for Linux (WSL) or Linux itself. When I realised that the Windows
version of Git had a Unix compatibility layer, I wanted to see what could be
achieved within said layer.

This was how I first stumbled upon the `pacman` package manager within `MSYS2`.[^2]
Unlike most other package managers, `pacman` has rather concise syntax.

For example:
```bash
sudo pacman -Syu
sudo pacman -S nodejs npm
```

Compared to Debian based Linux distributions:
```bash
sudo apt update
sudo apt install nodejs npm
```

### Concise and meaningful
To the average user, `-Syu` seems like a random incantation of characters that
just makes `pacman` do stuff. The truth is that each flag neatly translates its
meaning (if you looked into the Arch Wiki or `pacman`'s manual page).

> `-S`: sync
>
> `-y`: refresh, `-r` is used for another purpose
>
> `-u`: upgrade

Debian's `apt` syntax is much more specific on what it is doing, although it
comes at the cost of unneeded verbosity for more experienced users.

### Rolling release
Pacman and the Linux distributions that use it generally make use of the rolling
release model. This refers to the frequent release of small updates while working
with only a single code branch. This differs from the more common workflow with
semantic releases.[^3]

Since users can choose to not updating their operating system on Linux, they can
test out cutting edge features or wait and see if the update might break their
set up.  This also means that Arch Linux has one of the largest software package
repositories, especially when factoring the Arch User Repository (AUR).

> A tradeoff of a large online repository of software is that one as the user
> needs to check the software they are installing.
>
> **pacman** is also much involved as a package manager. Mirrors, cryptographic keys
> need to update ever so often. The AUR also sometimes has a bit of downtime, though
> otherwise the user experience is a good one.

## Credits
Credits to Linus Torvalds, Free Software Foundation, GNU Software devs,
EndeavourOS dev team and the Linux community.

## Conclusion
I hope that this post gives you a quick glance as to how I daily drive Linux.

> Fun fact: I made part of this draft mid flight (like the last post).

[^1]: And other software, whether free, open source or proprietary.
[^2]: As for why Git's Windows version bundles said compatibility layer, it boils down to
UNIX necessities like `grep` being missing from the vanilla Windows experience. They either had
to add the compatibility layer, or lack feature parity and a consistent experience across operating systems.
[^3]: Gordon Messmer has a great article about the developer workflow that goes into a typical semantic release.
