class Entity{
    constructor(name, health){
        this.name = name;
        this.health = health;
        this.domObject = null;
    }
    modifyHealth(amount){
        this.health = this.health + amount;
        this.domObject.querySelector('h4').innerText = this.health;
    }
}

class Hero extends Entity{
    constructor(name, health){
        super(name, health);
    }
}

class Game {
    constructor(){
        this.gameContainer = document.querySelector('.main-container'); // Holds the main container that will hold every companion container
        this.heroList = [{name: "darren", health: 32}, {name: 'scathassia',health: 34}, {name: "heathenmoore", health: 40,},{name: "arcanas", health: 32} ,{name: 'nascha', health: 36},{name: 'briar', health: 32},{name: 'gwendolyn', health: 32},{name: 'jugolach', health: 30}];
        this.modal = document.querySelector('.modal'); // Modal that lets you select which Hero you will use
        this.overlay = document.querySelector('.overlay'); //Overlay for modal
        this.customBtn = document.querySelector('.custom-button');
        this.customModal = document.querySelector('.custom-modal')
        this.playerList = [];
        this.gameContainer.querySelector('.add-hero-button').addEventListener('click', ()=> this.openHeroSelection());
        this.gameContainer.querySelector('.settings-button').addEventListener('click', ()=> this.openHeroSelection());
        this.modal.querySelectorAll('.modal-hero-button').forEach(element => { 
            element.addEventListener('click', ()=> {
                if(!element.classList.contains('disabled')){
                    this.addHero(this.heroList[element.dataset.hero])
                    element.classList.add('disabled');
                }
            });
        })
        this.customBtn.addEventListener('click', ()=> this.openCustomMenu())
        this.overlay.addEventListener('click', () => {
            if(this.modal.classList.contains('active'))
            this.modal.classList.remove('active');
            if(this.overlay.classList.contains('active'))
            this.overlay.classList.remove('active');
            if(this.customModal.classList.contains('active'))
            this.customModal.classList.remove('active');
            
    })
    }

    addHero(hero){//creates all containers and dom items for the specific hero and saves it to the playerList
        const heroContainer = document.createElement('section');
        const healthH3 = document.createElement('h4');
        const buttonContainer = document.createElement('section');
        const minusBtn = document.createElement('section');
        const plusBtn = document.createElement('section');

        minusBtn.classList.add('minus-section');
        plusBtn.classList.add('plus-section');

        healthH3.innerText = hero.health;
        healthH3.classList.add('health-text')

        heroContainer.appendChild(healthH3);
        heroContainer.appendChild(buttonContainer);

        heroContainer.classList.add('hero-container');
        heroContainer.classList.add('flex');
        heroContainer.classList.add(`${hero.name}`);

        buttonContainer.appendChild(minusBtn);
        buttonContainer.appendChild(plusBtn);

        buttonContainer.classList.add('button-container');
        

        let heroObject = new Hero(hero.name, hero.health);
        heroObject.domObject = heroContainer;
        minusBtn.addEventListener('click', () => heroObject.modifyHealth(-1));
        plusBtn.addEventListener('click', () => heroObject.modifyHealth(1));



        this.gameContainer.insertBefore(heroObject.domObject,this.gameContainer.firstChild);
        this.playerList.push(heroObject);
        this.modal.classList.remove('active');
        this.overlay.classList.remove('active');
    }
    openHeroSelection(){
        this.toggleModal();
        this.toggleOverlay();
    }
    toggleModal(){
        this.modal.classList.toggle('active');
    }
    toggleOverlay(){
        this.overlay.classList.toggle('active');
    }
    openCustomMenu(){
        this.toggleModal();
        this.customModal.classList.add('active');
    }

    
}
let game = new Game();