---
title: Walkthrough of API Sculptor
description: The complete walkthrough of what API sculptor does. 
date: 2025-10-29 10:00:00 +0530
categories: [Blog]
tags: [Concepts, DocasSystem]
eventStartDate: 2025-10-29 10:00:00 +0000
eventEndDate: 2025-10-29 11:30:00 +0000
excerpt: How I solved real business challenges?
---

# API Sculptor

API Sculptor is a python based utility that allows you to split, customize, and generate API specifications from a master OpenAPI file. It allows technical writers and developers manager large/monolithic or modular API projects efficiently. 

## What API Sculptor does

API sculptor streamlines how you work with OpenAPI specifications by providing:

* **Generate new Specifications** - Export refined API definition in YAML or HTML formats. 
* **Visually split APIs** - Select endpoints from an intuitive interface. 
* **Upload and split your OpenAPI file** - Load and split your OpenAPI YAML file directly in the browser. 

### Why use API sculptor

Managing a single OpenAPI file for multiple services/products can slow down updates and reviews. API sculptor simplifies this process by giving you: 

* A no-code interface for creating modular API specs.
* A repeatable way to maintain consistency across your master specification.

# How to generate a custom API Specification using API Sculptor.

Use API sculptor to split a large OpenAPI file and generrate a new custom specification for selected endpoints.

Prerequisites

* An OpenAPI file in YAML format.
* Access to API sculptor web interface. 

To generate a custom specification,

1. Load your OpenAPI file.
   1. In the **Load & Split your APIs** section, drag and drop your `.yaml` file into the upload area. 
   2. Alternatively, **click to browse** to upload the file manually. 
2. Select **Split & Update Project** to process the file.
   API Sculptor loads your structure and displays available endpoints. 
3. Choose the endpoints from the list that you want to include in your new specification. 
    Tip: You can choose the search bar to find specific endpoints if the specification is large.
4. Enter a filename for your generated specification in the `filename.yaml` field.
5. Select **Generate & Download**. 
   API Sculptor creates a new `.yaml` file that includes only the selected endpoints. 
  

# How to convert an OpenAPI file into HTML using API Sculptor.

  Use API sculptor to convert your OpenAPI specification from YAML format to a readable HTML document. 

  Prerequisites

  * OpenAPI file in YAML format.
  
  To convert yaml file into HTML,

  1. Switch to the **Convert to HTML** tab.
  2. In the **Upload your OpenAPI File** section, drag and drop your `.yaml` file into the upload area. 
     1. Alternatively, **click to browse** to upload the file manually. 
  3. Enter the output file name.
     1. The default filename is api-docs.html
  4. Select **Download HTML**. 
   
     API Sculptor converts your YAML file into a formatted HTML document. 
    