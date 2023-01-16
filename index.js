let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')
let resetBtn = document.getElementById('reset')

const updateGame = (p1, p2) => {
    if(p1.health<=0) p1.health=0
    if(p2.health<=0) p2.health=0

    p1NameDiv.innerHTML = p1.name;
    p2NameDiv.innerHTML = p2.name;
    p1HealthDiv.innerHTML = p1.health;
    p2HealthDiv.innerHTML = p2.health;

    if (p1.health <= 0 || p2.health <= 0) {
        game.isOver = true;
        gameState = game.isOver;
        resultDiv.innerHTML = game.declareWinner(gameState, p1, p2)
    }
    return gameState
}

class Player {
    constructor(name, health, attackDamage) {
        this.name = name;
        this.health = health;
        this.attackDmg = attackDamage;
    }
    strike(player, enemy, attackDmg) {

        let damageAmount = Math.ceil(Math.random() * attackDmg)
        enemy.health -= damageAmount
        updateGame(p1, p2)
        return `${player.name} attacks ${enemy.name} for ${damageAmount}`

    }
    heal(player) {

        let hpAmount = Math.ceil(Math.random() * 5)
        player.health += hpAmount
        updateGame(p1, p2)
        return `${player.name} heals for ${hpAmount} HP`
    }
}

class Game {
    constructor() {
        this.isOver = false;
    }

    declareWinner(isOver, p1, p2) {
        let message;

        if (isOver == true && p1.health <= 0) {
            message = `${p2.name} WINS!`
        }
        else if (isOver == true && p2.health <= 0) {

            message = `${p1.name} WINS!`
        }
        document.getElementById('victory').play()
        return message
    }

    reset(p1, p2) {
        p1.health = 100
        p2.health = 100
        this.isOver = false
        resultDiv.innerHTML = ""
        updateGame(p1, p2)
    }

    play(p1, p2) {
        this.reset(p1, p2)
        while (p1.health > 0 && p2.health > 0) {
            p1.heal(p1)
            p2.heal(p2)
            p1.strike(p1, p2, p1.attackDmg)
            p2.strike(p2, p1, p2.attackDmg)
        }
        return this.declareWinner(this.isOver, p1, p2)
    }

}

let player1 = new Player('Ram', 100, 15)
let player2 = new Player('Rawan', 100, 15)

let p1 = player1;
let p2 = player2;

let game = new Game();

let gameState = game.isOver;

updateGame(p1, p2);



playButton.onclick = () => resultDiv.innerText = game.play(p1, p2);

resetBtn.onclick = () => game.reset(p1,p2)

document.addEventListener('keydown', function (e) {
    if (e.key == 's') {
        resultDiv.innerText = game.play(p1,p2)
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key == 'r') {
        game.reset(p1,p2)
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key == 'q' && p2.health > 0 && game.isOver == false) {
        p1.strike(p1, p2, p1.attackDmg)
        document.getElementById('p1attack').play()
    }
});

document.addEventListener('keydown', function (e) {

    if (e.key == 'a' && p1.health > 0 && game.isOver == false) {
        p1.heal(p1)
        document.getElementById('p1heal').play()
    }

});

document.addEventListener('keydown', function (e) {

    if (e.key == 'p' && p1.health > 0 && game.isOver == false) {
        p2.strike(p2, p1, p2.attackDmg)

        document.getElementById('p2attack').play()
    }

});

document.addEventListener('keydown', function (e) {
    if (e.key == 'l' && p2.health > 0 && game.isOver == false) {
        p2.heal(p2)
        document.getElementById('p2heal').play()
    }

});




