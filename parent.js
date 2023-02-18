const res = document.getElementById("result");


window.addEventListener('message', function (e) {
    res.innerText = "Result:" + e.data ;

});