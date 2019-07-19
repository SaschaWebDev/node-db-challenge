exports.up = function(knex) {
  return knex.schema
    .createTable('projects', function(tbl) {
      tbl.increments();
      tbl
        .string('name', 128)
        .unique()
        .notNullable();
      tbl
        .string('description', 256)
        .unique()
        .notNullable();

      tbl.boolean('isCompleted').defaultTo(false);
    })

    .createTable('actions', function(tbl) {
      tbl.increments();
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      tbl
        .string('description', 256)
        .unique()
        .notNullable();
      tbl
        .string('notes', 128)
        .unique()
        .notNullable();
      tbl.boolean('isCompleted').defaultTo(false);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects').dropTableIfExists('actions');
};
