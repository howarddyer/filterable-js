# Filterable.js

A front-end HTML data filter using jQuery and Knockout.js

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

This plugin uses Knockout.js to consume your search query. Add the following to your <input> element to bind it to the Knockout Model and to update the observable with every key press:

	data-bind="value: filterQuery, valueUpdate:'afterkeyup"

Results of the filtering can also be outputted by adding the following attributes to HTML elements:

	data-bind="text: matchedRecords" // outputs amount of matched records
	data-bind="text: searchQuery" // outputs current search query

But all the above this is useless without the all-important event bind on load (ideally in the footer):

	<script>
     $('section.container article').filterable({});
	</script>

# Filters

When filtering has not been enabled (ie. when <input data-bind="value: filterQuery"> doesn't have focus and is empty) all data elements are inactive, and when data elements are matched/unmatched their statuses are set to active/disabled repectively.
Filterable.js updates inactive, active and disabled data elements using CSS. There are 6 different overrides for filterType, with 3 attributed states:

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

Any of these items can be overriden for a specific contexts by binding options during the event bind:


	$('section.container article').filterable({
     filterType: 'color',
     filterInactive: 'black',
     filterActive: 'blue',
     filterDisabled: 'grey'
	});

