---
layout: post
title: Text resizing when rotating in iOS
created: 1309338400
---
<p>Anyone writing media queries for iPhone/mobile versions of their websites will have encountered this oddity: You load the page on the device and everything looks normal and to-scale. You then rotate the phone 90 degrees and suddenly some of the text is much larger while other areas of text remain as they were.</p><p>I've found the solution to this online so this post is really only a bump for justice, I didn't research this myself. The solution is:</p>
{% highlight css %}
html{
	-webkit-text-size-adjust: none;
}
{% endhighlight %}
<p>Simple, but rather unsatisfying. The one caveat is that this should really only be applied within a @media query targetting the minority, not the majority of your users. Bearing in mind that people use Webkit on <em>desktops</em> too, if applied too generally this rule will prevent anyone on a desktop resizing their text. I'd suggest this only be used within a @media query targetting iOS.</p><p>References:<br />http://www.liquidx.net/blog/2009/09/30/iphone-safari-font-size-changes-on-rotation/<br />http://stackoverflow.com/questions/912681/preventing-iphone-scaling-when-rotated</p>
