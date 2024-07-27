// פונקציה שמציגה את הקורס הנבחר בכפתורי הרדיו
function updateCourse(e) {
    var selectedCourse = e.value; //משתנה השומר את הקורס הנבחר לפי בחירת הרדיו
    var selectedCourseImg = selectedCourse + "Img"; //שומ
    document.getElementById("courseImageTitle").innerHTML = 'הקורס שלי: <br />' + GetCourseTitleByCourseImage(selectedCourse);
    var coursesImg = document.getElementsByClassName("coursesImage");
    for (var courseImg of coursesImg) { //לולאה שעוברת על תמונות הקורסים
        courseImg.classList.remove("selectedCourseImage"); //במידה ומשתמש עשה בחירה ואז שינה - זה יוריד את הבחירה הקודמת
        if (courseImg.id === selectedCourseImg) {
            courseImg.classList.add("selectedCourseImage");
        }
    }
    validateForm();
}

// Function to get course title based on selection
function GetCourseTitleByCourseImage(courseImg) {
    if (courseImg === "philosophy") {
        return "קורס פילוסופיה";
    }
    if (courseImg === "yoga") {
        return "קורס יוגה";
    }
    if (courseImg === "pilatis") {
        return "קורס פילאטיס";
    }
}

// Function to update tools selection
function updateTools(e) {
    var selectedTool = e.value;
    var selectedToolImg = selectedTool + "Img";
    var toolsImg = document.getElementsByClassName("toolsImages");
    for (var toolImg of toolsImg) {
        if (toolImg.id === selectedToolImg) {
            toolImg.classList.toggle("selectedToolsImages");
        }
    }
    validateForm();
}

// Function to validate form and enable/disable submit button
function validateForm() {
    var fullName = document.getElementById("fullname").value;
    var radios = document.querySelectorAll('input[type="radio"]');
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var isRadioValidated = Array.from(radios).some(r => r.checked);
    var isCheckboxValidated = Array.from(checkboxes).some(c => c.checked);
    var button = document.getElementById("submitButton");
    var isFormValidated = isRadioValidated && isCheckboxValidated && fullName.trim() !== "";

    button.disabled = !isFormValidated;
    button.style.opacity = isFormValidated ? 1 : 0.5;
}

// Function to get selected values
function getSelectedValues() {
    var selectedRadios = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(r => {
        var img = document.getElementById(r.value + "Img");
        return img ? img.alt : r.value;
    });

    var selectedCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(c => {
        var img = document.getElementById(c.value + "Img");
        return img ? img.alt : c.value;
    });

    return {
        radios: selectedRadios,
        checkboxes: selectedCheckboxes
    };
}

// פונקציה שמציגה את סיכום ההזמנה
function placeOrder() {
        validateForm();
        var button = document.getElementById("submitButton");
        if (!button.disabled) {
            var fullName = document.getElementById("fullname").value;
            var selectedValues = getSelectedValues();

            var summaryText = "<b>סיכום הזמנה</b>" + "<br>" + "שם: " + fullName + "<br>";
            summaryText += "קורס נבחר: ";
            for (var i = 0; i < selectedValues.radios.length; i++) {
                summaryText += selectedValues.radios[i];
                if (i < selectedValues.radios.length - 1) {
                    summaryText += ", ";
                }
            }
            summaryText += "<br>מוצרים נבחרים: ";
            for (var i = 0; i < selectedValues.checkboxes.length; i++) {
                summaryText += selectedValues.checkboxes[i];
                if (i < selectedValues.checkboxes.length - 1) {
                    summaryText += ", ";
                }
            }

            document.getElementById("summary").innerHTML = summaryText;
            alert(fullName + ', ההזמנה הושלמה בהצלחה!');
        }
    }