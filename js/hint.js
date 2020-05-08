(function (window) {
    'use strict';

    function defineHint() {

        var Hint = {};

        Hint.start = function (options) {
          var loadingTemplate = '<div class="overlay">' +
            '<i id="loading" class="fas fa-spinner fa-3x fa-spin"></i>' +
          '</div>';
          var template = '<a href="#" class="btn btn-success btn-icon-split finish-button" onclick="deleteOldHints(true)">' +
            '<span class="icon text-white-50">' +
              '<i class="fas fa-check"></i>' +
            '</span>' +
            '<span class="text">İpucunu Kapat</span>' +
          '</a>';
          $('#'+options.selector).prepend(loadingTemplate);
          var hint = $('#'+options.start).attr("data-hint");
          var next = '"'+$('#'+options.start).attr("data-next-hint")+'"';
          setTimeout(() => {
            nextHint(options.start, next, hint);
            $('#loading').remove();
            $('.overlay').append(template);
          }, 1000);

        };

        return Hint;

    }


    if (typeof (Hint) === "undefined") {
        window.Hint = defineHint();
    }
    return Hint;
})(window);

function deleteOldHints(isLast = false) {
  if (isLast) {
    $('body .overlay').remove();
  }
  var hints = document.querySelectorAll("[data-hint]");
  $.each(hints, function( index, value ) {
    $('#'+value.id + ' .hint').remove();
    $('#'+value.id).removeClass('related');
  });
}

function handler(current, next, text) {
  var isLast = false;
  if (current === "undefined") {
    isLast = true;
  }
  deleteOldHints(isLast);
  $('#'+current).addClass('related').append(
    '<div class="hint">' +
      '<p>'+text+'</p>'
      +'<a href="javascript:;" class="btn btn-secondary btn-icon-split float-right"><span class="icon text-white-50"><i class="fas fa-arrow-right"></i></span><span class="text">Sonraki</span></a>'+
    '</div>'
  );
  $('#'+current + ' .hint a').attr("onclick", 'nextHint('+next+')');
}

function nextHint(element) {
  var hint = $('#'+element).attr("data-hint");
  var next = '"'+$('#'+element).attr("data-next-hint")+'"';
  handler(element, next, hint);
}

function prevHint(element) {
  var hint = $('#'+element).attr("data-hint");
  var next = '"'+$('#'+element).attr("data-next-hint")+'"';
  handler(element, next, hint);
}
