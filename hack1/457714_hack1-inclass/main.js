// TODO:



const text_input = document.getElementById('comment-input');
const comment_btn = document.getElementById('comment-button');

text_input.addEventListener('input',func_text_input);


function func_text_input(){
    comment_btn.style.backgroundColor = "#065fd4";
}