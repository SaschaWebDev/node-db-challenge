exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('projects').insert([
        {
          name: 'Paper Airplane',
          description: 'Build a paper airplane.',
          isCompleted: false,
        },
        {
          name: 'Cat happiness',
          description: 'Make your cat a wonderful day.',
          isCompleted: true,
        },
        {
          name: 'A night out',
          description: 'Have a wonderful night out with your girlfriend.',
          isCompleted: false,
        },
      ]);
    });
};
