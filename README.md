# Filterable.js

A front-end HTML data filter using jQuery and Knockout.js

** Perfect for filtering through identically set-out data records, ie. publications, member records etc. Simply add an input, bind to Knockout model (binding info below) and search with multiple keywords (separate using commas))

# Original purpose:

Filtering of publications displayed at www.pharmatelligence.co.uk/publications

# Initialising Filterable.js:

The following files should be referenced in the header:
* jQuery (http://jquery.com/)
* knockout.js (http://knockoutjs.com/)
* filterable.min.js

To kick things off, you should ensure that data elements to be filtered have identical HTML structure. It also helps to increase specificity by wrapping data elements in a parent element, ie:

	<section class='container'>
	
	  <article>
	    <h1>Data element 1</h1>
	    <p>Foo</p>
	  </article>
	
	  <article>
	    <h1>Data element 2</h1>
	    <p>Foo</p>
	  </article>
	
	  <article>
	    <h1>Data element 3</h1>
	    <p>Baz</p>
	  </article>
	</section>

This plugin uses Knockout.js to consume your search query. Add the following to your input element to bind it to the Knockout Model and to update the observable with every key press:

	data-bind="value: filterQuery, valueUpdate:'afterkeyup"

Results of the filtering can also be outputted by adding the following attributes to HTML elements:

	data-bind="text: matchedRecords" // outputs amount of matched records
	data-bind="text: searchQuery" // outputs current search query

But all the above this is useless without the all-important event bind on load (ideally in the footer):

	<script>
     $('section.container article').filterable({});
	</script>

# Filters

When filtering has not been enabled (ie. when input doesn't have focus and is empty) all data elements are deemed inactive, and when data elements are matched/unmatched their classes are set to active/disabled respectively.
Filterable.js updates inactive, active and disabled data elements using CSS. There are 6 CSS reliant overrides for filterType, with 3 attributed states:

## 'background' (default)
* filterInactive - 'inherit'
* filterActive - 'green'
* filterDisabled - 'inherit'

## 'border'
* filterInactive - 'inherit'
* filterActive - 'solid 1px green'
* filterDisabled - 'inherit'

## 'color'
* filterInactive - 'inherit'
* filterActive - 'green'
* filterDisabled - 'inherit'

## 'display'
* filterInactive - 'inherit'
* filterActive - 'inherit'
* filterDisabled - 'none'

## 'opacity'
* filterInactive - 'inherit'
* filterActive - '1'
* filterDisabled - '.3'

## 'visibility'
* filterInactive - 'inherit'
* filterActive - 'visible'
* filterDisabled - 'hidden'

To change the filterType and use the default settings, add the following options during event bind:

	$('section.container article').filterable({
     filterType: 'border'
	});

Or to change filterType and all attributed settings for a specfic context:


	$('section.container article').filterable({
     filterType: 'color',
     filterInactive: 'black',
     filterActive: 'blue',
     filterDisabled: 'grey'
	});

