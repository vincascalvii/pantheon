/* ==========================================================================

	DECLARE RE-USABLE VARIABLES

========================================================================== */

const urlParams = new URLSearchParams(window.location.search);
let main = document.querySelector('main');
let artBastion = document.getElementById('pop_art_bastion');
let artBackground = document.getElementById('pop_art_background');
let artBanner = document.getElementById('pop_art_banner');
// let artContainer = document.querySelector('.main-art');
let artCharacter = document.getElementById('pop_art_character');
let zoom = document.querySelector('.zoom');
let abilitiesList = document.getElementById('pop_abilities');
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
			main.classList.add(`main-${alias}`);
			main.classList.add(`main-${data.bastion_short}`);

			// Setup navigation arrows
			// if (data.config?.prev_char !== undefined) {
			// 	arrowPrev.href = `../character?alias=${data.config.prev_char}`;
			// 	arrowPrev.classList.add('active');
			// }
			// if (data.config?.next_char !== undefined) {
			// 	arrowNext.href = `../character?alias=${data.config.next_char}`;
			// 	arrowNext.classList.add('active');
			// }

        	// Populate the data
			popData(data, 'alias');
			popData(data, 'bastion');
			popData(data, 'name');
            popData(data, 'title');
	    	popData(data, 'lore');
	    	// popData(data, 'role');
	    	// popData(data, 'class');
			// popData(data, 'position');
	    	// popData(data, 'type');
			// popData(data, 'range');

	    	// Populate the art
	    	artBastion.src = `../img/bastions/${data.bastion_short}.png`;
            artBackground.src = `../img/background/${data.bastion_short}.jpg`;
			artBanner.src = `../img/banners/${alias}.jpg`;
			artCharacter.src = `../img/characters/${alias}/full.png`;
			// if (data.config?.char_width !== undefined) 
			// 	artContainer.style.width = data.config.char_width + 'px';
			if (data.config?.char_height !== undefined) {
				artCharacter.style.maxHeight = `calc(100vh + ${data.config.char_height}px)`;
			}
			if (data.config?.char_left !== undefined) {
				artCharacter.style.left = `${data.config.char_left}px`;
			}
			if (data.config?.char_right !== undefined) {
				artCharacter.style.right = `${data.config.char_right}px`;
			}
			if (data.config?.char_mask_left !== undefined) {
				let maskImageLeft = `linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) ${data.config.char_mask_left}%)`;
				artCharacter.style.setProperty('mask-image', maskImageLeft);
				artCharacter.style.setProperty('-webkit-mask-image', maskImageLeft);
			}
			if (data.config?.char_mask_right !== undefined) {
				let maskImageRight = `linear-gradient(to right, rgba(0,0,0,1) 50%, rgba(0,0,0,0) ${data.config.char_mask_right}%)`;
				artCharacter.style.setProperty('mask-image', maskImageRight);
				artCharacter.style.setProperty('-webkit-mask-image', maskImageRight);
			}

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
				abilitiesList.appendChild(ability);
		    }

			// Initialise ability switching
			switchAbility();
		})
		.catch(error => console.log('Fetch error: ', error));
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
				if (['position', 'type', 'range'].includes(name) && val.includes('/')) {
					const pos = val.split(' / ');
					el.innerHTML = pos.map(p => `<img src="../img/icons/${name}-${p.toLowerCase()}.png" class="main-drow-icon">${p}`).join(' / ');
				} else {
					el.innerHTML = val.replace(val, `<img src="../img/icons/${name}-${val.toLowerCase()}.png" class="main-drow-icon">${val}`);
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

// (function() {
// 	zoom.addEventListener('click', function() {
// 		artContainer.classList.add('zoomed-in');
// 	});
// 	artContainer.addEventListener('click', function() {
// 		artContainer.classList.remove('zoomed-in');
// 	});
// })();



/* ==========================================================================

    SWITCHING TAB

========================================================================== */

(function() {

	// Get all tab buttons and contents
	let tabButtons = document.querySelectorAll('.nav-item');
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