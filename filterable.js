/*
 * filterable.js v2.0
 * Created by Howard Dyer (http://www.howard-dyer.co.uk)
 * Licensed under MIT (https://github.com/howarddyer/filterable.js/blob/master/LICENSE)
 */

$.fn.extend({

  filterable: function() {

    elements = this;

    var viewModel = {
      queryString: ko.observable(),
      matches: ko.observable()
    }

    viewModel.queryString.subscribe(function(queryString) {
      startFilter(queryString);
    })

    function startFilter(queryString) {
      if(queryString[queryString.length -1] == ',')
        queryString = queryString.slice(0,-1);
      queryArr = queryString.split(',');
      matchCount = 0;

      $(elements).each(function() {
        el = this;
        if(queryArr == '')
          return $(el).removeClass('filterable-match').removeClass('filterable-no-match')
        content = $(el).text().replace(/\s\s/g,'');

        if(matchString(queryArr,content)) {
          $(el).addClass('filterable-match').removeClass('filterable-no-match');
          matchCount++;
        } else {
          $(this).addClass('filterable-no-match').removeClass('filterable-match');
        }
      })

      function matchString(queryArr,content) {
        var unmatched = false;
        $.each(queryArr, function(i,query) {
          if(unmatched) return;
          if(!(content.indexOf(query)>0)) unmatched = true;
        })
        return (unmatched) ? false : true;
      }

      viewModel.matches(matchCount)

    }

    ko.applyBindings(viewModel);

  }
})
