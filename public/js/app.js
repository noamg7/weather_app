var locationData = {};
$(document).ready(function(){
  var baseUrl = 'https://api.forecast.io/forecast/';
  var locationData = {};
  $('#weather_app').on('click', showInfo);


  function buildUrl(city, state){
    return baseUrl + apiKey+'/'+city+','+state;
  }

  function location(){
    var city = $('#city').val();
    var state = $('#state').val();
    var ajaxOptions = {
      url: buildUrl(city, state),
      dataType: 'jsonp',
      success: showInfoSuccess,
      error: errorHandler,
    };
    $.ajax(ajaxOptions);
    }

  function buildUrl2(latitude,longitude){
    return baseUrl2 + apiKey2+'/'+lat+','+lon;
  }

  function data(){
    var lat = data.result[0].geometry.location.lat;
    var lon = data.result[0].geometry.location.lon;
    var options = {
      url: buildUrl2(lat, lon),
      dataType: data('jsonp'),
      success: successHandler,
      error: errorHandler,
    };

    $.ajax(options);
  }

  function successHandler(data){
    weatherData = data;
    locationData = data;
    $('#output').text(JSON.stringify(data));
    console.log(data);
    console.log(locationData);
  }

  function errorHandler(err){
    console.log(err);
  }
  function showInfo(){
    var city = $('#city').val();
    var state = $('#state').val();
    var ajaxOptions = {
      url: buildUrl(city, state),
      dataType: 'jsonp',
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
     city: data.city,
     state: data.state
    //  latitude: data.latitude,
    //  longitude: data.longitude,
    //  time: data.time,
    };
    var html = template(extractedData);
    $('#test-output').html(html);
  }
});
