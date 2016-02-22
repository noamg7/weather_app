var weatherData = {};
$(document).ready(function(){
  var baseUrl = 'https://api.http://forecast.io/forecast/';
  var locationData = {};
  $('#weather_app').on('click', showInfo);

  function buildUrl(city, state){
    return baseUrl + apiKey+'/'+city+','+state;
  }

  function getLocationData(){
    var city = $('#city');
    var state= $('#state');
    var options = {
    url: buildUrl(city, state),
    dataType: 'jsonp',
    success: successHandler,
    error: errorHandler,
    };
    $.ajax(options);
  }
  function buildUrl(lat, lon){
    //return 'https://api.forecast.io/forecast/b6e3a9d6cbc211074ff9e60dc7bd71ec/37.8267,-122.423';
    return baseUrl + apiKey+'/'+lat+','+lon;
  }
  function getWeather(){
    var lat = $('#latitude').val();
    var lon = $('#longitude').val();
    var options = {
      url: buildUrl(lat, lon),
      dataType: 'jsonp',
      success: successHandler,
      error: errorHandler
    };

    $.ajax(options);
  }

  function successHandler(data){
    weatherData = data;
    locationData= data;
    $('#output').text(JSON.stringify(data));
    console.log(data);
    console.log(locationData);
    console.log(weatherData);
  }

  function errorHandler(err){
    console.log(err);
  }
  function showInfo(data){
    var lat = $('#latitude').val();
    var lon = $('#longitude').val();
    var ajaxOptions = {
      url: buildUrl(lat, lon),
      dataType: 'jsonp',
      success: showInfoSuccess,
      error: errorHandler,
    };
    $.ajax(ajaxOptions);
  }
  function showInfo(locationData){
    var city = $('#city');
    var state = $('#state');
    var ajaxOptions = {
      url: buildUrl(city, state),
      dataType: 'jsnop',
      success: showInfoSuccess,
      error: errorHandler,
    };
    $.ajax(ajaxOptions);
  }
  function showInfoSuccess(data){
    console.log(data);
    var source = $('#info').html();
    var template = Handlebars.compile(source);
    var extractedData = {
     city: locationData.currently.city,
     state: loationData.currently.state
     latitude: data.latitude,
     longitude: data.longitude,
     time: data.currently.time,
    };
    var html = template(extractedData);
    $('#test-output').html(html);
  }
});
