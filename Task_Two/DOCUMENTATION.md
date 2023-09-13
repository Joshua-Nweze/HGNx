
# HNGx TASK TWO API DOCUMENTATION

  

## Table of contents

  

-  <a  href="#introduction">Introduction</a>
-  <a  href="#getting-started">Getting started</a>
-  <a  href="#endpoints">Endpoints</a>
-  <a  href="#error-handling">Error handling</a>
-  <a  href="#setting-up-in-local-server">Setting up in local server</a>
- <a  href="#support-and-contact">Support and contact</a>

## Introduction

This API preforms basic CRUD operation on a resource.

This API takes four requests:

1. GET
2. POST
3. PATCH
4. DELETE

The GET request is used to get a resource from the database.

The POST request is used to add a resource to the database.

The PATCH request is used to update a resource in the database.

The DELETE request is used to delete a resource in the database.


## Getting started

Base URL: https://repulsive-sandals-tick.cyclic.app

## Endpoints

**1. Adding a resource to the database**

**HTTP method**: POST

**URL**: /api

**Reqest header**

```
'Content-Type': 'application/json'
```

**Request body**:

Request body format is JSON.

Request body is a JSON object representing the resource.

The object key is 'name' and the value is the name you desire to add to the database.

Example:

    {
	    "name": "John Doe"
    }
NOTE: 'name' must be a string

Expected response:
```
{
	"message":  "User created successfully",
	"newUser":  {
		"id":  "12345",
		"name":  "John Doe"
	}
}
```

**Response status**:

201 Created: User created successfully

400 Bad request: Name must be a String

400 Bad request: Name is not valid

500 Internal server error: Something went wrong

**2. Getting a resource from the database**

**HTTP method**: GET

**URL**: /api/<user_id>

**Request parameter** : <user_id>
<user_id> is the ID of the user you want to get.

Example:

```
api/12345
```

Expected response:

    {
		"id":  "12345
		"name":  "John Doe"
	}

**Response status**:

200 OK: User details

404 Not found: User with ID not found

500 Internal server error: Something went wrong

**3. Updating a resource in the database**

**HTTP method**: PATCH

**URL**: /api/<user_id>

**Request parameter** : <user_id>
<user_id> is the ID of the user you want to update.

  

Example:

```
api/12345
```
Expected response:

    {
	"message":  "User updated"
    }

**Request body**:

Request body format is JSON.

Request body is a JSON object representing the resource.

The object key is 'name' and the value is the new name you desire to update in the database.

Example:

    {
	    "name": "John Doe Jnr"
    }

NOTE: 'name' must be a string

 **Response status**:

201 Created: User created successfully

400 Bad request: Name must be a String

400 Bad request: Name is not valid

500 Internal server error: Something went wrong

**4. Deleting a resource in the database**

**HTTP method**: DELETE

**URL**: /api/<user_id>

**Request parameter** : <user_id>
<user_id> is the ID of the user you want to delete.

Example:
```
api/12345
```
Expected response:

    {
		"message":  "User deleted"
	}

## Error handling

**Errors and meaning**

400 Bad request: Name must be a String;
This error occurs when 'name' is not a string

400 Bad request: Name is not valid
This error occurs when 'name' is undefined, null or an empty string

500 Internal server error: Something went wrong
This is a server error, it's not caused by the client.

  ## Setting up in local server
Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Clone the Repository**
  ```bash
https://github.com/Joshua-Nweze/HGNx.git
```

**Navigate to task two directory**
```bash
cd Task_Two
```
**Setup**

Make sure to install the dependencies:
```bash
# npm
npm install
```
**Development Server**

Start the development server on `http://localhost:3000` 
```bash
node index.js
```
## Support and contact

If you have any question about the API, reach me on Twitter (X) [@thejosh_n](https://twitter.com/thejosh_n) or send me an email to joshuanweze270@gmail.com
