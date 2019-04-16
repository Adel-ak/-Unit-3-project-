const $200CheckBox=document.querySelector('.activities label input');
const $inputs=$('input[name="user_email"],input[name="user_cc-num"], input[name="user_zip"], input[name="user_cvv"]');
const $designSelector=$('select[name="user_design"]');
const $colorSelector=$('select[id="color"]');
const $paymentSelector=$('select[name="user_payment"]');
const $submitButton=$('button[type="submit"]');
const $jobRole=$('select[name="user_title"]');
const $checkBox=$('input:checkbox');
let total=0;

$('.activities').append(`<span>Total: <strong>${total}</strong></span>`);

const $thankYou=$(`<div id="content">
    <img src="img/meteor_mail.png">
    <div> 
    <h1>You Have Registered Successfully</h1>
    <p>Please Check Your<strong>Mail</strong> For A Copy Of Your Invoice</p>
    <p>If you havent received any mail please email our support iteam at 
    fullstackconf@support.com</p>
    <button class="back" onclick="$('.container').show('clip')">Back</button>
    </div> 
</div>`).hide();

// $inputs.each(function() {
//     $(this).on('keyup', function() {
//         if($(this).val() === 'no') {
//             $(this)
//             .css('borderColor', '#FF0000')
//             .effect("bounce","slow")
//             .css('backgroundColor', '#FF0000');
//         }else if($(this).val() !== '' && $(this).val().length >= 1){
//             $(this).css('borderColor', 'red');
//         }else if($(this).val().length <= 0){
//             $(this).css('borderColor', 'black');
//         }
//         if($('input[name="user_name"]').val() === 'no'){
//             $('input[name="user_name"]').css('borderColor', 'green');
//         }
//     });
// });
//

$checkBox.on('change', function() {
  $('div span').remove();

  $checkBox.eq(1).is(':checked')? 
  $checkBox.eq(3).prop("disabled", true): 
  $checkBox.eq(3).removeAttr("disabled");

  $checkBox.eq(3).is(':checked')?
  $checkBox.eq(1).prop("disabled", true): 
  $checkBox.eq(1).removeAttr("disabled");

  $checkBox.eq(2).is(':checked') ?
  $checkBox.eq(4).prop("disabled", true):
  $checkBox.eq(4).removeAttr("disabled");

  $checkBox.eq(4).is(':checked') ?
  $checkBox.eq(2).prop("disabled", true):
  $checkBox.eq(2).removeAttr("disabled");

  if($(this).is(':checked')) {
    $(this).addClass('checked');
    if($200CheckBox.checked) {
        total=100 * ($('.checked').length + 1);
    }else{
        total=100 * $('.checked').length;
    }
    
  }else if($(this).not(':checked')) {
    $(this).removeClass('checked');
    total=100 * $('.checked').length;
  }

  

  $('.activities').append(`<span>Total: <strong>${total}</strong></span>`);
}

);
//

//
$submitButton.on('click', function(e) {
  e.preventDefault();

  if($($inputs).val()==='') {
    $($inputs).css('borderColor', '#FF0000');
    $($inputs).effect("bounce", "slow");
    $("Form :input,label input").prop("disabled", true);
    alertMX();
  }

  else if($($inputs).val() !=='') {
    if($($paymentSelector).val()==="paypal") {
      window.open('https://www.paypal.com/kw/home', '_blank');
    }else if($($paymentSelector).val()==="bitcoin") {
      window.open('https://www.coinbase.com/', '_blank');
    }
    $('.container').toggle("clip");
    $thankYou.delay(600).fadeIn("slow");
  }
});
//

//
$jobRole.change(function() {
  if($(this).val()==="other") {
    $('input[id="other-title"]').show();
  } else {
    $('input[id="other-title"]').hide();
  }
});
//

//
$paymentSelector.change(function() {
  if($(this).val()==="credit card") {
    $('#credit-card').show();
    $('#credit-card').next().hide();
    $('#credit-card').next().next().hide();
    $('button').removeAttr('onclick')
  }

  else if($(this).val()==="paypal") {
    $('#credit-card').next().show();
    $('#credit-card').hide();
    $('#credit-card').next().next().hide();
  }

  else if($(this).val()==="bitcoin") {
    $('#credit-card').next().next().show();
    $('#credit-card').next().hide();
    $('#credit-card').hide();
  }
  
  else if($(this).val()==="select_method") {
    $('#credit-card').next().next().hide();
    $('#credit-card').next().hide();
    $('#credit-card').hide();
  }
});

//
//
$designSelector.change(function() {
  if($(this).val()==="Select Theme") {
    $('#colors-js-puns').hide();
  }

  else if($(this).val()==="heart js") {
    $('#colors-js-puns').show();
    $('select[id="color"] > option:lt(3)').hide();
    $('select[id="color"] > option:gt(2)').show();
    $('select[id="color"]').val('tomato');
  }

  else if($(this).val()==="js puns") {
    $('#colors-js-puns').show();
    $('select[id="color"] > option:lt(3)').show();
    $('select[id="color"] > option:gt(2)').hide();
    $('select[id="color"]').val('cornflowerblue');
  }
});

//
//
$(function startUp() {
  document.getElementById('name').setAttribute('autofocus', 'true');
  $('ui-checkboxradio-label').removeClass("ui-state-hover");
  $('#colors-js-puns').hide();
  $('#test').hide();
  $('input[id="other-title"]').hide();
  $('body').append($thankYou);
  $('fieldset:last > div:lt(3)').hide();
  $($paymentSelector).val("credit card");
  $('#credit-card').show();
});

//
//https://stackoverflow.com/a/25552405
function alertMX(t) {
  $("body").append($(` <div id='boxMX'>
  <p class='msgMX'>please fill in the required fields</p>
  <button type='click'>CLOSE</button>
  </div>`));
  var popMargTop=($('#boxMX').height() + 25) / 2,
  popMargLeft=($('#boxMX').width() + 25) / 2;

  $('#boxMX').css( {
    'margin-top': -popMargTop, 
    'margin-left': -popMargLeft
  }).fadeIn(600);

  $("#boxMX").on('click','button',function() {
    $("#boxMX").remove();
    $("Form :input,label input, button")
    .removeAttr("disabled");
  });
};
//