---
layout: post
title: Dabbling with SVG
---

The "DC" logo top left and the coloured strip across the top are both SVG. Thanks to <a href="http://fireworks.abeall.com">a Fireworks SVG export plugin</a> both were simple to create from Fireworks layered PNGs.

If you're not already a convert, the SVG elevator pitch is this: SVG gives the ability to use pure vector images in live sites, where every colour fill, every stroke, shape or group of shapes can be controlled and animated via Javascript and/or CSS. No compression artefacts, no need for retina versions. They're easily cached, easily compressable on the server side and they're even written in a human-readable format you can edit by hand.

Check this:

<img src="/assets/images/dc.svg" width="300" height="300" />

It's the same image file as in the logo above, at a larger size, with utterly no loss of quality. For solid-colour, cell-shaded or vector based logos and icons etc, it's a winner in my book.

The top strip is more of the same but in this instance is declared inline. SVG by default likes to scale with a fixed aspect ratio, it isn't like a raster image where you can mangle its dimensions however you like. However in this case mangling is exactly what we need so it always matches the width of the page. <code>preserveAspectRatio="none"</code> is the solution. As you can guess from the syntax, is disables the aspect ratio enforcement.

For further reading, Chris Coyer has a <a href="http://css-tricks.com/using-svg/">good starting point</a>. The main caveat being that we're talking about support for IE9+ only, but as IE8 has been on the naughty step for at least 2 years, we can start crossing it off our browser support lists.

<strong>EDIT</strong> I've done some playing with <a href="http://snapsvg.io/">SnapSVG</a> and the under-sold <a href="http://www.colourlovers.com/api">colorlovers.com API</a> to rotate colours in the logo and stripe automatically. It won't do it on first load, but every page thereafter will have the logo and stripe rotated to one of colorlovers top 100 palettes. Yes, I'm fully aware this is completely pointless!