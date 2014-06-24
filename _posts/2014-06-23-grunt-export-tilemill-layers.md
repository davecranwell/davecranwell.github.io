---
layout: post
title: Using Grunt.js to automate export of Tilemill layers
image: map.jpg
---

I recently created a [choropleth map for The Internet Society](http://www.internetsociety.org/map/global-internet-report/) where survey data was used to colour interactive maps. The data had several metrics each represented as a switchable layer.

The map tiles were created with [Tilemill](https://www.mapbox.com/tilemill/), an application solely for that purpose.

In Tilemill you configure "Projects" where each project comprises a map, some colour definitions, some data, and several layers of information e.g country boundaries, roads, lakes, bus stops etc.

When you export your finished map it "flattens" those layers into one.

A problem arises when you need to export multiple separate layers as in [this example](https://www.mapbox.com/mapbox.js/example/v1.0.0/layers/). Tilemill has no means of doing this and every export from the same project is named the same. Even if you renamed the resulting files, once they got uploaded to Mapbox.com they get assigned a random unidentifyable name and their only other identifying meta data is their project name, which are all the same!

The solution using Tilemill is either to create a new Project for each layer (much harder to manage) or for each layer, disable all the *others*, rename the whole project after that layer and export.

Now chuck in the inevitability that the client corrects the data several times. Each time, all your layers have to be exported. This can get extremely time consuming.

<h3>An automated solution</h3>

It turns out that Tilemill is actually a [Backbone.js](http://backbonejs.org/) web application running on a [Node.js](http://nodejs.org) server distributed with the app. The main executable in the app is in fact a javascript file which Mapbox have wrapped with a [command-line interface](https://www.mapbox.com/tilemill/docs/manual/exporting/). 

Furthermore each Tilemill project is saved as a JSON file `project.mml`. Within it an array contains each of your layers, with an ID, a status and more.

{% highlight javascript %}
"Layer": [
    {
      "geometry": "polygon",
      "id": "foo",
      "status": "on"
      // ...
    },
    {
      "geometry": "polygon",
      "id": "bar",
      "status": "off"
      // ...
    },
    // ...
]
{% endhighlight %}

There's another hurdle too: Tilemill project files **must** be called `project.mml`. You can't even pass another .mml file as an arg to the CLI.

This is where Grunt comes in. We can automate several processes:

1. Create a duplicate of `project.mml` in which we disable the layers we don't want, called `project-foo.mml`
1. Temporarily backup `project.mml` to `project.mml.bak`, rename `project-foo.mml` to `project.mml` and use the CLI to run an export of layer "foo" only
1. Restore `project.mml`

This is the Grunt task for point 1.

{% highlight javascript %}
grunt.registerTask('prep-export', function(){
    var baseConfig = grunt.file.readJSON("project.mml", {encoding:"utf8"});
    var layersLength = baseConfig.Layer.length;

    // for each layer...
    for(var i=0; i<layersLength; i++){
        var theLayer = baseConfig.Layer[i];

        // ... loop through them all
        for(var j=0; j<layersLength; j++){
            var tmpLayer = baseConfig.Layer[j];

            if(tmpLayer.id != theLayer.id){
            	// ...disable all the other layers
                tmpLayer.status="off";
            }else{
            	// ... Apart from the one we're on
                tmpLayer.status="on";
            }
        }

        // Rename the project after the layer we're interested in
        // This name is inheritted by exported tiles
        baseConfig.name = theLayer.id;

        // Save to a new file
        grunt.file.write("project-" + baseConfig.name + ".mml", JSON.stringify(baseConfig), {encoding:"utf8"})
    }
});
{% endhighlight %}

We create a task to achieve points 2. and 3. using [grunt-shell](https://github.com/sindresorhus/grunt-shell) 

(nb: your path to the Tilmill main file `/Applications/TileMill.app/Contents/Resources/index.js` may differ)

{% highlight javascript %}
	grunt.initConfig({
		shell: {
		 	options:{
                stderr: false
            },
            backupproject:{
                command: 'mv project.mml project.mml.bak'
            },
            exportfoo: {
                command: [
                    'mv project-foo.mml project.mml',
                    'cd /Applications/TileMill.app/Contents/Resources/',
                    './index.js export my-project ~/Desktop/foo.mbtiles'
                ].join('&&')
            },
            // ...
            restoreproject: {
                command: 'mv project.mml.bak project.mml'
            }
        }
	});

    grunt.registerTask('export-maps', [
        'shell:backupproject',
        'shell:exportlayer1',
        // ...
        'shell:restoreproject',
    ]);
{% endhighlight %}

The final task is sadly manual. That's the uploading of each set of tiles to Mapbox.com. However once they're up there, the changes we made to the project name in each fake .mml file, means the layers will be named identifyably.
