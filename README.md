# Todo App

## Introduction

Allows multiple users to maintain and manage own Todo lists.

![](assets/Todo%20App.png)

## Tech Stack

| Stack         | Tech       |
| ------------- | ---------- |
| Backend       | Node JS    |
| Web Framework | Express JS |
| Database      | MongoDB    |
| Frontend      | React      |

## How to Setup

### Start Database

Download, install and start MongoDB using following link if not already.

[MongoDB Community Download | MongoDB](https://www.mongodb.com/try/download/community)

### Start Backend API

#### Install

Change to the `todo-backend` directory

```
cd ./todo-backend
```

Install the project dependencies

```
npm install
```

#### Run

After installing the dependencies, you can run the app locally with the following command

```
npm start
```

If you chose to run the app locally, API should be accessible by `http://localhost:4000/`. You will see the following output in the browser.

![](assets/Screenshot%20Backend.png)

### Start Frontend App

#### Install

Change to the `todo-frontend` directory

```
cd ./todo-frontend
```

Install the project dependencies

```
npm install
```

#### Run

After installing the dependencies, you can run the app locally with the following command

```
npm start
```

If you chose to run the app locally, API should be accessible by `http://localhost:3000/`. You will see the following output in the browser.

![](assets/Screenshot%20Frontend.png)

## API Documentation

The backend API documentation is in HTML format and can be opened in browser.

[Todo Backend API Documentation](todo-backend\doc\index.html)

## Entity Relationship Diagram

There are only two entities, User and Todo. A single User can have multiple Todo(s) but a Todo cannot exist without a User.

![](assets/ToDo%20App%20ER%20Diagram.png)
