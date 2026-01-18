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
	let charCode = urlParams.get('code').toLowerCase();

	// If the value is not empty or null, fetch the JSON file
	if (charCode != '' && charCode != null) {
		fetch('../data/characters/' + charCode + '.json')
		.then(res => {
			if (!res.ok) throw new Error('HTTP error ' + res.status);
	        return res.json();
	    })
		.then(data => {

			// Add unique code on the container
			main.classList.add('main-' + data.code.toLowerCase());
			main.classList.add('main-' + data.bastion_short.toLowerCase());

			// Setup navigation arrows
			if (data.config?.prev_char !== undefined) {
				arrowPrev.href = '../character?code=' + data.config.prev_char;
				arrowPrev.classList.add('active');
			}
			if (data.config?.next_char !== undefined) {
				arrowNext.href = '../character?code=' + data.config.next_char;
				arrowNext.classList.add('active');
			}

        	// Populate the data
			popData(data, 'full_name');
	    	popData(data, 'title');
	    	popData(data, 'bastion_full');
	    	popData(data, 'race');
	    	popData(data, 'soulforge');
	    	popData(data, 'resonance');
			popData(data, 'intro');

	    	// Populate the art
	    	bastion.src = '../img/bastions/' + data.bastion_short + '.png';
			artBg.src = '../img/' + (
				data.config?.background === true 
					? 'characters/' + charCode + '/bg.png' 
					: 'background/' + data.bastion_short + '.png'
				);
			artChar.src = '../img/characters/' + charCode + '/full.png';
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
					abilityDetails.innerHTML = data.abilities[i].details;
				
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
		let val = data[name];
		let els = document.querySelectorAll('.pop-' + name.replace(/_+/g, '-').toLowerCase());
		for ( let i = 0; i < els.length; i++ ) {
			els[i].innerHTML = val;
		}
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