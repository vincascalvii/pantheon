/* ==========================================================================

	CHARACTER JS

========================================================================== */

(function() {

	// Get the character
	var charCode = getParameter('code').toLowerCase();

	// If the value is not empty or null
	if ( charCode != '' && charCode != null ) {

		// Fetch the JSON file
		fetch('/pantheon/data/characters/' + charCode + '.json')
		.then( response => {
			if (!response.ok) throw new Error('HTTP error ' + response.status);
	        return response.json();
	    })
		.then( data => {
console.log(data);
            // Populate the data
			popData(data, 'full_name');
            popData(data, 'title');
            popData(data, 'bastion_full');
            popData(data, 'race');
            popData(data, 'soulforge');
            popData(data, 'resonance');

            // Populate the art
            document.getElementById('pop-bastion-logo').src = '../img/bastions/' + data['bastion_name'].strtolower() + '-mini.png';
            document.getElementById('pop-art-full').src = '../img/characters/' + charCode + '/full.png';
		})
		.catch( function(error) {
			console.log('Fetch error: ', error);
		});
	}

    // Reusable function to populate data
    function popData(data, name) {
        var val = data[name];
        var els = document.querySelectorAll('.pop-' + name.replace(/_+/g, '-').toLowerCase());
        for ( var i = 0; i < els.length; i++ ) {
            val[i].innerHTML = val;
        }
    }
})();



/* ==========================================================================

    GET URL PARAMATER

========================================================================== */

function getParameter() {

    var key = false, results = {}, item = null;

    // Get the query string without the "?""
    var qs = location.search.substring(1);

    // Check for the key as an argument
    if ( arguments.length > 0 && arguments[0].length > 1 ) key = arguments[0];

    // Make a regex pattern to grab key/value
    var pattern = /([^&=]+)=([^&]*)/g;

    // Loop the items in the query string,
    // Either find a match to the argument, 
    // Or build an object with key/value pairs
    while ( item = pattern.exec(qs) ) {
        if ( key !== false && decodeURIComponent(item[1]) === key ) {
            return decodeURIComponent(item[2]);
        } else if ( key === false ) {
            results[decodeURIComponent(item[1])] = decodeURIComponent(item[2]);
        }
    }

    // Return the results if no key was specified
    return key === false ? results : null;
}