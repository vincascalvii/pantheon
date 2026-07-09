/**
 * ============================================================================
 * HOME
 * ============================================================================
 */
const Home = {
	bastions: [
        {
            name: 'Custodians',
            title: 'Protagonists',
        },
        {
            name: 'Everlight',
            title: 'the Dawn Bringers',
        },
        {
            name: 'Viridisia',
            title: 'the Verdant Guards',
        },
        {
            name: 'Huǒshén',
            ref: 'huoshen',
            title: 'the Ember Masters',
        },
        {
            name: 'Durak-Tharn',
            ref: 'duraktharn',
            title: 'the Hearth Forgers',
        },
        {
            name: 'Shirohana',
            title: 'the Blossom Keepers',
        },
        {
            name: 'Dragnoel',
            title: 'the Dragon Knights',
        },
        {
            name: 'Kragnok',
            title: 'the Thunder Mauls',
        },
        {
            name: 'Jötunheimr',
            ref: 'jotunheimr',
            title: 'the Frost Giants',
        },
        {
            name: 'Sol’zakar',
            ref: 'solzakar',
            title: 'the Sun Seekers',
        },
        {
            name: 'Chandrasar',
            title: 'the Moon Striders',
        },
        {
            name: 'Nagaithis',
            title: 'the Tide Callers',
        },
        {
            name: 'Altharion',
            title: 'the Dusk Blades',
        },
        {
            name: 'Eden',
            title: 'the Heavenly Sovereigns',
        },
        {
            name: 'Nether',
            title: 'the Hellish Monarchs',
        },
    ],
	characters: {
        custodians: [
            {
                alias: 'Oblivion',
                name: 'Arcian Truthsteel',
                title: 'the Abyssal Demon',
            },
            {
                alias: 'Justice',
                name: 'Cyrus Lightbearer',
                title: 'the Living Tribunal',
            },
            {
                alias: 'Sentinel',
                name: 'Xenon Skyforge',
                title: 'the Faithful Sentinel',
            },
        ],
        everlight: [
            {
                alias: 'Elementalist',
                name: 'Ciarra Crownsworth',
                title: 'the Elemental Master',
            },
            {
                alias: 'Emberheart',
                name: 'Eris Flameheart',
                title: 'the Elemental Master',
            },
            {
                alias: 'Valkyrie',
                name: 'Clair Wyvernsworn',
                title: 'the Silver Valkyrie',
            },
            {
                alias: 'Imperator',
                name: 'Everett Wyvernsworn',
                title: 'the Golden Sentry',
            },
            {
                alias: 'Bastionne',
                name: 'Eleanor Vance',
                title: 'the Horizon Breaker',
            },
        ],
        viridisia: [
            {
                alias: 'Windwalker',
                name: 'Kiannah Ilicyne',
                title: 'the Wind Walker',
            },
            {
                alias: 'Skypiercer',
                name: 'Kaelen Virgwyn',
                title: 'the Sky Piercer',
            },
        ],
        huoshen: [
            {
                alias: 'Phoenix',
                name: 'Huǒ Fèngyīng',
                title: 'the Origin Flame',
            },
            {
                alias: 'Everflame',
                name: 'Huǒ Wǔjiàng',
                title: 'the Undying Flame',
            },
        ],
    },

	/**
     * Entry point.
     */
    async init() {
        this.cacheElements();
        if (!this.bastionsContainer || !this.charactersContainer) return;
        this.initBastions();
        this.initCharacters();
        this.initBastionSwitch();
    },

    /**
	 * Cache all frequently used DOM elements to avoid repeated DOM lookups.
	 */
	cacheElements() {
		this.bastionsContainer = document.getElementById('pop-bastions');
        this.charactersContainer = document.getElementById('pop-characters');
	},

    /**
	 * 
	 */
	initBastions() {
        this.bastions.forEach(bastion => {
            const bastionRef = bastion.ref ?? bastion.name.toLowerCase();
            const isActive = bastionRef === 'everlight' ? 'active' : '';
            this.bastionsContainer.innerHTML += `
                <div class="bastion ${isActive}" data-bastion="${bastionRef}">
                    <img src="img/bastions/${bastionRef}.png" class="bastion-logo" alt="${bastion.name}">
                    <div class="bastion-label">
                        <div class="bastion-name">${bastion.name}</div>
                        <div class="bastion-title">${bastion.title}</div>
                    </div>
                </div>
            `;
            this.charactersContainer.innerHTML += `
                <div class="char-bastion ${isActive}" data-bastion="${bastionRef}"></div>
            `;
        });
    },

    /**
	 * 
	 */
	initCharacters() {
        Object.entries(this.characters).forEach(([bastion, characters]) => {
            const bastionContainer = document.querySelector(`.char-bastion[data-bastion="${bastion}"]`);
            characters.forEach(character => {
                const aliasRef = character.alias.toLowerCase();
                bastionContainer.innerHTML += `
                    <a href="character?alias=${aliasRef}" class="char-block">
                        <div class="char-img">
                            <img 
                                src="img/characters/${aliasRef}/thumb.png" 
                                alt="${character.name}" 
                                onerror="this.style.visibility='hidden'"
                            />
                        </div>
                        <div class="char-info">
                            <div class="char-alias">${character.alias}</div>
                            <div class="char-name">${character.name}</div>
                            <div class="char-title">${character.title}</div>
                        </div>
                    </a>
                `;
            });
        });
    },

    /**
	 * 
	 */
	initBastionSwitch() {
        const bastions = document.querySelectorAll('.bastion');
        const displays = document.querySelectorAll('.char-bastion');
        bastions.forEach(bastion => {
            bastion.addEventListener('click', () => {
                bastions.forEach(bastion => bastion.classList.remove('active'));
                displays.forEach(display => display.classList.remove('active'));
                bastion.classList.add('active');
                document.querySelector(`.char-bastion[data-bastion="${bastion.dataset.bastion}"]`).classList.add('active');
            });
        });
    },
};

/**
 * Initialise when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    Home.init();
});

    


// 				{
// 					name: "Ninetails",
// 					bastion: "shirohana",
// 				},
// 				{
// 					name: "Wildfury",
// 					bastion: "shirohana",
// 				},
// 				{
// 					name: "Stoneheart",
// 					bastion: "shirohana",
// 				},
// 				{
// 					name: "Nightprowler",
// 					bastion: "shirohana",
// 				},
// 				{
// 					name: "Elderdrake",
// 					bastion: "dragnoel",
// 				},
// 				{
// 					name: "Terradrake",
// 					bastion: "dragnoel",
// 				},
// 				{
// 					name: "Clouddrake",
// 					bastion: "dragnoel",
// 				},
// 				{
// 					name: "Oceandrake",
// 					bastion: "dragnoel",
// 				},
// 				{
// 					name: "Cinderdrake",
// 					bastion: "dragnoel",
// 				},
// 				{
// 					name: "Stormdrake",
// 					bastion: "dragnoel",
// 				},
// 				{
// 					name: "Soulforger",
// 					bastion: "duraktharn",
// 				},
// 				{
// 					name: "Ironbound",
// 					bastion: "duraktharn",
// 				},
// 				{
// 					name: "Colossus",
// 					bastion: "duraktharn",
// 				},
// 				{
// 					name: "Thunderfell",
// 					bastion: "kragnok",
// 				},
// 				{
// 					name: "Behemoth",
// 					bastion: "kragnok",
// 				},
// 				// {
// 				// 	name: "Snow",
// 				// 	bastion: "jotunheimr",
// 				// 	disabled: true,
// 				// },
// 				{
// 					name: "Frostguard",
// 					bastion: "jotunheimr",
// 				},
// 				{
// 					name: "Sunbringer",
// 					bastion: "solzakar",
// 				},
// 				// {
// 				// 	name: "Scorpion",
// 				// 	bastion: "solzakar",
// 				// 	disabled: true,
// 				// },
// 				{
// 					name: "Moonpriest",
// 					bastion: "chandrasar",
// 				},
// 				{
// 					name: "Eclipse",
// 					bastion: "chandrasar",
// 				},
// 				{
// 					name: "Leviathan",
// 					bastion: "nagaithis",
// 				},
// 				{
// 					name: "Siren",
// 					bastion: "nagaithis",
// 				},
// 				{
// 					name: "Shadow",
// 					bastion: "altharion",
// 				},
// 				{
// 					name: "Chainreaper",
// 					bastion: "altharion",
// 				},
// 				// {
// 				// 	name: "Genesis",
// 				// 	bastion: "eden",
// 				// 	disabled: true,
// 				// },
// 				// {
// 				// 	name: "Requiem",
// 				// 	bastion: "eden",
// 				// 	disabled: true,
// 				// },
// 				// {
// 				// 	name: "Paradox",
// 				// 	bastion: "eden",
// 				// 	disabled: true,
// 				// },
// 				// {
// 				// 	name: "Horizon",
// 				// 	bastion: "eden",
// 				// 	disabled: true,
// 				// },
// 				// {
// 				// 	name: "Oracle",
// 				// 	bastion: "eden",
// 				// 	disabled: true,
// 				// },
// 				{
// 					name: "Conqueror",
// 					bastion: "eden",
// 				},
// 				// {
// 				// 	name: "Chaos",
// 				// 	bastion: "nether",
// 				// 	disabled: true,
// 				// },
// 				// {
// 				// 	name: "Nameless",
// 				// 	bastion: "nether",
// 				// 	disabled: true,
// 				// },
// 				// {
// 				// 	name: "Calamity",
// 				// 	bastion: "nether",
// 				// 	disabled: true,
// 				// },
// 				// {
// 				// 	name: "Ragnarok",
// 				// 	bastion: "nether",
// 				// 	disabled: true,
// 				// },
// 				// {
// 				// 	name: "Miasma",
// 				// 	bastion: "nether",
// 				// 	disabled: true,
// 				// },
// 				{
// 					name: "Crimson",
// 					bastion: "nether",
// 				},
// 			];