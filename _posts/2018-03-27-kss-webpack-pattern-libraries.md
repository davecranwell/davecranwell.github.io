---
published: true
---

At work we're documenting a large-scale UI overhaul in which we're using Webpack to compile the front end assets. We also need a [Pattern library](adele.uxpin.com). Our company's software is large and complicated enough that even in contrived developer environments you can't easily find examples of every part of the UI. Pattern libraries allow you to document everything in one place, cross refer patterns and check for visual regressions, without needing to use the product itself.

We compared a shortlist of pattern library software: [KSS](https://github.com/kss-node/kss-node), [SC5](https://github.com/SC5/sc5-styleguide), [PatternLab](https://patternlab.io/) and [LivingCSS](https://github.com/straker/livingcss). Low maintenance effort was important - the more effort required, the less incentive to maintain it. Customisation was also important. Few of them provided what we needed out the box, but if they could be extended it didn't matter.

LivingCSS was our first choice. It was easily customised, but we discovered its dependence on JSDoc comments was frustrating and the language in which example were written was inflexible. PatternLab is hugely popular but required separate example files that could get forgotten. We settled on KSS which has so far done everything we need. 

But how to generate it?

## KSS-Node

KSS comes in various flavours, but in a Node environment we want [KSS-node](https://github.com/kss-node/kss-node). It's implemented with inline comments in CSS/SASS files e.g

``` css
/*
Button

Buttons are expected to use the `button` element.

Markup:
<button class="button">{% raw %}
	{{#if text}}
		{{text}}
	{{else}}
		Click me
	{{/if}}
{% endraw %}</button>

Styleguide: Button
*/

.button {
	background: red;
	color: white;
}

```

Markup examples are written in Handlebars and all other text (with a little customisation) is markdown. This makes for patterns that are easy to recompose, and documentation which is rich and helpful.

Multi-line examples _really_ benefit from the simplistic comment style too. Other libraries require every line to have comment asterisk, or `//`. But these are tedious to work with over multiple lines.

Handlebars gives us "Partials", that allow reuse of components within others. So with the `.button` example above you can easily write:

```css
/*
Button group

A group of buttons

Markup:
<div class="button-group">{% raw %}
	{{> "Button" text="I am a button" }}
{% endraw %}</div>

Styleguide: Button.group
*/
```

That `{{> "foo" }}` syntax is Handlebars "partial" syntax. `foo` corresponds to the value defined for each pattern's `Styleguide:` property. Partials can take parameters and operate as wrappers/blocks too, these are useful for supplying other content for your examples.

## KSS-webpack-plugin

Webpack has some foibles of course. Assets it generates can have garbled filenames, varying output destinations or internal naming schemes.

We found [KSS Webpack Plugin](https://www.npmjs.com/package/kss-webpack-plugin) to bridge that gap of CLI-mode kss-node and the inclusion of webpack-generated assets. We contributed some changes to the plugin and it now does everything we need.

Support for Webpack's "chunks" was vital. Webpack generates files like `styles.12598u62ngsdg73.css` which is great for infinite caching, but terrible if you need to know the filename. KSS Webpack Plugin can automatically inject any chunk into the styleguide by simply refering to the chunk name ("styles"), not the output filename. 

Combined with webpack-dev-server, our development stack can now compile SASS and generate a styleguide at the same time, with nothing more than SASS files. A `webpack.config.js` example would be:


```js
var KssWebpackPlugin = require('kss-webpack-plugin');

var KssConfig = {
  source: './assets/scss/*.scss',
  chunks: ['manifest', 'vendor', 'common', 'styles']
};

var webpackConfig = {
  entry: {
    styles: './assets/scss/index.scss',
    common: './assets/js/index.js',
  },
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [new KssWebpackPlugin(KssConfig)]
};
```
