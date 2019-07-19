exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('actions')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('actions').insert([
        {
          project_id: 1,

          description:
            'Buy some paper sheets, learn how to craft good paper airplane and let them fly!',
          notes: 'Make sure to watch a paper craft tutorial first.',
          isCompleted: false,
        },

        {
          project_id: 2,

          description:
            'Buy some fresh beef and take some hours off to play with the cat.',
          notes: 'All her favorite toys should be in place already.',
          isCompleted: true,
        },
        {
          project_id: 3,

          description:
            'Make a reservation for a nice restaurant and pick a route where you take a walk next to the sea/river, then surprise her.',
          notes: 'Think about how the evening could be very nice.',
          isCompleted: false,
        },
      ]);
    });
};
