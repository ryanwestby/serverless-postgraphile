# serverless-postgraphile

## What is this?

Serverless GraphQL API for PostgreSQL database using [AWS Lambda](https://aws.amazon.com/lambda/), [Express](https://expressjs.com/),
[Serverless](https://up.docs.apex.sh/),
and [PostGraphile](https://www.graphile.org/postgraphile/)

* [Short Intro to PostGraphile](https://www.youtube.com/watch?v=b3pwlCDy6vY)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You should have the following installed:

* [Node 8.10](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/en/)
* [Postgraphile](https://www.graphile.org/)
  *  ```yarn global add postgraphile```
* [Serverless Framework](http://www.serverless.com):
  * ```yarn global add serverless```


The [GraphiQL.app](https://github.com/skevy/graphiql-app) is also helpful:

```
brew cask install graphiql
```

## Installing Locally

Clone this repo, cd to the project root directory, and install dependencies.

```
$ git clone git@github.com:ryanwestby/serverless-postgraphile.git
$ cd serverless-postgraphile
$ yarn
```

To run the test database:

```
yarn run init-local-db
yarn run local-server
```

Then open GraphiQL.app and paste `http://localhost:5000/graphql` into the GraphQL Endpoint field.

#### Sample Query

```
{
  allPosts(first: 5) {
    nodes{
      id
      headline
      body
    }
  }
}
```

## Environment Variables

This project uses the dotenv package to keep important environment variables uncommitted.

Create a `.env` file and add the following keys and their values:

```
POSTGRES_CONNECTION=
SCHEMA=
PG_DEFAULT_ROLE=
```

The postgres connection string should look something like:
```
postgres://username:password@host:port/dbname
```

## Tests

This project uses Jest to run tests defined in the `/tests/` dir. To run them:

```
yarn test
```

There is also an ESLint file that can be used for static code analysis. Make sure you have ESLint installed, then run:

```
eslint .
```

## Security

**IMPORTANT:** You run the risk of exposing your database schema to the public with this project. Please read into Postgraphile and PostgreSQL's suported security features before deploying this server:

https://www.graphile.org/postgraphile/security/

This project does not have these security features enabled by default. You will have to configure them yourself.

## Deployment

Make sure you:
1. Can connect to your database, since a pre-deploy hook will run that creates an introspection.cache of your database.
2. Have the correct environment variables in your `.env` file.
3. AWS credentials are configured correctly: https://serverless.com/framework/docs/providers/aws/guide/credentials/
4. Postgraphile and Serverless are installed globally.
5. Run:
```
sls deploy --stage dev
```

Serverless will return an endpoint similar to this:

```
endpoints:
  POST - https://4113lklkj2.execute-api.us-west-2.amazonaws.com/dev/
```

Copy the endpoint, open GraphiQL.app and paste the url into the GraphQL Endpoint field.

#### Sample Query

```
{
  allPosts(first: 5) {
    nodes{
      id
      headline
      body
    }
  }
}
```

## Additional Notes

There is an article describing the project in detail here:
http://westby.io/useful-serverless/
