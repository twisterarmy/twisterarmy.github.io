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
          })
        })
      }
    }
  })
}

$(document).ready(function() {

  $('#dns tr[data-host]').each(function() {
    nsLookup(this);
  })

})