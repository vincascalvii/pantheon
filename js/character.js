/* ==========================================================================

	DECLARE RE-USABLE VARIABLES

========================================================================== */

const urlParams = new URLSearchParams(window.location.search);
let main = document.querySelector('main');
let bastion = document.querySelector('.main-bastion');
let artContainer = document.querySelector('.main-art');
let artChar = document.querySelector('.main-art-img');
let artBg = document.querySelector('.background');
let zoom = document.querySelector('.zoom');
let abilityList = document.querySelector('.ability-list');
let arrowPrev = document.querySelector('.arrow-prev');
let arrowNext = document.querySelector('.arrow-next');



/* ==========================================================================

	POPULATE DATA

========================================================================== */

(function() {

	// Get the character
	let alias = urlParams.get('alias').toLowerCase();

	// If the value is not empty or null, fetch the JSON file
	if (alias != '' && alias != null) {
		fetch('../data/characters/' + alias + '.json')
		.then(res => {
			if (!res.ok) throw new Error('HTTP error ' + res.status);
	        return res.json();
	    })
		.then(data => {

			// Add unique code on the container
			main.classList.add('main-' + data.alias.toLowerCase());
			main.classList.add('main-' + data.bastion_short.toLowerCase());

			// Setup navigation arrows
			if (data.config?.prev_char !== undefined) {
				arrowPrev.href = '../character?alias=' + data.config.prev_char;
				arrowPrev.classList.add('active');
			}
			if (data.config?.next_char !== undefined) {
				arrowNext.href = '../character?alias=' + data.config.next_char;
				arrowNext.classList.add('active');
			}

        	// Populate the data
			popData(data, 'alias');
			popData(data, 'name');
	    	popData(data, 'bastion');
	    	popData(data, 'role');
	    	popData(data, 'class');
			popData(data, 'position');
	    	popData(data, 'type');
			popData(data, 'range');

	    	// Populate the art
	    	bastion.src = '../img/bastions/' + data.bastion_short + '.png';
			artBg.src = '../img/' + (
				data.config?.background === true 
					? 'characters/' + alias + '/bg.png' 
					: 'background/' + data.bastion_short + '.png'
				);
			artChar.src = '../img/characters/' + alias + '/full.png';
			if (data.config?.char_width !== undefined) 
				artContainer.style.width = data.config.char_width + 'px';
			if (data.config?.char_height !== undefined)
				artContainer.style.height = data.config.char_height + 'px';

			// Define the ability types
			let abilityTypes = ['Passive', 'First Ability', 'Second Ability', 'Third Ability', 'Ultimate'];

		    // Populate the abilities
		    for (let i = 0; i < 5; i++) {
				let ability = document.createElement('div');
					ability.classList.add('ability-item');
					ability.setAttribute('data-ability', abilityTypes[i]);
					if (i===0) ability.classList.add('active');
				let abilityType = document.createElement('div');
					abilityType.classList.add('ability-type');
					abilityType.innerHTML = abilityTypes[i];
				let abilityName = document.createElement('div');
					abilityName.classList.add('ability-name');
					abilityName.innerHTML = data.abilities[i].name;
				let abilityDetails = document.createElement('div');
					abilityDetails.classList.add('ability-details');
					abilityDetails.innerHTML = renderHighlights(data.abilities[i].details);
				
				// Add the ability type, name & details
				ability.appendChild(abilityType);
				ability.appendChild(abilityName);
				ability.appendChild(abilityDetails);
				abilityList.appendChild(ability);
		    }

			// Initialise ability switching
			switchAbility();
		})
		.catch(function(error) {
			console.log('Fetch error: ', error);
		});
	}

    // Reusable function to populate data
	function popData(data, name) {

		// Get the value & element
		const val = data[name];
		const el = document.getElementById('pop_' + name);
		if (el) {

			// Check if the value requires an icon
			if (['role', 'class', 'position', 'type', 'range'].includes(name)) {

				// Special case for positions with multiple values
				if (['position', 'type', 'range'].includes(name) && val.includes('&')) {
					const pos = val.split(' & ');
					el.innerHTML = pos.map(p => `<img src="../img/icons/${pos.toLowerCase()}.webp">${pos}`).join(' & ');
				} else {
					el.innerHTML = val.replace(val, `<img src="../img/icons/${val.toLowerCase()}.webp">${val}`);
				}

			// Otherwise, just populate the value
			} else {
				el.innerHTML = val;
			}
		}
    }

	// Reusable function to replace highlight tags
	function renderHighlights(text) {
		return text
		  .replace(/\[n\]/g, '<br><br>')
		  .replace(/\[(\w+)\]/g, '<span class="ability-$1">')
		  .replace(/\[\/\]/g, '</span>');
	  }
})();



/* ==========================================================================

    ZOOM IN IMAGE

========================================================================== */

(function() {
	zoom.addEventListener('click', function() {
		artContainer.classList.add('zoomed-in');
	});
	artContainer.addEventListener('click', function() {
		artContainer.classList.remove('zoomed-in');
	});
})();



/* ==========================================================================

    SWITCHING TAB

========================================================================== */

(function() {

	// Get all tab buttons and contents
	let tabButtons = document.querySelectorAll('.main-nav-item');
	let tabContents = document.querySelectorAll('.main-tab');

	// Add click event listener to each button to switch tabs
	tabButtons.forEach(function(button) {
		button.addEventListener('click', function() {
			let targetTab = button.getAttribute('data-tab');

			// Remove active class from all buttons and contents
			tabButtons.forEach(function(btn) {
				btn.classList.remove('active');
			});
			tabContents.forEach(function(content) {
				content.classList.remove('active');
			});

			// Add active class to the clicked button and corresponding content
			let targetContent = document.querySelector('.main-tab[data-tab="' + targetTab + '"]');
			if (targetContent) {
				button.classList.add('active');
				targetContent.classList.add('active');
			}
		});
	});
})();



/* ==========================================================================

    SWITCHING ABILITY

========================================================================== */

function switchAbility() {

	// Get all ability buttons and contents
	let abilityButtons = document.querySelectorAll('.ability-nav-item');
	let abilityContents = document.querySelectorAll('.ability-item');

	// Add click event listener to each button to switch abilitys
	abilityButtons.forEach(function(button) {
		button.addEventListener('click', function() {
			let targetTab = button.getAttribute('data-ability');

			// Remove active class from all buttons and contents
			abilityButtons.forEach(function(btn) {
				btn.classList.remove('active');
			});
			abilityContents.forEach(function(content) {
				content.classList.remove('active');
			});

			// Add active class to the clicked button and corresponding content
			let targetContent = document.querySelector('.ability-item[data-ability="' + targetTab + '"]');
			if (targetContent) {
				button.classList.add('active');
				targetContent.classList.add('active');
			}
		});
	});
}