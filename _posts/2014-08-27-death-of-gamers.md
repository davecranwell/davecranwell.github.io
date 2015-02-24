---
layout: post
title: "Animating CSS height to auto"
---

A common problem with responsive design is the need to animate with CSS an element who's dimensions are unclear. It's straight forward to set `height:0px` in one rule, `height:100px` in another, add some `transition: all 1s` and Bob's your mother's brother, but what if the height of your element varies per breakpoint? What if you can't control the content of the element?

css-tricks.com has had a few snippets/editorials on this, but their solutions tend to expect the animation to be done with jQuery.animate(). What if you want to do it with CSS? My quick and dirty jQuery solution is as follows:

Basically you've got an element `.my-element` on which some javascript toggles the class `.open`. Without that class, the element is closed, or invisible, with zero height. With `.open` added, the element shows its contents at whatever height is required.

{% highlight javascript %}
    function autoHeightElement(elem){
        var $self = $(elem);
        var $openCSS = $('<style></style>').appendTo('head');

        function setSize(elem){
            elem.removeClass('ready');
            $openCSS.html(elem + '.open{height:' + elem.height() + 'px}');
            elem.addClass('ready');
        }

        $(window).resize(function(){
            setSize(elem);
        });

        setSize(elem)
    });

    autoHeightElement('.my-element');

    $('.my-element').click(function(){
        $(this).toggleClass('open');
    });

{% endhighlight %}

This requires the CSS:

{% highlight css %}
    .js .my-element{
        position:absolute;
        width:100%;
        z-index:-1;
        top:-5000px;
    }
    .js .my-element.ready{
        height:0;
        z-index:80;
        position:relative;
        width:auto;
        top:auto;
    }
{% endhighlight %}

Essentially as the page loads, and provided JS is enabled, the element in question is position absolutely off-screen, to avoid it's position affecting the rest of the page content.

It's height is then calculated, and CSS rule is added to the head to set the `.open` version of that element to the specific height. 

Once calculated, the element is set to be `.ready`, a class which can be used to restore the element to whatever position or properties it ought to have in it's closed state.

As the page is resized and the content of the element reflows and affects its dimensions, `setSize()` reruns, recalculating the new height and altering the injected CSS rule in the `head`.

Of couse this doesn't cater for resizing the element while it's being displayed, but you're half way there at least.
