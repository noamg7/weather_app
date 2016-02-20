var weatherData = {};
$(document).ready(function(){
  var baseUrl = 'https://api.forecast.io/forecast/';
  var weatherData = {};
  $('#weather_app').on('click', showInfo);

  function buildUrl(city, state){
    //return 'https://api.forecast.io/forecast/b6e3a9d6cbc211074ff9e60dc7bd71ec/37.8267,-122.423';
    return baseUrl + apiKey+'/'+city+','+state;
  }

    function getWeather(){
      var city = $('#city');
      var state = $('#state');
      var options = {
        url: buildUrl(city, state),
        dataType: 'jsonp',
        success: successHandler,
        error: errorHandler
     };

      $.ajax(options);
    }

    function successHandler(data){
      weatherData = data;
      $('#output').text(JSON.stringify(data));
      console.log(data);
      console.log(weatherData);
    }

    function errorHandler(err){
      console.log(err);
    }

  function showInfo(){
    var city = $('#city');
    var state = $('#state');
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
      state: data.state,
      latitude: data.latitude.val(),
      longitude: data.longitude.val(),
      time: data.currently.time,
    };
    var html = template(extractedData);
    $('#test-output').html(html);
  }

});
