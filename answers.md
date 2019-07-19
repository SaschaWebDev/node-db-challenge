Q:
Explain the difference between Relational Databases and SQL.

A:
A relational database (RDBMS) is a organized system to store data with a specific relational technique. Resources/Data is organized in tables with attributes/columns as their different characteristics and tables can be in different relations to each other. SQL is on the other hand the query language that is used to access meaningful information about of the database. Often records of tables are joined through the SQL language to get a full set of data for a request.

Q:
Why do tables need a primary key?

A:
A table needs a primary key to reference a record/row with a deterministic and unique key that give access only to this single set of data. This primary key is commonly an auto-incremented integer, has to be unique and will be used for JOIN statements of SQL to connect different rows of different tables that are in a relationship to a coherent set of data.

Q:
What is the name given to a table column that references the primary key on another table.

A:
This is called a foreign key which references to the primary key of another table to link data that are in a relationship to each other together.

Q:
What do we need in order to have a many to many relationship between two tables.

A:
We need to create a third table in the middle between them. This table is usually called table1_table2 and contains an auto-incremented integer id as primary key and two foreign keys for table1_id and for table2_id within it. It can also hold extra information about the data records like a quantity of a recipe and ingredients that otherwise would fit nowhere else.
