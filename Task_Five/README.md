
# Express Server Quick Start Guide

This guide will walk you through the steps to run an Express.js server.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Getting Started

**Clone the Repository**

   ```bash
   https://github.com/Joshua-Nweze/HGNx.git
   ```

**Navigate to task two directory**

```bash
cd Task_Two
```

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
node index.js
```


# HNGx TASK FIVE API DOCUMENTATION

## Introduction

This API saves and get a video in the database

This API takes four requests:

1. GET
2. POST

The GET request is used to get a resource from the database.

The POST request is used to add a resource to the database.


## Getting started

Base URL: https://repulsive-sandals-tick.cyclic.app

## Endpoints

**1. Adding a resource to the database**

**HTTP method**: POST

**URL**: /video/upload

**Request body**:

Request body format is JSON.

Request body is a JSON object representing the resource.

The object key is 'name' and the value is the name you desire to add to the database.

Example:

    {
	    "video": "my-video.mp4"
    }

Expected response:
```
{
    "message": "Video saved successfully",
    "videDetails": "1234567890" //id of the video
}

```

**2. Getting a resource from the database**

**HTTP method**: GET

**URL**: /video/<video_id>

**Request parameter** : <user_id>

<user_id> is the ID of the user you want to get.

Example:

```
video/12345
```

  ## Setting up in local server
Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Clone the Repository**
  ```bash
https://github.com/Joshua-Nweze/HGNx.git
```

**Navigate to task five directory**
```bash
cd Task_Five

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
