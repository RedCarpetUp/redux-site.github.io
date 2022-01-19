---
author: Sandeep Srinivasa
type : "blog"
date: "2017-09-26"
description : "In compliance with the UIDAI requirements, and going above and beyond the requirements - we are using  FIPS 140-2 accredited Hardware Security Modules (HSM) ."
title: "We are now securely protecting Aadhaar data using hardware encryption"
image: "./Colossus.jpg"
path: /2017/09/18/securely-encrypting-aadhaar
visibility: "show"
---

In compliance with the UIDAI requirements, and going above and beyond the requirements - we are using  FIPS 140-2 accredited Hardware Security Modules (HSM) to
secure our customers Aadhaar (if any is being submitted to us). As of right now, we are not pulling data from Aadhaar ekyc API because the regulations around it are 
still unclear.

However, our customers voluntarily choose to submit their Aadhaar details as part of our anti-fraud attempts, even in cases where we dont ask for Aadhaar data as a normal **"address proof"**. We have decided to protect this data to be over-compliant in our data security.

Our data is held in Indian datacenters, with a quorum based access control. The secret keys for encryption can never leave the hardware (or leak) - our database retains an index to the encrypted data only.
This has obviously been challenging for our verification and operational APIs and needed quite a bit of refactoring to be compliant.

This is just one of the ways in which we are safeguarding our customer data.