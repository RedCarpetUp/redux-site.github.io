---
author: Raghav Sharma
type: 'blog'
date: '2020-03-04'
description: 'Redcarpet Database Optimization and Migration: Why and How We Did It'
title: 'Redcarpet Database Optimization and Migration: Why and How We Did It'
image: './image1.jpg'
path: /2020/03/04/Redcarpet-Database-Optimization-and-Migration
visibility: 'show'
---

Like most of the FSI companies, the data collected and retained by our IT systems is one of our most invaluable assets. In fact, using that data effectively is considered to be the key to continued business success by most experts. It becomes all the more important in a highly competitive environment.

This blog covers why we decided to marginally reduce our database storage (DB). In fact, we realized that our data and the infrastructure tools that we were using to manage it were not optimized to provide us with the best support to pursue our company goals. This blog will detail why and how we decided to optimize our database. Thereafter, we will be focusing on how we reduced the storage of a multi-terabyte database on RDS.


## Why We Optimised Our Database?

Originally, the database we depended on had many sources and an array of structured and unstructured formats. In such a situation we risked a lot. Our data contained inaccuracies, junk data and duplicates. This made it extremely difficult to access important information timely or in an efficient manner. We needed to optimize our data by making use of tools that allowed us to extract and analyze information through enhanced speed and optimization. Some of the other reasons why we decided to optimize our database were:

**1)** We believe that the timely resolution of challenges is extremely important for any company in the FSI industry. For this, we had to have timely access to all the required data. However, extracting that data from disparate sources and formats was time-consuming and prone to error. Data optimization would eliminate this problem by restructuring data sets and eliminating junk data. 

**2)** We always aim to give our customers the most accurate resolution in real-time. Consequently, our customers expect a certain speed and comprehensive response from our agents. DB optimization was critical to meeting our customer expectations.

**3)** The infrastructure tool that we would use for optimizing our DB would also give us an insight into the server performance and the software components of our IT operations. Through these insights, we could plan, troubleshoot and find an even more efficient way of using our hardware and software resources.

## How We Optimised Our Database

It would be an understatement to say that we spent a lot of time optimizing our DB. It is important to note that we never delete any of the data, we only insert and keep the snapshot of the stale/previous data. So, for our optimization purposes, we dumped some of the historic data like previous snapshots, audit logs, unused data to an S3 bucket. Consequently, we optimized the data queries and removed unused indexes or less used indexes. We also enforced data normalization to minimize duplicate storage of the same data. This process helped us optimize our database from **9TB to 4.5TB**. 

However, getting there was a big challenge. This level of optimization entailed materializing views, breaking big queries into CTE and finding slow queries through the pg_stats extension. This section details how we decided to go about solving these challenges. 

> #### 1) Materializing Views

> We utilized the Views tool for storing “partial queries” which allowed our DB to store a parsed query that we could treat as a table later on. We could execute statements on a view with identical syntax the same way we executed it against a table. This was extremely useful for us when we wanted to perform complex statements repeatedly. 

> Most importantly, views could be materialized and the results could be stored by Postgres at CREATE MATERIALIZED VIEW and REFRESH MATERIALIZED VIEW time. Also, only the cost of the partial query is paid in these situations, making our process far more efficient especially in read-heavy situations. 
Moreover, Materialized views were especially important because our list contained a subset of columns and we needed to perform identical operations such as SUM or COUNT. This also came handy when we wanted to JOIN additional tables. When we wanted to retrieve rows, we could query these rows for only relevant data. This was cost-effective for us as now we did not have to execute a full statement. Furthermore, we could create indices on the materialized views themselves. 


> #### 2) Breaking Big Queries 

> Common table expressions and Subqueries are often considered indispensable for breaking up complex SQL queries. However, we found that breaking big queries into CTE was far easier to read than Subqueries. Hence, we decided to pursue the same.

> #### 3) Finding Slow Queries 

> We soon realized that we needed a tool to find slow queries as well. We decided on using the pg_stats extension as it fit our need perfectly.

> It is not common knowledge that Postgres keeps a lot of information about databases like table size and the distribution of indexes. With the help of pg_stat_statments, it keeps track of the normalized record of when queries are run.

> Dissecting all of this information is important to the process of optimization. We had some key pieces of information that could help us begin our process of optimization. 

> Now, the general industry standard is that the extremely common queries should return in 1 ms. In rare cases, there are queries that regularly run in  4-5 ms. However, ideally, ~ 1 ms or less is considered ideal. To begin the process of optimization, we attempted to strike a balance between total time and long average time. 

> After all of these efforts, we were successful in optimizing our DB. However, this was only half of the battle won. We still had the big task of migrating our DB to a whole new server.


> #### 4) Removing Unused Indexes 

> We removed all of our unused indexes as they seemed to be taking almost as much space as our data itself. This just unnecessarily increased the cost of our storage. Moreover, the space used by these indexes increased the duration and size of physical backups.

> Furthermore, indexes were slowing down are our data modification. We had to modify all of our indexes if we wanted to INSERT into a table. Modifying the indexed table required lots of time and resources.

> Even though it was hard to determine which indexes were not being used, we were successful in maintaining our indexes and only keeping the ones that were benefiting us.

## Why and How We Migrated Our Database?

When we set out to migrate our database, we knew it would be a challenge. We had to move our 14TB storage server to a 5TB one. Originally, we were paying for the allocated storage of 14TB. However, the storage that we were using, RDS (The service provided by AWS for databases) only let us increase the storage and not reduce it. 

We realized that we never really required 14TB but certain miscalculation led us to increase it from 6TB to 14TB. 

Hence, we decided to switch servers and move the data to a new one with less storage. However, we encountered a major problem here. 4.5TB is a lot of data. Our database was continuously running and getting populated simultaneously. For the migration process, we needed to cut-over and shift all the connections to a new server with the least amount of downtime possible. We had multiple options here:

**1)** We could stop our current database. Move all the data at once to the new instance and then start the new database. 

**2)** We could first move the data that didn’t get updated that frequently. This data accounted for a huge chunk of our database. Thereafter, we could stop the database and move the rest of the data to another server.

**3)** We could copy all the data as of now to a new DB. Then, we could stop the database and sync the new data from that old snapshot. Consequently, we could switch the same.

We ended up taking the third option as it allowed the least amount of downtime and proved to be the most efficient way of migrating data.

We utilized the Bucardo tool to undergo the migration. It allowed us to replicate the data from the live DB to the secondary DB. We took a dump of our main database and restored it on a new rds instance with less storage (5tb) using a high bandwidth ec2 instance. This process took about a day for us to undergo a data transfer of 4.5 TB. Big tables, some 1TB+, took the longest amount of time as they didn't get split during the parallel dump.

After the restoration, we used Bucardo triggers on the main DB to sync it with the new instance. However, Bucardo came with its own limitations. We realized it didn't work well on high volume tables and skipped some entries. It also stopped syncing if we changed the schema of a table. So, it had to be restarted again in that case. Data integrity became a critical factor now. We had to make sure every bit of data is present in the new database. We wrote some scripts to check the data between two DBs for each table. We then wrote scripts to add the missing data. After these operations were done, we added back our foreign key constraints which we'd removed earlier at the time of Bucardo sync. 

This completed the migration process that helped us use our database in the most efficient way possible.

## Conclusion

Optimizing our DB was quite a task but it helped us to extract data from different heterogeneous sources in an efficient manner. Eliminating any junk data reduced any chances of error and made sure that our business ran smoothly. Moreover, it helped us to provide our users with seamless customer service through speedy responses and redressal. 

## About The Author

This blog was authored by Raghav Sharma. It was drafted by Etee Dubey.