module.exports = {

  friendlyName: 'Read from Storage',

  description: 'Retrieve a key-value pair from the persistent data store. This is compatible with PhoneGap/Cordova',

  extendedDescription: 'This machinepack provides an easy-to-use key/value pair-based database using the HTML5 localStorage model. With some HTTP requests you should be able to effectively use this as a replacement for cookies on PhoneGap/Cordova-based apps.',
  inputs: {
    key: {
      example: 'users',
      description: 'The name of the key you wish to retrieve.',
      required: true
    },
    asJSON: {
      example: 'true',
      description: 'If true, this machine will return your value as a JSON object. Otherwise, the value will be returned as a JSON-formatted string as default.',
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
        description: 'Successfully read data from the persistent datastore.',
        example: 'Returned Value'
    },
      notFound: {
          friendlyName: 'Not Found',
          description: 'No value was found the provided key.'
    }
  },

  fn: function (inputs, exits) {

    // Making sure we don't wipe the local storage everytime we run this function or try to write to a non-existent location.
    if (typeof localStorage === "undefined" || localStorage === null) {

      var LocalStorage = require('node-localstorage').LocalStorage;

      localStorage = new LocalStorage('./scratch');
    }

    // Retrieving the specific key/value pair.
    var kvalue = localStorage.getItem(inputs.key);

    // Do we want to output the value as a JSON object
    if ( inputs.asJSON === "true" ) {

      var kvalue = localStorage.getItem(inputs.key)
      var kvalue = JSON.parse(kvalue)
    }

    // Checking the value is actually there...
    if (kvalue || kvalue === '') {

     // Finally, we return the value of the key/value pair. 
    return exits.success(kvalue);
    }

    return exits.notFound();

  }

};
