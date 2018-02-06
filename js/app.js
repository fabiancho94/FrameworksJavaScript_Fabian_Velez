$(document).ready(function () {cambioColor()}) // Animacion del color

          // Variables Usadas
// Varias de intervalo

var match
var masDulces
var cuentaAtras
var llenar
// Para la cuenta atras
var min, seg, t_total
t_total = 120
// Para el llenado del tablero
var index = 0
// Para sumar puntos
var matriz = 0
var resH = 0
var resV = 0
var bnewd=0;
var puntos = 0
var contador = 0

// Para el panel de Movimientos
var lencol=["","","","","","",""];
var lenres=["","","","","","",""];
var maximo=0;
var mov = 0

// Acciones al momento de dar click en Iniciar
$('.btn-reinicio').on("click", function(){
  // Reiniciando Variables
  index=0;
  puntos=0;
  mov=0;
  $(".panel-score").css("width","25%");
  $(".panel-tablero").show();
  $(".time").show();
  $("#score-text").html("0")
  $("#movimientos-text").html("0")
  // Cambio de texto a reniciar
  $(this).html("Reiniciar")
  // Limpiando los intervalos
  clearInterval(llenar);
  clearInterval(match);
  clearInterval(masDulces);
  clearInterval(cuentaAtras);
  t_total = 120
  borrar()
  // Llenar el Tablero Y
  // Empezar cuenta regresiva
  llenar = setInterval(function(){llenarTablero()},150)
  cuentaAtras = setInterval(function(){iniciarTimer()},1000)
})

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

  if(t_total == 0 ){
    clearInterval(llenar);
    clearInterval(match);
    clearInterval(masDulces);
    clearInterval(cuentaAtras);
    $( ".panel-tablero" ).hide("drop","slow",final);
    $( ".time" ).hide();
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
    match=setInterval(function(){sumarPuntos()},150)
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
  matriz = 0;
  resH = buscarHorizontal()
  resV = buscarVertical()

  for(var j=1;j<8;j++)
  {
      matriz=matriz+$(".col-"+j).children().length;
  }

  if(resH == 0 && resV ==0 && matriz!= 49)
  {
      clearInterval(match);
      bnewd=0;
      masDulces=setInterval(function(){agregarDulces()},600)
  }

  if(resH==1 || resV==1)
  {
    $(".elemento").draggable({ disabled: true });
    $("div[class^='col']").css("justify-content","flex-end")
    $(".activo").hide("pulsate",1000,function(){
      var aux=$(".activo").length;
      $(".activo").remove("img")
      puntos=puntos+aux;
      $("#score-text").html(puntos)
    })
  }

  if(resH==0 && resV==0 && matriz==49)
  {
    $(".elemento").draggable({
      disabled: false,
      containment: ".panel-tablero",
      revert: true,
      revertDuration: 0,
      snap: ".elemento",
      snapMode: "inner",
      snapTolerance: 40,
      start: function(event, ui){
        mov=mov+1;
        $("#movimientos-text").html(mov)
      }
    });
  }

  $(".elemento").droppable({
    drop: function (event, ui) {
      var dropped = ui.draggable;
      var droppedOn = this;
      var espera=0;
      do{
        espera=dropped.swap($(droppedOn));
      }while(espera==0)
      resH=buscarHorizontal()
      resV=buscarVertical()
      if(resH==0 && resV==0)
      {
        dropped.swap($(droppedOn));
      }
      if(resH==1 || resV==1)
      {
        clearInterval(masDulces);
        clearInterval(match);
        match=setInterval(function(){sumarPuntos()},150)
      }
    },
  });
}
/* Modulo de JQUERY para el intercambio */
jQuery.fn.swap = function(b)
{
    b = jQuery(b)[0];
    var a = this[0];
    var t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);
    return this;
};

function agregarDulces(){
  $(".elemento").draggable({ disabled: true });
  $("div[class^='col']").css("justify-content","flex-start")
  for(var j=1;j<8;j++)
  {
      lencol[j-1]=$(".col-"+j).children().length;
  }
  if(bnewd==0)
  {
    for(var j=0;j<7;j++)
    {
      lenres[j]=(7-lencol[j]);
    }
    maximo=Math.max.apply(null,lenres);
    contador=maximo;
  }
  if(maximo!=0)
  {
    if(bnewd==1)
    {
      for(var j=1;j<8;j++)
      {
        if(contador>(maximo-lenres[j-1]))
        {
          $(".col-"+j).children("img:nth-child("+(lenres[j-1])+")").remove("img")
        }
      }
    }
    if(bnewd==0)
    {
      bnewd=1;
      for(var k=1;k<8;k++)
      {
        for(var j=0;j<(lenres[k-1]-1);j++)
        {
            $(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>")
        }
      }
    }
    for(var j=1;j<8;j++)
    {
      if(contador>(maximo-lenres[j-1]))
      {
        numero=Math.floor(Math.random() * 4) + 1 ;
        imagen="image/"+numero+".png";
        $(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>")
      }
    }
  }
  if(contador==1)
  {
      clearInterval(masDulces);
      match=setInterval(function(){sumarPuntos()},150)
  }
  contador=contador-1;
}
function final()
{
    $( ".panel-score" ).animate({width:'100%'},4000);
}
function borrar()
{
  for(var j=1;j<8;j++)
  {
    $(".col-"+j).children("img").detach();
  }
}
