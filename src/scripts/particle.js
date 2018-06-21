export default class Particle {
    constructor(coordinates, canvas) {
        this.speed = this.getRandomNumber(2, 3)
        this.radius = this.getRandomNumber(20, 70)

        this.setRandomColor()

        this.correctionCoordinates(coordinates, canvas)
        this.setPosition(coordinates.initialX, coordinates.initialY)
    }

    getRandomNumber(from, to) {
        const rnd = Math.random()
        return parseInt((rnd * (to - from)) + from)
    }

    setPosition(x, y) {
        this.x = x
        this.y = y
    }

    setRandomColor() {
        const rnd = Math.random()
        const hex = 0x1000000 + rnd * 0xffffff
        const color = hex.toString(16).substr(1, 6)
        this.color = ['#', color].join('')
    }

    correctionCoordinates(coordinates, canvas) {
        if (coordinates.initialX < this.radius)
            coordinates.initialX = this.radius
        if (coordinates.initialX + this.radius > canvas.width)
            coordinates.initialX = canvas.width - this.radius

        if (coordinates.initialY < this.radius)
            coordinates.initialY = this.radius
        if (coordinates.initialY + this.radius > canvas.height)
            coordinates.initialY = canvas.height - this.radius
    }
}
