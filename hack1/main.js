// TODO:


var text_input = document.getElementById('comment-input');
var comment_btn = document.getElementById('comment-button');
var cancel_btn = document.getElementById('cancel-button');
var comment_group = document.getElementById('comment-group');
var comment_num = document.getElementById('comment-num');
var comment_num_value = 1;
comment_btn.disabled = true;




text_input.addEventListener('click',function(){
    comment_btn.style.display = "inline-block";
    cancel_btn.style.display = "inline-block";
    comment_btn.disabled = true;
})


text_input.addEventListener('input',function(){
    comment_btn.disabled = false;
    comment_btn.style.backgroundColor = "#065fd4";
    
    if(text_input.value.trim() == ''){
        comment_btn.disabled = true;
        comment_btn.style.backgroundColor = "#cccccc";
        
        
    }
});

cancel_btn.addEventListener('click',function(){
    console.log('cancel was clicked');
    text_input.value = '';
    comment_btn.style.display = "none";
    cancel_btn.style.display = "none";
})

comment_btn.addEventListener('click',function(){
    console.log('comment was clicked');


    // add comment
    var new_comment = document.createElement('div');
    new_comment.innerHTML = `
        <div class="comment">
        <img class="comment-img" src="images/user-icon.jpg"/>
        <div class="comment-right">
            <div>
                <span class="comment-name">Toby Chen</span>
                <span class="comment-time">現在</span>
            </div>
            <p class="comment-text">${text_input.value}</p>
        </div>
    </div>
    `
    comment_group.appendChild(new_comment);

    // change property
    comment_btn.disabled = true;
    comment_btn.style.backgroundColor = "#cccccc";
    text_input.value = '';
    comment_num_value += 1;
    comment_num.innerText = parseInt(comment_num_value) + '則留言';

  
})
