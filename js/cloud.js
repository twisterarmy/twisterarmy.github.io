function nsLookup(host) {
  $.ajax({
    type: 'GET',
    url: 'https://dns.google/resolve?name=' + host,
    dataType: 'json',
    success: function (result) {
      if (result.Answer) {
        if (result.Answer.length > 0) {
          $('div[data-cloud-server="' + host + '"] i').removeClass('c-5');
          $('div[data-cloud-server="' + host + '"] i').addClass('c-7');
        }
      }
    }
  });
}

nsLookup('cs1.twisterarmy.org');