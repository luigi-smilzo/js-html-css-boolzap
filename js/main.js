$(document).ready(function () {


    /* REFERENCES */
    var msgInput = $('.chat-footer input');
    var sendIcon = $('.chat-footer .send-icons');
    var srcInput = $('aside .aside-search input');
    var convList = $('.aside-list .list-open');

    /* EVENTS */
    // Send message Input
    msgInput.on('focus blur', function () {
        $(this).next().children('i').toggleClass('fa-microphone fa-paper-plane');
    });

    sendIcon.click(function() {
        sendMsg(msgInput);
    });

    msgInput.keypress(function(e) {
        if (e.which == 13) {
            sendMsg(msgInput);
        }
    });

    // Search bar
    srcInput.keyup(function() {
        var search = $(this).val().toLowerCase().trim();
        $('.list-open h4').each(function () {
            if ( $(this).text().toLowerCase().includes(search) ) {
                $(this).parents('.list-open').show();
            } else {
                $(this).parents('.list-open').hide();
            }
        });
    });

    // Conversation select
    convList.click(function() {
        convList.not(this).removeClass('active');
        $('.chat-main-conversation').removeClass('active');
        $(this).addClass('active');
        var convData = $(this).attr('data-conversation');
        $('.chat-main [data-conversation="' + convData + '"]').addClass('active');

        var contactName = $(this).find('h4').text();
        var contactAvatar = $(this).find('img').attr('src');
        $('.chat-header h4').text(contactName);
        $('.chat-header img').attr('src', contactAvatar);
    });

    // Message drop-down
    $('body').on('click','.chat-main .message i', function() {
        var activeDropDown = $(this).next('.drop-down');
        $('.chat-main .message i').next().not(activeDropDown).hide();
        activeDropDown.toggle();
    });

    // Delete message
    $('body').on('click','.drop-down li:nth-child(2)', function() {
        $(this).parents('.message').remove();
    });

}); // <-- End ready




/* FUNCTIONS */
function sendMsg(input) {
    var msgContent = input.val().trim();

    if (msgContent.length > 0) {
        var newMsg = $('.template .message').clone();

        newMsg.children('p').text(msgContent);
        time();
        newMsg.children('.timestamp').text(timeStamp);
        newMsg.addClass('sent');
        $('.chat-main-conversation.active').append(newMsg);
        input.val('');
        scroll()

        setTimeout(autoReply, 1000);
    }
}

function autoReply() {
    var newMsg = $('.template .message').clone();
    newMsg.children('p').text('Ok');
    time();
    newMsg.children('.timestamp').text(timeStamp);
    newMsg.addClass('received');
    $('.chat-main-conversation.active').append(newMsg);
    scroll ()
}

function time() {
    var date = new Date();
    var hour = leadZero(date.getHours());
    var minutes = leadZero(date.getMinutes());
    return timeStamp = hour + ':' + minutes;
}

function leadZero(param) {
    if(param < 10) {
        param = '0' + param;
    }
    return param;
}

function scroll() {
    var chatHeight = $('.chat-main-conversation.active').height();
    $('.chat-main').animate({
        scrollTop: chatHeight
    }, 400);
}