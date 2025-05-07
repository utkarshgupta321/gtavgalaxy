function changeBg(){
    var navbar= document.getElementById('navbar');
    var scrollValue= window.scrollY;

    if(scrollValue<500){
        navbar.classList.remove('bgColor');
    }

    else{
        navbar.classList.add('bgColor');
        document.getElementById("gta_nav").style.color = "black";
    }
}

window.addEventListener('scroll',changeBg);