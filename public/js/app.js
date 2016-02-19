var weatherData = {};
$(document).ready(function(){
  var baseUrl = 'https://api.forecast.io/forecast/';
  var weatherData = {};
  $('#weather_app').on('click', showInfo);
