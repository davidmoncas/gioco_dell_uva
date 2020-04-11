var inputNumberPlayers=document.getElementById("inputNumberOfPlayers");

var N1=document.getElementById("N1");
var N2=document.getElementById("N2");
var N3=document.getElementById("N3");
var N4=document.getElementById("N4");
var N5=document.getElementById("N5");
var N6=document.getElementById("N6");

window.names=[N1.value,N2.value,N3.value,N4.value,N5.value,N6.value]

window.prueba=9;

var containerN1=document.getElementById("containerN1");
var containerN2=document.getElementById("containerN2");
var containerN3=document.getElementById("containerN3");
var containerN4=document.getElementById("containerN4");
var containerN5=document.getElementById("containerN5");
var containerN6=document.getElementById("containerN6");

var containers=[containerN1,containerN2,containerN3,containerN4,containerN5,containerN6];



var numberPlayers=2;

inputNumberPlayers.addEventListener('change',(event)=>{


	if(inputNumberPlayers.value>6) inputNumberPlayers.value=6;
	if(inputNumberPlayers.value<2) inputNumberPlayers.value=2;

	for(var i=0;i<6;i++){
		containers[i].style.display="none";
		
	}
	for (var i=0;i<inputNumberPlayers.value;i++){
		containers[i].style.display="block";
	}

	numberPlayers=inputNumberPlayers.value;
	console.log(numberPlayers);

})

function goToPage(){
	window.open("game.html","_self");
	console.log("go to...");
}