var urls=["http://s2.itislooker.com/imgs/201911/11/4/1573460288767.jpg","https://img.ltn.com.tw/Upload/liveNews/BigPic/600_phpdDAWtR.jpg","https://pic.pimg.tw/iparrot520/1547711783-1234439017_n.jpg","http://slowlife-tw.com/wp-content/uploads/birds1.jpg"];

var len = urls.length;
var count = 0;

const previous = document.getElementById("previous");
const next = document.getElementById("next");
const display = document.getElementById("display");
const source = document.querySelector(".image-viewer__display-source-wrapper").lastElementChild;

function Refresh(){
	display.style="background-image: url('images/loading.gif'); background-repeat: no-repeat;background-position: center;"
	
	source.innerHTML="Source: "+urls[count];
	if (count===0)
		previous.className="disabled";
	else
		previous.className="image-viewer__button";
	if (count===len-1)
		next.className="disabled";
	else
		next.className="image-viewer__button";
	display.src=urls[count];
}


function PreviousImage(){
	if (count>0)
		count--;
	Refresh();
}
function NextImage(){
	if (count<len-1)
		count++;
	Refresh();
}

Refresh();
previous.addEventListener("click",PreviousImage);
next.addEventListener("click",NextImage);