const express = require('serverless-express/express');
const { postgraphile } = require('postgraphile');
const Pool = require('pg-pool');
const pgConfig = require('./config');

const {
  NODE_ENV = 'development',
  SCHEMA, // Schema(s) to expose to PostGraphile
  PG_DEFAULT_ROLE // Postgraphile requires a default Postgres role to use
} = process.env;
const isProduction = NODE_ENV == 'production';

const pool = new Pool(pgConfig);
let postgraphileConfig = { // options
  dynamicJson: true,
  // disableQueryLog: isProduction,
  graphqlRoute: '/',
  extendedErrors: ['hint', 'detail', 'errcode'],
  // jwtSecret: '',
  // jwtPgTypeIdentifier: '',
  legacyRelations: 'omit',
  readCache: 'introspection.cache',
};
if (isProduction) {
  postgraphileConfig.pgDefaultRole = PG_DEFAULT_ROLE;
}

const app = express();
app.use(postgraphile(
  pool, // pgConfig
  SCHEMA,
  postgraphileConfig,
));

module.exports = app;