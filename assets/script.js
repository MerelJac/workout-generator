var buildWorkoutBtn = document.querySelector("#build-workout");
var savedSectionBtn = document.querySelector("#see-saved-workouts");
var generateWorkoutBtn = document.querySelector("#generate-workout");
// array of objects for exercsises:
var exercsies = [{
    name: "Barbell Bench Press",
    muslceGroup: "Chest",
    equiptment: "Barbell"
    },
    {
    name: "Barbell Squat",
    muslceGroup: "Legs",
    equiptment: "Barbell"
        },
    {
    name: "Barbell Bench Press",
    equiptment: "Barbell"
    },
    {
    name: "Dumbbell ",
    muslceGroup: "Chest",
    equiptment: "Barbell"
    },]
var chestExercises = [{
    name: "Chest Press",
    barbell: true,
    dumbbell: true,
    bodyweight: false
    },
    {
    name: "Push Up",
    barbell: false,
    dumbbell: false,
    bodyweight: false
    }
]
// function to display form for buidling workout attached to EventListener
function showBuild() {
    var buildSection = document.querySelector("#build-workout");
    buildSection.setAttribute("style", "display: flex" );
}


function saveChecklist() {
    // Select all checkboxes
    var checkboxes = document.querySelectorAll('input[name="checklist"]:checked');
  
    // Create an array to store the selected values
    var selectedItems = [];
  
    // Iterate over the checkboxes
    checkboxes.forEach(function(checkbox) {
      // Add the value of each checked checkbox to the array
      selectedItems.push(checkbox.value);
    });
  
    // Do something with the selectedItems array
    console.log(selectedItems);
  }
// function to display saved workout section either null or with something

// addEventListener to regenerate button to empty the form and display it again

// funtion that saves data from workout to localStorage (linked to EventListner)

// Second generate workout button take you home

// 





buildWorkoutBtn.addEventListener("click", showBuild);
savedSectionBtn.addEventListener("click", function() {console.log("Saved")});
generateWorkoutBtn.addEventListener("click", saveChecklist);
