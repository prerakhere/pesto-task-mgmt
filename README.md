## pesto.tech - Task Management
- This is a technical assignment for pesto.tech. based on this [problem statement](https://github.com/prerakhere/pesto-task-mgmt/blob/main/prob-statement.md).
- Live link - [bit.ly/pesto-task-mgmt](https://bit.ly/pesto-task-mgmt)

## Features Overview

### Task Management:
- Users can perform CRUD operations on tasks.
- Each task consists of a title, an optional description, and a status.
- A task's status can be one of these three - Todo, In Progress, Done.

### Search, Sorting and Filtering:
- Tasks can be searched using search bar.
- Tasks can be sorted based on the time they were last added or first added.
- Users can filter tasks based on the task status.

### User Authentication:
- Users can signup and login with their email and password.

### Guest User Tasks:
- Guest or unauthenticated users can save their tasks locally without an account.
- Local tasks gets synced to their account once a user signs up.



## Technical Overview
### Frontend
- The frontend is built using React and Tailwind CSS.
- Some Radix components like select dropdown, modal, icons are also used.
- The app is mobile responsive.

### Backend
- The backend APIs are built in Node/Express.
- The backend implements clean architecture - where the controllers, core domain logic, services, and repositories all are separated.
- Server side validations are handled using [Joi](https://joi.dev).
- There is a centralized error handling mechanism which gracefully handles and streamlines handling of errors through middlewares.

### Database
- The app uses Postgres database that is powered by [Supabase database](https://supabase.com/database).
- It consists of two tables - user and task.

### Auth Provider
- The app uses JWT authentication which is powered by [Supabase auth](https://supabase.com/auth).

### Infra
- The AWS components are provisioned using infrastructure as code - [Terraform](https://www.terraform.io).

### Testing
- Currently as you read this, there are no unit tests written. Will add them asap.


## Architecture and Hosting
- The frontend React build is stored in AWS S3 and is served via AWS Cloudfront CDN.
- The backend code is hosted on [Render](https://render.com)'s servers. It is hosted under Render's free plan and so responses can take a while to be sent back.
- The cloudfront is configured with an `/api` path pattern that directs requests with `/api` to Render's origin servers.
