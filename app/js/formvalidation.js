function validateForm() {

    // Form query selectors
    var form = document.getElementById('form');
    var firstName = form.userFirstName;
    var lastName = form.userLastName;
    var email = form.user_email;
    var message = form.user_message;
    var submitFormBtn = form.formButton;

    // Booleans for tracking current input validity
    var isFirstNameValid = false;
    var isLastNameValid = false;
    var isEmailValid = false;

    // Form error query selectors
    var display = document.getElementById('display');
    var fnErrorMsg = document.getElementById('fnError');
    var lnErrorMsg = document.getElementById('lnError');

    var alphaExp = /^[a-zA-Z]{2,20}$/;
    var emailExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    // Validates first name value
    firstName.onkeyup = function(e) {
      checkValidity(firstName, alphaExp, isFirstNameValid, fnError, '#firstName', '.first');
    };

    // Validates last name value
    lastName.onkeyup = function(e) {
      checkValidity(lastName, alphaExp, isLastNameValid, lnError, '#lastName', '.second');
    };

    // Validates email value
    email.onkeyup = function(e) {
      checkValidity(email, emailExp, isEmailValid, emError, '#email', '.third');
    };

    function checkValidity(queryVar, regExp, validVar, errElem, elemId, iconElem) {
      if (queryVar.value.match(regExp)) {
        validVar = true;
        clearErrorMsg(errElem);
        changeValidBorder(elemId);
      } else {
        validVar = false;
        setErrorMsg(errElem);
        changeInvalidBorder(elemId);
      }

      checkMark(validVar, iconElem);
      updateValidBool(elemId, validVar);
    }

    // Validates if user chooses to auto-fill fields instead of typing them in
    $('#firstName').change(function() {
      checkValidity(firstName, alphaExp, isFirstNameValid, fnError, '#firstName', '.first');
    });

    $('#lastName').change(function() {
      checkValidity(lastName, alphaExp, isLastNameValid, lnError, '#lastName', '.second');
    });

    $('#mail').change(function() {
      checkValidity(email, emailExp, isEmailValid, emError, '#mail', '.third');
    });

    function changeValidBorder(element) {
      $(element).removeClass('invalid-border');
      $(element).addClass('valid-border');
    }

    function changeInvalidBorder(element) {
      $(element).removeClass('valid-border');
      $(element).addClass('invalid-border');
    }

    function checkMark(valid, element) {
      if (valid) {
        $(element).removeClass('hidden');
      } else {
        $(element).addClass('hidden');
      }
    }

    function clearErrorMsg(element) {
      element.innerHTML = "";
    }

    function setErrorMsg(element) {
      if (element === fnError || element === lnError) {
        element.innerHTML = "Please enter letters only and a minimum of at least 2 characters.";
      } else {
        element.innerHTML = "Please enter a valid email";
      }
    }

    function updateValidBool(elemId, validVar) {
      if (elemId === '#firstName') {
        isFirstNameValid = validVar;
      } else if (elemId === '#lastName') {
        isLastNameValid = validVar;
      } else {
        isEmailValid = validVar;
      }
    }

    // Checks if form is valid on submission
    submitFormBtn.onclick = function(e) {
      if (!isFirstNameValid || !isLastNameValid || !isEmailValid) {
        e.preventDefault();
        $('#submit-error').text('Your message was not submitted. Please check to make sure no fields are left blank and all fields are filled in correctly before submission.');
      } 
    };
  }