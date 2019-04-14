$('#name').attr('autofocus');

const $thank = $(`<div id="content">
                    <img src="img/meteor_mail.png">
                    <div>
                        <h1>You Have Registered Successfully</h1>
                        <p>Please Check Your <strong>Mail</strong> For A Copy Of Your Invoice</p>
                        <p>If you havent received any mail please email our support iteam at fullstackconf@support.com</p>
                    </div>
                    </div>`).hide();

$('body').append($thank);
const $inputs = $('input[type=text], input[type=email]');
const trying = $('input[type=text], input[type=email]');
$inputs.each(function() {
    $(this).on('keyup', function() {
        if($(this).val() === 'no') {
            $(this)
            .css('borderColor', '#FF0000')
            .effect("bounce","slow")
            .css('backgroundColor', '#FF0000');
        }else if($(this).val() !== '' && $(this).val().length >= 1){
            $(this).css('borderColor', 'green');
        }else if($('#zip').val().length <= 0){
            $(this).css('borderColor', '#c1deeb');
        }
    });
});

$('button').on('click', function(e) {
    e.preventDefault();
    if($($inputs).val() === '') {
        $($inputs).css('borderColor', '#FF0000');
        $($inputs)
        .effect( "bounce", "slow" )
        .css('backgroundColor', '#FF0000');
    }else{
        $thank.delay(600).fadeIn("slow");
        $('.container').toggle( "clip" );
    }
  });



  
