module.exports = {

  friendlyName: 'Delete from Storage',

  description: 'Delete a key-value pair from the persistent data store. This is compatible with PhoneGap/Cordova',

  extendedDescription: 'This machinepack provides an easy-to-use key/value pair-based database using the HTML5 localStorage model. With some HTTP requests you should be able to effectively use this as a replacement for cookies on PhoneGap/Cordova-based apps.',
  inputs: {
    key: {
      example: 'users',
      description: 'The name of the key you wish to delete.',
      required: true
    }

  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'An unexpected error occurred.'
    },
    success: {
        friendlyName: 'then',
        description: 'Successfully deleted data from the persistent datastore.',
        example: 'Returned Value'
    },
      notFound: {
          friendlyName: 'Not Found',
          description: 'No value was found the provided key.'
    }
  },

  fn: function (inputs, exits) {

    // Making sure we don't wipe the local storage everytime we write to it.
    if (typeof localStorage === "undefined" || localStorage === null) {

      var LocalStorage = require('node-localstorage').LocalStorage;

      localStorage = new LocalStorage('./scratch');
    }

    var kvalue = localStorage.getItem(inputs.key);

    // Checking the value is actually there...
    if (kvalue || kvalue === '') {
      localStorage.removeItem(inputs.key)
    return exits.success(kvalue);
    }

    return exits.notFound();

  }

};
