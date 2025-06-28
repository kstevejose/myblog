---
title: Swagger Bundling
description: How to bundle multiple files
author: Steev Kundukulangara
date: 2025-04-05 10:00:00 +0530
categories: [Blog]
tags: [Concepts, Tutorials]
eventStartDate: 2025-06-25 10:00:00 +0000
eventEndDate: 2025-06-25 11:30:00 +0000
excerpt: How to efficiently reuse your OpenAPIs?

---


## **Swagger Bundling**

Hello everyone, I would like you to introduce **Swagger bundling** which I discovered recently and implemented while working on our API documentation.

## **What is Swagger Bundling?**

Swagger Bundling is a process used for managing large complex API specifications particularly when dealing with multiple `.yaml` files. The process involves merging multiple `.yaml` files into one single file from external references to increase the usage of APIs.

Content Reuse is always a prominent concept in the field of technical writing. After all, no one enjoys the tedious tasks of repeatedly writing the same information, which leads to redundancy. Swagger bundling coupled with Bash scripting, offers a robust solution that enables content reuse and improves the efficiency of the documentation team.

### **Usecase Scenario**

Imagine a scenario, where you want to create API documents based on numerous endpoints and components.

If you have to create and update two OpenAPI specification files that include these endpoints, you have to manually update each document. Instead, with Swagger Bundling, you can streamline the process by organizing your API specification in a directory structure such as `paths`and `schemas` and run commands to automate the process.

### How to prepare your directory for Swagger Bundling?

```bash
BUNDLE/
├── _build/
├── .idea/
├── APIs/
│   ├── CourseStudents.yaml
│       ├── main.yaml
├── Facultyenrollments/
│       ├── main.yaml
├── FacultyStudents/
│       ├── main.yaml
├── components/
│   └── schemas/
│       ├── enrollments.yaml
│       ├── getCourseld.yaml
│       ├── getCourses.yaml
│       ├── getFacultyMembers.yaml
│       ├── getStudentid.yaml
│       ├── getStudents.yaml
│       ├── newCourses.yaml
│       ├── newFacultyMember.yaml
│       ├── newStudents.yaml
└── paths/
    ├── getCourseldRequest.yaml
    ├── getCourseRequest.yaml
    ├── getEnrollments.yaml
    ├── getFacultyRequest.yaml
    ├── getStudentidRequest.yaml
    ├── getStudentsRequest.yaml
```

Let’s assume, I want to create an API document with only Course and Students related APIs. I have created a folder called `CourseStudents` and created a `main.yaml` file with the following details.

```yaml
openapi: 3.0.0
info:
  title: College Management System API
  description: API for managing courses, students, and faculty in a college management system.
  version: "1.0.0"
servers:
  - url: http://localhost:8080/api
paths:
  /courses:
    $ref: '../../paths/getCourseRequest.yaml'
  /students:
    $ref: '../../paths/getStudentsRequest.yaml'
```

If you look at the references within the document, you’ll see `$ref: '../../paths/getFacultyRequest.yaml'`. This indicates that the reference points to a file located two directories above the current one.

If you look at `getCourseRequest.yaml`, you will find the following details:

```yaml
get:
  summary: Retrieve details of a specific course by ID 
  parameters:
    - name: courseId 
      in: path 
      required: true 
      description: ID of the course to retrieve 
      schema: 
        type: integer 
  responses:
    '200':
      description: Course details successfully retrieved 
      content:
        application/json:
          schema :
            $ref: '../components/schemas/getCourseId.yaml'
```

Similarly, if you want to create a combination of faculty and enrollment, you would structure your YAML file as follows:

```yaml
openapi: 3.0.0
info:
  title: College Management System API
  description: API for managing courses, students, and faculty in a college management system.
  version: "1.0.0"
servers:
  - url: http://localhost:8080/api
paths:
  /faculty:
    $ref: '../../paths/getFacultyRequest.yaml'

  /enrollments/:
    $ref: '../../paths/getEnrollments.yaml'
```

You can create any number of API documents, each containing multiple endpoints and components.

Now comes the fun part, **bundling**. I am using Ubuntu.

```bash
sudo docker run --rm -v $PWD:/spec redocly/cli bundle ./APIs/CourseStudents/main.yaml --output /Build/CourseStudents.yaml
```

This command runs a Docker container using the Redocly CLI to bundle an OpenAPI specification file located at `./APIs/CourseStudents/main.yaml`. The resulting bundled file will be saved as `/Build/CourseStudents.yaml`. Because of the volume mount, this output will also be available in local filesystem under the `Build` directory, assuming it exists or is created during execution.

The final bundled output

```yaml
openapi: 3.0.0
info:
  title: College Management System API
  description: API for managing courses, students, and faculty in a college management system.
  version: "1.0.0"
servers:
  - url: http://localhost:8080/api
paths:

  /faculty:
    get:
      summary: Retrieve a list of faculty members
      responses:
        '200':
          description: A list of faculty members successfully retrieved
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/getFacultyMembers'

    post:
      summary: Add a new faculty member
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/newFacultyMember'
      responses:
        '201':
          description: Faculty member added successfully


  /enrollments:
    post :
      summary : Enroll a student in a course 
      requestBody :
        required : true 
        content :
          application/json :
            schema :
              $ref: '#/components/schemas/enrollments'
      responses :
        '201' :
          description : Student enrolled in the course successfully 
components:
  schemas:
    getFacultyMembers:
      type : object 
      properties :
        studentId :
          type : integer 
          example : 101 
        courseId :
          type : integer 
          example : 1 
    newFacultyMember:
      type: object
      properties:
        name:
          type: string
          example: Prof. Mark Lee
        department:
          type: string
          example: Computer Science
    enrollments: 
      type : object 
      properties :
        studentId :
          type : integer 
          example : 101 
        courseId :
          type : integer 
          example : 1
```

Note: You can create a bash script to create multiple files at once if you have multiple combinations.