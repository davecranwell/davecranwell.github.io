---
layout: post
title: Experiences of Drupal so far and misc
created: 1297687219
---
<h3>MySQL</h3>
OSX already comes with OSX Server, but its not the most recent version. At work, we have some documentation on how to set up a Mac for Drupal development which I can paraphrase. MySQL provide <a href="http://dev.mysql.com/doc/refman/5.1/en/macosx-installation-notes.html">pretty decent installation documentation</a> themselves, but the basic steps seem to be:
<ol>
<li><a href="http://dev.mysql.com/downloads/mysql/">Get an official DMG file from the mysql site</a></li>
<li>Make sure you install the StartupItem dmg too as this is necessary to get it running whenever you boot</li>
<li>I also had to use <code>sudo chown -R root:wheel /Library/StartupItems/MySQLCOM</code> which didn't appear to have the correct permissions by default.</li>
<li>PHP needs a socket to MySQL, which is a file sometimes put in  <code>/var/mysql</code>, sometimes  <code>/tmp</code>. Which path you need depends on the PHP installed (i'm assuming you have at least PHP 5.2) and can be found in <code>/etc/php.ini</code>. Create the socket with something like <code>sudo ln -s /private/tmp/mysql.sock <em>[whatever the socket path in php.ini is]</em></code></li>
</ol>

The chown-ership of the MySQLCOM startup item, and the php socket seemed to be most important for me.

<h3>Version control</h3>
I've been using checked-out version control repositories as the codebase for my websites for a while now. Whether you're a fan of SVN, Git or whatever, the ability to alter a codebase in a development-conscious way from the command line, beats the standard "FTP up your files" principal hands-down. 

FTP has no concept of versions or of what you've recently been working on and is so inherently insecure that I disable it completely on my server. This of course raises problems with getting files onto your website. The way I and countless others do this, is to put all your files into version control, then check out trunk (or a branch or tag, or whatever) to your website root. Once you <code>commit</code> changes in your version control, deploying to your live site is as simple as typing <code>svn up</code> (or similar) on the command line of your server. This particularly comes in handy if you're working on a new feature or theme. If your feature/theme is kept in a branch or tag, you can run <code>svn switch</code> on your server to instantly turn off the old codebase, and turn on the new one which includes the feature. If it turns out you've fucked something up, you just <code>svn switch</code> back again and the mistake is removed in seconds.

Of course this works even better if your live server also functions as your repository, as it does for me, as the changes are even quicker, but pulling from <a href="http://github.com">github.com</a> or similar will still be pretty quick.

The one problem with version control and Drupal7 specifically, is the deceptively convenient feature in D7 to allow you to automatically install themes or modules through a web-based upload interface. You type in the URL of a module zip and Drupal downloads it and installs it for you. However it does so <strong>to the sites/all directory</strong> which is the folder used to hold modules/themes common to every site you run through the Drupal frameowork. This is frustrating because if Drupal is truly to function as a multi-site framework, you ideally want to keep each site as lean as possible - so no unnecessary modules - and <em>in version control</em>. Installing modules outside your working copy folder renders the automatic install process somewhat redundant as you have to manually move the folders. I'm yet to find out how to alter the upload directory in Drupal, although I don't doubt its possible.

<h3>Drupal misc</h3>

Despite my reliance on version control for my codebase, it is sometimes nice to be able to preview a change, or an entire theme, without making that change live. Firebug is of course invaluable here, but it doesn't easily propagate changes between requests and its sometimes nice to be able to check several pages. What Drupal lacks out the box (although, again, i'm sure theres a module) is the ability to preview an entire theme without making it live. If it does already exist, I can't seem to find it.

D7 has had more thought than its previous version, put into the semantic worth of the markup it generates, or perhaps at least Bartik has (the new preferred theme). Now it seems that by default the classes applied to content it generates are generally nicer. If you've got a block containing recent content, the class applied to the container is "block-recent-content" where before it might have been "block-block-1" or something nondescript which made your stylesheets indecipherable. Despite this, Menus still lack nice classes. The <a href="http://drupal.org/project/menu_attributes">menu_attributes</a> module has filled a nice hole on this front, allowing me to add specific classes to each menu item - which is what allows me to hang "twitter" and "linkedin" classes from the link elements in the header of this site. It would ultimately be nice if Drupal took the name/title/value of all content you added and consistently used that for class purposes. You can add this feature yourself, but it seems avoidably obvious. Of course this increases the chances of classes with low semantic worth (class-names which describe how something looks, not the role it plays) but its got to be better than having no classes at all.

<h3>Other stuff</h3>
You may have noticed the use of nice fonts for the headings - thats the Babas Neue @font-face from <a href="http://fontsquirrel.com">fontsquirrel.com</a>. Font face is great as it allows for nice non-webby fonts on all browsers, even IE6 which in an unusual turn of events has supported it for years.

The one thing which really doesn't work appears to be @font-face combined with text-shadow in IE. Of course IE has no standard implementation of text-shadow, you're required to use one of those nasty "filter" attributes, but either way the combination is horrific, with the previously nicely aliased @font-face suddenly becoming horribly jagged. The text-shadow is fine when used on non-font-face fonts, but not on them. Shame.

