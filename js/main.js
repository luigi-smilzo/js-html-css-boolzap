$(document).ready(function () {
    var msgInput = $('.chat-footer input');

    msgInput.focusin(function () {
        $(this).next().children('i').toggleClass('fa-microphone fa-paper-plane');
    });

    msgInput.focusout(function () {
        $(this).next().children('i').toggleClass('fa-microphone fa-paper-plane');
    });













}); // <-- End ready