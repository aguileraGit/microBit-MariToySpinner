def plotAmpLEDs(currentAmp: number):
    global j
    j = 0
    while j < currentAmp:
        # currentAmp goes upto 10. There are only 5 LEDs. Divide by 2.
        led.plot(0, int(j / 2))
        j += 1

def on_button_pressed_a():
    global scaleValue
    # Button A increaes the scaling each time the button is pressed
    scaleValue = scaleValue + 1
    if scaleValue > 10:
        scaleValue = 2
        for index in range(5):
            led.unplot(0, index)
input.on_button_pressed(Button.A, on_button_pressed_a)

def plotDelayLEDs(currentDelay: number):
    global k
    k = 0
    while k < currentDelay:
        led.plot(4, int(k / 2))
        k += 1
def setScaling(pos: number, scaling: number):
    global motorSpeed
    if sinarray[pos] > 0:
        rotateCC()
    else:
        rotateCCW()
    motorSpeed = int(2 ** scaling * abs(sinarray[pos])) - 1
    if motorSpeed < 0:
        motorSpeed = 0
    pins.analog_write_pin(AnalogPin.P2, motorSpeed)

def on_button_pressed_b():
    global timeStep
    # Button B decreases the time step each time the button is pressed
    timeStep = timeStep - 1
    if timeStep < 0:
        timeStep = 10
        for index2 in range(5):
            led.unplot(4, index2)
input.on_button_pressed(Button.B, on_button_pressed_b)

def rotateCC():
    pins.digital_write_pin(DigitalPin.P0, 1)
    pins.digital_write_pin(DigitalPin.P1, 0)
def rotateCCW():
    pins.digital_write_pin(DigitalPin.P0, 0)
    pins.digital_write_pin(DigitalPin.P1, 1)
i = 0
motorSpeed = 0
k = 0
j = 0
sinarray: List[number] = []
scaleValue = 0
timeStep = 0
timeStep = 10
scaleValue = 2
pins.digital_write_pin(DigitalPin.P0, 0)
pins.digital_write_pin(DigitalPin.P1, 0)
pins.analog_write_pin(AnalogPin.P2, 0)
sinarray = [0,
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
    -0.1951]

def on_forever():
    global i
    setScaling(i, scaleValue)
    basic.pause(2 ** timeStep)
    plotAmpLEDs(scaleValue)
    plotDelayLEDs(timeStep)
    i = i + 1
    if i > len(sinarray):
        i = 0
basic.forever(on_forever)
