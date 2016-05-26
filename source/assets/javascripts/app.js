$(document).ready( function() {

  $('input[type=radio]').on('change', function () {
    $("[name='" + $(this).attr('name') + "']").parent().removeClass("selected");
    $(this).parent().addClass('selected');
  });
  $('input[type="checkbox"]').on('change', function () {
    $(this).parent().toggleClass('selected', $(this).is(':checked'));
  });

  $('input:checked').parent().addClass('selected');

  listLocalStorage();
});

function buildNextUrl(page) {
  var query = location.href.substring((location.href.indexOf('?') + 1), location.href.length);
  if (location.href.indexOf('?') > 0) {
    page = page + '?' + query;
  }
  $('#next-url').attr("href", page);
}

function updateQueryStringParameter(key, value) {
  var uri = $('#next-url').attr('href');
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}
function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

function listLocalStorage() {
  var obj = {},
      app = document.location.href.indexOf('/staff/') === -1 ? 'public' : 'staff';

  for (var i = 0; i < localStorage.length; i++) {
    if(localStorage.key(i).indexOf(app) === 0) {
      obj[localStorage.key(i)] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
  }

  console.log(obj);
}

function storeValue(app, key, value) {
  var appkey = app + '_' + key;
  localStorage.setItem(appkey, JSON.stringify(value));

  console.log('stored: ' + appkey + '=' + value);
}

function getValue(app, key) {
  var appkey = app + '_' + key,
      val = JSON.parse(localStorage.getItem(appkey));

  console.log('requested: ' + appkey);

  if(val && val !== 'null') {
    console.log('returned: ' + val);
    return val;
  }

  console.log('nope');
  return false;
}

function clearValue(app, key) {
  localStorage.removeItem(app + '_' + key);

  console.log('removed: ' + app + '_' + key);
}

function clearAppData(app) {
  var l = localStorage.length;

  for (var i = l - 1; i >= 0; i--) {
    var key = localStorage.key(i);
    if(key.indexOf(app) === 0) {
      localStorage.removeItem(key);
    }
  }
}

function calcThreshold() {
  var threshold = 3000,
      bands = [
        [1000, 4000],
        [1335, 5000],
        [1665, 6000],
        [2000, 7000],
        [2330, 8000],
        [4000, 10000],
        [5000, 12000],
        [6000, 14000],
        [7000, 16000]
      ],
      fee = getValue('staff', 'fee'),
      age = getValue('staff', 'age');

  if(age && age > 60) {
    threshold = 16000;
  } else if(fee) {
    for(x in bands) {
      if(fee > bands[x][0]) {
        threshold = bands[x][1];
      }
    }
  }
  return threshold;
}

function deselectRadio(els) {
  els.forEach(function(el) {
    $(el).prop('checked', false).closest('label').removeClass('selected');
  });
}

function selectRadio(els) {
  els.forEach(function(el) {
    $(el).prop('checked', 'checked').closest('label').addClass('selected');
  });
}
