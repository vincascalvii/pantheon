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
        duraktharn: [
            {
                alias: 'Ironbound',
                name: 'Ar-Gon Tuta-Dam',
                title: 'the Iron Duke',
            },
            {
                alias: 'Soulforger',
                name: 'Kharra-Ryn Tuta-Dam',
                title: 'the Soul Forger',
            },
            {
                alias: 'Colossus',
                name: 'Dun-Can Tuta-Dam',
                title: 'the Immutable Shield',
            },
        ],
        shirohana: [
            {
                alias: 'Ninetails',
                name: 'Kimiko',
                title: 'the Nine Tails',
            },
            {
                alias: 'Wildfury',
                name: 'Byakko',
                title: 'the Striped Sage',
            },
            {
                alias: 'Stoneheart',
                name: 'Kuma',
                title: 'the Mountain Weight',
            },
            {
                alias: 'Nightprowler',
                name: 'Yui',
                title: 'the Night Prowler',
            },
        ],
        dragnoel: [
            {
                alias: 'Elderdrake',
                name: 'Velerias Draconis',
                title: 'the Woodland Mother',
            },
            {
                alias: 'Terradrake',
                name: 'Terros Draconis',
                title: 'the Earth Breaker',
            },
            {
                alias: 'Clouddrake',
                name: 'Zephyrus Draconis',
                title: 'the Cloud Splitter',
            },
            {
                alias: 'Oceandrake',
                name: 'Marinus Draconis',
                title: 'the Sea Keeper',
            },
            {
                alias: 'Cinderdrake',
                name: 'Ignis Draconis',
                title: 'the Ash Walker',
            },
            {
                alias: 'Stormdrake',
                name: 'Artorias Draconis',
                title: 'the Storm Bringer',
            },
        ],
        kragnok: [
            {
                alias: 'Thunderfell',
                name: 'Thorr',
                title: 'the Thunder Wielder',
            },
            {
                alias: 'Behemoth',
                name: 'Baal',
                title: 'the Unstoppable Juggernaut',
            },
        ],
        jotunheimr: [
            {
                alias: 'Snow',
                name: '___',
                title: '___',
            },
            {
                alias: 'Winter',
                name: 'Fenrir Vánagandr',
                title: 'the Northern Winter',
            },
        ],
        solzakar: [
            {
                alias: 'Sunbringer',
                name: 'Ra’sutekh',
                title: 'the Living Sun',
            },
            {
                alias: 'Scorpion',
                name: '___',
                title: '___',
            },
        ],
        chandrasar: [
            {
                alias: 'Moonpriest',
                name: 'Selene',
                title: 'the Lunar Seer',
            },
            {
                alias: 'Eclipse',
                name: 'Iyla',
                title: 'the Night Herald',
            },
        ],
        nagaithis: [
            {
                alias: 'Leviathan',
                name: 'Nakaraj Rakthanon',
                title: 'the Grand Cetacean',
            },
            {
                alias: 'Siren',
                name: 'Phraya Saranak',
                title: 'the Blue Whisper',
            },
        ],
        altharion: [
            {
                alias: 'Shadow',
                name: 'Grym',
                title: 'the Grim Reaper',
            },
            {
                alias: 'Reaper',
                name: 'Draevyn',
                title: 'the Chain Reaper',
            },
        ],
        eden: [
            {
                alias: 'Genesis',
                name: '___',
                title: '___',
            },
            {
                alias: 'Requiem',
                name: '___',
                title: '___',
            },
            {
                alias: 'Paradox',
                name: '___',
                title: '___',
            },
            {
                alias: 'Horizon',
                name: '___',
                title: '___',
            },
            {
                alias: 'Oracle',
                name: '___',
                title: '___',
            },
            {
                alias: 'Conqueror',
                name: 'Mars',
                title: 'the War God',
            },
        ],
        nether: [
            {
                alias: 'Chaos',
                name: '___',
                title: '___',
            },
            {
                alias: 'Nameless',
                name: '___',
                title: '___',
            },
            {
                alias: 'Calamity',
                name: '___',
                title: '___',
            },
            {
                alias: 'Ragnarok',
                name: '___',
                title: '___',
            },
            {
                alias: 'Miasma',
                name: '___',
                title: '___',
            },
            {
                alias: 'Crimson',
                name: 'Nocturne',
                title: 'the Blood Lord',
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
        this.initCarousels();
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
                <div class="blaze-slider char-bastion ${isActive}" data-bastion="${bastionRef}">
                    <div class="blaze-container">
                        <div class="blaze-track-container">
                            <div class="blaze-track">
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    },

    /**
	 * 
	 */
	initCharacters() {
        Object.entries(this.characters).forEach(([bastion, characters]) => {
            const bastionContainer = document.querySelector(`.char-bastion[data-bastion="${bastion}"] .blaze-track`);
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
    initCarousels() {
        document.querySelectorAll('.blaze-slider').forEach((el) => {
            new BlazeSlider(el, {
                all: {
                    loop: false,
                    draggable: true,
                    slidesToShow: 5,
                    slideGap: '0px',
                },
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