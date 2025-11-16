---
title: What are Redocly decorators?
description: Use Redocly decorators to generate customized OpenAPI views without changing the master spec.
date: 2025-11-15 10:00:00 +0530
categories: [Blog]
tags: [Concepts, DocasSystem]
eventStartDate: 2025-11-07 10:00:00 +0000
eventEndDate: 2025-11-08 11:30:00 +0000
excerpt: Create reusable, non-destructive decorators to customize bundled OpenAPI outputs for different clients.
---

# What Are Redocly Decorators?

At their core, decorators are "visitors." When Redocly bundles your API (Example: using the redocly bundle command), it parses your OpenAPI file into a structured object (a Document Object Model, or DOM).

The decorators you have configured will then "visit" specific nodes in that object like a particular Schema, Operation, Examples, or Path and applies a custom logic.

**Key Benefits:**

* **Non-Destructive:** Your `master.yaml` file is never altered. The changes only exist in the final bundled output file.
* **Reusable:** You can write one decorator (Example: `add-metadata-parameter`) and apply it to multiple different API definitions (Product/pet.yaml).
* **Flexible:** You can add, remove, or modify any part of the spec, such as:
  * Adding custom fields to a request payload.
  * Removing non mandatory parameters from the payload.
  * Modifying descriptions or summaries.

## The Role of the `redocly.yaml` File

The `redocly.yaml` file is the central configuration file that coordinates this entire process. It tells the Redocly CLI two crucial things.

1. **plugins**: This section is a list that registers your custom decorator JavaScript files, making them available to the bundler.
2. **apis**: This section defines your individual APIs. For each API, you can specify a decorators block to apply one or more of the registered plugins to that specific API.

A sample configuration file is shown below. But you could have multiple configurations, rules that can be inserted in the `.yaml` file. For more information, see [Redocly documentation](https://redocly.com/docs/cli/configuration).

```yaml

# 1. PLUGINS: Registers all available decorator files
plugins: 
  - './decorators/add-metadata-parameter.js'

apis: 
  # 2. APIS: Defines a specific API
  petstore: 
    root: ./Product/pet.yaml
    # 3. DECORATORS: Applies specific rules from the registered plugins
    decorators:
      # Applies the 'add-metadata' rule FROM the 'add-metadata-parameter' plugin
      add-metadata-parameter/add-metadata: on
```

The format `add-metadata-parameter/add-metadata` means you are applying the rule named `add-metadata` from the decorator plugin whose id is `add-metadata-parameter`.

## How to Use Decorators for API Payload Customization

### Create the Decorators.js File

First, you create the JavaScript file (Example: `./decorators/add-metadata-parameter.js`). This file exports a JavaScript object that defines the decorator's `id` and the `rules` it provides.

Each rule has a `visitor` that contains the logic for modifying the OpenAPI DOM.

Example: `./decorators/add-metadata-parameter.js` This file defines a decorator with the `id: 'add-metadata-parmaeter'` and provides one rule called `add-metadata`.

This decorator standardizes every `POST` operation in the .`yaml` by ensuring the request body includes a `metadata` object. It first verifies that the operation has a request body and creates one if needed, marking it as required and initializing a basic `application/json` schema. If the schema is defined with a `$ref`, the decorator wraps it in an `allOf` array so the metadata object can be added without violating OpenAPI rules. For inline schemas, it injects the metadata definition directly and updates the `required` list.

```js
module.exports = function addMetadataParameter() {
  return {
    id: 'add-metadata-parameter',
    decorators: {
      oas3: {
        'add-metadata': () => {
          return {
            Operation: {
              leave(operation, ctx) {
                if (ctx.key !== 'post') return;

                // Ensure requestBody + JSON schema exist
                if (!operation.requestBody) {
                  operation.requestBody = {
                    required: true,
                    content: {
                      'application/json': {
                        schema: { type: 'object' }
                      }
                    }
                  };
                }

                const content = operation.requestBody.content ||= {};
                const jsonContent = content['application/json'] ||= { schema: {} };
                let schema = jsonContent.schema ||= {};

                // Metadata schema
                const metadataSchema = {
                  type: 'object',
                  properties: {
                    metadata: {
                      type: 'object',
                      properties: {
                        source: { type: 'string', example: 'internal-system' },
                        version: { type: 'string', example: '1.0.0' },
                        tags: { type: 'array', items: { type: 'string' } }
                      },
                      required: ['source', 'version']
                    }
                  },
                  required: ['metadata']
                };

                // If requestBody schema is a $ref → wrap using allOf
                if (schema.$ref) {
                  jsonContent.schema = {
                    allOf: [
                      { $ref: schema.$ref },
                      metadataSchema
                    ]
                  };
                  return;
                }

                // Inline schema → merge metadata
                schema.type = schema.type || 'object';
                schema.properties ||= {};
                schema.required ||= [];

                schema.properties.metadata = metadataSchema.properties.metadata;
                if (!schema.required.includes('metadata')) {
                  schema.required.push('metadata');
                }
              }
            }
          };
        }
      }
    }
  };
};


```

### Configure `redocly.yaml`

Next, you update your `redocly.yaml` file to register this new decorator and apply it to the correct API.

```yaml 
# 1. PLUGINS: Registers all available decorator files
plugins: 
  - './decorators/add-metadata-parameter.js'

apis: 
  # 2. APIS: Defines a specific API
  petstore: 
    root: ./Product/pet.yaml
    # 3. DECORATORS: Applies specific rules from the registered plugins
    decorators:
      # Applies the 'add-metadata' rule FROM the 'add-metadata-parameter' plugin
      add-metadata-parameter/add-metadata: on
```

### Bundle your API

Finally, you can the RedoclyCLI `bundle` command.

```bash 
# This command bundles the 'taxjourney' API definition
redocly bundle ./Product/pet.yaml --output dist/petstore.yaml
```

### Result
The output file, `petstore.yaml`, will now contain the `metadata` schema. Your original master file, `./Product/pet.yaml`, remains completely untouched and clean.

This process allows you to maintain a single source of truth while generating multiple, customized API specifications for different audiences.