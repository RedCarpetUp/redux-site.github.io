---
author: Sandeep
type: 'blog'
date: '2017-02-21'
description: 'Over the course of 3 years that we have been trying to disrupt payments, we realized in late 2015 (when we were in YCombinator), that the bigger underserved need was access to credit.'
title: Please Sir, Can I Have Some More?
image: './mark.jpg'
path: /2017/02/21/please-sir-can-i-have-some-more
visibility: 'show'
---

When we started building RedCarpetUp, we set out a very simple target - build a platform (P.S. not a software tool) that solves a small retailers biggest pain point : the ROI of customer marketing. Hitting that target has been a monumental effort - building fundamental technology around desktop software (even on really old, shitty point-of-sales), async APIs, and big data analytics. We have understood how to port security patches to really old, legacy systems infrastructure - we take our security very seriously and try to be consistently at A+ security ratings on SSL Labs (as opposed to some of the new “wallet startups” that score a F- !!!).
We built  fundamental technology on top of NFC long before Apple Pay and when pretty much everyone had written NFC off.

Over the course of 3 years that we have been trying to disrupt payments, we realized in late 2015 (when we were in YCombinator), that the bigger underserved need was access to credit.

For Kartik and I, this realization was organic and it took a long time to surface. We realized that most ecommerce in India happens on credit (cash on delivery FTW!) and that the banking infrastructure in India was broken. But we already had a running product serving offline payments.
It is a tough call for any business, and even more so, for a startup to make the shift from a running business to another. But we were in good company - hell, Intel did it. But we were particularly inspired by our investor, Justin Kan, who pivoted Justin.tv to Twitch.tv along with his cofounder Michael Siebel.
The way he did it was to set a hard target to test out a product-market fit and fight to meet the target. That particular day was when they make a hard decision to continue or abandon the pivot.
We built out the first version of RedCarpet lending the hard way - with no money, first by going out on the streets with pen and paper... then on excel .. then on R.. and now on Spark. Both of us did collections and recovery from the narrow streets of Chandni Chowk the hard way (and Chandni Chowk is NOT an easy place to do collections and recovery!).

We figured out that the way do build a true lending business the right way was to combine hard data science with true operational grit. You cannot do thin-file lending without operational tie in, because you need to feed back the data which you get from your operations and recovery team to influence. Unlike a lot of others, we dont receive "pre-approved" whitelists from banks and drive a pure customer acquisition game. We are fundamentally trying to disrupt and open up new markets and that needs a new kind of science and operations.

From Sasha Orloff at Lendup (another YC company), we learned that risk-as-a-business-metric needs to work in tandem with risk-as-a-data-science-metric. This is also what we learned from Max Levchin of Affirm - we really take the concept of ["Tuition Fee"](https://blog.mixpanel.com/2016/05/11/max-levchin-rethinks-consumer-finance/) to heart. This is actually the reason that we built **_"Primer"_** - our lending management system that works as a combination of Intercom.io, Mifos and EarlyResolution. Its named after our favorite [movie about time travel](<https://en.wikipedia.org/wiki/Primer_(film)>) and thats what it primarily does - capture timelines to allow us to do extensive backtesting and iteration.

**_Primer_** allows us to do confidence based rollouts with variations of lending products and do rollout and expansion testing (our "tuition fees") and gather data in our credit expansion segments.

The need for credit is massive in India. What is needed is a judicious combination of deep data science, operational efficiency and business analysis of risk to build the bank of tomorrow.
