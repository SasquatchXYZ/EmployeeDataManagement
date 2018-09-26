//Initialize Firebase


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
    /*startDate = moment($("#start-input").val().trim(), 'MM/DD/YYYY').format("X");*/
    rate = $("#rate-input").val().trim();

    database.ref('Employee-Tracking').push({
        name: name,
        role: role,
        startDate: startDate,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
});

database.ref('Employee-Tracking').on("child_added", function(snapshot) {
    let em = snapshot.val();

    console.log(em.name);
    console.log(em.role);
    console.log(em.startDate);
    console.log(em.rate);

    let startDateFormatted = moment(em.startDate).format("MM/DD/YYYY");

    let monthsWorked = moment().diff(startDateFormatted, "months");

    let totalBilled = monthsWorked * em.rate;

    $(".table").append(`<tr>
                            <td>${em.name}</td>
                            <td>${em.role}</td>
                            <td>${startDateFormatted}</td>
                            <td>${monthsWorked}</td>
                            <td>${em.rate}</td>
                            <td>${totalBilled}</td>
                            </tr>`);

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});