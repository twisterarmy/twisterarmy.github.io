function peerLookupYggdrasil(element) {

  // Get online status
  // @TODO

  // If provided, set special status
  if ($(element).data('yggdrasil').length > 0) {

    $(element).children('td:eq(0)').find('i').removeClass('c-5');
    $(element).children('td:eq(0)').find('i').addClass('c-6');
  }
}

function peerLookupIpv6(element) {

  // Get online status
  // @TODO

  // Get country
  $.ajax({
    type: 'GET',
    url: 'https://ipapi.co/' + $(element).data('ipv4') + '/json',
    dataType: 'json',
    success: function (result) {

      if (result.country_code && result.country_code != '' && result.country_code != 'undefined') {

        // Set country
        $(element).children('td:eq(1)').text(result.country_code);
      }
    }
  });
}

function peerLookupIpv4(element) {

  // Get online status
  // @TODO

  // Get country
  $.ajax({
    type: 'GET',
    url: 'https://ipapi.co/' + $(element).data('ipv4') + '/json',
    dataType: 'json',
    success: function (result) {

      if (result.country_code && result.country_code != '' && result.country_code != 'undefined') {

        // Set country
        $(element).children('td:eq(1)').text(result.country_code);
      }
    }
  });
}

function nsLookup(element) {

  $.ajax({
    type: 'GET',
    url: 'https://dns.google/resolve?name=' + $(element).data('host'),
    dataType: 'json',
    success: function (result) {

      if (result.Answer) {

        if (result.Answer.length == 1) {

          $(element).children('td:eq(0)').find('i').removeClass('c-5');
          $(element).children('td:eq(0)').find('i').addClass('c-6');

        } else if (result.Answer.length > 1) {

          $(element).children('td:eq(0)').find('i').removeClass('c-5');
          $(element).children('td:eq(0)').find('i').addClass('c-7');
        }

        $(element).children('td:eq(2)').html(result.Answer.length);

        // Get country
        $(element).children('td:eq(3)').html('');

        $(result.Answer).each(function() {

          $.ajax({
            type: 'GET',
            url: 'https://ipapi.co/' + this.data + '/json',
            dataType: 'json',
            success: function (result) {

              if (result.country_code && result.country_code != '' && result.country_code != 'undefined') {

                $(element).children('td:eq(3)').append(' ' + result.country_code + ' ');
              }
            }
          });
        });
      }
    }
  });
}

$(document).ready(function() {

  // Check DNS
  $('#dns tr[data-host]').each(function() {
    nsLookup(this);
  });

  // Check peers
  $('#peers tr[data-yggdrasil]').each(function() {
    peerLookupYggdrasil(this);
  });

  $('#peers tr[data-ipv6]').each(function() {
    peerLookupIpv6(this);
  });

  $('#peers tr[data-ipv4]').each(function() {
    peerLookupIpv4(this);
  });

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