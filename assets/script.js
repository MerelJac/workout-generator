var buildWorkoutBtn = document.querySelector("#new-workout");
var savedSectionBtn = document.querySelector("#see-saved-workouts");
var generateWorkoutBtn = document.querySelector("#generate-workout");
var upperBodyCheckbox = document.querySelector("#upperbody");
var lowerBodyCheckbox = document.querySelector("#lowerbody");
var regenerateBtn = document.querySelector("#regenerate-workout");
var saveWorkout = document.querySelector("#save-workout");
var addBtn = document.querySelector("#add-button");
var workoutName = document.querySelector("#name");
var newNameInputBox = document.querySelector("#nameInput");
var dateSection = $("#workout-date");
var saveTitleBtn = $("#saveTitleBtn");
var editTitleSection = $("#editTitle");

var exercises = ['Push-Ups', 'Pull-Ups', 'Sit Ups', 'Plank', 'Squats', 'Deadlifts', 'Rear Foot Elevated Split Squats', 'Calf Raises', 'Jog', 'Chest Press', 'Bicep Curls', 'Single Leg Deadlifts', 'Fire Hydrants', 'Donkey Kicks', 'Tricep Extensions', 'Hip Bridges', 'Hip Thrusts', 'Pistol Squats'];

var workoutLength = 8;
var includeWorkouts = [];

var today = dayjs();
$('#workout-date').text(today.format('MMM D'));

function buildWorkout() {
    // re-enter name
    // original workout title
    var name = $("#name");
    // make it blank
    name.text("Workout of the Day");
    // edit labels on buttons
    saveWorkout.innerHTML = "";
    saveWorkout.innerHTML = "Save Workout for Later";
    savedSectionBtn.style.display = "flex";
    var printSection = $('#printedworkout');
    printSection.show();
    var savedSection = $('#saved-section');
    savedSection.hide();
    for (var i = 0; i < workoutLength; i++) {
        // create a li in the printed section
        var li = document.createElement("li");
        // the HTML text is whatever the exercise[i] is
        li.innerText = JSON.stringify(exercises[i]);
        // randomly selectes
        var pickRandom = exercises[Math.floor(Math.random() * exercises.length)];
        // won't print duplicates
        if (!includeWorkouts.includes(pickRandom)) {
            includeWorkouts.push(pickRandom)
        }
    };
    includeWorkouts.forEach(function (li) {
        document.querySelector("#print-here").innerHTML += `<div draggable="true" ondragstart="drag(event)" class="alert alert-light alert-dismissible fade show" role="alert" id="exerciseToday">${li}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    })
};

function editName() {
    // hide old workout name
    workoutName.setAttribute("style", "display: none;");
    // locate edit title div
    var editTitleDiv = $('#editTitle');
    // create a text input for new title
    var newTitleInput = document.createElement("input");
    // give it an ID
    newTitleInput.setAttribute("id", "titleInput");
    // locate the save button
    var saveTitleBtn = document.createElement("button");
    // give the save button an ID
    saveTitleBtn.setAttribute("id", "saveTitleBtn");
    // give the save button text
    saveTitleBtn.innerText = "Save Title";
    // put it somewhere
    editTitleDiv.append(newTitleInput);
    editTitleDiv.append(saveTitleBtn);
    saveTitleBtn.addEventListener("click", function () {
        // show the old name
        workoutName.setAttribute("style", "display: flex;");
        // remove the text from the old name
        workoutName.textContent = "";
        // find the new value text content
        var titleText = newTitleInput.value;
        // make the old name the new value
        workoutName.textContent = titleText;
        // hide the old buttons
        editTitleDiv.hide();
        saveTitleBtn.hide();
    });
};

function saveNewName() {
    // original workout title
    var name = $("#name");
    // make it blank
    name.text("");
    // find the input for new text
    var newNameInputBox = $("#titleInput");
    // override old name w new name contents
    var name = newNameInputBox.textContent;
    var nameValue = name.text();
    editTitleSection.innerHTML += `<h2>${nameValue}</h2>`

}

$(function () {
    var exercisePrintedList = $('#print-here');
    $(exercisePrintedList).sortable();
});

// drag and drop for mobile
function allowDrop(ev) {
    ev.preventDefault();
}
// set what we are dragging
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  // Enable drop
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    var dropContainer = ev.target;
  
    // Check if the dragged element and the drop container have the appropriate IDs
    if (draggedElement.id === 'exerciseToday' && dropContainer.id === 'print-here') {
      dropContainer.appendChild(draggedElement);
    }};
// prevent drop if they have the same ID
    if (draggedElement.id === 'exerciseToday' && dropContainer.id !== 'exerciseToday') {
        dropContainer.appendChild(draggedElement);
      };
function regenerate() {
    // locate edit title div to hide
    var editTitleDiv = $('#editTitle');
    editTitleDiv.hide();
    // will clear the included list to start over
    includeWorkouts = [];
    // re-enter name
    // will empty the contents of the print section
    $("#print-here").empty();
    buildWorkout();
    localStorage.clear("exerciseArray");
    // will rewrite the workout name section
    workoutName.setAttribute("style", "display: flex;");
    var newH2 = $("#titleH2");
    newH2.css("display", "none");
    // clear new exercise input section
    var input = document.querySelector("input");
    input.value = "Add custom exercise";
    saveWorkout.innerHTML = "";
    saveWorkout.innerHTML = "Save Workout for Later";
};


// either pull array or create an empty array 
var pastWorkoutsArray = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
// not working yet
var savedWorkout = [];


var saveArray = [];

function saveToFiles() {
    // renames the button to prevent double click
    saveWorkout.innerHTML = "";
    saveWorkout.innerHTML = "Saved";
    var exercisesofWorkout = document.getElementsByClassName("alert");

    for (var i = 0; i < exercisesofWorkout.length; i++) {
        var exerciseName = exercisesofWorkout[i].textContent;
        console.log(exerciseName);
        saveArray.push(exerciseName);
        localStorage.setItem("exercises", JSON.stringify(saveArray));
    }
    // local storage for workout name
    var name = $("#name");
    var nameValue = name.text();
    localStorage.setItem("workoutTitle", JSON.stringify(nameValue));
    // // local storage if custom name
    // var input = $("titleInput");
    // var addedTitle = input.text();
    // localStorage.setItem("customTitle", JSON.stringify(addedTitle));


    // local storage for date
    var workoutDate = $("#workout-date");
    var workoutDateValue = workoutDate.text();
    localStorage.setItem("workoutDate", JSON.stringify(workoutDateValue));

};

function showSaved() {
    // if show shaved is empty, show "no workouts saved" otherwise show cards
    var noneSaved = $('#none-saved');

    // if local storage has this key, run this function
    if (localStorage.getItem('exercises')) {
        noneSaved.hide();
    };
    // if local storage does not exist, dont show card "null"
    if (!localStorage.getItem('exercises')) {
        $('#saved-card').hide();
    }
    // css styling to hide and show certain sections
    var savedSection = $('#saved-section');
    savedSection.show();
    var printSection = $('#printedworkout');
    printSection.hide();
    // print saved workouts
    var savedTitle = JSON.parse(localStorage.getItem("workoutTitle", [0]));
    var savedDate = JSON.parse(localStorage.getItem("workoutDate", [0]));
    var savedArrayExercises = JSON.parse(localStorage.getItem("exercises", [0]));
    var newContent =
        `<div class="hover-effect saved-card alert alert-light alert-dismissible fade show" role="alert" id="exerciseToday"><p>${savedTitle}</p><br>
        <p>${savedDate}</p><br>
        <p>${savedArrayExercises}</p><br><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>`;
    savedSection.find("h2").after(newContent);
};


function addItem() {
    var input = document.querySelector("input");
    var addedExercise = input.value;
    document.querySelector("#print-here").innerHTML += `<div class="alert alert-light alert-dismissible fade show" role="alert" id="exerciseToday">${addedExercise}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    // clears value
    input.value = "";
    // adds placeholder
    input.placeholder = "Add next";
}

$(function () {
    var availableTags = [
        "Bench press",
        "Squats",
        "Deadlifts",
        "Barbell rows",
        "Shoulder press",
        "Pull-ups",
        "Push-ups",
        "Dumbbell curls",
        "Tricep dips",
        "Lunges",
        "Leg press",
        "Calf raises",
        "Lat pulldowns",
        "Plank",
        "Russian twists",
        "Hamstring curls",
        "Chest flyes",
        "Overhead tricep extensions",
        "Side lateral raises",
        "Crunches"
    ];
    $("#input").autocomplete({
        source: availableTags
    });
});

buildWorkoutBtn.addEventListener("click", buildWorkout);
savedSectionBtn.addEventListener("click", showSaved);
regenerateBtn.addEventListener("click", regenerate);
saveWorkout.addEventListener("click", saveToFiles);
addBtn.addEventListener("click", addItem);
workoutName.addEventListener("click", editName);



