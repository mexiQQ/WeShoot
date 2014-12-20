'use strict';

console.log('\'Allo \'Allo! Content script');

var msg = {
    id: '',
    user: {
        name: '',
        avatar: ''
    },
    time: '',
    msg: {
        text: '',
        image: ''
    }
};


setInterval(function() {
    var id = $('.chatItem:last').attr('un');
    var avatar = 'https://wx.qq.com/' + $('.chatItemContent:last .avatar').attr('src');
    var name = $('.chatItemContent:last .avatar').attr('title');
    var text = $('.chatItemContent:last pre').text();
    var img = 'https://wx.qq.com/' + $('.chatItemContent:last .img_wrap img').attr('src');
    var time = $('.chatItem:last .time').text().trim();
    var newMsg = {
        id: id,
        user: {
            name: name,
            avatar: avatar
        },
        time: time,
        msg: {
            text: text,
            image: img
        }
    };
    if(id !== msg.id) {
        chrome.runtime.sendMessage(newMsg, function(response) {
              console.log(response);
        });
        msg = newMsg;
    }
}, 1e3);
