# TASK MANAGER API 

This RESTful API project is built on [NodeJS](https://nodejs.org/en/about/) using [Express](https://expressjs.com/) as web gramework and [MongoDB](https://www.mongodb.com/) as document database.

## Base URL
[https://adkh-task-manager.herokuapp.com/](https://adkh-task-manager.herokuapp.com/)

## Services

### User

| Request Type  | Request Name  | Authentication | Endpoint| Description |
| ------------|-------------|-------------| -------------------| ----- |
| POST  | Sign Up User  | Not required | /users | Registers users who are using the api for the first time |
| POST  | Login User  | Not required | /users/login | Authenticates users so that they may be able to handle tasks endpoints |
| POST | Logout User | Required | /users/logout | Logs out user from the current device |
| POST | LogoutAll User | Required | /users/logoutAll | Logs out user from all the created sessions |
| POST | Add Profile Avatar | Required | /users/me/avatar | Add profile photo (supported formats are *jpg, jpeg, png*) | 
| GET | View Profile | Required | /users/me | Fetches profile details of the  user |
| GET | View Profile Avatar | Required | /users/me/avatar | Fetches profile photo of the user |
| PATCH | Edit User Details | Required | /users/me | Edits profile details of the user |
| DELETE | Delete User Account | Required | /users/me | Deletes user account permanently |
| DELETE | Delete Profile Avatar | Required | /users/me/avatar | Deletes profile photo of the user permanently |

### Task

| Request Type  | Request Name  | Authentication | Endpoint| Description |
| ------------|-------------|-------------| -------------------| ----- |
| POST  | Create Task | Required | /tasks | Creates new task for the logged in user takes in two parameters description(string) and completed(boolean) |
| GET  | Fetch tasks  | Required | /tasks | Fetch all tasks of the logged in user |
| GET | Fetch task | Required | /tasks/{id} | Fetch a particular task by using its id |
| PATCH | Edit task | Required | /tasks/{id} | Edits a particular task by using its id |
| DELETE | Delete Task | Required | /tasks/{id} | Deletes a task by using its id |



