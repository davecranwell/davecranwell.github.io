---
layout: post
title: "Tips for Google Accelerated Mobile Pages in Wagtail"
---

## Use `RoutablePageMixin`

Before we can serve a Wagtail AMP we need to work out how Google is to locate each page's AMP version. The AMP spec uses a `<link rel="amphtml" ... />` tag to describe where a vanilla page's AMP equivalent can be found. The simplest option is to make it available at http://domain.com/yourpage/amp/.

This can be done like so:

{% highlight python %}

    class NewsPage(RoutablePageMixin, BasePage, Page):
        # your model here

        @route(r'^$')
        def vanilla(self, request):
            return Page.serve(self, request)

        @route(r'^amp/$')
        def amp(self, request):
            context = self.get_context(request)
            context['is_amp'] = True
            context['base_template'] = 'amp_base.html'
            response = TemplateResponse(request, self.template, context)
            return response

{% endhighlight %}

## Set a global context var to indicate amp status

You'll see in the above example that I'm setting `context['is_amp'] = True` before rendering. It's on the presence of this variable that I would normally switch between `<img>` and `<amp-img></amp-img>`.

I'm also setting `context['base_template'] = 'amp_base.html'`. This allows my `news_page.html` template to start by extending the right base template. Any django template developer will usually extend from a `base.html` (or similar) and this means I can use the following to switch to the AMP-specific version:

`{% extends base_template|default:"base.html" %}`

## Have a separate AMP-specific base template

You'll want this to cut out the unnecessary furniture in your pages. AMP pages are meant to be lean and mean. Any Javascript you use has to be _very_ well thought out and arguably you should try to avoid it completely, so your `amp_base.html` should probably start by removing all that jQuery you've loaded at the bottom. Similarly if you've got "sidebars" or "footers" containing ancillary content, you probably don't want that either.

If your `base.html` is _really_ basic, you could always use that `is_amp` context variable to toggle this unnecessary stuff and avoid separate templates altogether. That could turn into a quagmire of `{% if %}` tags over time.

## Abstract your images

The AMP spec requires you to replace all your vanilla, self-closing `<img>` tags with `<amp-img></amp-img>` ones. The idea of AMP is to create _svelte_, lean pages so you should probably start by questioning whether that image is necessary at all. However most of the images you will want to include come from Wagtails `{% image %}` tag.

The `{% image %}` tag hides away the implementation of the actual `<img>` element, so you'll want to start by using `{% image as foo %}` a lot more. This means you can output an `<img>` manually e.g

{% highlight html %}
    {% image foo fill-123x456 as bar %}
    <img src="{{ bar.url }}" width="{{ bar.width }}" height="{{ bar.height }}" />
{% endhighlight %}

And of course then it's trivial to change `<img>` for `<amp-img></amp-img>`. With the presence of the `is_amp` context var, you can switch between the two.

I'd perhaps suggest you use a single `{% include %}` template for all images you want to display in your AMP versions. That way, there's only one place where `<img>` and `<amp-img></amp-img>` are switched.
