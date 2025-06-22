---
title: Redocly CLI
description: Splitting & Bundling OpenAPI Specs (Beginner-Friendly Guide)
Author: Steev Kundukulangara
date: 2025-03-05 10:00:00 +0530
categories: [blog]
tags: [How to, Tutorials, API]
image:
  path: /assets/img/stripe.jpg
  alt: "Redocly CLI"
  width: 1200
  height: 630
---


This guide helps **beginner API writers and developers** split and bundle OpenAPI documentation using **Redocly CLI**. The goal is to organize a single monolithic OpenAPI file into reusable components and then bundle it for publication.

---

## What You’ll Learn

* How to split a monolithic OpenAPI file using Redocly CLI
    
* How to configure Redocly CLI for customizations
    
* How to bundle those files into a single OpenAPI spec for publishing
    
* How to lint your OpenAPI spec
    

---

## Step 1: Sample Monolithic OpenAPI File

Suppose you start with a file: `main.yaml`

```yaml
openapi: 3.0.3
info:
  title: Sample API
  version: 1.0.0
  license:
    name: 3.0 License
servers:
  - url: https://www.example.com
paths:
  /users:
    get:
      summary: Get all users
      operationId: GetUsers
      responses:
        '200':
          description: A list of users
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
```

---

## Step 2: Split the Monolithic File

Use the Redocly CLI `split` command to modularize the file:

```bash
redocly split main.yaml --outDir=./openapi
```

This will create a structured folder (`./openapi`) with separate files for paths and components, for example:

```markdown
openapi/
├── main.yaml
├── paths/
│   └── users.yaml
└── components/
    └── schemas/
        └── user.yaml
```

**Example:** `openapi/main.yaml` after splitting

```yaml
openapi: 3.0.3
info:
  title: Sample API
  version: 1.0.0
  license:
    name: 3.0 License
servers:
  - url: https://www.example.com
paths:
  $ref: './paths/users.yaml'
components:
  schemas:
    $ref: './components/schemas/user.yaml'
```

**Example:** `openapi/paths/users.yaml`

```yaml
/users:
  get:
    summary: Get all users
    operationId: GetUsers
    responses:
      '200':
        description: A list of users
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '../components/schemas/user.yaml#/User'
```

**Example:** `openapi/components/schemas/user.yaml`

```yaml
User:
  type: object
  properties:
    id:
      type: string
    name:
      type: string
```

---

## Step 3: Add Redocly Config File

Create a `redocly.yaml`at the root level:

```yaml
apis:
  main: ./openapi/main.yaml
extends:
  - recommended
rules:
  tag-description: error
  operation-summary: error
  no-unresolved-refs: error
  no-unused-components: error
  operation-2xx-response: error
  operation-operationId: error
  operation-singular-tag: error
  no-enum-type-mismatch: error
  no-identical-paths: error
  no-ambiguous-paths: error
```

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">This config file lets you customize linting rules and manage multiple API definitions.</div>
</div>

---

## Step 4: Bundle the Modular Files

Use the `bundle` command to combine the modular files into one OpenAPI file for publishing or sharing:

```bash
redocly bundle openapi/main.yaml --output bundled.yaml
```

This generates a single `bundled.yaml` file with all references resolved.

---

## Step 5: Lint Your Specs

Use the `lint` command to validate your OpenAPI definition:

```bash
redocly lint openapi/main.yaml
```

> This helps catch unresolved references, missing fields, and other schema violations.

---

## Best Practices

| **Practice** | **Description** |
| --- | --- |
| Modularize logically | Separate schemas, parameters, paths clearly |
| Use meaningful file names | E.g., `user.yaml`, `error.yaml`, `pagination.yaml` |
| Keep references relative | Use `./` or `../` instead of absolute paths |
| Validate early and often | Run `lint` after every major edit |
| Document folder structure | Add a README for contributors |

---

## Troubleshooting Tips

* **Error: unresolved $ref** — Double-check relative paths and file names.
    
* **Bundled file missing parts** — Ensure all component files are referenced in `main.yaml`.
    
* **YAML syntax errors** — Use an online YAML validator or a linter.
    

---

## Resources

* [Redocly CLI Docs – `split`](https://redocly.com/docs/cli/commands/split)
    
* [Redocly CLI Docs – `bundle`](https://redocly.com/docs/cli/commands/bundle)
    
* [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
    

---

**Happy documenting!**