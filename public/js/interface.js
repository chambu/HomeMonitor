function setWeather(){
  // Udate temprature and humidity
  $.get('/getweather', function(json_data) {
//console.log(json_data.weather[0]);
    if (json_data.main){
      $("#weatherDisplay").html("Weather: " + json_data.weather[0].description);
      $("#tempoutDisplay").html("Temperature: " + kelvinToCelsius(json_data.main.temp) + " °C");
      $("#humidityoutDisplay").html("Humidity: " + json_data.main.humidity + "%");
    }
   });
setSensor();
}

function setSensor(){
  // Udate temprature and humidity
  // Udate temprature and humidity
  $.get('/get', {command: '/temperature', core: 'sensor_core'}, function(json_data) {
//	console.log(json_data.result);
var debugx = JSON.parse(json_data.result);
//console.log(debugx);
//console.log(debugx.get('c'));
    if (json_data.result){
//      $("#resultDisplay").html("Result: " + json_data.result);
      $("#tempDisplay").html("Temperature: " + debugx + " °C");
//      $("#humidityDisplay").html("Humidity: " + debugx.h + "%");
    }

    // Core status
    if (json_data.coreInfo['connected'] == true){
      $("#sensorsCoreStatus").html("Core Online");
      $("#sensorsCoreStatus").css("color","green");
    }
    else {
      $("#sensorsCoreStatus").html("Core Offline");
      $("#sensorsCoreStatus").css("color","red");
    }
  });
  $.get('/get', {command: '/humidity', core: 'sensor_core'}, function(json_data) {
//  console.log(json_data.result);
var debugx = JSON.parse(json_data.result);
// console.log(debugx);
// console.log(debugx.get('c'));
    if (json_data.result){
//      $("#resultDisplay").html("Result: " + json_data.result);
//      $("#tempDisplay").html("Temperature: " + debugx + " °C");
      $("#humidityDisplay").html("Humidity: " + debugx + "%");
    }
  });

  $.get('/get', {command: '/wemostatus', core: 'sensor_core'}, function(json_data) {
//  console.log(json_data.result);
var debugx = JSON.parse(json_data.result);
//console.log(debugx);
//console.log(debugx.get('c'));
    if (json_data.result){
//      $("#resultDisplay").html("Result: " + json_data.result);
//      $("#tempDisplay").html("Temperature: " + debugx + " °C");
      $("#WeMo").html("WeMo status: On");
    }else{
      $("#WeMo").html("WeMo status: Off");
    }  });
}

// Refresh weather data
setInterval(function() {

// Udate temprature and humidity
setSensor();
//set outside weather data
setWeather();
}, 60000);

// Function to control the lamp
function buttonClick(clicked_id){

  if (clicked_id == "1"){
    $.get('/post', {command: '/wemo', core: 'sensor_core', params: 'on'});
  }
  if (clicked_id == "2"){
    $.get('/post', {command: '/wemo', core: 'sensor_core', params: 'off'});
  }
  if (clicked_id == "3"){
    $.get('/post', {command: '/switch', core: 'sensor_core', params: 's1,HIGH'});
  }
  if (clicked_id == "4"){
    $.get('/post', {command: '/switch', core: 'sensor_core', params: 's1,LOW'});
  }
}

function kelvinToCelsius(input) {
    input -= 273.15;
    return parseInt(input);
}

function kelvinToFahrenheit(input) {
    input = (input - 273.15) * 1.8000 + 32.00;
    return parseInt(input);
}
