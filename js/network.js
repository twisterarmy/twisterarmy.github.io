
function getCountry(answer, element) {

  element.children('td:eq(3)').html('');

  $(answer).each(function() {
    $.ajax({
      type: 'GET',
      url: 'https://ipapi.co/' + this.data + '/json',
      dataType: 'json',
      success: function (result) {
        if (result.country_code && result.country_code != '' && result.country_code != 'undefined') {
          element.children('td:eq(3)').append(' ' + result.country_code + ' ');
        }
      }
    });
  });
}

function nsLookup(host) {
  $.ajax({
    type: 'GET',
    url: 'https://dns.google/resolve?name=' + host,
    dataType: 'json',
    success: function (result) {

      if (result.Answer) {

        var peers = result.Answer.length;

        var element = $('tr[data-host="' + host + '"');

        if (peers == 1) {
          element.children('td:eq(0)').find('i').removeClass('c-5');
          element.children('td:eq(0)').find('i').addClass('c-6');
        } else if (peers > 1) {
          element.children('td:eq(0)').find('i').removeClass('c-5');
          element.children('td:eq(0)').find('i').addClass('c-7');
        }

        element.children('td:eq(2)').html(peers);

        getCountry(result.Answer, element);
      }
    }
  });
}

$( document ).ready(function() {

  nsLookup('seed.twister.net.co');
  nsLookup('seed2.twister.net.co');
  nsLookup('seed3.twister.net.co');
  nsLookup('dnsseed.gombadi.com');
  nsLookup('twisterseed.tk');
  nsLookup('cruller.tasty.sexy');
  nsLookup('twister-seeder.muh.freedu.ms');
  nsLookup('twisterarmyseed.tk');

  /*
  $('#vmap').vectorMap({
    map: 'world_en',
    backgroundColor: '#596374',
    borderColor: '#fff',
    borderOpacity: 0.25,
    borderWidth: 1,
    color: '#ccc',
    enableZoom: true,
    hoverColor: '#fff',
    hoverOpacity: null,
    normalizeFunction: 'linear',
    scaleColors: ['#b6d6ff', '#005ace'],
    selectedColor: '#fff',
    selectedRegions: null,
    showTooltip: true,
  });
  */
});
