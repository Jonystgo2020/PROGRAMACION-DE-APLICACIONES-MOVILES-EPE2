/* jshint browser: true */

/*global alert*/

/*global console*/

/*global device*/
window.onerror = function (msg, url, line) {
    var idx = url.lastIndexOf("/");
    if (idx > -1) {
      url = url.substring(idx + 1);
    }
    // Construye la cadena del mensaje que mostraremos al usuario
    var errStr = "ERROR in " + url + " (line #" + line + "): " + msg;
    // Escribe el error en la consola
    console.error(errStr);
    // Dile a la usuario lo que pasó
    alert(errStr);
    return false;
   };
   function onBodyLoad() {
    console.log("Entering onBodyLoad");
    alert("onBodyLoad");
    document.addEventListener("deviceready", onDeviceReady);
    console.log("Leaving onBodyLoad");
   }
   function onDeviceReady() {
    console.log("Entering onDeviceReady");
    console.log("Cordova: " + device.cordova);
    navigator.notification.alert("Cordova is ready");
    console.log("Leaving onDeviceReady");
   }
   function makeContact() {
    var newContact = navigator.contacts.create();
    // Rellenar el objeto de contacto con valores
    var fullName = "John M. Wargo";
    newContact.displayName = fullName
    newContact.nickname = "John";
    // Complete las entradas del nombre del contacto
    var tmpName = new ContactName();
    tmpName.givenName = "John";
    tmpName.familyName = "Wargo";
    tmpName.formatted = fullName;
    // Luego agregue el objeto de nombre al objeto de contacto
    newContact.name = tmpName;
    newContact.save(saveSuccess, contactError);
   }
   function saveSuccess() {
    navigator.notification.alert("Contact created successfully");
   }
   function findContact() {
    var contactFields = ["displayName", "name", "phoneNumbers", "emails", "addresses"];
    var contactOptions = {
      filter: "Wargo",
      multiple: true
    };
    navigator.contacts.find(contactFields, contactSuccess, contactError, contactOptions);
   }
   function pickContact() {
    navigator.contacts.pickContact(contactSuccess, contactError);
   }
   function contactSuccess(contacts) {
    for (var i = 0; i < contacts.length; i++) {
      console.log("Contact[" + i + "]: " + JSON.stringify(contacts[i]));
    }
    navigator.notification.alert(contacts.length + " contacts found.");
   }
   function contactError(err) {
    console.error(err);
    console.log("Error: " + err.code);
    navigator.notification.alert("Error: " + err.code);
   }
   function onSuccess(resStr) {
    alert("Result: " + resStr.value);
    navigator.globalization.stringToDate(resStr.value, function (res) {
      console.log("Result: " + JSON.stringify(res));
    }, onFailure);
   }
   function onFailure(error) {
    alert('Error conveting date to string\n Error Code: ' + error.code + '\nError Message: ' + error.message);
   }