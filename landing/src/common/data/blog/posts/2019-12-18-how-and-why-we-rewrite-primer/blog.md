---
author: Nishant Bhatia and Etee Dubey
type: 'blog'
date: '2019-12-19'
description: 'Redcarpet Web Application (Primer): Why And How We Rebuilt It From Scratch (Part 1)'
title: 'Redcarpet Web Application (Primer): Why And How We Rebuilt It From Scratch (Part 1)'
image: './primer.png'
path: /2019/12/18/how-and-why-we-rewrite-primer
visibility: 'show'
---

In 2019, we took made some major changes to our company’s fabric. We revamped our onboarding flow, made major changes to our android app, and re-built our web application from scratch. Our web application, otherwise known as the ‘Primer’, manages all of the company’s operations. This blog details why we decided to take on the major task of rebuilding our Primer. Moreover, we detail our entire process of all the major changes we made to this web application.

## What Is ‘The Primer’? 

We often deem the Primer as our one-stop application to manage all of our operations. Our agents use it on a daily basis to add, check and edit details like loans, user and card details, payment details, deliveries, and a lot more.

Our internal agents use the Primer for 8-10 hours a day on a daily basis. Some of the major operations they use it for are:

1. **Update User Profile** - To see, edit, update and add all of the details of a user including the name, address, card details, limit assigned, loans of that user, documents of that user, bank details, etc.
2. **Manage Loans** - Through the Primer, the agents manage loans for all users. This includes tasks like adjusting EMI, payments, late fees or any other fees. They often use it to create monthly bills.
3. **Manage Funnel** - They manage the onboarding flow of all of our users through the Primer. Agents can check which user has applied. They can do the user’s KYC’s, approve/reject an application, assign or track cards of the respective user.
4. **Recon** - Through the Primer, our financial team tracks all payments/refunds and match them with bank accounts, generate reports for our investors, etc.

## 1) Better User Interface

One of the major issues we faced was changing our user interface. We wanted the Primer to be extremely responsive, capable of having a great interaction with the agent. This entailed that we had to ace on all 3 counts- appearance, interaction and interface logic. Moreover, when setting out to design our Primer, we kept the 4 golden E’s of User Interface (UI) design in mind: easy to use, easy to understand, error-free and effective.

### Our Goal

Our stakes were high because a bad UI design could irritate the agent and could feel exhausting. Even worse, it could spread disinformation about our work. We decided to create a web application that worked intuitively, leading the agent to have a great experience. However, for this, we had to understand the specific elements we wanted our new design to incorporate. 

Moreover, we wanted the Primer to have a very responsive design. We wanted it to easily adapt to the device size and resolution. A bad design could ruin the agent’s interaction with the Primer and we wanted to avoid this at all costs:

<img src="/images/blogs/image3-pri.png" width="15%" height="10%" style = "border:none">

Secondly, we wanted our design to have a consistent theme. We wanted the Primer flows to have visual harmony. So, our latest UI design had to be consistent in style so agents could clearly understand and respond to the given content. We took cues from sites like Ono that had a seamless and consonant UI design.

<img src="/images/blogs/image4-pri.png" width="15%" height="10%" style = "border:none">

Thirdly, we wanted the Primer to have a clear contrast. This way we could highlight the important information and follow Redcarpet’s official colour scheme. 

Most importantly, we wanted the Primer to have great information architecture. We wanted our design to be minimalistic as we wanted it to be agent-centric as we had our target users in mind while creating the new UI design. We wanted the new Primer design to strike just the right balance between delivering the right information without compromising on the usability. We were especially influenced by great information architecture in web apps like Proposable. Such clear design made it easier for the user to comprehend the information and take the required action with ease.

<img src="/images/blogs/image1-pri.png" width="15%" height="10%" style = "border:none">

### Our Solution

We decided to use a UI design that addressed all of our problems at once. The Clean UI Template allowed us to customize the UI components that we wanted to change. It helped us to create extendable and reusable interface components. Moreover, the GPU performance with animations allowed us to create an ultra-smooth and fast user experience. We added nominal CSS to further make our design coherent that led it to have a professional look.

The user interface of our previous Primer was not React-friendly. We had to make several rounds of edits in order to change any UI in it. However, this resulted in performance issues, code blunders, code overheads, poor project management. However, the theme we bought is built with Clean UI and React 16.8.1 at its core. This enabled us to handle any theme related changes with ease.

## 2) Efficient UX Design

After fixing the issue of the user interface, we started paying attention to another important aspect of our Primer- the user experience (UX). In our old web application, we built new flows when we needed them. On the surface, a page might be working fine. However, the overall application did not have proper transitions. This hurt the format, data flow and visual consistency of our Primer. In fact, we had elements like forms, tables, charts, drawers, etc placed in random places and we didn’t look at our Primer as a whole but in parts. Evidently, this affected the way the agents felt when they used it.

### Our Goals

When we set out to revamp the UX design of our app, we had certain goals set beforehand. For starters, we wanted our Primer to be easy to use. The first step was to focus on the learning curve for the agent. This meant that if a new agent comes in contact with our Primer, s/he is able to navigate and use it effortlessly. 

Next, we wanted the Primer to be efficient. Here, we tried to use some of the most amazing UX tricks in the market. Some of our major priorities within the Primer were efficiency, easy manipulation, efficient flows and clear navigation. 

### Our Solution

Before revamping the entire Primer, we set out on a project to analyse our tool. We decided to rethink all of the menu options including the forms, tables, filters and component. Since we already had an elaborate idea of our end goals, the process became easier. We created the UX design from the user’s point of view and ensured that it was easy to access and manage data with the new version.

To achieve easy manipulation, we went back to the UX design basics. UX designers often utilize the Fitts’ Law logic while working on the project. In simple terms, the law states that the amount of time required for a person to move a pointer to a target area is dependant on the distance of the target and the size of the target. Using this logic, we made our buttons bigger and minimised the distance between the attention area and the task-related button. We were inspired by web apps like Campaign Monitor that handled easy manipulation rather efficiently. 

<img src="/images/blogs/image5-pri.png" width="15%" height="10%" style = "border:none">

Finally, we focused on clear navigation so agents knew exactly where they are on the web app and didn’t feel lost. During this process, we also optimized our flows so the user can complete any task in the minimum number of steps. Here, we took cues from some of the best UX designs in the market. For instance, Mailerlite did a great job of reminding the user of which stage of the process they were.

<img src="/images/blogs/image2-pri.png" width="15%" height="10%" style = "border:none">

## 3) Directory Structure

Previously, we had no coding structure whatsoever. Our static files were scattered because our old project was not structured from the start. We had folders inside folders and this made it impossible for us to change code. Adding to our problems was the fact that our page code was kept in random directories. 

### Our Goals

Defining any coding structure is considered a rather lengthy and tiresome process. We could not employ someone to structure the code either because it was indecipherable to someone who hadn’t helped write the code. Incidentally, this was what we set out to fix. Our first goal was to create the basic structure of the code and then setting it up for easy future edits.

### Our Solution

We could no longer afford to just add features or create folders as they came. Hence, we created a basic outline of technologies and language that we will use and how we could structure that. We clearly defined our project details for future reference and edits. We made dedicated folders for static files and configuration folders. Then we organized our code by components and reduced complexity by emphasizing external cohesion of code units. We ensured that the packages have a minimal interface so that it only exposed concepts that were directly affected by the service provided by the component. Furthermore, we focused on internal cohesion so that the code was related to the provided service. This ensured anyone reading the code that the storable interface encompassed all the information they required.

Furthermore, we documented every progress in our code. This was done for a simple reason- to make things easier for any other programmer if s/he takes over the project. Next, we paid special attention to keep the code clean and lean. We wanted our code to be as simple as possible so that it was easier to read and used comparatively fewer resources. Moreover, we tested our code at each stage before moving to the next one,

Finally, we picked up design in the last stages and this eliminated the need to retouch and readapt it from the start. 

## Conclusion

We revamped our entire UI, UX and directory structure only to realise we still had a lot of challenges lying ahead of us. We still had to work on our old technology, get rid of the monolithic components and eliminate the junk data. Most importantly, we still had to deploy and migrate our agents to the new Primer along with the basic training. We will be detailing all of these issues in the second half of this blog and how we went about solving them.

**About The Author:** This post has been written by Nishant Bhatia and Etee Dubey.