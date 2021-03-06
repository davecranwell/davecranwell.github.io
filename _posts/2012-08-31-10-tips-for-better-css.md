---
layout: post
title: 10 tips for better css
created: 1346405994
---
<p>CSS can be taken for granted. The gap between plain-ol-css and good css is vast but it's often considered the kind of technology that anyone should be able to do and in worst case scenarios doesn't even receive much budget.</p>

<p>CSS is one of the first areas to become a maintenance problem in longer term web projects. Every programing language has the potential to become spaghettified, but most languages also have de facto coding standards to ward of spaghettification.</p><p>As one of the first languages a younger coder might learn, coding standards aren't always at the forefront of learning and bad habits creep in. Even maturer coders can be susceptible to pride and the belief that "its only CSS, I can do this" but will make some very common errors that make their code unmaintainable in a few months time.</p>

<h2>Redefinition</h2>

<p>Wikipedia says CSS is used for defining the "Presentation Semantics". This conjures images of pedantic deliberation over an <code>h1</code> or an <code>h2</code>, whether a list is a <code>ul</code>, <code>ol</code> or <code>dl</code>, where to use a <code>strong</code> or an <code>em</code>. Most CSS guides will at some point focus on "separating presentation and logic" or similar. These all sound very clever and technical, but don't mean much to many people implementing it for the first time</p>

<p>I see it as a type of design. Yes it requires knowledge of HTML and semantics, but these are standard requirements these days and not worth dwelling on. I'd say CSS is:</p>

<blockquote><em>...A language in which the relationships and consistencies between design elements are described.</em></blockquote>

<p>CSS therefore <em>isn't</em> something anyone can do, to be blunt. You have to understand design concepts. You need to know why a designer has made X look like Y but not Z, what the relationship is between elements that are red and those that are blue, those that a have a heading one size and those that have another.</p>

<p>In fact the more senior a programer you are, the chances are the worse your CSS may be. Odds are that you starting out being a web developer not through design, but through maths or physics and some of the understanding of design principals may be missing.</p>

<h2>Back to basics</h2>

<p>Let's briefly go back to first principles. The Cascade, as in "<em>Cascading</em> Style Sheet" is largely dependent on Specificity: the concept of CSS rules being able to overpower one another, or not, depending how specific they are.</p>

<p>Andy Clarke (the author of Hardboiled webdesign) spoke of specificity as like the hierarchy of the Imperial Empire in Star Wars. First there's your Stormtrooper, this is the regular HTML element. It has no Sith powers but in number could prove a problem. Above that is your Class, thats Darth Vader, he has Sith powers but can still be beaten. Above that there's the Emporor - he's your ID and is almost unassailable. I won't drag on this analogy further but you get the idea. (I mean where does <code>!important</code> fit in here, is it the Death Star?).</p>

<p>The number of Stormtroopers, Vaders and Emperors you use to build a CSS selector affect how powerful it is. Elements, Classes and IDs each have a numeric value, the sum of which is calculated by the browser to determine this power.</p>

<ul><li>Stormtrooper (Element) is 1</li><li>Vader (Class) is 10,</li><li>Emperor (ID) is 100</li><li>Death Star (!important) might as well be 100000 for the effect that is has.</li></ul>

<p>The groan-inducing point of this analogy is "Don't underestimate the power of the dark side". The more powerful your selectors, the harder they are to override. Overriding is what you most commonly do in mid-to-long-term projects so it's important we help our future selves as much as possible.</p>
<p>This brings us to my tips.</p>

<h3>1. Never use IDs in selectors</h3>

<p>As we've just covered, IDs are dangerously high powered. It would take many classes or elements (or more IDs) to override one ID. This can make the creation of mobile versions of a website particularly problematic if IDs are used everywhere. Even too many classes are a problem, but you can usually find another nearby class to increase specificity if you really need to. Remember that an ID can only ever exist once on a page, which naturally keeps their numbers low. Trying to find one to increase your selector's specificity may prove tricky.</p>

<p>At the very least IDs should be used sparing. When IDs are used in a selector, developers tend to resort to <code>!important</code> to override properties. Every time you use <code>!important</code> an Alderaanian dies.</p>

<p>Note that i'm not saying we shouldn't use IDs in markup, just in CSS selectors. The ID is still the fastest way of finding an element in the DOM, so for javascript in particular IDs are essential to performance. There are performance gains to using IDs in CSS too, but far smaller and the performance increase is simply not worth the cost of maintenance.</p>

<h3>2. Use short, low-specificity selectors</h3>

<p>Developers find themselves writing familiar patterns in CSS. For example overriding the colour of a link within a <code>ul</code>:</p>
{% highlight css %}
ul li a{
  color:red
}
{% endhighlight %}

<p>That selector is 3 points (1 point each element). Now imagine:</p>

{% highlight css %}
.listing li a.blocklink{
  color:red
}
{% endhighlight %}

<p>The selector has with the addition of two seemingly innocuous classes suddenly increased to 22 points (2 classes, 2 elements). This is enough in my experience to start making overriding tricky.</p>
<p>Ask yourself: Is the <code>li</code> in that code really necessary? Would an <code>a</code> tag ever exist (and be valid) in a <code>ul</code> but <em>not</em> in an <code>li</code>? Answer: no, so is the <code>li</code> necessary? For that matter is <code>.blocklink</code> necessary? Are there any other kinds of <code>a</code> that could exist within your <code>.listing</code>? If not, don't mention the class name  - you're saving yourself 10 whole points.</p>

Developers sometimes add more selector detail (read: specificity) as a way of explaining to other developers what is going on. If <code>.blocklink</code> seems vague, they might prefix it with an <code>a</code>, or vice versa. Comments (more on this later) are the real solution here. <strong>Documenting through selector detail is a false economy</strong>.

The example above is rather contrived and with low gains, but if you extrapolate this to include an ID too (yuk) and increase the number of developers working on the project you can quickly find yourself in a specificity points arms race. The end game is where everyone is forced to use IDs in every selector. To quote Syndrome from 2004 film The Incredibles, "When everyone is super, no one is".

<h3>3. Analyse the designs then create abstract classes, applied like layers of paint</h3>

<p>Class names should on the whole be abstract where possible .eg <code>.listing</code> or <code>.teaser</code> or <code>.block</code>. Rather than <code>.homepage-right-news-ul</code>. Just because the homepage design contains a list of news items on the right  doesn't mean that the exact same design isn't used somewhere else for an utterly different purpose. Your goal is to create a livery which can be changed across a large site at a small cost. If the client says "we want all listings to have a nice dotted line between each item", you should be able to do this in 1 line of CSS.</p>

<p>Of course, knowing whether a design element is reused isn't obvious without an analysis of the designs. Before writing a single line of CSS, look at all the designs in overview by printing them out and using coloured pens to highlight connected design elements. Think from the outside in and instead of seeing "a right hand news feed", see instead "a bordered box that contains a list of items." In a good, consistent design there are probably lots of places where such a box is used.</p>

<p>Start by creating classes which apply the most common features of the box - perhaps the border. Then go a layer deeper into the onion but always move to the next <strong>least</strong> specific thing. Perhaps the background colour or the heading size. You'll end up with several potentially unconnected classes applied to a single element e.g:</p>

{% highlight html %}
<div class="bordered headed listing">
  <h2>Heading</h2>
  <ul>
    <li>Items</li>
  </ul>
</div>
{% endhighlight %}

<p>Remember that CSS is a cascade and things inherit properties. You don't want to write a class for every conceivable permutation of style, you want to <em>re-use </em> the classes in different places frequently. But how do you know what deserves a new class and what should use an existing one? It's best to think from most to least common. If there are 5 listing blocks which look nearly identical, of which 3 are completely identical, your first styles should create a "default" look for the 3 most common. Next make override classes for the remaining 2 that tweak only the individual properties which differ.</p>

<p>e.g if our previous <code>.bordered.headed.listing</code> block were to have a derivative version with an inverted background colour you might write:</p>

{% highlight html %}
<style>
.inverse{
  background-color:black;
  color:white;
}
</style>
<div class="bordered headed listing inverse">
  <h2>Heading</h2>
  <ul>
    <li>Items</li>
  </ul>
</div>
{% endhighlight %}

<h3>4. Namespace your classes</h3>

<p>Use a hyphen in class names to indicate derivative versions of a default. This makes it easier for other developers to locate similar styles. e.g <code>.teaser-vertical</code>, <code>.teaser-horizontal</code> or <code>.button-primary</code>, <code>.button-secondary</code>. This would seem to go against my previous advice on onion skinning, so ask yourself: would this class ever be used outside this situation? Could this class confuse someone in future? For example "Primary" is a loaded term used by developers and designers for different reasons and would be likely to cause such confusion e.g:

{% highlight html %}
<div class="bordered headed listing primary"></div>
{% endhighlight %}

What exactly is <code>.primary</code> doing above? Is it perhaps adding the primary <em>colour</em> scheme? Or is it just the primary version of the bordered list?

{% highlight html %}
<div class="bordered headed listing-primary"></div>
{% endhighlight %}

The above completely changes the understanding of your code. It's clearly a "primary kind of listing" and could perhaps be found in your CSS alongside <code>.listing-secondary</code> and <code>.listing-tertiary</code>.

Always put the common part of the name first e.g: <code>.button-primary</code>  and <code>.button-secondary</code> rather than <code>.primary-button</code> and <code>.secondary-button</code>. If you imagine these printed one below the other in your CSS file, these are harder to spot when scanning down the left column of your CSS file and don't seem as related. You want all your buttons to be found together, prefixed with the same thing to make it clear they're related.</p>

<h3>5. Hyphen-case class names, not camel or snake</h3>
<p>CSS is already a hyphen delimited language and although some might say that is reason to use another case, I'd suggest its better to use one case throughout to make it easier to spot inconsistencies.</p>

<p>More importantly good CSS is, as we've discovered, about modularity and reuse. We've already discussed namespacing CSS classes so being able to copy/paste constituents of these class names is vital to your coding speed. Most text editors consider a hyphen as a word boundary, making each word either side of the hyphen selectable on its own .eg <code>.[button]-[primary]</code>. Namespacing with underscores conversely will mean your editor won't allow you to select an individual word in your class name. This may sound trivial but little time saving devices can be the difference between adopting these techniques and not.</p>

<h3>6. Indent your CSS</h3>

<p>Warning: Marmite topic.</p>

Take a look at this sample of CSS (and LESS) <a href="https://gist.github.com/3551678">https://gist.github.com/3551678</a>. You don't have to understand what is going on, just try to appreciate the file as a whole. Perhaps skim through and check how many versions of certain things there are.

Now take a look at the same file, indented <a href="https://gist.github.com/3135759">https://gist.github.com/3135759</a>. If you find that confusing (and I'm assuming you're a competent front end developer), perhaps indenting isn't for you.

Indenting your CSS doesn't change it's meaning (unless its LESS indenting, see below) but does provide some documentation. It splits the file up, allows you to skip over sections that aren't relevant, visually compartmentalises groups of elements and even suggests the DOM hierarchy without specificity implications.

There's plenty of debate about the benefits and pitfalls of indenting. Using indenting without also applying my other tips would almost certainly create an even more unmaintainable file, so it's perhaps more of an advanced technique, but it definitely has some benefits.

<h3>7. Split out individual properties if comparing them is important</h3>

You don't have to contain all the properties for your target element within the same rule block. Try splitting them up to group together similar properties or groups of properties that act similarly. Splitting out properties becomes really helpful if you're finding yourself making a lot of tweaks to things that are all related and require the same change to be made in several places. Items that share a common layout or CSS property that needs to be carefully maintained.

If you're creating containers which all need to be the same width (but are used for utterly different purposes and have far more unique properties besides), its likely you'll want to revisit that width value when you're creating your mobile version of the site and need it to suit a narrower screen. Split out just the width property from each container and put them somewhere separately in your CSS. Or fonts: if you use @font-face a lot you may want to keep tabs on which elements use your special fonts. Split out just the font-family properties of each element and place these rules together.

<p><a href="https://gist.github.com/3551678#L266">Have a look at line 266 of the previous indenting example</a>. The CSS is for a web game with lots of absolutely positioned layers appearing above or below each other. It was essential for my sanity to keep the z-indexes all together. Z-indexes are notoriously frustrating to organise, but by grouping them this way the next time you have to change the z-index of one element you'll be able to compare at a glance <em>all</em> the other z-index properties in case they clash.</p>

<h3>8. Comment like your life depends on it</h3>

<p>It's true of every programming language, but in one like CSS where there is little form or structure and so much is down to personal style, comments are vital for other coders to be able to pick up your work.</p>

Almost all the potential problems and pitfalls above and even my suggestions themselves become unnecessary with enough documentation.

In particular comment where you've applied styles that do something critical on which other styles depend. If you have to use the Death Star (!important) at the very least leave a comment to say why it's necessary. If you use a hack, definitely explain why. If you found that a 1-pixel transparent border is the difference between correct and incorrect rendering, absolutely comment to explain the purpose of the code. 

Group related rules under a large comment, group larger groups of related rules under a larger comment. Make the comments massive if you have to, you don't have to be precious about wasting bytes.

Try adding a table of contents at the top of your file:

{% highlight css %}
/******* My CSS file ********/
Contents
- HTML reset
- Common HTML elements
- General Layout
- Blog styles
- News styles
- Events styles
- Z-indexes
- Media queries
- Print styles
/*******************************/
{% endhighlight %}

Anything that helps others understand your file quicker reduces the chance they'll mess it up or reduce the quality of your code due to being unable to find something.

<h3>9. Organise your CSS files</h3>

<p>How you split up your CSS may also increase maintainability. While sites like html5boilerplate.com provide their css examples in a single file, this isn't always maintainable on a large project. A single CSS file with thousands of lines will become a VCS merging nightmare with more than a handful of developers working on the file concurrently.</p>

<p>I don't actually have a silver bullet solution for this. I've tried splitting rules by function e.g all the listing styles in one file, and I've tried splitting by content e.g all the styles for the blog in one file, but both have flaws. If you split by content then there is no centralised place to find all the uses of <code>.listing</code> together. If you split by function then any one page design may require updates to multiple CSS files making it harder to find the origin of anything in future.</p>

<p>What works best is a combination of the two. Add CSS to files associated with just the specific feature/content you're working on but as soon as a you write someting which could be applied somewhere else, move it to a more generic file. In some cases your content-specific CSS files will come to resemble only a brief series of overrides, with a much larger, generic file containing most of your code.

<h3>10. Don't reinvent the wheel, use tools</h3>
<p>I used to think it was impure to do anything but write it all from scratch myself, but when you're working to a deadline it makes sense to use use shortcuts, particularly shortcuts written by people far more clever than you, who've been in the industry far longer. Despite CSS being a relatively maleable language there are - as I'd hope this post suggests - right and wrong ways. No one likes to say some music is plain bad and that you're simply wrong for liking it, but lets be honest, some music is bad. CSS is the same - you can write it how you like, but it doesn't mean you did it right.</p>
<ul>
<li>
Resets - We've used various resets over the years, I suggest <a href="http://necolas.github.com/normalize.css/">Normalize</a> over YUI or Eric Meyer. Normalize makes everything the same, but doesn't remove default styling. The effort of adding back default margins/padding/bullets to elements used for content is more hassle than it's worth, particularly if you're using a CMS that generates your content markup for you. 
</li>
<li>
Bootstraps - <a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a> is great. It fulfills several roles, which isn't often understood. It provides common UI components, a Grid system, a library of LESS mixins and the whole site itself can be used as the basis for documenation sites. The Grid is particularly worth using, but I often ditch the javascript widgets for something a little more custom.
</li>
<li>
Boilerplate - <a href="http://html5boilerplate.com/">HTML5boilerplate.com</a> is the basis of every site I create (when possible). They've thought of all those little things you do at the start of a project which seem brief but end up eating time.
</li>
<li>
Dynamic CSS - <a href="http://lesscss.org/">LESSCSS</a> and <a href="http://sass-lang.com/">SASS/SCSS</a> are the two horses in this race. I prefer LESS because it more closely resembles vanilla CSS but they are both essentially the same. Dynamic CSS languages introduce variables, functions a kind of object orientation (to cut a long story short). The variables are great and blow your mind the first time you use them well. Dynamic CSS can however be dangerous in the wrong hands. One feature, nesting, allows css classes to be nested one in another to simulate the prefixing of a class in front of other classes e.g

{% highlight css %}
.teaser ul {
  margin:0
}
.teaser ul li{
  color:red
}
{% endhighlight %}

is written as follows, but gets compiled into exactly the same CSS

{% highlight css %}
.teaser ul{
  margin:0;

  li{
    color:red;
  }
}
{% endhighlight %}

This can be great in some situations but I recently encountered code where every single styled element in the DOM had been nested in the one above it. It was a neat way to encapsulate the code, but it meant that for elements 10, 15, even 20 layers deep in the HTML, the CSS selector for those elements also included 10, 15 even 20 class names and IDs as part of the selector string, totalling over 300 points of specificity. It was then my job to make a mobile version of this site and every bloody element needed a specificity of 300+ merely to remove a float or reset a width.
</li>
</ul>

<h2>Summary</h2>

I've used the above for the last few years to great effect. Some techniques require a lot more practice to master and I couldn't possibly do them justice in a single blog post. Others, like Indenting, are a bit contentious and you may disagree completely, that's fine. CSS is at the end of the day still a language where its implementation can be a matter of personal taste. I don't follow my own rules half the time, so I don't expect you to either. Try a few out though, if you don't use them already, you may find something that works.
