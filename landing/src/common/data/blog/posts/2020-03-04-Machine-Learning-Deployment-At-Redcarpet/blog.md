---
author: Rajhans Jadhao
type: 'blog'
date: '2020-03-04'
description: 'Machine Learning Deployment At Redcarpet: Why We Chose Sagemaker'
title: 'Machine Learning Deployment At Redcarpet: Why We Chose Sagemaker'
image: './image1.jpg'
path: /2020/03/04/Machine-Learning-Deployment-At-Redcarpet
visibility: 'show'
---

It is a well-known fact among data scientists that deploying machine learning (ML) can prove to be extremely strenuous. In fact, deploying ML models was one of the biggest challenges we faced when we looked to create value through AI. Evidently, the challenge only grew bigger when our model grew in complexity.

Deployment is considered to be one of the most tricky phases of machine learning. After all, only a nominal amount of ML projects actually make it to the production stage due to this very reason. While pursuing ML, we wanted to fully examine how we could minimize the risk of failure by completely understand the process of deployment. In this blog, we will seek to explain what we expected of our ML model platform, AWS Sagemaker. We will also discuss the issues we faced while looking to deploy it and how it delivered ML solutions in an effective and scalable way. 

## Why We Needed A Machine Learning Deployment Platform?

The biggest problem we faced with our previous platform was the issue of scalability. We could accomplish our ‘build’ and ‘train’ tasks rather seamlessly. However, we were stuck in the ‘deploy’ stage. In simple terms, we could figure our existing issues, gather the required data and analyze and orchestrate it into the desired form. Moreover, we were able to leverage our algorithms and train the model to learn patterns and thereafter regulate hypermeters. However, we were facing problems in deploying the model into a large ecosystem.  

Our issue was that as our inferences post-deployment continued to increase as did training iterations. Hence, our entire workflow grew to be extremely complex and ended up evolving into 3 independent workflows. We needed a different compute infrastructure for all our phases that were Build, Train and Deploy as they grew to be an independent branch within themselves requiring different skills to execute. The Build phase requires data analytics and engineering skills that would allow us to gather data from different sources together in one decided form. The Train phase required machine learning skills so that we could analyze that data and develop a machine learning model. Finally, the Deploy phase required software engineer skills do we introduce the model into the production system.

Needless to say, this was an overwhelming challenge as we without an ML platform, we had to get multiple personnel on board which was not cost-effective. Data scientists faced problems while deploying an ML solution into a full-scale web service because they lacked the requires software skills. On the other hand, software engineers could do this task easily. However, they would have trouble understanding machine learning (which required deep understanding) and would lack the required maths skills. Hence, we needed an ML deployment platform that could bridge this gap of skills. We wanted to eliminate any possible disruption that might have arisen out to a mismatch collaboration between a data scientist and software engineer owing to different requirements, ideas or tech language.

## What We Expected Out Of A Machine Learning Deployment Platform

For starters, we wanted to aid our data scientist with the necessary software skills so that they could solve large ML problems as an efficiently scalable web service (API). Furthermore, we wanted to be able to integrate the API into the apt software system. 

Essentially, we needed a platform that could help us to execute an ML project in the most efficient way possible. This meant that the platform had to supplement our data science skills (analyzing and engineering data, tune and deploy the ML model) with neat abstraction to deliver the results.  We needed a platform that could provision the hardware and organize the entire flow. Moreover, the platform should be able to orchestrate the execution transition and provide us with a scalable solution. 

Previously, we were using Jupyter Notebook as our model development platform. However, scalability turned out to be one of its major challenges, as is the case with numerous AI projects. We wanted to make sure that our models were scalable and met the increase in our application demand in production. In the beginning, we relied on static data that was more or less manageable. However, as our model moved forward to production and acquires far larger volumes of data, it was clear that our existing model could not monitor and solve the scalability challenges.

## Why We Chose AWS Sagemaker

After numerous rounds of discussions, we settled on AWS Sagemaker as our model development platform. One of the biggest drawing factors was that we could Jupyter notebook interface to launch our machine learning process. We could also choose a compute instance according to our data engineering requirements. In fact, we could not use our traditional methods like  ggplot2+ Pandas+ Matplotlib to visualize, organize and transform data into our required form. Furthermore, after data engineering, we could now use a different compute instance to train the models. For instance, GPU enabled or memory-optimized. 

Moreover, Sagemaker made it conducive to deploy the trained model as an API which used a dissimilar compute instance that could serve our business requirement and scale seamlessly.

We could also choose to use the algorithms that are optimized for performance from the incredibly rich AWS library or even include our own algorithms through industry-standard containers. Also, we could now handle the entire process in an extremely effective way that was cost-friendly as well. We could provision hardware instances, run data jobs that were of rather high capacity, abstract huge complexities and organize the entire flow with simple commands in through minimal code. 

Most importantly, we chose Sagemaker because we were already using AWS as our data store and this saved us the networking costs by multitudes. Moreover, Amazon uses the same framework for the production and we could choose to run it locally which is not simply possible in the other framework. Also, we needed multiple candidate models for the purpose of our business which was made possible by Sagemaker. 

## Implementing AWS Sagemaker

This was a mammoth task and was rather challenging. The steps we took to deploy our custom model can be divided into four consolidated steps:

**1)** We wrapped our model training pipeline in the Docker image that was compatible with Sagemaker.

**2)** Then, we uploaded the image to Amazon ECR.

**3)** On an EC2 cluster, we used Python API to schedule pipeline as a job. Also, the model artefacts produced by that run was saved to S3.

**4)** Finally, we deployed the model as a web service.

## Conclusion

AWS Sagemaker allowed us to abstract a lot of software development skills which in turn, helped us to accomplish our tasks. Moreover, it is highly cost-effective and scalable. It helped us to focus on core ML experiments and boosted the necessary skills (generally associated with deploying the ML into a full-scale web service) with easily usable tools that were similar to our existing workflow. All in all, choosing AWS Sagemaker as our ML deployment platform proved to be a great decision for us.

## About The Author

This blog was authored by Rajhans Jadhao. It was drafted by Etee Dubey.