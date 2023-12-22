input.onButtonPressed(Button.A, function () {
    // Button A increaes the scaling each time the button is pressed
    scaleValue = scaleValue + 1
    if (scaleValue > 10) {
        scaleValue = 2
    }
})
function setScaling (pos: number, scaling: number) {
    if (sinarray[pos] > 0) {
        rotateCC()
    } else {
        rotateCCW()
    }
    motorSpeed = Math.trunc(2 ** scaling * Math.abs(sinarray[pos])) - 1
    if (motorSpeed < 0) {
        motorSpeed = 0
    }
    pins.analogWritePin(AnalogPin.P2, motorSpeed)
}
input.onButtonPressed(Button.B, function () {
    // Button B decreases the time step each time the button is pressed
    timeStep = timeStep - 1
    if (timeStep < 0) {
        timeStep = 10
    }
})
function rotateCC () {
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.digitalWritePin(DigitalPin.P1, 0)
}
function rotateCCW () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P1, 1)
}
let i = 0
let motorSpeed = 0
let sinarray: number[] = []
let scaleValue = 0
let timeStep = 0
timeStep = 10
scaleValue = 2
pins.digitalWritePin(DigitalPin.P0, 0)
pins.digitalWritePin(DigitalPin.P1, 0)
pins.analogWritePin(AnalogPin.P2, 0)
sinarray = [
0,
0.1951,
0.3827,
0.5556,
0.7071,
0.8315,
0.9239,
0.9808,
1,
0.9808,
0.9239,
0.8315,
0.7071,
0.5556,
0.3827,
0.1951,
0,
-0.1951,
-0.3827,
-0.5556,
-0.7071,
-0.8315,
-0.9239,
-0.9808,
-1,
-0.9808,
-0.9239,
-0.8315,
-0.7071,
-0.5556,
-0.3827,
-0.1951
]
basic.forever(function () {
    setScaling(i, scaleValue)
    basic.pause(2 ** timeStep)
    i = i + 1
    if (i > sinarray.length) {
        i = 0
    }
})
