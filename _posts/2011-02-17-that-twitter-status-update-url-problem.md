---
layout: post
title: That Twitter status update URL problem
created: 1297960918
---
<p>I just thought i'd cursorily document a bizarre quirk with Twitter's status update system, that we at <a href="http://torchbox.com">Torchbox</a> seem to experience every <em>n</em> months or so, when a new client asks us to integrate.  It's simply demonstrated, thus...</p><p>Visit this URL:<br /> <a href="http://twitter.com/?status=I'm testing how well this gets encoded">http://twitter.com/?status=I'm testing how well this gets encoded</a></p><p>Then visit this URL:<br /> <a href="http://www.twitter.com/?status=I'm testing how well this gets encoded">http://www.twitter.com/?status=I'm testing how well this gets encoded</a></p><p>For some unknown reason, calling twitter with the <code>?status</code> query string, at the WWW-version of the domain causes the query string to become unexpectedly URL-encoded. Visiting the naked domain does not.  Just don't use the WWW-version and you'll be laughing. Mainly at Twitter, for this seemingly avoidable stupidity.</p>
