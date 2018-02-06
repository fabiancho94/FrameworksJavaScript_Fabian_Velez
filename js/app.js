$(document).ready(function () {cambioColor()})
// Acciones al momento de dar click en Iniciar
$('.btn-reinicio').on("click", function(){
  // Cambio de texto a reniciar
  $(this).text("Reiniciar")
  // Empezar cuenta regresiva
  var cuentaAtras = setInterval(iniciarTimer(),1000)
  // Llenar el Tablero
  var llenar = setInterval(lenarTablero(),150)
})
          // Variables Usadas

// Para la cuenta atras
var min, seg, t_total
t_total = 120
// Para el llenado del tablero
var index = 0











// Animacion del titulo
function cambioColor (){
  var flag = true
  var original = $('.main-titulo').css("color")
  setInterval(function () {
    if(flag){
      $('.main-titulo').css("color","white")
    }else {
      $('.main-titulo').css("color","yellow")
    }
    flag=!flag
  },1000)
}

function iniciarTimer () {

  t_total--

  min = t_total / 60
  seg = min - Math.floor(min)
  seg*=60

  min = Math.floor(min)
  seg = Math.floor(seg)

  if(min <= 0 && seg <= 0 ){
    $("#timer").html("00:00")
  }
  else if (seg<10) {
    $("#timer").html("0"+min+":0"+seg)
  }else {
    $("#timer").html("0"+min+":"+seg)
  }
}

function llenarTablero(){
  index=index+1
  var numero=0;
  var imagen=0;
  $(".elemento").draggable({ disabled: true });
  if(index<8)
  {
    for(var i=1;i<8;i++)
    {
      if($(".col-"+i).children("img:nth-child("+index+")").html()==null)
      {
        numero=Math.floor(Math.random() * 4) + 1 ; // Para generar numeros entre 1 y 4
        imagen="image/"+numero+".png";
        $(".col-"+i).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
      }
    }
  }
  if(index==8)
  {
    clearInterval(llenar);
    match=setInterval(sumarPuntos,150)
  }
}
function buscarHorizontal()
{
  var busqueda=0;
  for(var j=1;j<8;j++)
  {
    for(var k=1;k<6;k++)
    {
      var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src")
      var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src")
      var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src")
      if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null))
      {
          $(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
          $(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
          $(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo")
          busqueda=1;
      }
    }
  }
  return busqueda;
}
function buscarVertical(){
  var busqueda=0;
  for(var l=1;l<6;l++)
  {
    for(var k=1;k<8;k++)
    {
      var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src")
      var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src")
      var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src")
      if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null))
      {
          $(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo")
          $(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo")
          $(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo")
          busqueda=1;
      }
    }
  }
  return busqueda;
}
// Funcion para verificar si hay dulces para eliminar y asi sumar puntos
function sumarPuntos (){

}
