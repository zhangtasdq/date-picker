(function() {
    "use strict";

    var pickerElement = $("#date_picker_input");

    var picker = pickerElement.datepicker();
    pickerElement.on("focus", function() {
        picker.show();
    }).on("blur", function() {
        picker.hide();
    });
}());
