input.onButtonPressed(Button.A, function () {
    if (dir) {
        rotateCC()
    } else {
        rotateCCW()
    }
    dir = !(dir)
})
input.onButtonPressed(Button.B, function () {
    speed += speed + 1
    if (speed > 10) {
        speed = 0
    }
    pins.analogWritePin(AnalogPin.P2, 2 ** speed)
})
function rotateCC () {
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P1, 0)
}
function rotateCCW () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P0, 1)
}
let speed = 0
let dir = false
pins.digitalWritePin(DigitalPin.P0, 1)
pins.digitalWritePin(DigitalPin.P1, 0)
pins.analogWritePin(AnalogPin.P2, 0)
dir = false
speed = 5
basic.forever(function () {
	
})
