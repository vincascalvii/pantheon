/* ==========================================================================

	STRUCTURED DATA

========================================================================== */

/* ==========================================================================

	BREADCRUMBS

========================================================================== */

// If breadcrumb exists, add the snippet
if ( document.querySelector('.breadcrumb') ) breadcrumb();

// Function to add breadcrumb snippet
function breadcrumb() {

	// Get all the links and items
	var links = document.querySelectorAll('.breadcrumb .link');
	var items = document.querySelectorAll('.breadcrumb .item');

	// Create the script and set JSON-LD type
	const script = document.createElement('script');
	script.setAttribute('type', 'application/ld+json');

	// Prepare the structured data
	script.textContent =
		'{\n' +
		'	"@context": "https://schema.org",\n' +
		'	"@type": "BreadcrumbList",\n' +
		'	"itemListElement":['
	;

	// Run a "for" loop on all links and generate structured data
	for ( var i = 0; i < items.length; i++ ) {

		script.textContent += 
		'{\n' +
		'		"@type": "ListItem",\n' +
		'		"position": ' + ( i + 1 ) + ',\n' +
		'		"name": "' + items[i].innerText + '",\n' +
		'		"item": "https://vincascalvii.github.io' + links[i].getAttribute('href') + '"\n' +
		'	}'

		// If not last item, add comma, otherwise, end the structured data
		if ( ( i + 1 ) < items.length ) {
			script.textContent += ', ';
		} else {
			script.textContent += ']\n}';
		}

	}

	// Append the script back to the <head> tag
	document.head.appendChild(script);

};
