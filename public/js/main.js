const numInput = document.getElementById('number'),
      textInput = document.getElementById('msg'),
      button = document.getElementById('button'),
      response = document.querySelector('.response');

button.addEventListener('click', send, false);

const socket = io();
socket.on('smsStatus', (data) => {
    response.innerHTML = '<h5 class="text-success">Text Message sent to ' + data.number + '</h5>'
})

function send() {
    var number = numInput.value;
    const text = textInput.value;
    if (number[0] == '0') {
        let ccode = '+234'
        var number = ccode.concat(number.replace([0], ''));
    }

    fetch('/', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({number: number, text: text})
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => console.log(err))
}