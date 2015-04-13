module.exports = {

  friendlyName: 'Save to Storage',

  description: 'Save a key-value pair in string format to the persistent data store. This is compatible with PhoneGap/Cordova',

  extendedDescription: 'This machinepack provides an easy-to-use key/value pair-based database using the HTML5 localStorage model. With some HTTP requests you should be able to effectively use this as a replacement for cookies on PhoneGap/Cordova-based apps.',
  
  inputs: {
    key: {
      example: 'user',
      description: 'The name of the key you wish to save to the unique session.',
      required: true
    },
    value: {
      typeclass: '*',
      description: 'The value of the key you wish to save to the datastore. Only supports JSON-formatted strings or objects.',
      required: true
   }

  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'An unexpected error occurred.'
    },

    success: {
      example:  {
        friendlyName: 'then',
        desription: 'Successfully saved data to the persistent datastore.'
      }
    }
  },

  fn: function (inputs, exits) {
    // Making sure we don't wipe the local storage everytime we write to it.
    if (typeof localStorage === "undefined" || localStorage === null) {

      var LocalStorage = require('node-localstorage').LocalStorage;

      localStorage = new LocalStorage('./scratch');
    }

    localStorage.setItem(inputs.key, JSON.stringify(inputs.value));


    // Let the server know the data has been saved successfully and return the approproate exit.
    return exits.success(inputs.value);

  }

};
