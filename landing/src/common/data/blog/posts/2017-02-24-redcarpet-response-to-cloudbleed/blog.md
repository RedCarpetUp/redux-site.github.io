---
author: Sandeep
type: 'blog'
date: '2017-02-24'
description: 'we strongly believe in being transparent with our users, so we’re publishing a declaration of the incident’s effect on our service.'
title: RedCarpet's Response to Cloudbleed
image: './network.jpg'
path: /2017/02/24/redcarpet-response-to-cloudbleed
visibility: 'show'
---

Cloudflare and Google’s Project Zero [published details of a security incident](https://blog.cloudflare.com/incident-report-on-memory-leak-caused-by-Cloudflare-parser-bug/) affecting websites and apps that use Cloudflare, nicknamed “Cloudbleed.” This bug has a high probability to lead to compromise of sensitive PII data (like usernames and passwords) from websites and APIs that use Cloudflare.

**There is no risk to the vast majority of RedCarpetUp customers**. Since we strongly believe in being transparent with our users, so we’re publishing a declaration of the incident’s effect on our service.

The RedCarpetUp apps for Android as well as our **_Primer_** lending management system are not affected by the vulnerability because they use APIs which are not behind Cloudflare. Some of our marketing websites do use Cloudflare, however there is no PII data that is passed through these websites.

One of these websites use Wix.com, which we believe could be potentially be compromised, however we have taken all necessary steps to make sure there is no data that is being lost.

If you have any questions or concerns, please don’t hesitate to reach out! You can reach our security team directly at support@redcarpetup.com.

We have also taken steps to check which third-party api services we use and think may have been affected to eliminate any risks. For every third party provider we use, we have checked whether they use Cloudflare,
