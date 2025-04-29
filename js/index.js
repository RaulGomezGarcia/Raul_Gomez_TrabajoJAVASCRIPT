const cabecera= document.getElementById("cabecera");
const descripcionExp = document.getElementById("descripcion-exp");


cabecera.addEventListener("click", function(){
    if(descripcionExp.style.display =='none'){
        descripcionExp.style.display = 'block';
    }else{
        descripcionExp.style.display = 'none'
    }
});
