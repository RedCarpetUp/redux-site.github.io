---
author: Sandeep Srinivasa
type: 'blog'
date: '2017-11-29'
description: 'RedCarpet brings about access to credit to the 80% of India that is not covered by any bank or financial institution.'
title: 'Design For Honesty'
image: './Weighing_of_the_heart3.jpg'
path: /2017/11/29/design-for-honesty
visibility: 'show'
---

RedCarpet brings about access to credit to the 80% of India that is not covered by any bank or financial institution. According to the [RBI's own data](https://m.rbi.org.in//Scripts/PublicationReportDetails.aspx?UrlPage=&ID=763) - "_Based on international data, India is ranked 28 in “Getting Credit” and the coverage of CICs accounts for only 19.8% of adult population, as against 100% in several countries._". At RedCarpetUp, we are trying to bridge this gap by acquiring hard-to-get data on the ground and leveraging machine learning to build credit scores that works for the 80% of India that are not covered by traditional credit bureaus.​

Some of this data is<strong> sensitive data that we request our customers to grant us custody of.</strong> We are heavily mindful of the fact that we are mere custodians of this data and we obsess about how to handle it. For example, we take extra caution to make sure all our data resides in India based servers and subject to Indian law jurisdiction (even though some of our application servers may be globally distributed). We also over-engineer our systems for tamper-resistant safety, especially when it concerns Aadhaar data (as mentioned [here](/2017/09/18/securely-encrypting-aadhaar/) ) ... and try to ensure that our endpoints are compliant with the best of practices in SSL security

_(P.S. we build our own nginx as part of deployment. Please dont attempt this.)_

<img src="/images/blogs/qualys.png" width="60%" height="50%" style = "border:none;margin-left:20%">

One of the big initiatives we took early on is to rethink how we ask for data from our customers in an easy to understand manner, so that **we give the user, both the power and the understanding to refuse**. We think of ourselves in the same space as Apple's Siri or Google Assistant or Amazon Alexa - anytime you own these devices, they are **constantly** listening to you... even your most private conversations. However, the amount of trust we have towards these organization helps us be comfortable with the notion of entrusting our data custody to them. At RedCarpet we hope to be worthy of that trust.

However, we are also very well cognizant of a concept called **Permission Blindness** - where users dont even check the permissions that an app is taking. For example, an file manager app may ask for permission to read your emails... and you wouldnt bother to check it carefully. The app is engineered in the right way (asking for permissions), but a user may still not have the understanding of what it means. Android's concept of [_Runtime Permissions_](https://android-developers.googleblog.com/2016/02/marshmallow-and-user-data.html?m=0&hl=vi) was designed to solve some of this problem, but it is not good enough because customers dont understand the implications of what they are giving up. For example, a food ordering app may ask for SMS reading permissions on your phone (and follow the [design guidelines](https://material.io/guidelines/patterns/permissions.html#permissions-usage)) - you do not know if they are really reading all the SMS or just the OTP verification SMS. Moreover, in India, runtime permissions are not available on the older phones.

At RedCarpet, we are designing for the Next Billion Users in India - this was not good enough. We wanted to make sure that when users hand over their data to us, they are making a full informed, thoughtful choice... and we are just not hedging on _permission blindness_ to get an app install. Which is we designed our own permissions screen.

<img src="/images/blogs/screen.gif" width="30%" style = "border:none;margin-left:20%">

In this screen, we wanted to answer 3 questions:

1. **How do you give credit, when nobody else can ?** (by using your data to help in our risk evaluation)
2. **What data do you take from me ?** (SMS, contacts, geolocation, etc)
3. **How do you use this data and how do you safeguard it ?** (verification calling, security, SSL, etc)

Answering this was a very hard problem for our brilliant designer @gbaheti. It took him several scores of iterations before we ended up at something that is interactive, information dense and answers all the three questions. I'm pretty sure he wanted to throw in the towel far sooner ;)

Incidentally, this screen is where we have the highest dropoff rate for our users. Remember, unless you explicitly press **"Accept"** here, **we will not touch any of your data, even though the app has all the permissions to do so**. We believe this is the point where a user can make an informed choice - whether they trust us with their data...just like they trust Siri/Google Assistant.

One of the interesting things that happened as a consequence of this is that, we have very less trust or data related complaints from our users - they understand.

That makes us happy. We call this Designing for Honesty.
