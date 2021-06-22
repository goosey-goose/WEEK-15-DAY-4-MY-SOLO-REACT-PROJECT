'use strict';

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Spots', [
        {userId: 1, addressLine1: "Dornie", addressLine2: "Kyle of Lochalsh IV40 8DX", addressLine3: "United Kingdom", addressLine4: "", lat: 57.48446481263117, lng: -5.40315671963956, spotName: "Eilean Donan Castle", price: 500.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, addressLine1: "Castle Road End", addressLine2: "Dumfries DG1 4RU", addressLine3: "United Kingdom", addressLine4: "", lat: 55.3334412856341, lng: -3.5354802375348724, spotName: "Caerlaverock Castle", price: 450.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, addressLine1: "Appin PA38 4BL", addressLine2: "United Kingdom", addressLine3: "", addressLine4: "", lat: 56.71278087130002, lng: -5.383831943644952, spotName: "Castle Stalker", price: 550.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 4, addressLine1: "Bamburgh NE69 7DF", addressLine2: "United Kingdom", addressLine3: "", addressLine4: "", lat: 55.84448921385617, lng: -1.7018837513144025, spotName: "Bamburgh Castle", price: 675.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 7, addressLine1: "Alnwick NE66 1NQ", addressLine2: "United Kingdom", addressLine3: "", addressLine4: "", lat: 55.62627992399523, lng: -1.715725661811888, spotName: "Alnwick Castle", price: 600.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 7, addressLine1: "Castle St", addressLine2: "Criccieth LL52 0DP", addressLine3: "United Kingdom", addressLine4: "", lat: 53.0614756969584, lng: -4.207269545589252, spotName: "Castell Criccieth", price: 450.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 4, addressLine1: "Welshpool SY21 8RF", addressLine2: "United Kingdom", addressLine3: "", addressLine4: "", lat: 52.944860568040184, lng: -3.155284347780522, spotName: "National Trust - Powis Castle and Garden", price: 500.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, addressLine1: "Castle Sq", addressLine2: "Ludlow SY8 1AY", addressLine3: "United Kingdom", addressLine4: "", lat: 52.60153033307975, lng: -2.698501301363574, spotName: "Ludlow Castle", price: 600.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, addressLine1: "Castle Green", addressLine2: "Kenilworth CV8 1NG", addressLine3: "United Kingdom", addressLine4: "", lat: 52.55105959475292, lng: -1.5357808195749814, spotName: "Kenilworth Castle and Elizabethan Garden", price: 600.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, addressLine1: "Broughton Castle", addressLine2: "Banbury OX15 5EB", addressLine3: "United Kingdom", addressLine4: "", lat: 52.2215820530271, lng: -1.3973617146001478, spotName: "Broughton Castle", price: 600.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, addressLine1: "Pembroke SA71 4LA", addressLine2: "United Kingdom", addressLine3: "", addressLine4: "", lat: 51.92380048629138, lng: -4.940890801955864, spotName: "Pembroke Castle", price: 575.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, addressLine1: "White Hill", addressLine2: "Berkhamsted HP4 1LJ", addressLine3: "United Kingdom", addressLine4: "", lat: 51.98351572935602, lng: -0.6637404582335353, spotName: "Berkhamsted Castle", price: 475.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, addressLine1: "Windsor SL4 1NJ", addressLine2: "United Kingdom", addressLine3: "", addressLine4: "", lat: 51.70988211028928, lng: -0.5253213532587047, spotName: "Windsor Castle", price: 675.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 4, addressLine1: "Castle Hill", addressLine2: "Rochester ME1 1SW", addressLine3: "United Kingdom", addressLine4: "", lat: 51.61543611398578, lng: 0.5128219340525402, spotName: "Rochester Castle", price: 475.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 7, addressLine1: "Hever Rd", addressLine2: "Hever", addressLine3: "Edenbridge TN8 7NG", addressLine4: "United Kingdom", lat: 51.40005345002988, lng: -0.01317066485182366, spotName: "Hever Castle & Gardens", price: 600.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 7, addressLine1: "Bodiam", addressLine2: "Robertsbridge TN32 5UA", addressLine3: "United Kingdom", addressLine4: "", lat: 51.253011272112474, lng: 0.5128219340525402, spotName: "Bodiam Castle", price: 700.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 4, addressLine1: "Arundel BN18 9AB", addressLine2: "United Kingdom", addressLine3: "", addressLine4: "", lat: 51.00979553192081, lng: -0.5114794427612194, spotName: "Arundel Castle", price: 500.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, addressLine1: "The Square", addressLine2: "Corfe Castle", addressLine3: "Wareham BH20 5EZ", addressLine4: "United Kingdom", lat: 50.80905214546581, lng: -2.006405776489412, spotName: "National Trust - Corfe Castle", price: 700.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, addressLine1: "Restormel Rd", addressLine2: "Lostwithiel PL22 0EE", addressLine3: "United Kingdom", addressLine4: "", lat: 50.660119833598, lng: -4.747104054991098, spotName: "Restormel Castle", price: 670.00, createdAt: new Date(), updatedAt: new Date()},
        {userId: 1, addressLine1: "Castle Dr", addressLine2: "Falmouth TR11 4LP", addressLine3: "United Kingdom", addressLine4: "", lat: 50.36083329191669, lng: -5.120835638423146, spotName: "Pendennis Castle", price: 570.00, createdAt: new Date(), updatedAt: new Date()}
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Spots', null, {});
  }
};
