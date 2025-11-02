---
title: OpenAPI Architecture Explorer.
description: Building a scalable OpenAPI architecture explorer.
date: 2025-11-02 10:00:00 +0530
categories: [Blog]
tags: [Concepts, DocasSystem]
eventStartDate: 2025-11-02 10:00:00 +0000
eventEndDate: 2025-11-02 11:30:00 +0000
excerpt: How I solved real business challenges?
---

# OpenAPI architecture for scalable API documentation system

I have built a [interactive web tool](https://kstevejose.github.io/ScalableSystem/) that visualizes and explores modular OpenAPI specifications. 

![OpenAPI Architecture](/assets/img/Architecture.png)

What I built: 

* Interactive tree viewer for navigating complex OpenAPI structures.
* Content Preview with syntax highlighting. 
* Visual representation of modular architecture patterns.

## Why it matters

Traditional monolthic OpenAPI files becomes hard to maintain as API grows. Based on client requirements, you may have to customize your API endpoints. This explorer demonstrates how you can split specs into reusable components, making them: 

* Modular - each component is self-contained and reusable.
* Scalable - easy to add new endpoints without structural issues.
* Enterprise ready - Organized structure suitable for large API projects.
* Maintenable - Multiple teams can work on different files independently. 

## Key features

* Split architecture visualization(schemas, paramters, examples, paths). 
* Components relationship via $ref references. 
* Best practices for organizing large specifications. 

### Root Level: Petstore APIs.

I have used Petstore API for demonstration purpose but this could be extended to any API specs, the structure remains the same.

**Location:** Root of the architecture  
**Icon:** 📁  
**Badge:** Root  
**Purpose:** The top-level container that holds the entire API specification structure. This represents your complete API documentation project.

The "Petstore APIs" root acts as the parent directory for all components, paths, and configuration files. It serves as the organizational foundation for your entire OpenAPI specification ecosystem.

You should run the command from the directory containing the master OpenAPI file you want to convert into modular specifications.

```bash
# run from the directory with your master file. 
redocly split OpenAPI.yaml --output /Petstore APIs

```


### Level 1: Client Specific Documents.

**Location:** `Petstore APIs > Client Specific Documents`  
**Icon:** 🎯  
**Purpose:** The `Client Specific Documents` is where client-specific customizations are organized. This is where you create `.yaml` files with only paths(endpoints) that are relevant to the client. 

![Cient Specific](/assets/img/Client.PNG)

#### Store.yaml

**Location:** `Petstore APIs > Client Specific Docs > Product Store > Store.yaml`  
**Icon:** 📄  
**Description:** The custom generated API documentation based on your client requirements.

![Store.yaml](/assets/img/Storeyaml.PNG)

The command to create this file is as follows: 

```bash

redocly bundle ./Product Store/main.yaml --outDir /Product Store/Store.yaml 

```

#### main.yaml(Store)


**Location:** `Petstore APIs > Client Specific Docs > Product Store > main.yaml`  
**Icon:** 📄  
**Description:** The specification from which the client-specific document can be created.

**Use Case**: Use this file as the foundation when creating client-specific versions like `Store.yaml`. It contains all possible Store endpoints, from which you can create customized versions. 

![Store main](/assets/img/Storemain.PNG)

### Level 1: Components Directory

**Location:** `Petstore APIs > components`  
**Icon:** 🧩  
**Description:** Reusable OpenAPI components

**Purpose:** The components directory is the heart of modular OpenAPI architecture. It contains all reusable elements that can be referenced across multiple endpoints and products using `$ref`.

![Components](/assets/img/Components.PNG)

### 💡 Components > Examples

**Location:** `Petstore APIs > components > examples`  
**Icon:** 💡  
**Purpose:** Stores example request and response payloads that can be referenced throughout your API specification.

#### 📄 CatToyProduct.yaml

**Location:** `Petstore APIs > components > examples > CatToyProduct.yaml`  
**Icon:** 📄  
**Purpose:** Example data for a cat toy product. The example file includes:

- Product structure and properties
- Expected data types and formats
- Real-world example values


![Examples](/assets/img/Example.PNG)

### ⚙️ Components > Parameters

**Location:** `Petstore APIs > components > parameters`  
**Icon:** ⚙️  
**Purpose:** Stores reusable parameter definitions that can be shared across multiple API endpoints.

**Why Centralized Parameters:**
- Consistent parameter definitions across endpoints
- Easy updates (change once, updates everywhere)
- Reduces duplication and errors
- Enables standardization

#### 📄 InStock.yaml

**Location:** `Petstore APIs > components > parameters > InStock.yaml`  
**Icon:** 📄  
**Purpose:** Defines a parameter for filtering products by stock availability. 


![Parameters](/assets/img/Parameters.PNG)

### 🗂️ Components > Schemas

**Location:** `Petstore APIs > components > schemas`  
**Icon:** 🗂️  
**Description:** Data models  
**Purpose:** Contains reusable data model definitions (schemas) that define the structure of request and response bodies.

**Why Centralized Schemas:**
- Single source of truth for data structures
- Ensures type consistency across the API
- Makes updates easier and safer
- Enables schema validation and code generation

#### 📄 Address.yaml

**Location:** `Petstore APIs > components > schemas > Address.yaml`  
**Icon:** 📄  
**Purpose:** Defines the actual schema.

![Schemas](/assets/img/Schemas.PNG)

## 🛣️ Level 1: Paths Directory

**Location:** `Petstore APIs > paths`  
**Icon:** 🛣️  
**Description:** API endpoints

**Purpose:** The paths directory contains all API endpoint definitions. Each file typically represents one endpoint or a group of related endpoints. This organization:


#### 📄 products_{productId}.yaml

**Location:** `Petstore APIs > paths > products_{productId}.yaml`  
**Icon:** 📄  

![paths](/assets/img/paths.PNG)

## ℹ️ Level 1: Root Configuration Files

These files reside at the root level of the API specification and define essential metadata and configuration.

### ℹ️ info.yaml

**Location:** `Petstore APIs > info.yaml`  
**Icon:** ℹ️  
**Description:** API title, version, description

**Purpose:** Contains essential API metadata that identifies and describes your API specification. This file  includes:

- **Title**: The name of your API
- **Version**: API specification version (e.g., "1.0.0", "2.1.3")
- **Description**: High-level description of what the API does
- **Contact Information**: Email, name, URL for API support
- **License**: API licensing information
- **Terms of Service**: Link to terms of service


**Use Case:** Referenced by the main `openapi.yaml` file to provide API-level information that appears in generated documentation and API portals.

<div class="admonition note">
  <div class="admonition-title">Note</div>
  info.yaml has to created manually as Redocly does't create it.
</div>

![Info](/assets/img/info.PNG)

---

### ℹ️ servers.yaml

**Location:** `Petstore APIs > servers.yaml`  
**Icon:** ℹ️  
**Description:** BaseURL details

**Purpose:** Defines the server environments and base URLs where the API is available. This file typically includes:

- **Production Server**: `https://api.example.com/v1`
- **Staging Server**: `https://staging-api.example.com/v1`
- **Development Server**: `https://dev-api.example.com/v1`


**Use Case:** Referenced by the main `openapi.yaml` file to specify where the API is hosted. This information is used by API clients, testing tools, and documentation generators to know which server to connect to.

<div class="admonition note">
  <div class="admonition-title">Note</div>
  servers.yaml has to created manually as Redocly does't create it.
</div>




![Servers](/assets/img/servers.PNG)

### ⭐ openapi.yaml

**Location:** `Petstore APIs > openapi.yaml`  
**Icon:** ⭐  
**Badge:** Main  
**Description:** The source file that will be split into multiple files.

**Purpose:** This is the main orchestrator file that brings together all the modular components into a complete OpenAPI specification. It typically:

- **References info**: Includes API metadata
- **References servers**: Specifies API server URLs
- **References components**: Includes reusable schemas, parameters, and examples via `$ref`
- **References paths**: Includes all endpoint definitions via `$ref`
- **Orchestrates Everything**: Uses `$ref` to pull in all modular files



**Architecture Pattern:**
Instead of having everything in one large file, this file acts as a "manifest" that references:
```yaml
openapi: 3.0.3
info:
  $ref: './info.yaml'
servers:
  $ref: './servers.yaml'
paths:
  /products/{productId}:
    $ref: './paths/products_{productId}.yaml'
components:
  schemas:
    Address:
      $ref: './components/schemas/Address.yaml'
  parameters:
    Category:
      $ref: './components/parameters/Category.yaml'
```

**Use Case:** This file is what API consumers, tools, and generators read. It dynamically combines all the modular files into a complete, valid OpenAPI specification. When you update any component file, the main file automatically reflects those changes through references.

![OpenApi](/assets/img/OpenAPI.PNG)

## 🎯 Architecture Benefits Summary

This modular architecture provides several key advantages:

1. **Modularity**: Each component is self-contained and reusable
2. **Maintainability**: Update components independently without affecting others
3. **Scalability**: Add new products, endpoints, or components easily
4. **Collaboration**: Multiple developers can work on different parts simultaneously
5. **Reusability**: Share schemas, parameters, and examples across endpoints
6. **Organization**: Clear structure makes navigation and understanding easier
7. **Flexibility**: Support multiple products and client customizations
8. **Standards Compliance**: Follows OpenAPI 3.0 best practices

---

## 📚 How to Use This Architecture

1. **Start with `openapi.yaml`**: This is your entry point
2. **Define metadata**: Set up `info.yaml` and `servers.yaml`
3. **Create reusable components**: Build schemas, parameters, and examples, paths in the `components` directory using Redocly CLI's split command. 
4. **Customize for products**: Use the `Client specific docs` directory to create product-specific variations.
5. **Generate documentation**: Use tools that read `openapi.yaml` to generate docs, test APIs, and create SDKs.

This architecture scales from small APIs to enterprise systems with hundreds of endpoints, multiple products, and various client requirements.