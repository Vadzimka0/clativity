## Mativity backend app

### Run locally:

#### Prerequisites: Node.js 18, PostgreSQL 14.6

```bash
# psql
# the values you can see in .development.env
$ CREATE DATABASE <postgres_db>;
$ CREATE USER <postgres_user> WITH ENCRYPTED PASSWORD <postgres_password>;
$ GRANT ALL ON DATABSE <postgres_db> TO <postgres_user>;
$ ALTER DATABASE <postgres_db> OWNER <postgres_user>

```

```bash
# terminal
$ git clone git@gitlab.com:mativity/nest-api.git
$ cd nest-api
$ npm i

```

##### Run in development mode:

```bash
$ npm run start:dev

# generate one migration
$ npm run db:generate --name=<migration_name>

```

##### Run in production mode:

```bash

$ npm run db:drop
$ npm run db:migrate
$ npm run db:seed
$ npm run build
$ npm run start:prod

```
