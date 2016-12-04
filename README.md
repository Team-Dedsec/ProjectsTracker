<p align="center">
<a href="http://academy.telerik.com/">
<img src="https://camo.githubusercontent.com/08ecbe7b67d65cc7c6990787e2836b27b4296f2d/68747470733a2f2f7261772e6769746875622e636f6d2f666c65787472792f54656c6572696b2d41636164656d792f6d61737465722f50726f6772616d6d696e6725323077697468253230432532332f436f6465732f4f746865722f54656c6572696b2e706e67"/>
</a>

<h1 align="center">Web applications with Node.js Team "Dedsec"</h1>

###:mortar_board:Team Members
| Name              | Academy Username      	|
|-------------------|-------------------|
|                   | :white_check_mark:|
|Александър Несторов |__Alexander.N__	        |
|Иван Първанов |__ivan.parvanov.1__	        |
|Калоян Костов |__RightWing__ |	
|Юлиан Теофилов|__Yulian_Teofilov__       	|	

# ProjectsTracker

## Project Description  

This is a simple project managment system that allows you to have a better view on your projects, employees and work that they had done.

The application is hosted in the following domains:
- <a href="https://dedsec.herokuapp.com/">Heroku Link 1</a>
- <a href="https://project-tracker-team-dedsec.herokuapp.com/">Heroku Link 2</a>
- <a href="https://www.youtube.com/watch?v=h4Ky2AGr1nU">Simple demo</a>

## Local Install
    $ npm install
    
## Local Start
    $ npm start

## Usage

#### Register

Before using ProjectsTracker, you must register in the application.
In the navigation bar follow up SignUp registration form.

#### Login

If you have not already register, you can log with your Facebook or GitHub account.
Follow up the Login page to see available options.

- Local login
- Login with Facebook account
- Login with GitHub account

#### Create Project

 Every user in this app can create project and automatically sets him as Lead user for the project.
 In every project Lead User can:
 
 - add tasks to other members of the current project
 - add users to current project

#### Create Task

You can create tasks in your application and add other users to your project.
For each task you can set priority and additional information to the encountered problem.

Lead User can:

- change users contributed to current task

#### Add Comments to Task

Users can:
- add comment for every task.
- delete comment

## Application public part

Everyone can see information about current projects which are set to be public in this app and also basic information for all users.
Visitors cannot create projects and tasks until it's not logged in the app.

## Application private part

Only LeadUser can add tasks.
Only Users with Role: admin can edit or delete data in this application in Settings menu.
Admin can delete:

- projects
- tasks
- users

## Database

We are using mongoDb with mongoose.

## FAQ

##### How can I re-ask for forgotten password?

In login page click the forgot password link, enter your e-mail we will send automatically information to change your password.

## Test

Tests cover requester.js and task-controller.js

#### Run Tests
    $ npm install --only=dev
    $ npm test
