# Arduino Masterclass --- Theory & Teaching Notes

## Beginner-Friendly Reference for First-Year ENTC and Instrumentation Students

**Duration:** 60-minute introductory workshop\
**Board used in examples:** Classic Arduino Uno R3 with ATmega328P\
**Audience:** Beginners with no prior electronics knowledge

This document contains the masterclass theory, key explanations, wiring
references, code examples, and practical notes. It is intended to
accompany the animated React presentation and can also serve as a
student handout.

------------------------------------------------------------------------

# 1. What Is Arduino?

Arduino is an open-source electronics platform that makes it easier to
build interactive electronic systems. It includes development boards,
software tools, and libraries.

-   **Hardware:** The physical board, microcontroller, sensors, and
    other components.
-   **Software:** Tools such as Arduino IDE used to write and upload
    programs.
-   **Sketch:** The program written for an Arduino board.
-   **Library:** Reusable code that simplifies working with devices such
    as LCDs and servos.

Arduino is not one particular chip. Different Arduino boards use
different microcontrollers.

## 1.1 What is a microcontroller?

A microcontroller is a compact computer built into a single integrated
circuit. It typically contains:

-   **CPU:** Executes instructions.
-   **Flash memory:** Stores the program.
-   **SRAM:** Holds variables and temporary data while the program runs.
-   **EEPROM:** Stores small amounts of data that should remain after
    power is removed.
-   **GPIO:** General-purpose input/output pins.
-   **Peripherals:** Timers, counters, ADCs, and communication
    interfaces.

## 1.2 Input → Process → Output

Most beginner Arduino projects follow this pattern:

1.  **Input:** A sensor measures something or a button is pressed.
2.  **Process:** The microcontroller executes programmed instructions.
3.  **Output:** An LED, buzzer, display, servo, or other device
    responds.

Examples:

-   LDR detects darkness → Arduino checks a threshold → LED turns on.
-   Ultrasonic sensor measures distance → Arduino checks proximity →
    buzzer sounds.
-   Thermistor measures temperature indirectly → Arduino estimates
    temperature → LCD displays it.

## 1.3 Where is Arduino used?

-   Robotics and automation prototypes
-   Home automation
-   Environmental monitoring
-   Educational electronics
-   Smart agriculture
-   Data acquisition
-   IoT prototypes
-   Instrumentation demonstrations

------------------------------------------------------------------------

# 2. Arduino Uno R3 and ATmega328P

The classic Arduino Uno R3 uses the ATmega328P, an 8-bit AVR
microcontroller.

  Specification                                    Classic Uno R3
  ------------------------------------------------ --------------------------
  Microcontroller                                  ATmega328P
  Architecture                                     8-bit AVR
  Clock speed                                      16 MHz
  Flash                                            32 KB
  SRAM                                             2 KB
  EEPROM                                           1 KB
  Digital I/O                                      14 pins, D0--D13
  Analog input channels                            6, A0--A5
  PWM-capable digital pins                         D3, D5, D6, D9, D10, D11
  Logic/supply reference used in common examples   5 V

These specifications apply to the classic Uno R3, not every
Arduino-branded board.

## 2.1 Important board parts

-   **ATmega328P:** Runs the uploaded program.
-   **USB connector:** Used for programming, serial communication, and
    often board power.
-   **DC power jack:** Alternative input power connector.
-   **Voltage regulator:** Regulates an input supply for the board.
-   **Digital pins:** Read or output digital signals.
-   **Analog pins:** Measure analog voltages through the ADC.
-   **Power header:** Includes 5V, 3.3V, GND, VIN, and related pins.
-   **RESET button:** Restarts program execution.
-   **Clock source:** Provides the timing reference for the
    microcontroller.
-   **Built-in LED:** Typically connected to D13 on the classic Uno R3.
-   **USB-to-serial interface:** Helps the computer communicate with the
    microcontroller.

## 2.2 Memory types

-   **Flash:** Holds the uploaded program even when power is removed.
-   **SRAM:** Holds variables while the program is running; its contents
    are lost when power is removed.
-   **EEPROM:** Can preserve small amounts of data between power cycles.

## 2.3 What happens when code is uploaded?

1.  The user writes a sketch in Arduino IDE.
2.  The IDE compiles the sketch.
3.  The source code is converted into machine instructions.
4.  The compiled program is uploaded over USB using the board's
    bootloader.
5.  The microcontroller executes the program.

## 2.4 Arduino IDE workflow

1.  Connect the board using a data-capable USB cable.
2.  Select the correct board.
3.  Select the correct serial port.
4.  Click Verify to compile.
5.  Click Upload.
6.  Open Serial Monitor when debugging sensor readings.
7.  Match the Serial Monitor baud rate to the value used in
    `Serial.begin()`.

------------------------------------------------------------------------

# 3. Electronics Fundamentals

## 3.1 Voltage, current, resistance, and power

  Quantity     Meaning                           Unit
  ------------ --------------------------------- ------------
  Voltage      Electrical potential difference   Volt (V)
  Current      Flow of electric charge           Ampere (A)
  Resistance   Opposition to current flow        Ohm (Ω)
  Power        Rate of energy transfer           Watt (W)

A water-flow analogy can help beginners: voltage is similar to pressure,
current to flow rate, and resistance to an obstruction. This is only an
analogy; electrical circuits have behaviours that water systems do not.

### Ohm's law

\[ V = I R \]

Rearranged:

\[ I = `\frac{V}{R}`{=tex}, `\qquad `{=tex}R = `\frac{V}{I}`{=tex} \]

### Electrical power

\[ P = V I = I\^2R = `\frac{V^2}{R}`{=tex} \]

## 3.2 LED resistor example

Assume: - Supply voltage = 5 V - LED forward voltage = 2 V - Series
resistor = 220 Ω

Voltage across the resistor:

\[ V_R = 5 - 2 = 3`\text{ V}`{=tex} \]

Current:

\[ I = `\frac{3}{220}`{=tex} `\approx 0.0136`{=tex}`\text{ A}`{=tex} =
13.6`\text{ mA}`{=tex} \]

This is an illustrative calculation. Actual LED forward voltage depends
on its type and colour.

## 3.3 Ground

GND is the circuit's common voltage reference. Components connected to
the same signal circuit normally need a shared reference.

Ground does not automatically mean a connection to the building's earth.

## 3.4 GPIO safety

GPIO pins are intended for signals, not unlimited power.

-   Do not short 5V directly to GND.
-   Do not apply a voltage above a pin's rating.
-   Do not power motors directly from GPIO pins.
-   A design target around 20 mA per GPIO is a useful conservative
    guideline, not a guarantee that every pin can continuously supply
    that current in every condition.
-   Check device and board datasheets for voltage and current limits.

------------------------------------------------------------------------

# 4. Breadboards and Wiring

## 4.1 How a solderless breadboard works

-   Groups of holes in the terminal area are electrically connected
    internally.
-   The centre trench separates the two terminal groups.
-   Power rails distribute supply voltage and ground.
-   Some power rails are split partway along the board.
-   The breadboard's exact internal connection pattern should be checked
    before wiring.

## 4.2 Common labels

-   **VCC/VDD:** Positive supply connection, depending on the device.
-   **GND:** Ground reference.
-   **SIG/OUT:** Signal output.
-   **VIN:** Input supply pin on a board.
-   **SDA/SCL:** I²C data and clock.
-   **TX/RX:** Serial transmit and receive.
-   **NO/NC/COM:** Normally open, normally closed, and common contacts
    on a relay.

## 4.3 Wiring checklist

1.  Disconnect power before changing connections.
2.  Check the component's voltage requirements.
3.  Confirm pin names and polarity.
4.  Ensure the sensor and Arduino share GND when required.
5.  Add a current-limiting resistor to a bare LED.
6.  Verify the wiring against the code's pin numbers.
7.  Power the circuit only after checking for shorts.

------------------------------------------------------------------------

# 5. Digital, Analog, and PWM

These are different ways for the microcontroller to receive or generate
signals.

## 5.1 Digital input/output

Digital signals represent discrete states, commonly LOW and HIGH.

-   `pinMode(pin, OUTPUT)` configures a pin as an output.
-   `digitalWrite(pin, HIGH)` drives a digital output HIGH.
-   `digitalWrite(pin, LOW)` drives a digital output LOW.
-   `pinMode(pin, INPUT)` configures a pin as an input.
-   `digitalRead(pin)` reads a digital input as HIGH or LOW.

Example:

``` cpp
const int ledPin = 8;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  digitalWrite(ledPin, HIGH);
  delay(1000);

  digitalWrite(ledPin, LOW);
  delay(1000);
}
```

## 5.2 Digital input using INPUT_PULLUP

The internal pull-up resistor holds the input HIGH when the button is
open. A button wired between the pin and GND pulls the input LOW when
pressed.

``` cpp
const int buttonPin = 2;
const int ledPin = 8;

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
}
```

Wiring: button between D2 and GND; LED circuit connected to D8 through a
suitable resistor.

## 5.3 Analog input and the ADC

An analog voltage can vary continuously. The Uno R3's 10-bit ADC
converts the measured voltage into a digital number.

Typical `analogRead()` result:

\[ 0 `\text{ to }`{=tex} 1023 \]

Assuming a 5 V ADC reference:

\[ V\_{`\text{in}`{=tex}}
`\approx `{=tex}`\frac{\text{ADC reading}}{1023}`{=tex}`\times 5`{=tex}
\]

For example, a reading of 512 corresponds to approximately 2.50 V with a
5 V reference.

The actual result depends on the reference voltage and electrical
conditions.

``` cpp
const int sensorPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(sensorPin);
  float voltage = value * (5.0 / 1023.0);

  Serial.print("ADC: ");
  Serial.print(value);
  Serial.print(" | Voltage: ");
  Serial.println(voltage, 2);

  delay(500);
}
```

## 5.4 PWM --- Pulse Width Modulation

PWM rapidly switches a digital output between LOW and HIGH. Changing the
fraction of time spent HIGH changes its duty cycle.

On the classic Uno R3, PWM-capable pins are:

**D3, D5, D6, D9, D10, D11**

`analogWrite()` uses values from 0 to 255 on these pins. It produces a
PWM waveform, not a true steady analog voltage.

-   0: approximately 0% duty cycle.
-   128: approximately 50% duty cycle.
-   255: approximately 100% duty cycle.

For a 5 V PWM signal, the ideal average voltage is approximately duty
cycle × 5 V. This does not mean the pin produces that steady voltage.

Example:

``` cpp
const int ledPin = 9;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  for (int value = 0; value <= 255; value++) {
    analogWrite(ledPin, value);
    delay(10);
  }

  for (int value = 255; value >= 0; value--) {
    analogWrite(ledPin, value);
    delay(10);
  }
}
```

## 5.5 Other useful pins on the classic Uno R3

-   D0 (RX) and D1 (TX): hardware serial.
-   D2 and D3: external interrupt support on the ATmega328P.
-   D10--D13: SPI-related functions, including SS, MOSI, MISO, and SCK.
-   A4 (SDA) and A5 (SCL): I²C on the classic Uno R3.
-   D13: SPI SCK and built-in LED connection on the classic Uno R3.

Pins can have multiple functions. Check for conflicts when combining
components.

------------------------------------------------------------------------

# 6. Arduino Program Structure

Every beginner should understand these two functions:

``` cpp
void setup() {
  // Runs once after startup or reset
}

void loop() {
  // Repeats while the board is running
}
```

-   `setup()` configures pins, starts serial communication, and
    initializes devices.
-   `loop()` contains the repeated main behaviour.
-   `const` declares a value that should not change.
-   Comments explain the code and are not executed.
-   `delay(milliseconds)` pauses execution for a specified duration.
-   `Serial.print()` and `Serial.println()` send text to the Serial
    Monitor.

## 6.1 Why delay() can be limiting

`delay()` blocks the main loop. While it is waiting, the program cannot
continue normal loop processing. This is fine for simple demonstrations
but can make multi-sensor systems less responsive.

For more advanced projects, introduce `millis()` to schedule actions
without blocking.

## 6.2 Debugging method

1.  Compile the code.
2.  Read the exact error message.
3.  Verify the board and port.
4.  Check wiring and pin numbers.
5.  Print raw readings to Serial Monitor.
6.  Test one component at a time.
7.  Add more components gradually.

------------------------------------------------------------------------

# 7. LDR --- Light-Dependent Resistor

## 7.1 Working principle

An LDR's resistance generally decreases as incident light intensity
increases. It is usually connected in a voltage divider so the Arduino
can measure a changing voltage.

## 7.2 Wiring

For the following arrangement:

  Connection                      Destination
  ------------------------------- -------------
  LDR leg 1                       5V
  LDR leg 2                       A0
  Fixed 10 kΩ resistor, one end   A0
  Fixed resistor, other end       GND

With this wiring, the ADC reading generally increases as the light gets
brighter.

## 7.3 Code

``` cpp
const int ldrPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int lightValue = analogRead(ldrPin);

  Serial.print("Light reading: ");
  Serial.println(lightValue);

  delay(500);
}
```

Set Serial Monitor to 9600 baud. The actual readings depend on the LDR,
resistor value, supply, and ambient light.

## 7.4 Mini-project: Automatic night lamp

1.  Read the LDR value.
2.  Compare it with a calibrated threshold.
3.  Turn on an LED when the environment is dark.
4.  Turn it off when the environment is bright.

Thresholds should be measured on the actual circuit rather than assumed
to be universal.

------------------------------------------------------------------------

# 8. HC-SR04 Ultrasonic Distance Sensor

## 8.1 Working principle

The sensor transmits an ultrasonic burst and measures the time until an
echo returns.

\[ d = `\frac{t \times v_{\text{sound}}}{2}`{=tex} \]

At room temperature, the speed of sound is approximately 343 m/s. The
division by two accounts for the outgoing and returning journey.

## 8.2 Wiring

  HC-SR04 pin   Uno R3 connection
  ------------- -------------------
  VCC           5V
  GND           GND
  TRIG          D9
  ECHO          D10

This wiring is for a typical 5 V HC-SR04 module. Other variants may have
different electrical requirements.

## 8.3 Code

``` cpp
const int trigPin = 9;
const int echoPin = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  unsigned long duration = pulseIn(echoPin, HIGH, 30000UL);

  if (duration == 0) {
    Serial.println("No echo detected");
  } else {
    float distance = duration * 0.0343 / 2.0;

    Serial.print("Distance: ");
    Serial.print(distance, 1);
    Serial.println(" cm");
  }

  delay(200);
}
```

## 8.4 Common limitations

-   Soft materials may absorb sound.
-   Angled surfaces may reflect sound away from the receiver.
-   Very small targets can be difficult to detect.
-   Sensor range and accuracy vary by model and conditions.
-   `pulseIn()` timeout prevents waiting indefinitely when no echo
    arrives.

## 8.5 Mini-project: Parking indicator

Use distance thresholds to activate LEDs or a buzzer. A faster beep as
the object approaches can communicate proximity.

------------------------------------------------------------------------

# 9. Potentiometer --- Adjustable Analog Input

A potentiometer is a variable resistor with three terminals. When wired
as a voltage divider, the centre terminal provides a variable voltage.

## Wiring

-   Outer terminal 1 → 5V.
-   Centre terminal → A0.
-   Outer terminal 2 → GND.

The outer terminals can be swapped; doing so reverses the direction of
the reading.

``` cpp
int value = analogRead(A0);
int brightness = map(value, 0, 1023, 0, 255);
analogWrite(9, brightness);
```

This maps the potentiometer's ADC reading to the PWM range to control
LED brightness. Use a series resistor with the LED.

------------------------------------------------------------------------

# 10. Thermistor --- Temperature Sensing

## 10.1 Working principle

A thermistor changes resistance with temperature. A common NTC
thermistor decreases in resistance as temperature rises.

## 10.2 Wiring for a common 10 kΩ NTC

-   Fixed 10 kΩ resistor from 5V to A0.
-   Thermistor from A0 to GND.

The circuit is a voltage divider.

## 10.3 Temperature calculation

For a thermistor whose resistance is known at a nominal temperature, the
beta model is:

\[ `\frac{1}{T}`{=tex} = `\frac{1}{T_0}`{=tex} +
`\frac{1}{B}`{=tex}`\ln`{=tex}`\left`{=tex}(`\frac{R}{R_0}`{=tex}`\right`{=tex})
\]

Where: - `T` = estimated absolute temperature in kelvin. - `T0` =
nominal absolute temperature in kelvin. - `R` = estimated thermistor
resistance. - `R0` = nominal resistance at `T0`. - `B` = thermistor beta
parameter in kelvin.

Convert to Celsius:

\[ T_C = T_K - 273.15 \]

The thermistor datasheet supplies the appropriate parameters. This
method is approximate and should be calibrated for accurate
measurements.

## 10.4 Common issues

-   Wrong divider wiring.
-   Incorrect nominal resistance or beta value.
-   Poor electrical connections.
-   ADC noise.
-   Thermistor self-heating.
-   Treating an approximate estimate as a calibrated temperature
    reading.

------------------------------------------------------------------------

# 11. Servo Motor

## 11.1 Working principle

A hobby servo contains a motor, gears, control electronics, and a
feedback mechanism. A control pulse commands a target position.

A standard positional servo is different from a continuous-rotation
servo, which is generally controlled for speed and direction.

## 11.2 Typical SG90 wiring

  Servo wire      Connection
  --------------- -----------------------------
  Brown/black     GND
  Red             Appropriate positive supply
  Orange/yellow   Signal, e.g. D9

Wire colours vary by manufacturer; check the datasheet.

## 11.3 Code

``` cpp
#include <Servo.h>

Servo myServo;

void setup() {
  myServo.attach(9);
}

void loop() {
  myServo.write(0);
  delay(1000);

  myServo.write(90);
  delay(1000);

  myServo.write(180);
  delay(1000);
}
```

## 11.4 Power considerations

-   Never power the servo motor from a GPIO pin.
-   Servo current peaks can cause the board to reset.
-   Use an appropriate supply if required.
-   When the servo signal comes from the Arduino and it has a separate
    non-isolated supply, connect grounds together.
-   Avoid forcing the servo against mechanical stops.

Applications include a small gate, robot joint, or automatic lid.

------------------------------------------------------------------------

# 12. Buzzer

## 12.1 Active versus passive buzzer

-   **Active buzzer:** Usually contains an oscillator and makes a tone
    when powered.
-   **Passive piezo buzzer:** Usually needs a changing signal to
    generate a tone.

Check the component's voltage and current requirements. Use a suitable
transistor driver if a bare buzzer requires more current than a GPIO
should provide.

## 12.2 Example code for a suitable passive buzzer

``` cpp
const int buzzerPin = 8;

void setup() {
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  tone(buzzerPin, 1000);
  delay(500);

  noTone(buzzerPin);
  delay(500);
}
```

`tone()` generates a square-wave tone. A simple active buzzer module may
instead be controlled using HIGH/LOW.

Applications include alarms, proximity warnings, and user feedback.

------------------------------------------------------------------------

# 13. 16×2 Character LCD

## 13.1 What is a 16×2 LCD?

A 16×2 character LCD displays up to 16 characters on each of two lines.
Many common modules use an HD44780-compatible controller.

## 13.2 Typical parallel wiring in 4-bit mode

  -----------------------------------------------------------------------
  LCD pin                 Function                Uno R3 connection
  ----------------------- ----------------------- -----------------------
  1                       VSS                     GND

  2                       VDD                     5V

  3                       VO                      Wiper of 10 kΩ contrast
                                                  potentiometer

  4                       RS                      D12

  5                       RW                      GND

  6                       E                       D11

  7--10                   D0--D3                  Not connected in 4-bit
                                                  mode

  11                      D4                      D5

  12                      D5                      D4

  13                      D6                      D3

  14                      D7                      D2

  15--16                  Backlight               According to module
                                                  polarity and current
                                                  requirements
  -----------------------------------------------------------------------

The contrast potentiometer's outer terminals are typically connected to
5V and GND. Check the actual module's backlight requirements.

## 13.3 Code

``` cpp
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  lcd.begin(16, 2);
  lcd.print("Arduino Master");
  lcd.setCursor(0, 1);
  lcd.print("Hello, World!");
}

void loop() {
}
```

## 13.4 Important concepts

-   **RS:** Selects command or character data.
-   **RW:** Selects read or write; tying it to GND selects writing.
-   **E:** Enable signal.
-   **D4--D7:** Data lines used in 4-bit mode.
-   **VO:** Contrast adjustment.
-   **Backlight:** Provides illumination and may have separate current
    requirements.

## 13.5 I²C LCD extension

An I²C backpack reduces the LCD's signal wiring to SDA and SCL plus
power.

On the classic Uno R3: - SDA → A4 - SCL → A5

The backpack's I²C address must be identified. `0x27` and `0x3F` are
common examples, not guaranteed addresses.

------------------------------------------------------------------------

# 14. LED and RGB LED Basics

## 14.1 Standard LED

-   LEDs have polarity.
-   A current-limiting resistor is required for a bare LED connected to
    a supply or GPIO.
-   The longer lead is often the anode on through-hole LEDs, but verify
    the component.
-   Do not connect a bare LED directly across 5V or directly from a GPIO
    to GND without current limiting.

## 14.2 RGB LED

An RGB LED contains red, green, and blue emitters.

Common types: - **Common cathode:** Shared cathode, typically connected
to GND. - **Common anode:** Shared anode, typically connected to the
positive supply.

Each colour channel needs appropriate current limiting. PWM can adjust
perceived brightness and mix colours.

------------------------------------------------------------------------

# 15. Mini-project: Distance Warning System

## 15.1 Components

-   Arduino Uno R3
-   HC-SR04 ultrasonic sensor
-   LED
-   Suitable series resistor
-   Suitable buzzer
-   Breadboard and jumper wires

## 15.2 Pin mapping

  Component                             Arduino connection
  ------------------------------------- --------------------
  HC-SR04 TRIG                          D9
  HC-SR04 ECHO                          D10
  LED anode through suitable resistor   D6
  LED cathode                           GND
  Suitable buzzer signal                D8
  Buzzer GND                            GND
  HC-SR04 VCC                           5V
  HC-SR04 GND                           GND

This example assumes the selected sensor and buzzer modules are
electrically compatible with the Uno R3. Do not drive a high-current
buzzer directly from a GPIO.

## 15.3 Project logic

1.  Send a trigger pulse.
2.  Measure the echo duration.
3.  Calculate distance.
4.  If a valid reading is below a selected threshold, turn on the LED
    and sound the buzzer.
5.  Otherwise, turn the LED off and silence the buzzer.
6.  If no echo is received, treat it as an invalid reading rather than
    assuming the object is far away.

## 15.4 Example code

``` cpp
const int trigPin = 9;
const int echoPin = 10;
const int ledPin = 6;
const int buzzerPin = 8;

const float thresholdCm = 20.0;

void setup() {
  Serial.begin(9600);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  unsigned long duration = pulseIn(echoPin, HIGH, 30000UL);

  if (duration == 0) {
    Serial.println("No echo detected");
    digitalWrite(ledPin, LOW);
    noTone(buzzerPin);
  } else {
    float distanceCm = duration * 0.0343 / 2.0;

    Serial.print("Distance: ");
    Serial.print(distanceCm, 1);
    Serial.println(" cm");

    if (distanceCm < thresholdCm) {
      digitalWrite(ledPin, HIGH);
      tone(buzzerPin, 1000);
    } else {
      digitalWrite(ledPin, LOW);
      noTone(buzzerPin);
    }
  }

  delay(100);
}
```

This code assumes a suitable passive buzzer or piezo device that
supports `tone()`. For an active buzzer module, adapt the output control
to the module's specifications.

The 20 cm threshold is an example, not a universal safety limit. This is
an educational prototype, not a certified parking or safety system.

------------------------------------------------------------------------

# 16. Common Troubleshooting Guide

  -----------------------------------------------------------------------
  Problem                 Possible cause          What to check
  ----------------------- ----------------------- -----------------------
  Board not detected      USB cable or port issue Use a data-capable
                                                  cable; check the port

  Upload fails            Wrong board or port     Verify IDE settings

  LED does not light      Reversed polarity or    Check LED orientation,
                          missing connection      resistor, pin, GND

  LDR reading is constant Incorrect voltage       Inspect connections and
                          divider                 measure A0

  Ultrasonic sensor       Wiring or target        Check TRIG/ECHO, power,
  returns no echo         reflection issue        target angle

  LCD displays blocks     Contrast or             Adjust contrast and
                          initialization issue    check wiring

  Servo causes resets     Supply current          Use suitable power and
                          insufficient            common ground

  Sensor readings         Noise or loose          Improve wiring and
  fluctuate               connections             consider filtering

  PWM does not behave as  Wrong pin or            Use a PWM-capable pin
  expected                misunderstanding of PWM and check the value

  Serial output is        Baud mismatch           Match Serial Monitor to
  unreadable                                      `Serial.begin()`
  -----------------------------------------------------------------------

## Debugging sequence

1.  Power off before rewiring.
2.  Inspect connections and polarity.
3.  Verify the correct board and port.
4.  Test one component independently.
5.  Print raw sensor readings.
6.  Compare code pin numbers with physical wiring.
7.  Add components one at a time.
8.  Test different input conditions.
9.  Record the working circuit and code.

------------------------------------------------------------------------

# 17. Communication Protocols and Next Steps

These are extension topics rather than the main focus of the one-hour
session.

-   **UART:** Serial communication using transmit and receive lines.
-   **I²C:** Two-wire communication using SDA and SCL, typically with
    device addresses.
-   **SPI:** Synchronous communication using clock, data lines, and
    chip-select signals.
-   **Interrupts:** Respond to certain events without waiting for the
    next ordinary loop iteration.
-   **Timers:** Generate precise timing and periodic events.
-   **Debouncing:** Prevent one physical button press from being
    interpreted as multiple presses.
-   **Calibration:** Convert raw readings into useful physical
    measurements.
-   **Filtering:** Reduce measurement noise, for example with a moving
    average.
-   **Non-blocking timing:** Use `millis()` instead of long blocking
    delays where responsiveness matters.
-   **PCB design:** Convert a breadboard prototype into a more permanent
    circuit.

------------------------------------------------------------------------

# 18. Suggested 60-Minute Workshop Schedule

  -----------------------------------------------------------------------
  Time                    Topic                   Teaching approach
  ----------------------- ----------------------- -----------------------
  00--05 min              What is Arduino?        Input → process →
                                                  output examples

  05--12 min              Uno R3 and ATmega328P   Show the real board and
                                                  identify pins

  12--20 min              Electronics and wiring  Explain voltage,
                                                  current, resistance,
                                                  GND, and breadboards

  20--30 min              Digital, analog, PWM,   Run Blink and show
                          and code                Serial Monitor

  30--45 min              Hardware demonstrations LED, LDR, and HC-SR04

  45--55 min              Distance warning        Explain the complete
                          project                 system

  55--60 min              Recap and questions     Short quiz and
                                                  troubleshooting tips
  -----------------------------------------------------------------------

Because the workshop lasts only one hour, the servo, thermistor, buzzer,
and LCD should be introduced as quick reference demonstrations or
follow-up material rather than each receiving a full detailed live
build.

------------------------------------------------------------------------

# 19. Quick Quiz

1.  **What does a microcontroller do?**\
    It executes instructions and interacts with connected hardware.

2.  **Which function runs once after startup or reset?**\
    `setup()`.

3.  **What is the typical `analogRead()` range on the classic Uno R3?**\
    0--1023.

4.  **Which is a PWM-capable pin on the classic Uno R3: D4, D9, or
    A2?**\
    D9.

5.  **Why does a bare LED need a series resistor?**\
    To limit current.

6.  **Why is HC-SR04 round-trip time divided by two?**\
    Because the sound travels to the object and then returns.

7.  **Why should a motor not be powered directly from a GPIO pin?**\
    The motor's current demand can exceed what the pin can safely
    supply.

8.  **Does `analogWrite()` on the classic Uno R3 generate a true analog
    voltage?**\
    No. On PWM-capable pins, it generates a PWM waveform.

------------------------------------------------------------------------

# 20. Final Takeaways

-   Arduino provides a beginner-friendly way to learn embedded systems.
-   Sensors are inputs; the microcontroller processes their readings;
    outputs respond.
-   Digital input/output, analog input, and PWM are different concepts.
-   Correct wiring and power are as important as correct code.
-   Test one component at a time and debug systematically.
-   Simulations help explain concepts, but real hardware must be tested
    separately.
-   Start with a simple circuit, understand it, and then combine
    components into a complete project.

**Workshop closing line:**\
"Don't just copy a circuit. Understand what every wire does, what every
reading means, and why the code produces the result."
