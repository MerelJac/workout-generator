var buildWorkoutBtn = document.querySelector("#build-workout");
var savedSectionBtn = document.querySelector("#see-saved-workouts");
var generateWorkoutBtn = document.querySelector("#generate-workout");
var upperBodyCheckbox = document.querySelector("#upperbody");
var lowerBodyCheckbox = document.querySelector("#lowerbody");
var regenerateBtn = document.querySelector("#regenerate-workout");
var saveWorkout = document.querySelector("#save-workout");

var exercises = ['Push-Ups', 'Pull-Ups', 'Sit Ups', 'Plank', 'Squats', 'Deadlifts', 'Rear Foot Elevated Split Squats', 'Calf Raises', 'Jog', 'Chest Press', 'Bicep Curls', 'Single Leg Deadlifts', 'Fire Hydrants', 'Donkey Kicks', 'Tricep Extensions', 'Hip Bridges', 'Hip Thrusts', 'Pistol Squats'];


var workoutLength = 8;

var includeWorkouts = [];

var today = dayjs();
$('#workout-date').text(today.format('MMM D'));

function buildWorkout() {
    for (var i = 0; i < workoutLength; i++) {
        var li = document.createElement("li");
        li.innerText = JSON.stringify(exercises[i]);
        var pickRandom = exercises[Math.floor(Math.random() * exercises.length)];
        if (!includeWorkouts.includes(pickRandom)) {
            includeWorkouts.push(pickRandom)
        }
    };

    includeWorkouts.forEach(function (li) {
        document.querySelector("#print-here").innerHTML += `<li id="given-exercise">${li}</li>`;
    })};

function regenerate() {
    // will clear the included list to start over
    includeWorkouts = [];
    // will empty the contents of the print section
    $("#print-here").empty();
    buildWorkout();
};

// either pull array or create an empty array 
var pastWorkoutsArray = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
// not working yet
var savedWorkout = [];
function saveToFiles() {
    var exerciseInput = document.querySelectorAll("#given-exercise");
    var workoutObject = {
        date: today,
        exercises: exerciseInput.values
    }
savedWorkout.push(workoutObject);
localStorage.setItem("savedWorkout", JSON.stringify(savedWorkout))};
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
savedSectionBtn.addEventListener("click", function() {console.log("Saved")});
regenerateBtn.addEventListener("click", regenerate);
saveWorkout.addEventListener("click", saveToFiles)
