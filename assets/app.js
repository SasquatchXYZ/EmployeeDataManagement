//Initialize Firebase

var config = {
    apiKey: "AIzaSyCqjjTaOUWLlM2f4nWsxvS7lfAdIS2trPQ",
    authDomain: "gt201808-class-activities.firebaseapp.com",
    databaseURL: "https://gt201808-class-activities.firebaseio.com",
    projectId: "gt201808-class-activities",
    storageBucket: "gt201808-class-activities.appspot.com",
    messagingSenderId: "554263392638"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
let name = "";
let role = "";
let startDate = "";
let rate = "";

$("#add-employee").on("click", function(event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    role = $("#role-input").val().trim();
    startDate = $("#start-input").val().trim();
    rate = $("#rate-input").val().trim();

    database.ref('Employee-Tracking').push({
        name: name,
        role: role,
        startDate: startDate,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref('Employee-Tracking').on("child_added", function(snapshot) {
    let em = snapshot.val();

    console.log(em.name);
    console.log(em.role);
    console.log(em.startDate);
    console.log(em.rate);

    $(".table").append(`<tr>
                            <td>${em.name}</td>
                            <td>${em.role}</td>
                            <td>${em.startDate}</td>
                            <td>${em.rate}</td>
                            </tr>`);


}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});