/* ==========================================================================

	RENDER CHARACTERS

========================================================================== */

// Function to render the characters
function render(data) {

    // Start with empty content
    let content = '';

    // Render the characters
    for (let i= 0; i < data.length; i++) {
        content += renderCharacter(data[i]);
    }

    // Pass the content to the container
    container.innerHTML = content;
}

// Function to render a character
function renderCharacter(char) {

    // Start with empty content
    let content = '';
    let disabledClass = char.disabled ? ' disabled' : '';

    // Build the character block
    content += `<a href="character?name=` 
        + char.name.toLowerCase() + `" class="char-block slide active` + disabledClass + `">`
        + `<div class="char-bg">`;

    // If thumbnail exists, add <img> block
    if (char.thumb === true) {
        content += `<img src="img/characters/` 
            + char.name.toLowerCase() + `/thumb.jpg" class="char-img" alt="` 
            + char.name + `" onerror="this.style.visibility='hidden'">`
    }
    
    // Close the block
    content += `</div>` + `<div class="char-name">` + char.name + `</div>` + `</a>`;

    // Render the content
    return content;
}

// Get the container & render the initial characters
let container = document.getElementById('characters');
if (data && container) render(data);



/* ==========================================================================

	SORTING

========================================================================== */

// Loop through the sort options
let sortIcons = document.querySelectorAll('.sort-icon');
let sortOpts = document.querySelectorAll('.sort-opt');
sortOpts.forEach(opt => {
    opt.addEventListener('click', function() {

        // Get the sort type
        let sort = this.getAttribute('data-sort');

        // Switch active icon
        sortIcons.forEach(icon => icon.classList.remove('active'));
        document.querySelector('.sort-icon[data-sort="' + sort + '"]').classList.add('active');

        // Render the sorted data
        container.innerHTML = '';
        switch (sort) {
            case 'az':
            case 'za':
                sortByAlpha(sort);
                break;
            default:
                render(data);
                break;
        }
    }, false);
});

// Function to sort alphabetically
function sortByAlpha(order) {

    const characters = [...data];

    // Sort the characters
    if (order === 'az') {
        characters.sort((a, b) => {
            const aUnknown = a.name === '???';
            const bUnknown = b.name === '???';

            // Push "???" to the bottom
            if (aUnknown && !bUnknown) return 1;
            if (!aUnknown && bUnknown) return -1;

            // Normal alphabetical sort (A → Z)
            return a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
        });
    } else if (order === 'za') {
        characters.sort((a, b) => {
            const aUnknown = a.name === '???';
            const bUnknown = b.name === '???';

            // Push "???" to the bottom
            if (aUnknown && !bUnknown) return 1;
            if (!aUnknown && bUnknown) return -1;

            // Normal alphabetical sort (Z → A)
            return b.name.localeCompare(a.name, undefined, { sensitivity: "base" })
        });
    }

    // Render the sorted characters
    render(characters);
}



/* ==========================================================================

	SEARCH & FILTER

========================================================================== */

// Get the search bar input element by its ID
var searchBar = document.getElementById('sbar-input');

// Add an event listener for the keyup event on the search bar
// Use setTimeout to delay the search for 200 milliseconds
searchBar.addEventListener('input', function(e) {
    setTimeout(function() {
        filterData();
    }, 200);
});

// Select all input checkboxes and logos for the Bastion section
var bastionInputs = document.querySelectorAll('.scat-input');

// Add event listeners to each input checkbox
bastionInputs.forEach((input, index) => {
    input.addEventListener('change', function() {
        filterData();
    });
});

// Function to filter data
function filterData() {

    // Get the search term
    const term = searchBar.value.trim().toLowerCase();
    const bastion = document.querySelector('.scat-input:checked').value.toLowerCase();

    // If no filters are applied, render the full data
    if (term === '' && bastion === '') {
        render(data, true);
        return;
    }

    // Filter data by bastion first, then search term
    let filteredData = data.filter(item => !bastion || item.bastion_filter === bastion)

        // Extract lists
        .flatMap(item => item.characters) 

        // Filter by text input
        .filter(entry => {
            if (!term) return true;
            return entry.name.toLowerCase().includes(term);
        });

    // Render the filtered data
    render(filteredData, false);
}

// Remove all the filters and render the full data
var clearFilter = document.querySelector('.clear');
clearFilter.addEventListener('click', function() {
    searchBar.value = '';
    bastionInputs[0].checked = true;
    render(data, true);
}, false);