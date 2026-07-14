/**
 * ============================================================================
 * CHARACTER
 * ============================================================================
 */
const Character = {
	alias: (new URLSearchParams(window.location.search).get('alias') ?? '').toLowerCase(),
	character: null,

	/**
     * Entry point.
     */
    async init() {
		if (!this.alias) return;
		this.cacheElements();
        await this.initCharacter();
		this.initTabSwitch('tab', 'nav-item', 'main-tab');
    },

	/**
	 * Cache all frequently used DOM elements to avoid repeated DOM lookups.
	 */
	cacheElements() {
		this.elements = {
			main:          document.querySelector('main'),
			artBastion:    document.getElementById('pop-art-bastion'),
			artBackground: document.getElementById('pop-art-background'),
			artBanner:     document.getElementById('pop-art-banner'),
			artCharacter:  document.getElementById('pop-art-character'),
			abilitiesList: document.getElementById('pop-abilities'),
			arrowPrev:     document.querySelector('.arrow-prev'),
			arrowNext:     document.querySelector('.arrow-next'),
			zoom:          document.querySelector('.zoom'),
		};
	},

	/**
	 * 
	 */
	async initCharacter() {
		try {
			this.character = await this.fetchData();
			this.elements.main.classList.add(`main-${this.alias}`);
			this.elements.main.classList.add(`main-${this.character.bastion_short}`);
			this.popTexts();
			this.popIcons();
			this.popArts();
			this.popAbilities();
		} catch (err) {
			console.error(err);
			return;
		}
	},

	/**
	 * 
	 */
	async fetchData() {
		const response = await fetch(`../data/characters/${this.alias}.json`);
		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
		const data = await response.json();
		return data; 
	},

	/**
	 * 
	 * 
	 * @param {string} name
	 */
	popTexts() {
		const texts = ['alias', 'name', 'title', 'lore'];
		texts.forEach(text => {
			const val = this.character[text];
			const el = document.getElementById(`pop-${text}`);
			if (el) el.innerHTML = val;
		});
    },

	/**
	 * 
	 * 
	 * @param {string} name
	 */
	popIcons() {
		const icons = ['role', 'class', 'position', 'type', 'range'];
		icons.forEach(icon => {
			const vals = this.character[icon];
			const el = document.getElementById(`pop-${icon}`);
			if (el) {
				vals.forEach(val => {
					el.innerHTML += `
						<img 
							src="../img/icons/${icon}-${val.toLowerCase()}.png" 
							class="side-icon-img" 
							alt="Position"
						>
					`;
				});
				el.innerHTML += `<div class="side-icon-label">${vals.join(', ')}</div>`;;
			}
		});
    },

	/**
	 * 
	 * 
	 */
	popArts() {
		this.elements.artBastion.src = `../img/bastions/${this.character.bastion_short}.png`;
		this.elements.artBackground.src = `../img/background/${this.character.bastion_short}.jpg`;
		this.elements.artBanner.src = `../img/banners/${this.alias}.jpg`;
		this.elements.artCharacter.src = `../img/characters/${this.alias}/full.png`;
		const config = this.character.config ?? {};
		const artCharacter = this.elements.artCharacter;

		// Character position
		if (config.char_height != null) {
			artCharacter.style.maxHeight = `calc(100vh + ${config.char_height}px)`;
		}
		if (config.char_left != null) {
			artCharacter.style.left = `${config.char_left}px`;
		}
		if (config.char_right != null) {
			artCharacter.style.right = `${config.char_right}px`;
		}

		// Transparent effect to avoid overlapping with content
		const hasLeft = config.char_mask_left != null;
		const hasRight = config.char_mask_right != null;
		if (hasLeft || hasRight) {
			const stops = [];
			if (hasLeft) {
				stops.push(`rgba(0,0,0,0) ${config.char_mask_left.left}%`, `rgba(0,0,0,1) ${config.char_mask_left.right}%`);
			}
			if (hasRight) {
				stops.push(`rgba(0,0,0,1) ${config.char_mask_right.left}%`, `rgba(0,0,0,0) ${config.char_mask_right.right}%`);
			}
			const maskImage = `linear-gradient(to right, ${stops.join(', ')})`;
			artCharacter.style.setProperty('mask-image', maskImage);
			artCharacter.style.setProperty('-webkit-mask-image', maskImage);
		}
	},

	/**
	 * 
	 * 
	 */
	popAbilities() {
		const abilityTypes = ['Passive', 'First Ability', 'Second Ability', 'Third Ability', 'Ultimate'];

		// Loop through the abilities
		this.character.abilities.forEach((ability, i) => {
			this.elements.abilitiesList.innerHTML += `
				<div class="ability-item ${i === 0 ? 'active' : ''}" data-ability="${abilityTypes[i]}">
					<div class="ability-type">${abilityTypes[i]}</div>
					<div class="ability-name">${ability.name}</div>
					<div class="ability-details">${this.renderHighlights(ability.details)}</div>
				</div>
			`;
			document.querySelector(`.ability-nav-item[data-ability="${abilityTypes[i]}"`).innerHTML = `
				<img 
					src="../img/characters/${this.alias}/ability-${i}.png" 
					class="ability-nav-img" 
					alt="${abilityTypes[i]}"
					onerror="this.style.display='none'"
				/>
			`;
		});

		// Initialise ability switching
		this.initTabSwitch('ability', 'ability-nav-item', 'ability-item');
	},

	/**
	 * Replace highlight tags.
	 * 
	 * @param {string} text
	 */
	renderHighlights(text) {
		return text
		.replace(/\[n\]/g, '<br><br>')
		.replace(/\[(\w+)\]/g, '<span class="ability-$1">')
		.replace(/\[\/\]/g, '</span>');
	},

	/**
	 * Handle the event to switch tab.
	 * 
	 * @param {string} key - tab|ability
	 * @param {string} buttonClass - class name (e.g. "nav-item")
	 * @param {string} contentClass - class name (e.g. "main-tab")
	 */
	initTabSwitch(key, buttonClass, contentClass) {
		const tabButtons = document.querySelectorAll(`.${buttonClass}`);
		const tabContents = document.querySelectorAll(`.${contentClass}`);
		tabButtons.forEach(button => {
			button.addEventListener('click',() => {
				const targetTab = button.getAttribute(`data-${key}`);

				// Remove active class from all buttons and contents
				tabButtons.forEach(btn => {
					btn.classList.remove('active');
				});
				tabContents.forEach(content => {
					content.classList.remove('active');
				});

				// Add active class to the clicked button and corresponding content
				const targetContent = document.querySelector(`.${contentClass}[data-${key}="${targetTab}"]`);
				if (targetContent) {
					button.classList.add('active');
					targetContent.classList.add('active');
				}
			});
		});
	},
};

/**
 * Initialise when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    Character.init();
});
