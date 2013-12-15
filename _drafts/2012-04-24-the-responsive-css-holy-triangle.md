---
layout: default
title: The Responsive CSS Holy Triangle
created: 1335269357
---
I'm interested to know other front end developer's experiences of the Responsive Holy Triangle which is Small filesize / Few requests / Maintainable.

I was reading through the various tips, techniques and tools on <a href="http://www.netmagazine.com/features/50-fantastic-tools-responsive-web-design">this recent .net article</a> and realised that I'm not the only one having to make some awkward decisions when it comes to developing new sites.

<h3>The problem is thus</h3>
A client comes to you wanting a website. The site must be suitable for Desktop browsers (natch) and there must also be "a mobile version". They have no preconceptions of how to achieve a mobile version but they do know that their mobile users access the site in areas where Wifi is unavailable. The techies at the Client's end are naturally interested in keeping file sizes and request volumes low, as these are the main considerations when targeting any platform with slow/poor connectivity.

You put your heads together and conclude that some kind of responsive site is possibly the way to go, but is it always? 
Many CMSs out there churn out kilobytes of unnecessary tag soup. Whole new templates for mobile devices might be better, which makes responsive CSS slightly moot.

The "Mobile First approach" or "320 and up" or whatever you choose to call it, basically requires all your CSS to go in one file. Even if your media queries remove unnecessary background images from mobile browsers, you're still having to download a large CSS file on your mobile which contains at least 50% styles not even suitable for the device downloading it.
Many Grid/Responsive frameworks and CSS Compilers generate not inconsiderable amounts of added CSS, markup or classes, bulking out your files further.

I'm ignoring the more significant problem of responsive Images as this is a whole other discussion. Even if your site includes no images (unlikely but still) you still have to consider the Responsive Holy Triangle because CSS and HTML itself can be large enough to need reducing.

You have a team of, say, 5 people on the project, but your company is larger. Everyone is the team capable of development but your files are in Git and you want to avoid merge conflicts as some of your devs aren't so hot on Git. You also want your codebase to be intelligible within minutes to completely new developers. Its important to your company's productivity that codebase acclimatising time is reduced where possible. So you split your CSS rules into separate files grouped by some commonality - typography, colours, themes, specific templates, reusable blocks etc. Devs will only edit a small subset of the files, ensuring that mistakes can be debugged easier and accidental changes can't be made to more core files without being noticed.

Added to this you want to use LESSCSS. The ability to change grid sizes or colours is invaluable. Additionally the Fuzzy Felt-like mixin system is probably the only way you'll get your devs to reuse classes and styles appropriately.

You're keen to create a site using the best techniques possible as you want every new site you create to showcase your company's talents in some way. Media Queries are the current buzzword and the Client has heard the phrase used.

The options by this point are bewildering, so you start by consulting the <a href="http://zomigi.com/blog/essential-considerations-for-crafting-quality-media-queries/" target="_blank">Essential Considerations For Crafting Quality Media Queries article</a>.

If you create a single stylesheet that with "Embedded" Media Queries (such as HTML5Boilerplate.com might endorse) the client notices that the file size is large and most of the styles don't even target mobile.

If you try down the "External" route and split your files into those for mobile and those for desktop, you find LESSCSS needs all it

