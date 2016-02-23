var locationData = {};
$(document).ready(function(){
  var baseUrl = 'https://api.forecast.io/forecast/';
  var locationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  $('#weather_app').on('click', google);

  function googleUrl(city, state){
    return locationUrl +city+','+state;
    console.log(this);
  };

  function google(){
    var city = $('#city').val();
    console.log(city);
    var state = $('#state').val();
    console.log(state);
    var jsonGoogle = {
      url: googleUrl(city, state),
      success: googleSuccess,
      error: errorHandler,
    };
    $.ajax(jsonGoogle);
    console.log(city, state);
  };

  function googleSuccess(google){
    console.log(google);
    var lat = google.result[0].geometry.location.lat;
    var lon = google.result[0].geometry.location.lon;
    showInfo(lat, lon);
  }

  function buildUrl(lat, lon){
    return baseUrl + apiKey+'/'+lat+','+lon;
  }

  function errorHandler(err){
    console.log(err);
  }
  function showInfo(lat, lon) {
    var ajaxOptions= {
      url: buildUrl(lat, lon),
      dataType: 'jsnop',
      success: showInfoSuccess,
      error: errorHandler,
    };
    $.ajax(ajaxOptions);
  }

  function showInfo(city, state){
    var city = $('#city').val();
    var state = $('#state').val();
    var ajaxOptions = {
      url: googleUrl(city, state),
      success: showInfoSuccess,
      error: errorHandler,
    };
    $.ajax(googleUrl);
  }

  function successHandler(data){
    weatherData = data;
    locationData = data;
    $('#output').text(JSON.stringify(data));
    console.log(data);
    console.log(locationData);
  }

  function showInfoSuccess(data){
    console.log(data);
    var source = $('#info').html();
    var template = Handlebars.compile(source);
    var data = data.currently;
    var extractedData = {
      city: data.city,
      state: data.state,
      latitude: google.result[0].geometry.location.lat,
      longitude: google.result[0].geometry.location.lon,
      time: data.time,
      btnLink: "javascript:history.go(0)",
      btnText: "Click to Reload",
    };
    var html = template(extractedData);
    $('#test-output').html(html);
  }
});
