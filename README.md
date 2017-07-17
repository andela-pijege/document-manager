[![Build Status](https://travis-ci.org/andela-pijege/document-manager.svg?branch=develop)](https://travis-ci.org/andela-pijege/document-manager)
[![Coverage Status](https://coveralls.io/repos/github/andela-pijege/document-manager/badge.svg?branch=develop)](https://coveralls.io/github/andela-pijege/document-manager?branch=develop)
[![Code Climate](https://codeclimate.com/github/andela-pijege/document-manager/badges/gpa.svg)](https://codeclimate.com/github/andela-pijege/document-manager)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
# document-manager
document-manager is a full stack document management system, complete with roles and privileges. It creates a restful API for users to create and manage documents and it also provides admin priviledges.

## Table of Contents

* [Features](#features)
* [Technologies](#technology)
* [Installation and Setup](#installation-and-setup)
* [Limitations](#limitations)
* [How to Contribute](#how-to-contribute)
* [License](#license)

### Feaatures

#### Users
Admin can perform all users actions and the following actions
  - Search for all Users
  - Delete any user
  - Search for documents (public documents)
  - view all role documents

Users can perform the following actions with the application
  - Create documents
  - Edit documents
  - Delete documents
  - View personal documents
  - view regular role documents
  - Search for documents (personal, public, and role)
  - View All Documents (All documents with public access and regular role acess)

#### Documents
A document has the following properties
  - title
  - content
  - access right : Private, Public and role
  - userID

#### Roles
The application contains 2 roles by default
  - admin
  - regular

#### API Documentation

#### Authentication
The api endpoints are protected from unauthorized access. JSON web token is used to protect the application from anuthorised access. Some other middleware are used to futher protect endpoints
 so as to limit acces rights.

### Technologies

**document-manager** makes use of a host of modern technologies. The core ones are:

* REACT: This project makes use of the REACT Javascript library to build the interface. REACT is used for building web pages that are structured as a collection of components. For more information about  See [this link](https://facebook.github.io/react/).
* ECMAScript 6: Also known as ES2015, this is the newest version of Javascript with 
    next-generation features like arrow functions, generators, enhanced object literals, 
    spread operators and more. The ES2015 is consistently used throughout this project. See [this link](https://en.wikipedia.org/wiki/ECMAScript) for details.
* NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side. 
    See [this link](https://en.wikipedia.org/wiki/Node.js) for details.
* ExressJS: ExpressJS, is a web application framework for Node.js, It is designed for building web applications and APIs. 
    see [this link](https://en.wikipedia.org/wiki/Express.js).
* Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are       easy to test. For more information about Redux see [this link](http://redux.js.org/) for details.
* Materializecss is used to style the frontend. For more information about materializecss see [this link](http://materializecss.com/) for details.
* Webpack: Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging modules.
* Postgresql & Sequelize: Postgresql is an advanced open source Object-Relational Model (ORM) database.Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
* All code is written using the Airbnb javascript style guide, see [this link](https://github.com/airbnb/javascript) for details.

### Installation and Setup

1. Clone the repository:
```
https://github.com/andela-pijege/document-manager.git
```
2. Navigate into the cloned repository folder

3. Install dependencies:
```
$ npm install
```
4.  Create Postgresql database and run migrations `npm run db:migrations`.

5. Create a `.env` file in the root directory of the application. Use a different database for your testing and development. Example of the content of a .env file looks like this

```
PRIVATE_KEY=myprivatekey
TEST_DATABASE_URL=postgres://127.0.0.1:5432/document-manager-test
```

6. Start the application:

```
http://localhost:9000/
```

5. Test the API endpoints with Postman

### Limitations

The limitaton withthe current version of Document Manager includes:

  * Upload Feature is not available. (you cannot upload files)
  * Documents cannot be shared to users outside the application

These limitations will be resolved in the next upgrade of this application.

### How To Contribute
Contributing to this project would always be a welcoming idea. If you feel you have an addition to make this project better, follow the steps bellow:

- **Fork** the repository.
- Create as many **branch** as you like depending on how many features you would love to add. One feature per branch.
- Make neccessary changes and **commit**.
- Finally, submit a **pull request**.

### License

This project is authored by **Ijege Precious** (precious.ijege@andela.com) and is licensed for your use, modification and distribution under the **MIT** license. 

[MIT][license] © [andela-pijege][author]

<!-- Definitions -->

[license]: LICENSE

[author]: andela-pijege