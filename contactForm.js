"use strict";

var form = document.querySelector(".needs-validation");

form.addEventListener("submit", validate);

/**
 * Validates the contact form to ensure information has been entered properly
 * @param {*} event - Prevents any default handler being called for this event
 */
function validate(event){
    
    if(form.checkValidity() === false){
        event.preventDefault();
    }
    form.classList.add('was-validated');
}
