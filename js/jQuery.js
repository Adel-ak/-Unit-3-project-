//Global variables (used by 2 or more functions)
$('#name').attr('autofocus',true);
const $inputs = $('input');
const $paymentSelector = $('#payment');
const $registerButton = $('button[type="submit"]');
const $jobRole = $('select[name="user_title"]');
const $checkBox = $('input:checkbox');
let total = 0;
let done = false;

//regular expressions to valid input
const name = /^[a-z /D]+$/i;
const mail = /[^@. ]+@[^@. ]+\.[^@. ]+/i;
const otherJob = /^[a-z /D]+$/i;
const ccNum = /^\d{12,13}$/;
const zip = /^\d{5}$/;
const cvv = /^\d{3}$/;

//a message to display once form is submited 
const $submitedForm = $(
`<div id="content">
  <img src="img/meteor_mail.png">
  <div> 
    <h1>You Have Registered Successfully</h1>
    <p>Please Check Your <strong>Mail</strong> for a copy Of your <strong>invoice</strong> and <strong>payment confirmation</strong></p>
    <p>If you havent received any <strong>Mail</strong> or face any <strong>payment issues</strong> please email our support team at <strong>fullstackconf@support.com</strong></p>
    <button class="back" onclick="newForm()">Back</button>
  </div> 
</div>`).hide();

/*
function for checking before submition
~~check if the input matchs with id and is visible and expertion is false
  if true give a bounce effect to the input filde and give it red border color,
  give its prev element a error class name to disply message of invalid
  and keep done variable fales

~~if false remove the error class name not to disply 
  message of invalid and change done variable to true

~~check if checkbox with class name checked lenght is 0
  if true add error class name to disply message of invalid
  and keep done variable fales

~~if false remove the error class name and change done variable to true
*/
function checkBeforeSubmit(e, expertion, id, error) {
  if($(e).attr('id') === id && $(e).is(':visible') && !expertion.test($(e).val())) {
    $(e).effect("bounce", "slow").css('borderColor', 'red');
    $(e).prev().addClass(error);
    done = false;
  } else {
    $(e).prev().removeClass(error);
    done = true;
  }
}
/*
register button event listenr(click):-
~~loop through all inputs and match its given id and check if input is valid or not
  if input field of Job Role and credit card is visible check if input is valid or not

~~if done is true then submit form then hide the form and show submitedForm message
  but if payment type is paypal or bitcoin then open payment onlick
*/
$registerButton.on('click', function(e) {
  e.preventDefault();
  let checked = document.querySelectorAll('.checked');
  $inputs.each(function(index,ele) {
    checkBeforeSubmit(ele, name, "name", "name_error");
    checkBeforeSubmit(ele, mail, "mail", "emal_error");
    if($jobRole.is(':visible')) {
      checkBeforeSubmit(ele, otherJob,"other-title", "otherjob_error");
    }
    if($('#credit-card').is(':visible')) {
      checkBeforeSubmit(ele, ccNum,"cc-num", "cc_error");
      checkBeforeSubmit(ele, zip, "zip", "zip_error");
      checkBeforeSubmit(ele, cvv, "cvv", "cvv_error");
    }
  });
  if(checked.length <= 0) {
    $('.activities legend').addClass('activities_error');
    done = false;
  } else {
    $('.activities legend').removeClass('activities_error');
    done = true;
  }
  if(done) {
    if($paymentSelector.val() === "paypal") {
      window.open('https://www.paypal.com/kw/home','_blank');
    } else if($paymentSelector.val() === "bitcoin") {
      window.open('https://www.coinbase.com/','_blank');
    }
    $('.container').toggle("clip");
    $submitedForm.delay(600).fadeIn("slow");
  }
});

/*
~~function for vailding input value 
  same as checkBeforeSubmit function 
  but with out 
  the bounce effect
  changing done variable
  checking if checkbox's is checked or not
*/
function check(expertion, e, id,error) {
  if($(e).attr('id') === id) {
    if(expertion.test($(e).val())) {
      $(e).css('borderColor', 'green');
      $(e).prev().removeClass(error);
    } else {
      $(e).prev().addClass(error);
      $(e).css('borderColor', 'red');
    }
    if($(e).val() === "") {
      $(e).css('borderColor', '');
      $(e).prev().removeClass(error);
    }
  }
}

/*
inputs event listenr(keyup):-
~~loop through all inputs and match its given id and check if input is valid or not
  if input field of Job Role and credit card is visible check if input is valid or not
*/
$inputs.each(function() {
  $(this).on('keyup', function() {
    check(name, this, "name", "name_error");
    check(mail, this, "mail", "emal_error");
    if($jobRole.is(':visible')) {
      check(otherJob, this, "other-title", "otherjob_error");
    }
    if($('#credit-card').is(':visible')) {
      check(ccNum, this, "cc-num", "cc_error");
      check(zip, this, "zip", "zip_error");
      check(cvv, this, "cvv", "cvv_error");
    }
  });
});

/*
~~function used for checkbox which is selected to disable events that are the same day and time to it
  and if not selected then enable the one which was disabled
*/
function checkBoxDisable(check, disable,enable) {
  $checkBox.eq(check).is(':checked') ?
  $checkBox.eq(disable).prop("disabled", true):
  $checkBox.eq(enable).removeAttr("disabled");
}

/*
~~if check box is checked then add 'checked' class name to it
  remove invaild message if its displayed and remove old total amount to replace
  with a new one once a box is checked

~~if a any box is checked then add 100 to total by multiplying 100 
  and length of box with the checked class and  if "Main Conference"
  is checked then add extra 100 to total if "Main Conference" not checked add nothing

~~if any box is unchecked then remove 100 from total multiplying with the new length
  of checked class

~~append the new div to the page
*/
$checkBox.on('change', function() {
  const $200CheckBox = document.querySelector('.activities label input');
  $('.activities legend').removeClass('activities_error');
  $('div span').remove();
  checkBoxDisable(1, 3, 3)
  checkBoxDisable(3, 1, 1)
  checkBoxDisable(2, 4, 4)
  checkBoxDisable(4, 2, 2)
  if($(this).is(':checked')) {
    $(this).addClass('checked');
    total = 100 * $('.checked').length;
    if($checkBox.eq(0).is(':checked')) {
    total = 100 * ($('.checked').length + 1);
  } else {
    total += 0;
  }
  } else if($(this).not(':checked')) {
    $(this).removeClass('checked');
    total = 100 * $('.checked').length;
  }
  
  $('.activities').append(`<span>Total: <strong>$${total}</strong></span>`);
  // return checked = document.querySelectorAll('.checked');
});

/*
~~job role event listenr(change):-
  if other job role is select show other job role input field
  if not hide input files(remove invaild message and border color its active)
*/
$jobRole.change(function() {
  if($(this).val() === "other") {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
    $('#other-title').prev().removeClass("otherjob_error");
    $('#other-title').css('borderColor', '');
    $('#other-title').val('');
  }
});

/*
~~function for displaying payment sections based on the payment option
*/
function paymentInfo(e, type, show, hide, hide2) {
  if($(e).val() === type) {
    show.show();
    hide.hide();
    hide2.hide();
  }
}

/*
~~payment event listenr(change):-
  displaying payment section based on the payment option picked
  and hide others

~~if credit-card is hidden then remove invaild message 
  and value in input feild border color
*/
$('#payment').change(function() {
  const $ccInputs = $('#cc-num , #zip , #cvv');
  const cc = $('#credit-card');
  const paypal = $('#credit-card').next();
  const Bitcoin = $('#credit-card').next().next();
  paymentInfo(this, "credit card", cc, paypal, Bitcoin)
  paymentInfo(this, "paypal", paypal, cc, Bitcoin)
  paymentInfo(this, "bitcoin", Bitcoin, paypal, cc)
  if($('#credit-card').is(':hidden')) {
    $('#cc-num').prev().removeClass("cc_error");
    $('#zip').prev().removeClass("zip_error");
    $('#cvv').prev().removeClass("cvv_error");
    // $('#cc-num').val('');
    // $('#zip').val('');
    $ccInputs.val('');
    $ccInputs.css('borderColor', '');
  }
});

/*
function to display color options and see which t-shirt design is picked
and show only its colors and set the first color as default pick
*/
function tShirtInfo(e, value, show,hide, select) {
  if($(e).val() === value) {
    $('#colors-js-puns').show();
    hide.hide();
    show.show();
    $('select[id="color"]').val(select);
  }
}

/*
t-shirt info event listenr(change):-
if t-shirt design is "Select Theme" hide color options
if its heart js or js puns show its color options only and set the first option as default
*/
$('select[name="user_design"]').change(function() {
  const jsPunsColor = $('select[id="color"] > option:lt(3)' );
  const iHeartJsColor = $('select[id="color"] > option:gt(2)');
  if($(this).val() === "Select Theme") {
    $('#colors-js-puns').hide();
  }
  tShirtInfo(this, "heart js",iHeartJsColor, jsPunsColor,'tomato')
  tShirtInfo(this, "js puns",jsPunsColor, iHeartJsColor,'cornflowerblue')
});

//things that will be done when page is loaded
$(function startUp() {
  $('#colors-js-puns').hide();
  $('#test').hide();
  $('input[id="other-title"]').hide();
  $('body').append($submitedForm);
  $('fieldset:last > div:lt(3)').hide();
  $('#payment').val("credit card");
  $('#credit-card').show();
  $('#payment option').eq(0).remove();
  $('.activities').append(`<span>Total: <strong>$${total}</strong></span>`);
});

//when the back button is is clicked 
function newForm() {
  total = 0;
  $submitedForm.fadeOut()
  $paymentSelector.val("credit card");
  $checkBox.prop("checked", false);
  $checkBox.removeAttr("disabled");
  $('.container').show("fold", 1000);
  $('#credit-card').show();
  $('#exp-month').val(1);
  $('#exp-year').val(2016);
  $('input').val('');
  $('#design').val("Select Theme")
  $('#colors-js-puns').hide();
  $('#title').val("full-stack js developer")
  $('input[id="other-title"]').hide();
  $inputs.css('borderColor', '');
  done = false;
}