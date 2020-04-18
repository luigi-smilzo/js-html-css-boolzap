$(document).ready(function () {

    // REFERENCES
    var msgInput = $('.chat-footer input');
    var chatWindow = $('.chat-main');


    // EVENTS
    // Send message Input
    msgInput.focusin(function () {
        $(this).next().children('i').toggleClass('fa-microphone fa-paper-plane');
    });

    msgInput.focusout(function () {
        $(this).next().children('i').toggleClass('fa-microphone fa-paper-plane');
    });

    msgInput.keyup(function(e) {
        
        if (msgInput.val() != '') {
            if (e.which == 13 || e.keycode == 13) {
                var item = $('.template .message.sent').clone();
                item.children('p').append(msgInput.val());
                chatWindow.append(item);
                msgInput.val('');
            }
        }
    });

}); // <-- End ready