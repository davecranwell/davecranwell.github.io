---
published: true
title: Scam protection using a Raspberry Pi to perform caller ID and risk-assess incoming calls
layout: post
---

My dad is getting on and isn't super tech-savvy. In fact some nice Indian gentlemen liberated a few hundred pounds from him in exchange for unlocking his own computer for him. Twice.

I'm doing all the education I can, but what "offline" people expect from the internet and its citizens is a challenge. The idea that staff from a reputable megacorp would benevolently, and for no explained reason, phone you up out of the goodness of their hearts, because your computer - your computer amongst billions - had a virus...this is not at all suspicious to a huge percentage of the population.

Since these events I've become obsessed with ways of helping Dad. I've spent months of my life watching [Jim Browning's](https://www.youtube.com/channel/UCBNG0osIBAprVcZZ3ic84vw) scam exposure videos. I wrote plain-english notes to be kept next to his phone on how to identify scam calls. Still he got sucked in on futher occasions and only managed to avoid serious loss because he _doesn't have an Amazon account_. I've even resorted to blacklisting _all_ his calls. This means the only calls allowed through must be manually white-listed. But you've guessed it, that whitelist must be managed online, using a badly architected React webapp, with no thought to information architecture or simplicity, that Dad doesn't want to use.

The number of malicious calls he receives is clearly well beyond what British Telecom's pathetic Call Protect systems can keep up with. Scammers can change their numbers at will thanks to unscrupulous telecoms companies selling new ones, so BT and any other spam prevention system will always be playing catch-up.

## Landline users are lagging behind

What BT can't do themselves, however, crowds can. Websites have cropped up like [who-called.co.uk](who-called.co.uk) in which anyone can search for a number to find what others have said about it. And, having tirelessly compared my dad's phone records against services like this, they are mostly very accurate. But of course, my dad isn't going to check these sites - his computer is turned off at the wall.

Caller blocking devices do exist, but these are post-hoc. If you receive a call you don't like only _then_ you block it. Most aren't even web-capable.

Mobile phones often ship with caller identification packages, but landlines are still hugely popular in the older generations and are completely adrift from the release cycle of Android or iOS. **What consumers are missing is a centralised, democratised, orchestrated effort, to cut off dangerous callers at a handset level**.

This is essentially what I've attempted, as a little passion project:

## [Badcaller](https://github.com/davecranwell/badcaller)

With a Raspberry Pi, a tiny USB Modem, some code and a few tedious hours trying to understand the [Hayes AT Commands set](https://en.wikipedia.org/wiki/Hayes_command_set), I've got a reasonable first draft of a box that can be placed beside the phone and can both identify and danger-check every phone call received. The big omission right this moment, is a screen. The "Badcaller" system is for now a browser-based display of your incomming calls and their danger. But this requires you to have a PC, or a phone - this isn't going to help Dad just yet. My next step would be to add a small screen, then perhaps a housing. Raspberry Pi's can be reasonably easily put into a "Kiosk mode" and when that's viable, I hope to test it with him.

This is, of course, a doomed project in a way. The best outcome I could possibly achieve - making all scam calling untenable at a global level - would make this project/product useless. But it would be nice if someone else wanted to help and give it a shot. Let me know if you do!

Read more about the project on the [Github page](https://github.com/davecranwell/badcaller)










