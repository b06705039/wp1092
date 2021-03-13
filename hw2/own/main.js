if(document.readyState){
    ready();
}

function ready(){
    var img_source = ["https://scontent.ftpe7-4.fna.fbcdn.net/v/t1.0-9/551302_615360735182799_28671611_n.png?_nc_cat=107&ccb=3&_nc_sid=09cbfe&_nc_ohc=RzKCAE2_hJ8AX9Il6c-&_nc_ht=scontent.ftpe7-4.fna&oh=e58b4a477d4f19b1cbc3bacf2c40761a&oe=6064C774",
    "https://scontent.ftpe7-3.fna.fbcdn.net/v/t31.0-8/26172294_1692286460792484_668126854486372159_o.jpg?_nc_cat=102&ccb=3&_nc_sid=09cbfe&_nc_ohc=SoCogqsctqkAX-Nyxt-&_nc_ht=scontent.ftpe7-3.fna&oh=484cd4e75a0dcee72e7d1c9816da6fa4&oe=6067CB8C",
    "https://scontent.ftpe7-4.fna.fbcdn.net/v/t1.0-9/1916978_130608149697_2622827_n.jpg?_nc_cat=101&ccb=3&_nc_sid=09cbfe&_nc_ohc=oFoz_FD9gRIAX9dSPXb&_nc_ht=scontent.ftpe7-4.fna&oh=010df4c480eac98a2410e3cf98ae3b2d&oe=60668C3C",
    "https://scontent.ftpe7-4.fna.fbcdn.net/v/t31.0-8/919614_657635774253550_716174474_o.jpg?_nc_cat=101&ccb=3&_nc_sid=09cbfe&_nc_ohc=CverfFgoxDMAX-Vduax&_nc_ht=scontent.ftpe7-4.fna&oh=f6d7fd72303328bf06cefeccdf534051&oe=60677E04",
    "https://scontent.ftpe7-2.fna.fbcdn.net/v/t1.0-9/10514671_295421290629593_4474823063194501459_n.jpg?_nc_cat=104&ccb=3&_nc_sid=09cbfe&_nc_ohc=9B0ndp0kB18AX9n4iaD&_nc_ht=scontent.ftpe7-2.fna&oh=5ccb93a3da447c08f8e81764848f56c4&oe=6065D862"
    ]

    // previous/next botton  
    var previous_btn = document.getElementById("previous");
    var next_btn = document.getElementById("next");
    var img_index = 0
    var display_img = document.getElementById("display");
    
    console.log
    display_img.src = img_source[img_index];

    // document.getElementById("imagge-viewer__image-source-wrapper").innerHTML.innerHTML = img_source[img_index];
    // console.log(show_source);

    $('#previous').addClass('disabled');
    $('.imagge-viewer__image-source-wrapper span a').attr('href',img_source[img_index]);
    $('.imagge-viewer__image-source-wrapper span a').text(img_source[img_index]);
    
    console.log(img_source[img_index]);
    

    next_btn.addEventListener('click',function(){
        
        
        if(img_index == 0){
            $('#previous').removeClass('disabled');
        }
        if(img_index < img_source.length-1){
            img_index += 1;
            display_img.src = img_source[img_index];
            if(img_index == img_source.length-1){
                $('#next').addClass('disabled');
            }
        }
        else{
            console.log("no more img",img_index);
        }
        $('.imagge-viewer__image-source-wrapper span a').attr('href',img_source[img_index]);
        $('.imagge-viewer__image-source-wrapper span a').text(img_source[img_index]);
        
    });
    previous_btn.addEventListener('click',function(){
        if(img_index == img_source.length-1){
            $('#next').removeClass('disabled');
        }
        if(img_index > 0){
            img_index -= 1;
            display_img.src = img_source[img_index];
            if(img_index == 0){
                $('#previous').addClass('disabled');
            }
        }
        else{
            console.log("no more img",img_index);
        }
        $('.imagge-viewer__image-source-wrapper span a').attr('href',img_source[img_index]);
        $('.imagge-viewer__image-source-wrapper span a').text(img_source[img_index]);
        
        
    });
}
