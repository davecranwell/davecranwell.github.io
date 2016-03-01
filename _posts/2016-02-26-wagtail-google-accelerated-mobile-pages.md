---
layout: post
title: "Tips for Google Accelerated Mobile Pages in Wagtail"
---
If you're new to this, start with the [introduction and tutorial here](https://www.ampproject.org/docs/get_started/about-amp.html).

## 1. Use `RoutablePageMixin`

Before we can serve a Wagtail AMP we need to work out how Google is to locate each page's AMP version. The AMP spec uses a `<link rel="amphtml" ... />` tag to describe where a vanilla page's AMP equivalent can be found. The simplest option is to make it available at http://domain.com/yourpage/amp/.

This can be done like so:

``` python

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

```

You could of course use the `amp()` method to switch out the `news_page.html` template for a `news_page_amp.html`. It depends how complicated your templates are and you could end up maintaining twice as many templates.

## 2. Set a global context var to indicate AMP status

You'll see in the above example that I'm setting `context['is_amp'] = True` before rendering. It's on the presence of this variable that I can switch the rendering of any part of the page.

I'm also setting `context['base_template'] = 'amp_base.html'`. This allows my `news_page.html` template to start by extending the right base template. Any django template developer will usually extend from a `base.html` (or similar) and this means I can use the following to switch to the AMP-specific version:

``` liquid
{% raw %}{% extends base_template|default:"base.html" %}{% endraw %}
```

## 3. Have a separate AMP-specific base template

You'll want this to cut out the unnecessary furniture in your pages. AMP pages are meant to be lean and mean. Any Javascript you use has to be _very_ well thought out and arguably you should try to avoid it completely, so your `amp_base.html` should probably start by removing all that jQuery you've loaded at the bottom. Similarly if you've got "sidebars" or "footers" containing ancillary content, you probably don't want that either.

If your `base.html` is _really_ basic, you could always use that `is_amp` context variable to toggle this unnecessary stuff and avoid separate templates altogether. That could turn into a quagmire of `{% raw %}{% if %}{% endraw %}` tags over time.

## 4. Abstract your images

The AMP spec requires you to replace all your vanilla, self-closing `<img>` tags with `<amp-img></amp-img>` ones. The idea of AMP is to create _svelte_, lean pages so you should probably start by questioning whether that image is necessary at all. However most of the images you will want to include come from Wagtails `{% raw %}{% image %}{% endraw %}` tag.

The `{% raw %}{% image %}{% endraw %}` tag hides away the implementation of the actual `<img>` element, so you'll want to start by using `{% raw %}{% image as foo %}{% endraw %}` a lot more. This means you can output an `<img>` manually e.g

``` liquid
{% raw %}{% image foo fill-123x456 as bar %}{% endraw %}
<img {% raw %}src="{{ bar.url }}" width="{{ bar.width }}" height="{{ bar.height }}"{% endraw %} />
```

And of course then it's trivial to change `<img>` for `<amp-img></amp-img>`. With the presence of the `is_amp` context var, you can switch between the two.

I'd perhaps suggest you use a single `{% raw %}{% include %}{% endraw %}` template for all images you want to display in your AMP versions. That way, there's only one place where `<img>` and `<amp-img></amp-img>` are switched.

## 5. Use Streamfield particularly for its `ImageBlock`

If you're currently using Wagtails' standard `RichTextField` you're going to find it very hard to make that important swap from `<img>` to `<amp-img></amp-img>` since the `<img>` tag is completely hidden within Wagtail.

Streamfield by comparison exposes the blocks you use to define images, in the template. So you can use the `{% raw %}{% image %}{% endraw %}` tag like you would with any other image field in your model.


## 6. Declare images as "responsive" whenever necessary

I kept on missing the documentation on [layout](https://www.ampproject.org/docs/guides/amp_replacements.html#include-an-image) which in this case doesn't mean "responsive" as in [RICG](https://responsiveimages.org/) but responsive as in they resize and aren't fixed.

Add `layout="responsive"` to your `<amp-img></amp-img>` tags whenever your image is meant to scale to fit the screen (as they are likely to, being a responsible developer :P).

## 7. Componentise your CSS

AMP requires you to inline all your CSS at the top of the file (not as `style` attributes). If you've got a monolith CSS file, this is going to be tricky. There is software out there which automatically works out what rules are actually used on a page, but I'm yet to find one that does so dynamically and efficiently.

If such a tool were run offline, you'd have a hard time planning for the  optional blocks of content, which your users might be adding or removing later in time.

This isn't really Wagtail-specific, but I'd suggest adopting a CSS architecture/theory such as BEM, SMACSS, or the general paradigms suggested by Patternlab.io. Adopting these is likely to result in your main CSS file containing something like this (SASS) example:

``` sass
@import 'variables';
@import 'grid';
@import 'mixins';

// Third party plugins
@import 'vendor/normalize';

// Core: head/footer, things not needed to be reusable
@import 'core/fonts';
@import 'core/global-elements';
@import 'core/typography';
@import 'core/header';
@import 'core/footer';
@import 'core/main';
@import 'core/primary-nav';
@import 'core/mobile-nav';
@import 'core/inputs';

// Components: Individual, discrete pieces of UI
@import 'components/wagtail-styles';
@import 'components/icons';
@import 'components/buttons';
@import 'components/cards';
@import 'components/tables';
@import 'components/sharing';
@import 'components/panels';
@import 'components/tabs';
@import 'components/meta-bar';

// Organisisms: Groups of components
@import 'organisms/heros';
@import 'organisms/streamfield';
@import 'organisms/listings';
@import 'organisms/tab-bar';
@import 'organisms/forms';
@import 'organisms/pagination';

// Templates: groups of organisms & components
@import 'templates/article';
```

Such a breakdown makes it far easier to create a `main-amp.css` alternate file or similar, in which you can include only the bits really needed by your AMP pages.

