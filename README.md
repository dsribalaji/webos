# BalajiOS - A Personal Web Operating System

A fully interactive, browser-based personal OS built from scratch with plain HTML, CSS and JavaScript - no frameworks, no libraries, no build step.

Boot in, explore the desktop, drag the windows around, and get to know Sri Balaji by exploring his world instead of reading a boring personal website.

## Features

- Login screen - a boot gate with a flash animation before entering the OS
- Live top bar - real-time clock (updates every second) plus a status chip
- Draggable windows - grab any window by its header and move it
- Window stacking - tap a window and it rises to the top (z-index management)
- Notes app - a "Field Notes" reader with a clickable sidebar and 4 personal essays (origin story, why ECE, the robot car, AI second brain)
- Projects app - clickable cards showing real projects (AI agents, robotics, web)
- Terminal app - a working interactive shell with commands: help, about, projects, skills, contact, date, echo, sudo, clear, exit, whoami
- Glassmorphism design - blurred translucent windows over a nebula gradient, custom scrollbars

## Try it

Open the live site (GitHub Pages link), click Boot, then:

1. Drag the Welcome window around by its header
2. Open Notes from the desktop icons and switch essays in the sidebar
3. Open Terminal and type help - try "sudo make me a coffee"
4. Open Projects and click a card

## Built with

- HTML5 semantic markup
- CSS3 - flexbox, glassmorphism (backdrop-filter), gradients, custom scrollbars
- Vanilla JavaScript - DOM manipulation, event listeners, setInterval clock, drag logic

## Files

| File | Purpose |
|------|---------|
| index.html | OS structure: top bar, desktop, 4 windows, login screen |
| style.css | All styling - theme, windows, apps, terminal, login |
| script.js | All logic - clock, window manager, drag, apps, terminal |

## About

Built by Sri Balaji Dangeti (ECE sophomore, hardware tinkerer, AI-automation nerd) as part of the Hack Club Stardance challenge, following the WebOS Jams batch.

> "Most people have a website. I wanted a world."
