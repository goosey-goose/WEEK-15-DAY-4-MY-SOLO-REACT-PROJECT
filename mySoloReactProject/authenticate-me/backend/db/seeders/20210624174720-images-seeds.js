'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Images', [
        {spotId: 1, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Eilean_Donan_Castle%2C_Scotland_-_Jan_2011.jpg/383px-Eilean_Donan_Castle%2C_Scotland_-_Jan_2011.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 2, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Caerlaverock_Castle_from_the_air.jpg/450px-Caerlaverock_Castle_from_the_air.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 3, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Castle_Stalker_-_geograph.org.uk_-_204092.jpg/375px-Castle_Stalker_-_geograph.org.uk_-_204092.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 4, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Bamburgh_2006_closeup.jpg/450px-Bamburgh_2006_closeup.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 5, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Alnwick_Castle_02.jpg/450px-Alnwick_Castle_02.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 6, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Criccieth_Castle_-_geograph.org.uk_-_597029.jpg/375px-Criccieth_Castle_-_geograph.org.uk_-_597029.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 7, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Powis_Castle_2016_124.jpg/330px-Powis_Castle_2016_124.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 8, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ludlow_Castle_from_Whitcliffe%2C_2011.jpg/375px-Ludlow_Castle_from_Whitcliffe%2C_2011.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 9, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Kenilworth_Castle_gatehouse_landscape.jpg/450px-Kenilworth_Castle_gatehouse_landscape.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 10, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Broughton_castle2.jpg/330px-Broughton_castle2.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 11, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Pembroke_Castle_-_June_2011.jpg/375px-Pembroke_Castle_-_June_2011.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 12, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Berkhamsted_Castle_Jan_2007.jpg/375px-Berkhamsted_Castle_Jan_2007.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 13, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Windsor_Castle_at_Sunset_-_Nov_2006.jpg/375px-Windsor_Castle_at_Sunset_-_Nov_2006.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 14, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Rochester_Castle_Keep_and_Bailey_0038stcp.JPG/600px-Rochester_Castle_Keep_and_Bailey_0038stcp.JPG", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 15, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hever_Castle_2014_06_20_1.jpg/338px-Hever_Castle_2014_06_20_1.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 16, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Bodiam-castle-10My8-1197.jpg/375px-Bodiam-castle-10My8-1197.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 17, url: "https://www.arundelcastle.org/wp-content/uploads/2019/11/arundel-castle-set-on-a-hill-1024x682.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 18, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Corfe_Castle%2C_Dorset.jpg/450px-Corfe_Castle%2C_Dorset.jpg", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 19, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/RestormelCastle.JPG/375px-RestormelCastle.JPG", createdAt: new Date(), updatedAt: new Date()},
        {spotId: 20, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Pendennis_Castle.jpg/375px-Pendennis_Castle.jpg", createdAt: new Date(), updatedAt: new Date()}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Images', null, {});
  }
};
