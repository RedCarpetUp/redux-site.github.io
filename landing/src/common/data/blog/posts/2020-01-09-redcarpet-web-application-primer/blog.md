---
author: Nishant Bhatia
type: 'blog'
date: '2020-01-09'
description: 'Redcarpet Web Application (Primer): Why And How We Rebuilt It From Scratch- Part 2'
title: 'Redcarpet Web Application (Primer): Why And How We Rebuilt It From Scratch- Part 2'
image: './image1.png'
path: /2020/01/09/redcarpet-web-application-primer
visibility: 'show'
---

In our previous blog, we mentioned why we decided to take on the major task of rebuilding our web application, otherwise known as the Primer. After revamping our user interface, UX design, and directory structure, we moved on to rectify some equally important issues we were facing. We introduced Hooks and Context, eliminated our monolithic code style and got rid of our junk legacy data. In this blog, we detail how we went about bringing these changes and the problems we faced while doing so. 

## 1) Introducing Hooks and Context

In our previous app design, data was Redux store, i.e. it was at the project level. The individual pages did not have any state of their own. Hence, we were using ‘stores’ to communicate data between components. After a while, we realized that most of the data in stores were specific to a single page of the application. In fact, we had not been sharing any data across pages. Moreover, we had no way of doing page-level storage.
Also, our code had to be class style with Redux and we wanted to start using functional components that Redux did not support. 

## Our Goals

The solutions to most of all problems lied in React Hooks and Context. We wanted to be able to manipulate states and interact with component lifecycle methods in our React Functions. Secondly, we wanted to test our state/lifecycle logic. The only way to accomplish that was through reusable components and React Hooks allowed us to do the same. 

Moreover, we needed to avoid potential bugs and performance issues. For this, we used the component lifecycle method. Evidently, this all provided us with a better experience with Function Programming and Middleware Programming. Finally, we also wanted to make our integrations with 3rd party libraries easier and sensible.

## Our Solution

Our solution was to switch to Hooks and Context API completely. In fact, our first step was to remove all of the redux code and start using Context API from the get-go. While designing the components, we used the functional approach in place of class. Moreover, we used hooks to maintain the state. 

As a result, our code became cleaner, shorter, and far more manageable. We were now able to manage state at a better and at a more granular level.

## 2) Monolithic Code

Apart from all of the structural changes, we were facing a problem with our monolithic code style. Previously, we had written some really long codes just for a single page and single file and treated it as one single component. 

## Our Goals

The problem here was twofold. First, this made our code impossible to reuse. Formerly while writing code, we used to create a single component for all pages. Consequently, we usually used to put all of our logic in that code for different pages. This resulted in a long and giant component that was impossible to customise. It also made it hard to edit the code for any specific need or make new changes if solely one page needed it. 

Keeping our issues in mind, we now wanted to create a code style that allowed us to make state changes without having to re-render the entire application. We also wanted to make reusability possible. Apart from that, we wanted to create a code style that made testing effortless. Our current structure made it difficult to test edge cases since we could not keep the testing process limited to the parts we were trying to test. Moreover, it also made it hard to know which pieces of state and event handlers went with what parts of JSX.

Our goal was to create a coding style that allowed us to use third-party component libraries. Furthermore, the current code structure did not allow us to encapsulate imperative abstractions/APIs in a more declarative component API. This resulted in an imperative API scattered throughout the lifecycle hooks of our one giant component. This made the code extremely hard to follow.

## Our Solution

For eliminating the monolithic code style, we broke up pages into reusable components. This way we could duplicate the code in all places if we ever needed the same functionality in different places. In fact, we did not write any code in the page file. We applied this rule even if a page had just one single table. Now, all of our pages are containers for components, apart from the nominal logic we included there. Moreover, this allowed us to work with multiple engineers on the codebase without having to think about merge conflicts.

## 3) Junk Legacy Data

Another major problem that we faced was the existence of a huge quantity of junk data. This was the junk of old data that showed on the screen that agents were not using anymore. 	Removing the legacy data entailed a lot of problems. For starters, our system was extremely large in terms of codebase and functionality. Since it was written in a monolithic structure, it was hard to just replace one particular system module. A small data change/deletion could mean conflicts all over the system. 
Over time, the underlying infrastructure became extremely hard to maintain as well. It was hard to reorganize the data for storage space optimization because it was scattered across several databases and storage resources. What’s more, it was extremely expensive and time-consuming to gather and systemise legacy data manually to further transfer it to a new database.

## Our Goals

Our main aim was to identify and remove all of the junk data for cleaner data representation that offered up space to add more things. Moreover, we wanted our new Primer to be integration-ready with efficient use of APIs. We could not use this functionality with the legacy data and system as it lacked compatibility because connecting our legacy Primer to a third party tool/service required a lot of custom code. 

## Our Solution

When we had started rebuilding the Primer, we made a matrix of data (like data columns, data analysis stats) that was displayed on the Primer. However, as our company evolved, so did the matrix. So, after a numerous number of iterations, we got a stable matrix which we currently use. After each iteration, we changed the Primer to show the new matrix, but we never removed the old matrix in this process. So, our next step was to identify all such old matrices. Thereafter, we started removing them one by one. Now, we had an extremely meaningful and precise data to work with. Earlier, our data was scattered in multiple pages. So, during the data cleaning process, we tried to move similar data into one page and ensured that we kept it clean for better data representation. 

## 4) Offline Support

When we were thinking of revamping our Primer, this was one of the first things we had decided on doing. Previously, the Primer had no offline support. This meant that the entire web application went down in case the internet was disconnected. Moreover, we had no support for page or data caching. This impacted the UX of our Primer greatly and resulted in a lot of time wastage.

## Our Goals

We wanted our Primer to have an advanced user experience. Hence, we created certain roadmaps for ourselves. Apart from offline support, we wanted our Primer to have fast installation and better performance. Furthermore, we wanted it to have push notification functionality and enhanced security. 

## Our Solution

We introduced Progressive Web Application (PWA) in our Primer. This allowed us to show users a proper message that notified them if they were not connected to the internet without crashing the application. The built-in service workers in the PWA cache all the important features and information automatically. This allows the agent to access it without an internet connection and also eliminates the need to download it. This is because PWA saves the information that the user had previously accessed like customer details. So, if they opened a page that contained the loan details of one specific customer, the Primer would show them a custom offline page.

This increased the load speed of our Primer as it cached and served texts, images and other content in an extremely specific manner. In fact, the [latest research](https://appinstitute.com/progressive-web-apps-infographic/ "latest research") shows that use of PWA can lead to a 15x improvement in load and installation speed. Moreover, PWA update automatically. This meant that the agents saved time on repeatedly affirming to permission update requests. So, the app updates itself whenever an agent opened visited it. 

Most importantly, our Primer now had the push notification functionality because of the PWA that had access to device-specific functionality. This allowed us to send important information to our agents, uncluttering their digital experience. Here, we took cues from Trivago, who had used PWA for offline user access and to send push notifications to their users. This increased their user [engagement by 150%](https://www.thinkwithgoogle.com/intl/en-gb/consumer-insights/trivago-embrace-progressive-web-apps-as-the-future-of-mobile/ "engagement by 150%") and doubled their repeat-user visits. 

<img src="/images/blogs/image22.png" width="10%" height="5%" style = "border:none">

## Conclusion

Evidently, we faced a lot of challenges while rebuilding our Primer. We learned a lot from the prime industry examples and combined that knowledge with our agent needs. In the end, our efforts proved successful because the new Primer worked effortlessly and our agents found it far easier to use. 

## About The Author

This post was authored by Nishant Bhatia and drafted by Etee Dubey.
  