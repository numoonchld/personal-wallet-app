## development notes

### dockers essentials 

- `docker-compose up`
    - runs the entire orchestra of images

- `docker-compose run --rm --service-ports 'service-name'`
    - runs the shell like `docker run -it` for the container whose name is specified
    - `--rm` removes the container automatically once it exits

- `docker exec -it 'container-name' /bin/bash`
    - open interactive terminal in an already running container

- [Containerize Node, React, and Postgres With Docker on AWS](https://medium.com/better-programming/containerize-node-react-postgres-with-docker-on-aws-ca548595f01e)

- [Setting up isolated Node docker environment](https://auth0.com/blog/use-docker-to-create-a-node-development-environment/)

### server environment setup 

`node --version`
`npm --version`
    - check version of `node` and `npm`

`npm init`
    - created the `package.json` file

`npm install express --save -g`
    - install express

`npm install --save-dev nodemon`
    - install nodemon for development (to restart server automatically anytime you make changes to source code)

`npm list express`
    - check version of express installed

`npm install --save-dev typescript ts-node @types/node @types/express`
    - install typescript, typescript-node 
    - install node and express types

- [Setting up typescript with node and express](https://blog.logrocket.com/typescript-with-node-js-and-express/)


### client environment setup

- `npx create-react-app 'app-name' --template typescript --use-npm`
    - create a react app with `typescript` and `npm`

- `npm install --save typescript @types/node @types/react @types/react-dom @types/jest`
    - install typescript for react

- `npm run` 
    - run this in the `app-name`'s root dir after creating base react app to start development server for the client side

- no need to install `nodemon` for react development server 
    - built-in hot reload exists, created by `create-react-app`


### db environment setup

- to the `.env` file of the db docker, add this entry (actual password customizable)
    -   ```
        POSTGRES_DB=db-name
        POSTGRES_PASSWORD=db-password
        ```
 
- `docker exec -it postgres-docker psql -U postgres`
    - login to the running postgres container

- `create database db-name;`
    - after logging into the container 

- [Bookshelf.js ORM tutorial](https://zetcode.com/javascript/bookshelf/)

- [A case against ORM](https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/)

### ORM setup 

- [A quick starter for Bookshelf.js](https://dev.to/projectescape/a-crash-course-to-bookshelf-js-2ejb)