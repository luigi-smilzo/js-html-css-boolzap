$(document).ready(function () {

    // REFERENCES
    var msgInput = $('.chat-footer input');
    var sendIcon = $('.chat-footer .send-icons');
    var srcInput = $('aside .aside-search input');

    // EVENTS
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

    srcInput.keyup(function() {
        var search = $(this).val().toLowerCase().trim();
        $('.list-open h4').each(function () {
            if ($(this).text().toLowerCase().includes(search)) {
                $(this).parents('.list-open').show();
            } else {
                $(this).parents('.list-open').hide();
            }
        });
    });
}); // <-- End ready

// FUNCTIONS
function sendMsg (input) {
    var msgContent = input.val().trim();

    if (msgContent.length > 0) {
        var newMsg = $('.template .message').clone();

        newMsg.children('p').text(msgContent);
        time();
        newMsg.children('.timestamp').text(timeStamp);
        newMsg.addClass('sent');
        $('.chat-main-conversation.active').append(newMsg);
        input.val('');
        scroll ()

        setTimeout(autoReply, 1000);
    }
}

function autoReply () {
    var newMsg = $('.template .message').clone();
    newMsg.children('p').text('Ok');
    time();
    newMsg.children('.timestamp').text(timeStamp);
    newMsg.addClass('received');
    $('.chat-main-conversation.active').append(newMsg);
    scroll ()
}

function time () {
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

function scroll () {
    var chatHeight = $('.chat-main-conversation.active').height();
    $('.chat-main').animate({
        scrollTop: chatHeight
    });
}