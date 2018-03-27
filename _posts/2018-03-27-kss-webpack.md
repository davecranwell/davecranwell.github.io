---
published: false
layout: post
---

At work we're documenting a large-scale UI overhaul in which we're using Webpack to compile the front end assets. We also need a [Pattern library](adele.uxpin.com). Our company's software is large and complicated enough that even in contrived developer environments you can't easily find examples of every part of the UI. Pattern libraries allow you to document everything in one place, cross refer patterns and check for visual regressions, without needing to use the product itself.

We compared a shortlist of was [KSS](https://github.com/kss-node/kss-node), [SC5](https://github.com/SC5/sc5-styleguide), [PatternLab](https://patternlab.io/) and [LivingCSS](https://github.com/straker/livingcss). Low effort was important - the more effort required, the less incentive to maintain it. Customisation was also important. Few of them provided what we needed out the box, but if they could be extended it didn't matter.

LivingCSS was our first choice. It's easily customised, but we discovered its dependence on JSDoc comments was frustrating and the language in which example were written was inflexible. PatternLab is hugely popular but required separate example files. We've settled on KSS which has so far done everything we need. 

But how to generate it?

## KSS-Node

KSS comes in various flavours, but in a Node environment we want [KSS-node](https://github.com/kss-node/kss-node). It's implemented with inline comments in CSS/SASS files.

### A KSS comment block looks like this:

```css
/*
Button

Markup:
<button class="button">
	{{#if text}}
		{{text}}
	{{else}}
		Click me
	{{/if}}
</button>

Styleguide: Button
*/

.button {
	background: red;
	color: white;
}

```

Multi-line examples _really_ benefit from the simplistic comment style. You can also uses SASS/LESS comments, prefixing every line with `//` but these are tedious to work with over multiple lines.

### You can use handlebars partials in examples

KSS examples are written in Handlebars markup. So with the `.button` example above you can easily write:

```css
/*
Button group

Markup:
<div class="button-group">
	{{> "Button" }}
</div>

Styleguide: Button.group
*/
```

That `{{> "foo" }}` code is Handlebars "partial" syntax. `foo` corresponds to the value defined for each pattern's `Styleguide:` property. Partials can take parameters and operate as wrappers/blocks too, these are useful for supplying other content for your examples.

## KSS-webpack-plugin

We found [KSS Webpack Plugin](https://www.npmjs.com/package/kss-webpack-plugin) to bridge that gap of executing kss-node on the CLI, with the inclusion of webpack-generated assets within it. We contributed some changes and it now does everything we need.

Support for Webpack's "chunks" was vital. This meant any CSS or JS created by webpack could be injected into the styleguide effortlessly. Combined with webpack-dev-server, our development stack can now compile SASS and generate a styleguide at the same time, with nothing more than SASS files. A `webpack.config.js` example would be:


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
