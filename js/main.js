function handleForm() {
    if (validateForm()) {
        request();
    }
    return false;
}

function request() {
    let x = getRadio('x').eq(0).val();
    let y = getY().eq(0).val();
    let r = getRadio('r').eq(0).val();
    let currentTime = new Date().getTimezoneOffset();
    $.ajax({
        url: "./php/main.php",
        type: "GET",
        data: `x=${x}&y=${y}&r=${r}&time=${currentTime}`,
        success: function(response){
            let data = JSON.parse(response);
            addNewRow(data.result, data.x, data.y, data.r, data.current, data.execution);
        },
        error: function (response) {
            alert(response)
        }
    });
}

function addNewRow(result, x, y, r, time, execution) {
    let row = `<tr><td>${result}</td><td>${x}</td><td>${y}</td><td>${r}</td><td>${time}</td><td>${execution}</td></tr>`
    $("#response_table tbody").prepend(row);
}

function validateForm() {
    let validated = true;

    if (!validateRadio("x")) {
        $(".input-container:eq(0)").addClass("error-hovered");
        validated = false;
    } else {
        $(".input-container:eq(0)").removeClass("error-hovered");
    }

    if (!validateY()) {
        $(".input-container:eq(1)").addClass("error-hovered");
        validated = false;
    } else {
        $(".input-container:eq(1)").removeClass("error-hovered");
    }

    if (!validateRadio("r")) {
        $(".input-container:eq(2)").addClass("error-hovered");
        validated = false;
    } else {
        $(".input-container:eq(2)").removeClass("error-hovered");
    }

    return validated;
}

function validateRadio(name) {
    return getRadio(name).length === 1;
}

function validateY() {
    return getY().val().match(/^-?[0-5]+$/);
}

function getRadio(name) {
    return $(`:input[name = "${name}"]:checked`);
}

function getY() {
    return $(':input[name = "y"]');
}