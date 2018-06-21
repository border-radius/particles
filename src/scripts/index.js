import Particle from './particle'

const particles = []
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const baseScreenSize = 1366 * 662
let currentScreenSize = window.innerHeight * window.innerWidth

document.addEventListener('click', event => {
    const coordinates = {};
    coordinates.initialX = event.clientX
    coordinates.initialY = event.clientY

    particles.push(new Particle(coordinates, canvas))
})

window.addEventListener('resize', resizeCanvas, false)

const timeout = 1000 / 60
const interval = setInterval(redraw, timeout)
resizeCanvas()

function redraw() {
    particles.forEach(particle => {
        const to = particle.speed * getCurrentSpeed(particle)
        const from = to * -1
        const prevX = particle.x
        const prevY = particle.y

        let dx = particle.getRandomNumber(from, to)
        let dy = particle.getRandomNumber(from, to)

        if ((prevX + dx + particle.radius > canvas.width) || prevX + dx < particle.radius) {
            dx = -dx
        }
        if ((prevY + dy + particle.radius > canvas.height) || prevY + dy < particle.radius) {
            dy = -dy
        }

        const nextX = prevX + dx
        const nextY = prevY + dy

        particle.setPosition(nextX, nextY)
    });

    context.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < particles.length; i++) {
        context.beginPath()
        context.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2)
        context.fillStyle = particles[i].color
        context.fill()
    }

}

function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    currentScreenSize = window.innerWidth * window.innerHeight
    redraw()
}

function getCurrentSpeed(particle) {
    let ratio = baseScreenSize / currentScreenSize + 1

    return parseInt(ratio)
}