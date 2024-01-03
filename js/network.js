function peerLookup(element) {

  var host = $(element).data('host');
  var port = $(element).data('port');

  // Get online status
  $.ajax({
    type: 'GET',
    url: 'https://yggapi.duckdns.org/net/socket.php?host=' + host + '&port=' + port,
    dataType: 'json',
    success: function (result) {

      if (result.success) {

        // Set online
        $(element).children('td:eq(0)').find('i').removeClass('c-5');
        $(element).children('td:eq(0)').find('i').addClass('c-7');
      }
    }
  });

  // Get country
  $.ajax({
    type: 'GET',
    url: 'https://ipapi.co/' + host + '/json',
    dataType: 'json',
    success: function (result) {

      if (result.country_code && result.country_code != '' && result.country_code != 'undefined') {

        // Set country
        $(element).children('td:eq(2)').text(result.country_code);
      }
    }
  });
}

function nsLookup(element) {

  var host = $(element).data('host');

  // Try alternative DNS
  var alfis = [
    ".ygg",
    ".btn",
    ".anon",
    ".conf",
    ".index",
    ".index",
    ".merch",
    ".mirror",
    ".mob",
    ".screen",
    ".srv"
  ];

  $.each(alfis, function() {

    if (host.includes(this)) {

      $.ajax({
        type: 'GET',
        url: 'https://yggapi.duckdns.org/net/dig.php?records[]=A&records[]=AAAA&name=' + host,
        dataType: 'json',
        success: function (result) {
          if (result.success) {

            var total = 0;

            if (result.records.A.length) {

              $(result.records.A).each(function() {

                total++;

                $.ajax({
                  type: 'GET',
                  url: 'https://ipapi.co/' + this + '/json',
                  dataType: 'json',
                  success: function (result) {

                    if (result.country_code && result.country_code != '' && result.country_code != 'undefined') {

                      $(element).children('td:eq(3)').append(' ' + result.country_code + ' ');
                    }
                  }
                });
              });
            }

            if (result.records.AAAA.length) {

              $(result.records.AAAA).each(function() {

                total++;

                $.ajax({
                  type: 'GET',
                  url: 'https://ipapi.co/' + this + '/json',
                  dataType: 'json',
                  success: function (result) {

                    if (result.country_code && result.country_code != '' && result.country_code != 'undefined') {

                      $(element).children('td:eq(3)').append(' ' + result.country_code + ' ');
                    }
                  }
                });
              });
            }

            if (total == 1) {

              $(element).children('td:eq(0)').find('i').removeClass('c-5');
              $(element).children('td:eq(0)').find('i').addClass('c-6');

            } else if (total > 1) {

              $(element).children('td:eq(0)').find('i').removeClass('c-5');
              $(element).children('td:eq(0)').find('i').addClass('c-7');
            }
          }
        }
      });

      return false;
    }
  });

  // Regular DNS
  $.ajax({
    type: 'GET',
    url: 'https://dns.google/resolve?name=' + host,
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
  $('#peers tr[data-peer]').each(function() {
    peerLookup(this);
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