export default class Particle {
    constructor(initialX, initialY) {
        // В качестве упрощения принимаем то, что пользователь не ресайзит экран
        // Все частицы создаются в layout одинакого размера
        // При изменении размеров экрана ранее созданные частицы не пересчитывают свое положение и скорость движения
        this.screeSize = this.getScreenSize()

        this.speed = this.getRandomNumber(10, 20) * this.getParticleSpeedRatio()

        this.el = document.createElement('div')
        this.el.style.position = 'absolute'
        this.el.style.transition = 'all 0.1s ease 0s'
        this.el.style['border-radius'] = '50%'

        document.body.appendChild(this.el)

        this.particleSize = this.setRandomSize()
        this.setPosition(initialX, initialY)
        this.setRandomColor()
        this.startBrownianMotion()
    }

    getScreenSize() {
        const screen = document.documentElement;

        return {
            screenWidth: screen.clientWidth,
            screenHeight: screen.clientHeight,
        }
    }

    /**
     * Есть вариант написать по другому
     * Например передавать сюда только value и возвращать функцию с correctBy
     * тем самым сделать несколько методов корректировки в дальнейшем, но остановлюсь на этом
     * @param {number} value
     * @param {number} correctBy - параметр для корректировки. Ширина или Высота экрана
     * @returns {*}
     */
    correctPosition(value, correctBy) {
        if (value < 0) return 0

        if (value + this.particleSize > correctBy) {
            return correctBy - this.particleSize
        }

        return value
    }

    /*
     * Примем скорость на 4к экране размера 4096*3072 равной 1
     * Тогда коэфициент изменения скорости на экранах других размеров будет равен
     * 4096*3072 / (screenWidth * screenHeight)
     */
    getParticleSpeedRatio() {
        return Math.round(4096 * 3072 / (this.screeSize.screenWidth * this.screeSize.screenHeight))
    }

    getRandomNumber(from, to) {
        const rnd = Math.random()
        return parseInt((rnd * (to - from)) + from)
    }

    setRandomColor() {
        const rnd = Math.random()
        const hex = 0x1000000 + rnd * 0xffffff
        const color = hex.toString(16).substr(1, 6)
        this.el.style.background = ['#', color].join('')
    }

    getPixels(property) {
        const value = this.el.style[property]
        return parseInt(value)
    }

    setPixels(property, value) {
        this.el.style[property] = [value, 'px'].join('')
    }

    setRandomSize() {
        const side = this.getRandomNumber(20, 70)

        this.setPixels('width', side)
        this.setPixels('height', side)

        return side
    }

    getPositionX() {
        return this.getPixels('left')
    }

    getPositionY() {
        return this.getPixels('top')
    }

    setPosition(x, y) {
        this.setPixels('left', x)
        this.setPixels('top', y)
    }

    moveRandomly() {
        const to = parseInt(this.speed / 2)
        const from = to * -1
        const prevX = this.getPositionX()
        const prevY = this.getPositionY()
        const nextX = prevX + this.getRandomNumber(from, to)
        const nextY = prevY + this.getRandomNumber(from, to)
        this.setPosition(
            this.correctPosition(nextX, this.screeSize.screenWidth),
            this.correctPosition(nextY, this.screeSize.screenHeight)
        )

        /*
        * По оптимизации от лагов совсем не уверен но в целом думаю что можно было бы сделать так
        * requestAnimationFrame(() => this.moveRandomly())
        * Дополнительно можно ограничить FPS через setTimeout
        * Тогда в вызове startBrownianMotion() можно убрать setInterval
        * И вызвать просто () => this.moveRandomly()
        * По идее это должно увеличить производительность анимаций
        * Но к сожалению совсем не уверен :) Каких-то значимых приростов,
        * которые можно было бы описать тестами не увидел. Поэтому оставлю это просто как идею)
        */
    }

    startBrownianMotion() {

        const timeout = 100

        const interval = setInterval(this.moveRandomly.bind(this), timeout)

    }
}
