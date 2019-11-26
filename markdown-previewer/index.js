var editor = document.querySelector('#editor');
var preview = document.querySelector('#preview');

preview.innerHTML = marked(editor.innerHTML)

editor.onkeyup = function(e) {
    preview.innerHTML = marked(e.target.value)
}