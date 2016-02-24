var locationData = {};
$(document).ready(function(){
  var baseUrl = 'https://api.forecast.io/forecast/';
  var locationUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  $('#weather_app').on('click', google);

  function googleUrl(city, state){
    return locationUrl +city+','+state;
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
    locationData.city = google.results[0].address_components[0].short_name;
    locationData.state = google.results[0].address_components[2].long_name;
    var lat = google.results[0].geometry.location.lat;
    var lon = google.results[0].geometry.location.lng;
    var ajaxOptions= {
      url: buildUrl(lat, lon),
      dataType: 'jsonp',
      success: showInfoSuccess,
      error: errorHandler,
    };
     $.ajax(ajaxOptions);
  }

  function buildUrl(lat, lon){
    //return 'https://api.forecast.io/forecast/b6e3a9d6cbc211074ff9e60dc7bd71ec/37.8267,-122.423?si';
    return baseUrl + apiKey+'/'+lat+','+lon;
  }

  function errorHandler(err){
    console.log(err);
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
    console.log(locationData.city);
    var source = $('#info').html();
    var template = Handlebars.compile(source);
    //var data = data.currently;
    var extractedData = {
      city: locationData.city,
      state: locationData.state,
      latitude: data.latitude,
      longitude: data.longitude,
      temperature: data.currently.temperature,
      time: data.currently.time,
      summary: data.currently.icon,
      // btnLink: "javascript:history.go(0)",
      // btnText: "Click to Reload",
    };
    var html = template(extractedData);
    $('#output').html(html);
  }
});
