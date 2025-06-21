/* ==========================================================================

	HOME JS

========================================================================== */

// Select all elements with the class 'char-block'
var characters = document.querySelectorAll('.char-block');

// Get the search bar input element by its ID
var searchBar = document.getElementById('sbar-input');

// Initialize a variable to track if the initial animation has run
var initialAnimation = true;

// Add an event listener for the keyup event on the search bar
searchBar.addEventListener('input', function(event) {

    // Get the search term from the input field
    let searchTerm = event.target.value.toLowerCase();

    // If search term is not empty and has at least 1 character
    if ( searchTerm !== '' && searchTerm !== null && searchTerm.length >= 1 ) {

        // Use setTimeout to delay the search for 200 milliseconds
        setTimeout(function() {
        
            // Loop through all character blocks
            for ( let i = 0; i < characters.length; i++ ) {

                // Get the character name from the data-name attribute
                let charName = characters[i].getAttribute('data-name').toLowerCase();

                // If the character name includes the search term, show it
                if ( charName.includes(searchTerm) ) {

                    // If initialAnimation is true, remove the 'active' class and then add it back
                    if ( initialAnimation === true ) {
                        characters[i].classList.remove('active');

                        // Use setTimeout to ensure the class is added after the removal
                        setTimeout(function() {
                            characters[i].classList.add('active');
                        }, 1);
                    } else {
                        characters[i].classList.add('active');
                    }

                // Otherwise, hide it
                } else {
                    characters[i].classList.remove('active');
                }
            }

            // If initialAnimation is true, set it to false
            if ( initialAnimation === true ) initialAnimation = false;
        }, 200);
    }
});

// Select all input checkboxes and logos for the Bastion section
var bastionInputs = document.querySelectorAll('.scat-input');
var bastionLogos = document.querySelectorAll('.scat-logo');

// Add event listeners to each input checkbox
bastionInputs.forEach((input, index) => {
    input.addEventListener('change', function() {

        // Get the corresponding logo element
        let selectedBastion = this.value.toLowerCase();
        
        // Loop through all character blocks
        for ( let i = 0; i < characters.length; i++ ) {

            // Get the character bastion from the data-bastion attribute
            let charBastion = characters[i].getAttribute('data-bastion').toLowerCase();

            // If the character name includes the search term, show it
            if ( charBastion.includes(selectedBastion) ) {

                // If initialAnimation is true, remove the 'active' class and then add it back
                if ( initialAnimation === true ) {
                    characters[i].classList.remove('active');

                    // Use setTimeout to ensure the class is added after the removal
                    setTimeout(function() {
                        characters[i].classList.add('active');
                    }, 1);
                } else {
                    characters[i].classList.add('active');
                }

            // Otherwise, hide it
            } else {
                characters[i].classList.remove('active');
            }
        }

        // If initialAnimation is true, set it to false
        if ( initialAnimation === true ) initialAnimation = false;
    });
});