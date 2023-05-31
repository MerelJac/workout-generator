var buildWorkoutBtn = document.querySelector("#build-workout");
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
        }};
    includeWorkouts.forEach(function (li) {
        document.querySelector("#print-here").innerHTML += `<div class="alert alert-light alert-dismissible fade show" role="alert" id="exerciseToday">${li}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    })};

function editName() {
    workoutName.setAttribute("style", "display: none;");
    var editTitleDiv = $('#editTitle');
    var newTitleInput = document.createElement("input");
    newTitleInput.setAttribute("id", "titleInput");
    var saveTitleBtn = document.createElement("button");
    saveTitleBtn.setAttribute("id", "saveTitleBtn");
    saveTitleBtn.innerText = "Save Title";
    editTitleDiv.append(newTitleInput);
    editTitleDiv.append(saveTitleBtn);
    saveTitleBtn.addEventListener("click", function() {
        var titleText = newTitleInput.value;
        var newTitleh2 = document.createElement("h2");
        newTitleh2.setAttribute("id", "titleH2");
        newTitleInput.setAttribute("id", "name");
        newTitleh2.textContent = titleText;
        editTitleDiv.append(newTitleh2);
        var saveTitleBtn = $("#saveTitleBtn");
        saveTitleBtn.css("display", "none");
        var titleTextBox = $("#name");
        titleTextBox.css("display", "none");
    });
};

function saveNewName() {
    var newNameInputBox = $("#titleInput");
    var newName = newNameInputBox.textContent;
    editTitleSection.innerHTML += `<h2>${newName}</h2>`
}

$(function(){
    var exercisePrintedList = $('#print-here');
    $(exercisePrintedList).sortable();
    var liExercise = $("#exerciseToday");
    $(liExercise).sortable();
});

$(function(){
$('#exerciseToday').draggable();
});

function regenerate() {
    // will clear the included list to start over
    includeWorkouts = [];
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
    // local storage for date
    var workoutDate = $("#workout-date");
    var workoutDateValue = workoutDate.text();
    localStorage.setItem("workoutDate", JSON.stringify(workoutDateValue));

};

function showSaved() {
    // if show shaved is empty, show "no workouts saved" otherwise show cards
    var savedCard = $('.saved-card');
    var noneSaved = $('#none-saved');

    // if local storage has this key, run this function
    if (localStorage.getItem('exercises')) {
        noneSaved.hide();
        generateWorkoutBtn.style.display = "none";
    };
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
        `<div class="saved-card alert alert-light alert-dismissible fade show" role="alert" id="exerciseToday"><p>${savedTitle}</p><br>
        <p>${savedDate}</p><br>
        <p>${savedArrayExercises}</p><br><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></div>`;
    
    savedSection.find("h2").after(newContent);
    // savedTitle + savedDate + savedArrayExercises);
    
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

$( function() {
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
    $( "#input" ).autocomplete({
      source: availableTags
    });
  } );

buildWorkoutBtn.addEventListener("click", buildWorkout);
savedSectionBtn.addEventListener("click", showSaved);
regenerateBtn.addEventListener("click", regenerate);
saveWorkout.addEventListener("click", saveToFiles);
generateWorkoutBtn.addEventListener("click", regenerate);
addBtn.addEventListener("click", addItem);
workoutName.addEventListener("click", editName);


