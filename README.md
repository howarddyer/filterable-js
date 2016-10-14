# Filterable.js

A HTML element filter using jQuery and Knockout.js

<a href="http://codepen.io/howarddyer/pen/GjGXvb" target="_blank">Demo</a>

** Perfect for filtering through identically set-out data records, ie. publications, member records etc.

## Original purpose:

Filtering of publications at www.pharmatelligence.co.uk

## Files

The following files should be referenced in the header:

* jQuery (http://jquery.com/)
* knockout.js (http://knockoutjs.com/)
* filterable.min.js

## HTML structure

You should ensure that elements to be filtered have identical HTML structure. It also helps to increase specificity by wrapping elements in a parent element, i.e.:

	<section class="filterable">

	  <article>
	    <h1>Data element 1</h1>
	    <p>foo bar</p>
	  </article>

	  <article>
	    <h1>Data element 2</h1>
	    <p>bar baz</p>
	  </article>

	  <article>
	    <h1>Data element 3</h1>
	    <p>baz qux</p>
	  </article>

	</section>

Remember to bind the library:

	<script>
		$('.filterable article').filterable();
	</script>

## Output

This plugin uses Knockout.js to consume your search query. Add the following to your input element to bind it to the Knockout Model and to update the observable with every key press:

	data-bind="value: queryString, valueUpdate: 'afterkeyup'"

Results of the filtering can also be outputted by adding the following attributes to HTML elements:

	data-bind="text: matches" // outputs amount of matched records
	data-bind="text: queryString" // outputs current search query

# Styling

When element are filtered, the following classes are assigned depending on whether the query matches any of the text contents:

* filterable-match
* filterable-no-match

For a quick solution, add the following CSS code to hide all elements that do not match the query:

	  .filterable-no-match{display: none;}
