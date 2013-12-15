---
layout: default
title: CSS methods for mobile websites, Media Queries and LESSCSS - the eternal quandary.
created: 1334742697
---
As developers we focus on having the right tools for the job, particularly those that make our lives easier or maintenance simpler. Tools and techniques such as Media Queries, Mobile First, <a href="http://lesscss.org">LESSCSS</a> are all part of our arsenal but you can find that the deploying these in combination can raise more issues than they solve. You can quickly find yourself in a loop of weighing pros and cons.

I recently found myself stymied by the sheer number of permutations that had to be analysed before choosing my tools. A client wanted a mobile version, using LESSCSS, of a site that already had a desktop-only version. I wanted the site to be exemplar, using best practice methods, but found that one desirable method directly obstructed another. 

What I wanted was a solution which...

<ol>
<li>Works with my existing CSS structure, whatever it may be (in this case one or many desktop-specific CSS files LINKed individually in the head of the site)</li>
<li>Didn't result in the client (either desktop or mobile) downloading unnecessary files</li>
<li>Limited the number of file requests made as much as possible</li>
<li>Didn't result in spaghetti code</li>
<li>Supported IE<9 with minimal use of shims/shivs/hacks</li>
<li>Is generally clean, using standard techniques</li>
</ol>

The variety of blog posts on this topic are frustrating. Some are ideological pipe dreams, suggesting entirely new web standards that won't realistically happen within a decade. Some solved one problem by ignoring another. And then there or those, the majority, which are clearly not written by people who work in a team but rather individuals with no intention of providing after sales support, with the luxury of creating brand new sites from scratch where they can control every decision right from the start, probably working for clients who don't know any better!

What follows are the notes that helped me decide my approach.  on deciding the best way to deploy Media Queries and LESS on various sites for work. In a small team or as a freelancer its more often the case that you see a job through from start to finish, which gives you free reign over choices from the start. In large companies however projects often don't go the way you plan. Some clients don't allow you to do the work the best way possible. In teams of more than just a handful the variety of prior experience or techniques may result in working in ways that are well meaning but out-dated, or unwilling to change.

<h2>Considerations</h2>
<h3>Code maintenance</h3>
Always worth pursuing but can be sacrificed. A working site is still working even if the code is a mess. Ultimately, provided that your code is stable and has no detrimental effect on the daily functioning of the client's site there's nothing technically wrong (morally, yes. technically, no) with deploying spaghetti. Some of the techniques below actually require less maintainable code to be usable in themselves.

What is "maintainable" - often just a synonym for well structured. Something another person can pick up easily. At work we often distribute our CSS rules across several files, grouped by common abstract properties. Things that related to text, things that are specific to IE, things that are just for mobile, things that are just related to form layouts etc. There are many benefits to this, such as being able to debug rules quicker. It encourages modular class/rule usage as you can easily see all other examples of the same kind of rule being used. It also reduce VCS conflicts.

Maintainable code could however be code that is logically ordered. A single CSS file structure can be made maintainable by following a CSS structure such as in <a href="https://github.com/h5bp/html5-boilerplate/blob/master/css/style.css">HTML5Boilerplate</a>. A single CSS file is required by some of the below methods, so shouldn’t be overlooked. 

Media Queries aren’t possible in any IE browser before IE9. It's of course possible to render a page well in IE<9 by either using conditional comments containing stylesheets, or Media Query shims/shivs. If you want to use Media Queries well, you'll want some rules to target mobile, some desktop (the Mobile First approach).

If the client wants the site to be responsive in IE desktop browsers like it is in others, a JS-based solution is the only option. If a JS solution is deployed, users without JS will see whatever the default layout is (see Mobile First) which may be far from what they want but will never be ugly provided the default layout is properly built.

<h3>Existing CSS structure</h3>
Sometimes you're tasked with adding Media Queries/LESS to a legacy site. You don't want to rewrite the CSS from scratch and the solution must be as cost effective as possible - you may just have to work with the CSS structure of the legacy site as it stands.

(See also Code maintenance). We often split our CSS into files by common purpose but some of the best MQ+LESS solutions would make our most frequent CSS structures impractical to the point of unusable.

<h3>Mobile first</h3>
Requires the order of our CSS to change completely from what we’re used to. The bulk of the CSS you write at the start will be for Mobile only or be so generic as to target no platform specifically. This requires our designer’s first designs to be mobile as picking a desktop design apart into the respective groups takes far longer retrospectively if desktop is designed first.

<h3>LESS</h3>
The main problem with Less is how to store your variables/mixins. Store them too specifically and they may only get applied to one platform but not the other. Store them too generally and they may apply to too many platforms. 

Take for example the LESS variable “@h1size: 50px”. Common CSS design patterns suggest you use a single file for variable definitions and mixins, which you include in every other CSS file that requires them. Its unlikely however that you’d want a 50px H1 in your mobile site. You can't redefine @h1size on the fly - remember LESS is a compiled language - but you don’t want to have to create a mobile version of each desktop variable e.g “@h1size-mobile:20px” that would just increase inconsistency. <a href="http://blog.vandenoostende.com/2011/sensible-mediaqueries/">Gilles Vandenoostende</a> suggests a method where you can redefine variables of a platform specific nature and keep your mobile/desktop files separate.

The flaws in his method are that you are required to keep all your desktop CSS in just one file. The other option is that you create 2 LESS files for every 1 you currently use. Going back to our example of a legacy site where CSS is split and grouped by abstract similarity, this increases the burden of maintenance. The other less significant issue with this method is that a unique IE<9 css file must be created and maintained separately. 

<a href="http://zomigi.com/blog/essential-considerations-for-crafting-quality-media-queries/">This very well considered blog</a> notes that another way of achieving IE<9 support is to use multiple LINK tags in the header, wrapped in IE's proprietary conditional comment syntax. This way if you had a CSS file specific to just desktop, all you'd need to do is specify this file in your IE-conditional LINK tag.

<h3>Bandwidth</h3>

For many clients this may be something we can gloss over, or it may be something they worry less about. It could also be the case that our designs happen to require less CSS images, making this a non-issue.

Adding requests is not a big deal if the files requested are small. Any LESS/@media queries technique that depends on multiple separate CSS files (whether @imported or LINKed) should not be a worry unless bytes are duplicated or redundant.

A single, large CSS file gets downloaded once slowly on a mobile, but from then on it is cached.

<h3>Scenario best practice</h3>

Fully responsive

Designed and built mobile first.
First coder starts on mobile version
JS lib for media queries in IE<9
Mobile First CSS structure
Single CSS file with external LESS mixins for each platform in media queries, or inline in the origin file. (Gilles Vandenoostende method).
Mobile version only

Mobile first
First coder starts on mobile version
Single CSS file with inline media queries
JS lib for media queries in IE<9
Same CSS as for Fully responsive.

Next best solution:
Mobile Last/Hybrid (individual desktop styles are transitioned to media queries where necessary)
Desktop css file LINKed in header before mobile css file.
Mobile css file enabled with media attribute. Can contain any number of media queries
No specific IE<9 support besides desktop version
Leave Desktop css file as alone as possible
Upgrading Desktop to fully responsive

Laboriously pick apart existing CSS to make it Mobile First (see steps for Fully responsive).

Next best solution:
Mobile Last
Create a CSS file for every supported resolution and swap them in 
Upgrading Desktop to mobile online



While trawling the internet for solutions I realised that the 'net is awash with strongly ideological advice which is so focused on improving specs and standards (such as the discussion around how best to do responsive images) that it avoids solving day to day problems using the tools we already have.
