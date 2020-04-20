$(document).ready(function () {

    // REFERENCES
    var msgInput = $('.chat-footer input');
    var sendIcon = $('.chat-footer .send-icons');

    // EVENTS
    // Send message Input
    msgInput.on('focus blur', function () {
        $(this).next().children('i').toggleClass('fa-microphone fa-paper-plane');
    });

    sendIcon.click(function() {
        sendMsg(msgInput);
        setTimeout(autoReply, 1000);
    });

    msgInput.keypress(function(e) {
        if (e.which == 13) {
            sendMsg(msgInput);
            setTimeout(autoReply, 1000);
        }
    });

}); // <-- End ready

// FUNCTIONS
function sendMsg (input) {
    var msgContent = input.val().trim();

    if (msgContent.length > 0) {
        var newMsg = $('.template .message').clone();

        newMsg.children('p').text(msgContent);
        timeStamp(newMsg);
        newMsg.addClass('sent');
        $('.chat-main-conversation.active').append(newMsg);
        input.val('');
    }
}

function autoReply () {
    var newMsg = $('.template .message').clone();
    newMsg.children('p').text('Ok');
    timeStamp(newMsg);
    newMsg.addClass('received');
    $('.chat-main-conversation.active').append(newMsg);
}

function timeStamp (newMsg) {
    var date = new Date();
    var hour = leadZero(date.getHours());
    var minutes = leadZero(date.getMinutes());
    var timeStamp = hour + ':' + minutes;
    newMsg.children('.timestamp').text(timeStamp);
}

function leadZero(param) {
    if(param < 10) {
        param = '0' + param;
    }
    return param;
}