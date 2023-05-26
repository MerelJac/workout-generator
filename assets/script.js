var buildWorkoutBtn = document.querySelector("#build-workout");
var savedSectionBtn = document.querySelector("#see-saved-workouts");
var generateWorkoutBtn = document.querySelector("#generate-workout");
var upperBodyCheckbox = document.querySelector("#upperbody");
var lowerBodyCheckbox = document.querySelector("#lowerbody");
var regenerateBtn = document.querySelector("#regenerate-workout");
var saveWorkout = document.querySelector("#save-workout");
var addBtn = document.querySelector("#add-button");

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
        var li = document.createElement("li");
        li.innerText = JSON.stringify(exercises[i]);
        var pickRandom = exercises[Math.floor(Math.random() * exercises.length)];
        if (!includeWorkouts.includes(pickRandom)) {
            includeWorkouts.push(pickRandom)
        }
    };
    localStorage.setItem("exerciseArray", []);
    includeWorkouts.forEach(function (li) {
        document.querySelector("#print-here").innerHTML += `<div class="alert alert-light alert-dismissible fade show" role="alert" id="exerciseToday">${li}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        localStorage.setItem("exercise", [li]);
    })};


$(function(){
    var exercisePrintedList = $('#print-here');
    $(exercisePrintedList).sortable();
})

$('#exercise').draggable();



function regenerate() {
    // will clear the included list to start over
    includeWorkouts = [];
    // will empty the contents of the print section
    $("#print-here").empty();
    buildWorkout();
    localStorage.clear("exerciseArray");
};


var exerciseInput = document.querySelectorAll("#given-exercise");

// either pull array or create an empty array 
var pastWorkoutsArray = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
// not working yet
var savedWorkout = [];
function saveToFiles() {
    var workoutObject = {
        date: today,
        exercises: exerciseInput.values
    }
savedWorkout.push(workoutObject);
localStorage.setItem("savedWorkout", JSON.stringify(savedWorkout));
console.log("check");
};

function showSaved() {
    var savedSection = $('#saved-section');
    savedSection.show();
    var printSection = $('#printedworkout');
    printSection.hide();
}

function addItem() {
    var input = document.querySelector("input");
    var addedExercise = input.value;
    document.querySelector("#print-here").innerHTML += `<div class="alert alert-light alert-dismissible fade show" role="alert" id="exerciseToday">${addedExercise}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    input.value = "Add next";
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
    // var givenExercise = document.querySelector("#print-here").children;
    // console.log(givenExercise);
    // var workoutObject = {
    //     name: "Workout of the day",
    //     date: today,
    //     exercises: givenExercise
    // };
    // pastWorkoutsArray.push(workoutObject);
    // localStorage.setItem("pastWorkouts", JSON.stringify(pastWorkoutsArray))};

buildWorkoutBtn.addEventListener("click", buildWorkout);
savedSectionBtn.addEventListener("click", showSaved);
regenerateBtn.addEventListener("click", regenerate);
saveWorkout.addEventListener("click", saveToFiles);
generateWorkoutBtn.addEventListener("click", buildWorkout);
addBtn.addEventListener("click", addItem);