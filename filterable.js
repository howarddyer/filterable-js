/*
 * filterable.js v1.0
 * Created by Howard Dyer (http://www.howard-dyer.co.uk)
 * Licensed under MIT (https://github.com/howarddyer/filterable.js/blob/master/LICENSE)
 */

(function($){
  
  $.fn.filterable = function(options) {
    
    var filterable = this;

    function init(){  
      filterable.bindOptions();      
      filterable.bindKnockoutModel();

      bindEngageFiltering = function(){ filterable.bindEngageFiltering(element, settings.activeClass); }
      bindDisengageFiltering = function(){ filterable.bindDisengageFiltering(element, settings.activeClass); }
      bindFiltering = function(){ filterable.bindFiltering(element, settings.activeClass, settings.disabledClass); }
      bindUIActions = function(){ filterable.bindUIActions(element, settings.activeClass, settings.disabledClass, filterType, filterInactive, filterActive, filterDisabled); }    
    }
    
    filterable.bindOptions = function(){
    
      knockoutBind = false;
      element = this.selector;

      settings = $.extend({
        filterType: 'background',
        activeClass: 'active',
        disabledClass: 'disabled',
      }, {

      });
      
    var filters = {
      background : { type : 'background', inactive : 'black', active : 'green', disabled : 'inherit' },
      border : { type : 'border', inactive : 'none', active : 'solid 1px green', disabled : 'none' },
      color : { type : 'color', inactive : 'inherit', active : 'green', disabled : 'inherit' },
      display : { type : 'display', inactive : 'inherit', active : 'inherit', disabled : 'none' },
      opacity : { type : 'opacity', inactive : 'inherit', active : '1', disabled : '.3' },
      visibility : { type : 'visibility', inactive : 'inherit', active : 'visible', disabled : 'hidden' }
    };
   
    if(options.filterType){
      var count = 0
      $.each(filters, function(i, val){
        if(i == options.filterType){
          filterType = options.filterType
          return false;
        } else {
          count++;
          if(count == 6){
            filterType = settings.filterType;
            console.log('Filterable.js ERROR - filterType is not valid')
            console.log('Please use: background, border, color, display, opacity, visibility')
          }
        }
      });
      } else {
        filterType = settings.filterType
      }
      
      switch(filterType){
        case 'background':
          filterInactive = options.filterInactive || filters.background['inactive'];
          filterActive = options.filterActive || filters.background['active'];
          filterDisabled = options.filterDisabled || filters.background['disabled'];
        break;
          
        case 'border':
          filterInactive = options.filterInactive || filters.border['inactive'];
          filterActive = options.filterActive || filters.border['active'];
          filterDisabled = options.filterDisabled || filters.border['disabled'];
        break;          
          
        case 'color':
          filterInactive = options.filterInactive || filters.color['inactive'];
          filterActive = options.filterActive || filters.color['active'];
          filterDisabled = options.filterDisabled || filters.color['disabled'];
        break;

        case 'display':
          filterInactive = options.filterInactive || filters.display['inactive'];
          filterActive = options.filterActive || filters.display['active'];
          filterDisabled = options.filterDisabled || filters.display['disabled'];
        break;

        case 'opacity':
          filterInactive = options.filterInactive || filters.opacity['inactive'];
          filterActive = options.filterActive || filters.opacity['active'];
          filterDisabled = options.filterDisabled || filters.opacity['disabled'];
        break;

        case 'visibility':
          filterInactive = options.filterInactive || filters.visibility['inactive'];
          filterActive = options.filterActive || filters.visibility['active'];
          filterDisabled = options.filterDisabled || filters.visibility['disabled'];
        break;
      }
      
    };
    
    filterable.bindKnockoutModel = function(){
      
      var Model = function(){

        this.filterQuery = ko.observable('');
        
        this.filterQuery.subscribe(function(newValue){
          filterQuery = newValue;
          bindFiltering();
        });

        this.searchQuery = ko.computed(function(){
          return this.filterQuery();    
        }, this);

        this.matchedRecords = ko.computed(function(){
          this.filterQuery();
          if (typeof filterable.matchedRecords == 'undefined' || filterable.matchedRecords == '')
            return 'No matches';
            else if (filterable.matchedRecords == '1')
              return filterable.matchedRecords + ' match';
              else return filterable.matchedRecords + ' matches';
        }, this);

        this.filterQuerySelected = ko.observable(false);
        
        this.filterQuerySelected.subscribe(function(newValue){
          filterQuerySelected = newValue
          if(filterQuerySelected == true){
            if(typeof filterQuery == 'undefined' || filterQuery == '')
              bindEngageFiltering();
          } else {
            if(filterQuerySelected == false)
              if(typeof filterQuery == 'undefined' || filterQuery == '')
                bindDisengageFiltering();
          }
        });
        
      }   

      if (knockoutBind == false){
        ko.applyBindings(new Model());
        knockoutBind = true;
      }
      
    };
    
    filterable.bindEngageFiltering = function(element, activeClass){
    
      $(element).each(function(){
        $(this).addClass(activeClass);
      });
      
      bindUIActions();
    
    };
    
    filterable.bindDisengageFiltering = function(element, activeClass){
    
      $(element).each(function(){
        $(this).removeClass(activeClass);
      });
      
      bindUIActions();
    
    };
    
    filterable.bindFiltering = function(element, activeClass, disabledClass){
    
      searchTerms = filterQuery.split(',');
      matchedRecords = 0;

      $(element).each(function(){
        content = $(this).text();
        var matchCount = 0;

        $.each(searchTerms, function(i, val){
          if(content.toLowerCase().indexOf(val) >= 0)
            matchCount++;
        });

        if(matchCount != searchTerms.length){
          $(this).removeClass(activeClass);
          $(this).addClass(disabledClass);
        } else {
          $(this).removeClass(disabledClass);
          $(this).addClass(activeClass);
          matchedRecords++;
        }

      });
      
      filterable.matchedRecords = matchedRecords;
      bindUIActions();
    
    };
    
    filterable.bindUIActions = function(element, activeClass, disabledClass, filterType, filterInactive, filterActive, filterDisabled){
      if(filterType == 'hide'){
        $(element).show();
        $(element + '.' + activeClass).show();
        $(element + '.' + disabledClass).hide();
      } else {
        $(element).css(filterType, filterInactive);
        $(element + '.' + activeClass).css(filterType, filterActive);
        $(element + '.' + disabledClass).css(filterType, filterDisabled);
      }
    
    };
    
    init();
       
  }

})(jQuery);





  