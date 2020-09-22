console.log("its working");


function clearInput() {
    $("#firstName").val("");
    $("#lastName").val("");
    $("#email").val("");
    $("#number").val("");
  }

  function writeSpreadsheet(newData) {
    var values = newData;

    values = Object.values(values);

    var body = {
      values: [values],
    };

    gapi.client.sheets.spreadsheets.values
      .append({
        spreadsheetId: "1-POu0vQfh6FSwUzaQGcABGU9YXTovD-yD25gCpr_LCw",
        range: "Sheet1!A1:D1",
        valueInputOption: "USER_ENTERED",
        resource: body,
      })
      .then((response) => {
        var result = response.result;
        console.log(`${response} cells updated.`);
      });
  }


  
  $("#add-btn").on("click", function (event) {
    event.preventDefault();
    var newData = {
      firstName: $("#firstName").val().trim(),
      lastName: $("#lastName").val().trim(),
      email: $("#email").val().trim(),
      phoneNumber: $("#number").val().trim(),
      dateCreated: new Date(),
    };
    if (newData.firstName.length === 0 || newData.lastName.length === 0 || newData.email.length === 0 || newData.phoneNumber.length === 0){
      alert("please add name")
    }  else {
      writeSpreadsheet(newData);
      clearInput();
    }
    
  });

  // Client ID and API key from the Developer Console
  var CLIENT_ID =
    "838899231116-0uk958nsqkqj0qh9lgli0jk9v9jpjoim.apps.googleusercontent.com";
  var API_KEY = "AIzaSyBUgoogrk028baFxCMTolup4i46b_Iuewk";

  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = [
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
  ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

  var authorizeButton = document.getElementById("authorize_button");
  var signoutButton = document.getElementById("signout_button");

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  function handleClientLoad() {
    gapi.load("client:auth2", initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        function () {
          // Listen for sign-in state changes.
          gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        },
        function (error) {
          appendPre(JSON.stringify(error, null, 2));
        }
      );
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = "none";
      signoutButton.style.display = "block";
    } else {
      authorizeButton.style.display = "block";
      signoutButton.style.display = "none";
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }