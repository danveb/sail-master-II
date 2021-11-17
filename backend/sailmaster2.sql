\echo 'Delete and recreate sailmaster2 db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE sailmaster2;
CREATE DATABASE sailmaster2;
\connect sailmaster2

\i sailmaster2-schema.sql
\i sailmaster2-seed.sql

\echo 'Delete and recreate sailmaster2_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE sailmaster2_test;
CREATE DATABASE sailmaster2_test;
\connect sailmaster2_test

\i sailmaster2-schema.sql
