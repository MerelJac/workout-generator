var buildWorkoutBtn = document.querySelector("#build-workout");
var savedSectionBtn = document.querySelector("#see-saved-workouts");
var generateWorkoutBtn = document.querySelector("#generate-workout");
var upperBodyCheckbox = document.querySelector("#upperbody");
var lowerBodyCheckbox = document.querySelector("#lowerbody");
// var fullBodyCheckbox = document.querySelector("#fullbody");

// array of objects for exercsises:
const upperBodyExercises = [
    {name: "Push-Up",
    weights: true,
    bodyweight: true},
    {name: "Pull-Up",
    weights: true,
    bodyweight: true},
    {name: "Bicep Curls",
    weights: true,
    bodyweight: false}
  ];
const lowerBodyExercises = [
    {name: "Squats",
    weights: true,
    bodyweight: true},
    {name: "Deadlifts",
    weights: true,
    bodyweight: false},
    {name: "Side Lunges",
    weights: true,
    bodyweight: true}
];

// function to display form for buidling workout attached to EventListener
function showBuild() {
    var buildSection = document.querySelector("#build-workout");
    buildSection.setAttribute("style", "display: flex" );
}

var includeList = [];
function saveChecklist() {
    if (upperBodyCheckbox.checked ) {
        includeList.push(upperBodyExercises)
    } else (console.log("null"))
    if (lowerBodyCheckbox.checked) {
        includeList.push(lowerBodyExercises) 
     } else (console.log("null"))};

    console.log(includeList);

    // include checked criteria
    // if checked criteria matches exercises, push into new array
    // randomize the array and print 8 exercises onto the page as a li
    
// function to display saved workout section either null or with something

// addEventListener to regenerate button to empty the form and display it again

// funtion that saves data from workout to localStorage (linked to EventListner)

// Second generate workout button take you home

// 





buildWorkoutBtn.addEventListener("click", showBuild);
savedSectionBtn.addEventListener("click", function() {console.log("Saved")});
generateWorkoutBtn.addEventListener("click", saveChecklist);
