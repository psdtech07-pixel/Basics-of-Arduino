# Arduino Masterclass: Full Website Content

Audience: first-year engineering students with no electronics background. Board: Arduino Uno R3 (ATmega328P). Every sensor uses the same card layout, so students always know where to look, and each block ends with a one-line takeaway so nobody gets lost.

## Course Map

| Block | Topic | Question it answers |
|---|---|---|
| 1 | What is Arduino | What is it and how do I use it? |
| 2 | The brain: microcontroller | What is a microcontroller? MCU vs MPU? What is the ATmega328P and why do its specs matter? |
| 3 | Pins and signals | What are the pins for? What are digital, analog and PWM, and how do they work inside? |
| 4 | Electronics you need | Ohm's law, resistor, LED, voltage divider, breadboard |
| 5 | How code runs | How does the IDE turn my code into something the chip runs? |
| 6 | Analog sensors | Potentiometer, LDR, thermistor, MQ-2 gas sensor |
| 7 | Digital sensors | Push button, IR obstacle sensor, HC-SR04 ultrasonic, DHT11 |
| 8 | Output devices | LED (PWM), buzzer, servo motor, 16x2 LCD |
| 9 | Mini-project | Distance warning system |
| 10 | Quiz and wrap-up | 10 questions, cheat sheet, next steps |

## Pin Map Used in Every Example

Every device has its own pin, so students can build all examples on one board without clashes.

| Pin | Device |
|---|---|
| A0 | Potentiometer (wiper) |
| A1 | LDR divider |
| A2 | Thermistor divider |
| A3 | MQ-2 analog output (AO) |
| A4, A5 | LCD SDA, SCL (I2C) |
| D2 | Push button |
| D3 | IR obstacle sensor OUT |
| D4 | DHT11 DATA |
| D5 (PWM) | LED |
| D6 | Buzzer |
| D7, D8 | HC-SR04 TRIG, ECHO |
| D9 | Servo signal |
| D0, D1 | Reserved for USB serial. Do not use. |
| D10 to D13 | Free |

## The Card Layout Used for Every Sensor

1. **What it measures**
2. **How it works:** the physics, in plain words
3. **Electrical signal it produces:** resistance, voltage, pulse or data
4. **How Arduino reads it**
5. **Wiring**
6. **Code**
7. **Try it:** a 2-minute experiment
8. **Watch out:** the common mistake

---

## Block 1: What is Arduino?

### In one sentence
Arduino is an open-source platform made of a **board** (hardware) and an **IDE with a simple C/C++ language** (software) that lets you read sensors and control devices without needing advanced electronics.

### The two halves
| Half | What it is |
|---|---|
| Hardware | The board: a microcontroller chip, power circuitry, USB interface and pin headers |
| Software | The Arduino IDE, the language and libraries. Programs are called **sketches** (.ino files) |

**Arduino is not a chip.** The Arduino Uno is a board, and the chip on it is the ATmega328P. Other Arduino boards use other chips.

### The idea behind everything: Input, Process, Output
```
INPUT (sensor)  ->  PROCESS (code on the chip)  ->  OUTPUT (LED, buzzer, motor, display)
```
| Example | Input | Process | Output |
|---|---|---|---|
| Night light | LDR senses darkness | if reading is below a limit | LED turns on |
| Parking alarm | Ultrasonic measures 15 cm | if distance is under 20 cm | Buzzer sounds |
| Weather display | DHT11 reads temperature | convert and format | LCD shows the value |

### Parts of the Arduino Uno R3
| Part | Job |
|---|---|
| ATmega328P | The brain. Runs your sketch. |
| USB-B port | Uploads code, sends Serial data, and can power the board |
| DC jack | Power from a 7 to 12 V adapter |
| Voltage regulator | Makes a steady 5 V (and 3.3 V) from the input |
| 16 MHz crystal | The clock that paces the chip |
| USB-to-serial chip | Translates USB to the chip's serial port (ATmega16U2, or CH340 on many clones) |
| Reset button | Restarts the sketch from the beginning |
| Pin headers | Where sensors and outputs connect |
| Pin 13 LED (L) | A built-in LED for quick tests |

### How to use an Arduino: 4 steps
1. **Connect** the board to your computer with a USB data cable.
2. In the IDE, choose **Tools > Board > Arduino Uno** and **Tools > Port**.
3. **Write** a sketch (or open an example).
4. Click **Upload**. The board restarts and runs your program, and keeps running it every time it gets power.

### Where Arduino is used
Robotics, home automation, weather and environment monitoring, smart agriculture, data acquisition, prototypes for IoT, and teaching instrumentation.

**Takeaway:** Arduino = a small programmable board. Sensors go in, code decides, outputs respond.

---

## Block 2: The Brain, Microcontroller and ATmega328P

### What is a microcontroller?
A **microcontroller (MCU)** is a complete tiny computer on one chip. Inside it are:
- a **CPU** (executes instructions)
- **memory** (Flash for the program, SRAM for variables, EEPROM for saved data)
- **peripherals** (timers, ADC, serial ports, digital pins)

It runs **one dedicated program**, starts instantly at power-up, and needs no operating system. It sits inside washing machines, remote controls, car dashboards and thermostats.

### Microcontroller vs microprocessor
A **microprocessor (MPU)** is only the CPU. To make a working computer you must add RAM, storage and peripheral chips around it.

| Feature | Microcontroller (MCU) | Microprocessor (MPU) |
|---|---|---|
| What's on the chip | CPU + RAM + Flash + I/O peripherals | CPU only (memory and I/O are external) |
| Typical example | ATmega328P, STM32, ESP32 | Intel Core i5, the ARM Cortex-A chip in a Raspberry Pi |
| Operating system | Usually none; one program | Yes (Windows, Linux, Android) |
| Speed | MHz range (16 MHz here) | GHz range |
| Memory | KB | GB |
| Power use | Very low (milliamps) | High (watts) |
| Cost and size | Cheap, tiny | Costly, needs a full board around it |
| Best at | Controlling hardware in real time | Running complex software and multitasking |

**Analogy:** an MCU is a dedicated worker who does one job perfectly. An MPU is a general office with many people and many tasks.

### The ATmega328P
The ATmega328P is an 8-bit microcontroller from the **AVR family** (made by Atmel, now Microchip). It is the chip on the Arduino Uno and Nano.

### Specifications and why each one matters
| Specification | Value | What it means for you |
|---|---|---|
| Architecture | 8-bit AVR (RISC) | Handles 8 bits per operation. Fine for control tasks, slower for big maths. |
| Clock speed | 16 MHz | 16 million ticks per second, one tick = 62.5 ns. Sets how fast code runs and how precise timing can be. |
| Flash memory | 32 KB (0.5 KB used by bootloader) | Stores your program. Blink needs about 1 KB, but each library adds more. |
| SRAM | 2 KB | Holds variables while running. It runs out first, so avoid huge arrays and long text. |
| EEPROM | 1 KB | Remembers values after power is off (settings, counters). |
| Digital I/O | 14 pins on the Uno (D0 to D13) | How many on/off devices you can connect directly. |
| ADC | 10-bit, 6 channels (A0 to A5) | Reads voltages as 0 to 1023. Resolution is about 4.88 mV per step. |
| PWM channels | 6 | Dimming and speed control on 6 pins. |
| Timers | 3 (two 8-bit, one 16-bit) | Generate PWM, time `delay()` and `millis()`, and drive `tone()`. |
| Serial interfaces | 1 UART, 1 SPI, 1 I2C | Talk to a PC, displays and other chips. |
| Operating voltage | 5 V on the Uno | The logic level. 3.3 V-only parts can be damaged by 5 V signals. |
| Pin current | 20 mA recommended, 40 mA absolute max per pin; about 200 mA total | Enough for an LED, not enough for a motor. |

### Three kinds of memory (a common student question)
| Memory | Keeps data when power is off? | Used for |
|---|---|---|
| Flash | Yes | Your program |
| SRAM | No | Variables while the program runs |
| EEPROM | Yes | Small saved values |

**Takeaway:** the ATmega328P is a small, low-power computer with just enough memory and peripherals to read sensors and control outputs.

---

## Block 3: Pins and Signals

### Pin groups on the Uno
| Group | Pins | Purpose |
|---|---|---|
| Power | 5V, 3.3V, VIN, GND (three), IOREF, AREF, RESET | Supply and reference voltages |
| Digital | D0 to D13 | Read or write HIGH/LOW |
| Analog input | A0 to A5 | Read a voltage as a number (they can also act as digital pins) |
| PWM (marked ~) | D3, D5, D6, D9, D10, D11 | Simulate variable output |
| Serial (UART) | D0 (RX), D1 (TX) | USB communication. Avoid them in projects. |
| I2C | A4 (SDA), A5 (SCL) | Two-wire bus for LCD and other chips |
| SPI | D10 (SS), D11 (MOSI), D12 (MISO), D13 (SCK) | Fast bus for SD cards and displays |

Power pins: **5V** gives out 5 V, **3.3V** gives 3.3 V (up to 50 mA), **VIN** is the raw adapter voltage, and **GND** is the 0 V reference that every circuit must share.

### Digital signals
A digital signal has only **two states**:

| State | Voltage | In code |
|---|---|---|
| HIGH | about 5 V | `1` or `HIGH` |
| LOW | about 0 V | `0` or `LOW` |

**What happens inside the pin:** each pin has an output driver (two tiny switches: one connects the pin to 5 V, the other to GND) and an input buffer that decides if the voltage counts as HIGH or LOW. `pinMode()` chooses which one is active.

**Input thresholds at 5 V:** above about **3.0 V** reads HIGH, below about **1.5 V** reads LOW. In between is undefined, so the reading can flip randomly.

```cpp
pinMode(8, OUTPUT);        // pin sends
digitalWrite(8, HIGH);     // 5 V out
pinMode(2, INPUT);         // pin listens
int state = digitalRead(2);// returns 0 or 1
```

### Floating pins, pull-up and pull-down
An input connected to nothing **floats** and picks up noise, so it reads random values. Fix it by tying it to a known level through a resistor:
- **Pull-down:** resistor to GND. Reads LOW until the button connects it to 5 V.
- **Pull-up:** resistor to 5 V. Reads HIGH until the button connects it to GND.
- **`INPUT_PULLUP`:** turns on a built-in pull-up resistor (about 20 to 50 kohm), so you need no external part. The logic is inverted: **pressed = LOW**.

### Analog signals and the ADC
A real-world signal such as temperature or light varies smoothly, not just ON or OFF. The Uno reads it with its **ADC (analog-to-digital converter)**.

- Input range: 0 to 5 V
- Output: a number from **0 to 1023** (10 bits, 1024 steps)
- Step size: 5 V / 1024, about **4.88 mV**
- Only on **A0 to A5**

| Input voltage | analogRead() value |
|---|---|
| 0 V | 0 |
| 1.25 V | about 256 |
| 2.5 V | about 512 |
| 3.75 V | about 768 |
| 5 V | 1023 |

Convert back to volts with `volts = reading * 5.0 / 1023.0`.

**How the ADC works inside (the 20-questions game):** the Uno uses a *successive approximation* ADC. It asks 10 yes/no questions: "Is the voltage above 2.5 V? Then above 3.75 V? ..." Each answer fixes one bit, so after 10 questions it has a 10-bit number. At the default ADC clock one conversion takes about **104 microseconds**, so `analogRead()` can run roughly 9,000 times per second.

```cpp
int raw = analogRead(A0);          // 0..1023
float volts = raw * 5.0 / 1023.0;  // 0..5 V
```

### PWM: pretending to be analog
The Uno **cannot output a steady voltage between 0 V and 5 V** (it has no DAC). Instead it flips a pin ON and OFF very fast and changes the **duty cycle**, the percentage of time it is ON.

`average voltage = duty cycle x 5 V`

| analogWrite(pin, value) | Duty cycle | Average voltage |
|---|---|---|
| 0 | 0% | 0 V |
| 64 | 25% | 1.25 V |
| 127 | 50% | 2.5 V |
| 191 | 75% | 3.75 V |
| 255 | 100% | 5 V |

**Why it works:** an LED switched at hundreds of times per second looks steadily dimmer to the eye, and a motor's inertia smooths the pulses into an average speed.

**How it works inside:** a hardware **timer** counts from 0 to 255 over and over. The pin stays HIGH while the count is below your value, and goes LOW after. No CPU time is spent once it is set.

| Pins | Timer | Frequency |
|---|---|---|
| 5, 6 | Timer0 | about 980 Hz |
| 9, 10 | Timer1 | about 490 Hz |
| 3, 11 | Timer2 | about 490 Hz |

```cpp
analogWrite(5, 128);   // about 50% brightness on the LED
```

### Common pin mistakes
- Using `analogWrite()` on a pin without the ~ mark (it only gives full ON or OFF)
- Connecting something to D0 or D1 and then failing to upload
- Leaving an input floating
- Drawing more than 20 mA from a pin (never connect a motor or relay coil directly)
- Feeding more than 5 V into any pin

**Takeaway:** digital = two levels, analog input = a number from 0 to 1023, PWM = fast switching that fakes an analog output.

---

## Block 4: Electronics You Need

Only four ideas are needed for every example in this course.

### Voltage, current, resistance and Ohm's law
| Quantity | Meaning | Unit | Analogy (water pipe) |
|---|---|---|---|
| Voltage (V) | Electrical push | Volt | Water pressure |
| Current (I) | Flow of charge | Ampere | Water flow rate |
| Resistance (R) | Opposition to flow | Ohm | A narrow pipe |

**Ohm's law:** `V = I x R`

### Resistor and LED
An LED has almost no resistance once it turns on, so it must have a resistor in series or it will pull too much current and burn out.

`R = (supply voltage - LED voltage) / desired current`

Example for a red LED: `R = (5 - 2) / 0.015 = 200 ohm`, so use the next standard value, **220 ohm**.

LEDs are **polarised**: the longer leg is the anode (+), the shorter leg (flat side of the case) is the cathode (-).

### The voltage divider (the most important circuit in this course)
Two resistors in series between 5 V and GND split the voltage. The point between them gives the output.

```
5V ---[ R1 ]---+---[ R2 ]--- GND
               |
             Vout  (to an analog pin)

Vout = 5 V x R2 / (R1 + R2)
```

Most analog sensors (LDR, thermistor, gas sensor) **change their resistance**. The Arduino can only read voltage, so we put the sensor in a divider with a fixed resistor. When the sensor's resistance changes, Vout changes, and the ADC can read it.

### The breadboard
- The two long rail pairs along the edges are for **5 V (red) and GND (blue)**. On some boards the rail is split in the middle, so bridge the gap.
- In the main area, the 5 holes in each short row (a to e, and f to j) are connected. The centre gap separates the two halves.
- Use red wires for 5 V, black for GND, and other colours for signals.

### Golden rules
1. Unplug USB before changing wiring.
2. **Every device shares the same GND** as the Arduino.
3. Never connect 5 V directly to GND (short circuit).
4. Always use a resistor with an LED.
5. Check polarity on LEDs, buzzers and capacitors.
6. Do not power motors or many servos from the Arduino's 5 V pin.
7. Test one device at a time before combining them.

**Takeaway:** a divider turns a changing resistance into a changing voltage, and that is how the Arduino reads most analog sensors.

---

## Block 5: How Code Runs

### From your sketch to the chip
```
Sketch (.ino)  ->  Compiler  ->  Machine code (.hex)  ->  USB  ->  Bootloader  ->  Flash  ->  Runs
```
1. **You write** a sketch in the IDE.
2. **Verify** compiles it (the avr-gcc compiler turns C/C++ into machine code and reports errors). The IDE also shows how much Flash and SRAM your sketch uses.
3. **Upload** sends the machine code over USB. The USB-to-serial chip passes it to the ATmega328P's serial port (pins D0 and D1).
4. The **bootloader**, a tiny program already in the chip (about 0.5 KB), receives the code and writes it into Flash.
5. The chip then **runs your sketch** and keeps it even after power-off.

This is why pins D0 and D1 must be free during upload.

### The two required functions
```cpp
void setup() {
  // runs ONCE at power-up or reset: set pin modes, start Serial
}

void loop() {
  // runs again and again, forever: read, decide, act
}
```
Behind the scenes the Arduino core's `main()` calls `init()` (sets up the timers), then `setup()` once, then `loop()` forever.

### Language cheat sheet
| Need | Code |
|---|---|
| Variable | `int count = 0;` `float temp = 25.5;` `bool on = true;` |
| Constant | `const int LED_PIN = 5;` |
| Decision | `if (x > 10) { ... } else { ... }` |
| Repeat | `for (int i = 0; i < 5; i++) { ... }` |
| Wait | `delay(1000);` (milliseconds) |
| Scale a number | `map(value, 0, 1023, 0, 255)` |
| Print to PC | `Serial.begin(9600);` then `Serial.println(x);` |
| Comment | `// note` |

Every statement ends with `;`. Blocks use `{ }`. Names are case-sensitive.

### Program 1: Blink
```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);   // pin 13
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
```
**Try it:** change the delays, then wire an external LED with a 220 ohm resistor to D5.

### Program 2: Talk to your PC (Serial Monitor)
```cpp
void setup() {
  Serial.begin(9600);          // must match the monitor's baud setting
}

void loop() {
  Serial.println("Hello from Arduino");
  delay(1000);
}
```
Open **Tools > Serial Monitor** and set **9600 baud**. This is your main debugging tool: print any sensor value to see what the Arduino sees.

### Libraries
A library is ready-made code for a device (DHT11, servo, LCD). Install via **Sketch > Include Library > Manage Libraries**, then `#include <Name.h>` at the top of the sketch.

### Basic troubleshooting
| Symptom | Likely cause |
|---|---|
| Upload fails | Wrong board or port, charge-only USB cable, something on D0/D1 |
| Garbled Serial text | Baud rate in the code and monitor differ |
| Compile error: expected `;` | Missing semicolon on the line above the error |
| Compile error: not declared | Typo in a name, or missing `#include` |

**Takeaway:** write, compile, upload, run. `setup()` runs once, `loop()` runs forever, and `Serial` lets you see inside.

---

## Block 6: Analog Sensors

An analog sensor changes smoothly with the thing it measures. The Arduino reads it through the ADC on pins A0 to A5.

### How Arduino reads any analog sensor
```
Physical quantity  ->  Sensor (its resistance changes)  ->  Voltage divider (resistance becomes voltage)
   ->  ADC (voltage becomes 0..1023)  ->  Your code (number becomes real units)
```

For the LDR, thermistor and gas sensor the wiring is always the same: **sensor on the 5 V side, a fixed 10 kohm resistor on the GND side, A-pin at the junction.**

`Vout = 5 V x 10k / (R_sensor + 10k)`

When the sensor's resistance **falls**, Vout **rises**, and the reading goes up.

| Sensor | Measures | Changes its | Needs a divider? |
|---|---|---|---|
| Potentiometer | Position (angle) | Divides voltage itself | No (it is a divider) |
| LDR | Light | Resistance | Yes |
| NTC thermistor | Temperature | Resistance | Yes |
| MQ-2 | Gas and smoke | Resistance | Yes (built into the module) |

---

### 6.1 Potentiometer

**What it measures:** the angle of a knob.

**How it works:** a potentiometer is a resistive track with three terminals. The two outer ends connect to the track, and a sliding contact called the **wiper** touches the track at the middle pin. Turning the knob moves the wiper, which splits the track into two resistors, R1 (to 5 V) and R2 (to GND). That makes a voltage divider whose ratio you set by hand.

**Electrical signal:** a voltage on the wiper, `Vwiper = 5 V x R2 / (R1 + R2)`, changing smoothly and linearly from 0 V to 5 V as you turn.

**How Arduino reads it:** the wiper goes to an analog pin, and the ADC returns 0 to 1023.

**Wiring:**
| Pot pin | Arduino |
|---|---|
| Outer pin 1 | 5V |
| Middle pin (wiper) | A0 |
| Outer pin 2 | GND |

```cpp
const int POT_PIN = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int raw = analogRead(POT_PIN);              // 0..1023
  float volts = raw * 5.0 / 1023.0;           // 0..5 V
  int percent = map(raw, 0, 1023, 0, 100);    // 0..100 %

  Serial.print("Raw: ");     Serial.print(raw);
  Serial.print("  Volts: "); Serial.print(volts, 2);
  Serial.print("  Percent: "); Serial.println(percent);
  delay(200);
}
```

**Try it:** open Tools > Serial Plotter and turn the knob to see a live graph.

**Watch out:** swapping the two outer pins just reverses the direction. Use a 10 kohm pot. Pots are used in volume knobs, joysticks and any manual setting.

---

### 6.2 LDR (Light Dependent Resistor)

**What it measures:** how bright the light is.

**How it works:** the LDR's surface is a light-sensitive semiconductor (cadmium sulfide). In the dark, few electrons are free to carry current, so **resistance is high** (hundreds of kilohms up to megohms). When light hits it, photons give electrons enough energy to break free. More free electrons means more current flows, so **resistance falls** (to roughly a few kilohms or less in bright light). The exact values vary between parts.

**Electrical signal:** a resistance that drops as light increases. A voltage divider turns that into a voltage.

**How Arduino reads it:** `analogRead()` on the divider junction. Brighter light gives a **higher** reading with this wiring.

**Wiring:**
```
5V --- LDR ---+--- 10k ohm --- GND
              |
              A1
```

```cpp
const int LDR_PIN = A1;
const int LED_PIN = 5;
const int THRESHOLD = 400;   // set between your dark and bright readings

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int light = analogRead(LDR_PIN);
  Serial.println(light);

  if (light < THRESHOLD) {
    digitalWrite(LED_PIN, HIGH);   // dark: night light ON
  } else {
    digitalWrite(LED_PIN, LOW);
  }
  delay(200);
}
```

**Try it:** cover the LDR with your finger and note the reading, then shine a phone torch on it. Set THRESHOLD halfway between the two. For a smooth night light, replace the `if` with `analogWrite(LED_PIN, map(light, 0, 1023, 255, 0));`.

**Watch out:** the LDR gives *relative* brightness, not lux. It is also slow (tens of milliseconds) and its values differ from part to part, so always calibrate.

---

### 6.3 NTC Thermistor (temperature)

**What it measures:** temperature.

**How it works:** an NTC (negative temperature coefficient) thermistor is a ceramic made from metal oxides. Heat gives its charge carriers more energy, so more of them are free to conduct. **As temperature rises, resistance falls**, and it falls fast and non-linearly. A common 10k part has **10 kohm at 25 C**.

The curve follows `R = R0 x e^(B x (1/T - 1/T0))`, where T is in kelvin, R0 is the resistance at T0 (298.15 K = 25 C), and **B** is a constant for the part (about 3950 for typical 10k modules; check yours).

**Electrical signal:** a resistance that changes with temperature. A divider turns it into a voltage.

**How Arduino reads it:** read the ADC, work backwards to the thermistor's resistance, then use the Beta equation to get temperature:

1. `R_therm = 10000 x (1023 / adc - 1)` (from the divider)
2. `1/T = 1/T0 + (1/B) x ln(R / R0)`
3. `degrees C = T - 273.15`

**Wiring:**
```
5V --- Thermistor ---+--- 10k ohm --- GND
                     |
                     A2
```

```cpp
const int THERM_PIN = A2;
const float R_FIXED = 10000.0;   // the fixed resistor
const float R0 = 10000.0;        // thermistor at 25 C
const float T0 = 298.15;         // 25 C in kelvin
const float BETA = 3950.0;       // check your datasheet

void setup() {
  Serial.begin(9600);
}

void loop() {
  int adc = analogRead(THERM_PIN);
  if (adc == 0) return;                          // avoid divide by zero

  float rTherm = R_FIXED * (1023.0 / adc - 1.0);
  float tempK = 1.0 / (1.0 / T0 + log(rTherm / R0) / BETA);
  float tempC = tempK - 273.15;

  Serial.print("Temperature: ");
  Serial.print(tempC, 1);
  Serial.println(" C");
  delay(500);
}
```

**Try it:** pinch the thermistor between two fingers and watch the value climb by a few degrees.

**Watch out:** accuracy is about 1 to 2 C unless calibrated. Compare with a known thermometer. Wait for the reading to settle, because it takes seconds to match the surroundings.

---

### 6.4 MQ-2 Gas and Smoke Sensor

**What it measures:** the level of combustible gases and smoke (LPG, propane, methane, hydrogen, alcohol, smoke). It cannot tell *which* gas it is sensing.

**How it works:** the sensing layer is **tin dioxide (SnO2)**, heated by a small internal coil to a few hundred degrees Celsius.
- In clean air, oxygen sticks to the hot surface and traps electrons, so there are few free carriers and **resistance is high**.
- When combustible gas is present, it reacts with that oxygen and **releases the trapped electrons**. More free carriers means **resistance falls**.
- More gas means a larger drop.

**Electrical signal:** a resistance that falls as gas concentration rises. The module has a load resistor that turns this into a voltage on the **AO** (analog out) pin. A **DO** pin gives a digital HIGH/LOW through a comparator and a small onboard pot that sets the trigger level.

**How Arduino reads it:** `analogRead()` on AO. A higher number means more gas.

**Wiring:**
| MQ-2 module | Arduino |
|---|---|
| VCC | 5V |
| GND | GND |
| AO | A3 |
| DO | not used here |

```cpp
const int MQ2_PIN = A3;
const int BUZZER_PIN = 6;
const int GAS_LIMIT = 400;   // calibrate in clean air first

void setup() {
  Serial.begin(9600);
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.println("Warming up MQ-2 (20 s)...");
  delay(20000);                      // the heater needs time to stabilise
}

void loop() {
  int gas = analogRead(MQ2_PIN);
  Serial.println(gas);

  if (gas > GAS_LIMIT) {
    tone(BUZZER_PIN, 1000);          // passive buzzer
  } else {
    noTone(BUZZER_PIN);
  }
  delay(500);
}
```

**Try it:** after warm-up, hold an unlit lighter near the sensor and release a tiny puff of gas (do this outdoors or in a ventilated room), or bring a cotton ball with a little hand sanitiser close. Watch the number jump.

**Watch out:**
- The heater draws about 150 mA and gets **hot**. Do not touch it.
- Allow a warm-up of at least 20 seconds each time. New sensors need hours of first-time burn-in for stable readings.
- Readings are **relative**. Converting to ppm needs calibration against the datasheet curve.
- This is a learning sensor, **not a certified safety device**.

---

## Block 7: Digital Sensors

A digital sensor gives the Arduino a clean on/off level, a timed pulse, or a packet of data. There are three styles:

| Style | Sensors here | Arduino reads it with |
|---|---|---|
| On/off level | Push button, IR obstacle sensor | `digitalRead()` |
| Pulse width (timing) | HC-SR04 ultrasonic | `pulseIn()` |
| Data packet on one wire | DHT11 | a library |

---

### 7.1 Push Button

**What it detects:** a press.

**How it works:** a tactile switch has metal contacts that touch when you push, completing the circuit. With `INPUT_PULLUP` the pin sits at HIGH until the button connects it to GND.

**Electrical signal:** HIGH (released) or LOW (pressed).

**Wiring:** one leg to D2, the diagonally opposite leg to GND. No resistor is needed.

**Bounce:** real contacts "chatter" for about 5 to 20 milliseconds, so one press can look like several. The code waits a moment and reads again.

```cpp
const int BUTTON_PIN = 2;
const int LED_PIN = 5;
bool lastState = HIGH;
int presses = 0;

void setup() {
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  bool state = digitalRead(BUTTON_PIN);
  if (state != lastState) {            // something changed
    delay(30);                         // wait out the bounce
    state = digitalRead(BUTTON_PIN);   // read again
    if (state == LOW && lastState == HIGH) {   // a real new press
      presses++;
      Serial.print("Presses: ");
      Serial.println(presses);
      digitalWrite(LED_PIN, !digitalRead(LED_PIN));   // toggle LED
    }
    lastState = state;
  }
}
```

**Try it:** remove the `delay(30)` and watch the counter jump by 2 or 3 on some presses.

---

### 7.2 IR Obstacle Sensor

**What it detects:** an object in front of it (about 2 to 30 cm, adjustable).

**How it works:** the module has an **infrared LED** that constantly sends out invisible light, and a **photodiode** that receives it. If an object is in front, it reflects some light back to the photodiode, which then conducts more current. An onboard **LM393 comparator** compares that signal with a threshold (set by the blue pot) and switches the output cleanly between HIGH and LOW. A small LED on the board lights when an obstacle is seen.

**Electrical signal:** a digital level. **LOW = obstacle detected, HIGH = clear** (active low).

**How Arduino reads it:** `digitalRead()`.

**Wiring:**
| IR module | Arduino |
|---|---|
| VCC | 5V |
| GND | GND |
| OUT | D3 |

```cpp
const int IR_PIN = 3;
const int LED_PIN = 5;

void setup() {
  pinMode(IR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  bool obstacle = (digitalRead(IR_PIN) == LOW);   // active LOW
  digitalWrite(LED_PIN, obstacle);
  Serial.println(obstacle ? "Obstacle detected" : "Clear");
  delay(100);
}
```

**Try it:** turn the pot until the board's LED just lights for your hand at about 10 cm.

**Watch out:** black or shiny surfaces reflect poorly (a black object can be missed), and direct sunlight contains infrared, which confuses the sensor. It tells you *if* something is there, not *how far*.

---

### 7.3 HC-SR04 Ultrasonic Sensor

**What it measures:** distance, from 2 cm to about 400 cm.

**How it works:** it has two small **piezoelectric transducers** that look like metal cans.
1. The **transmitter** is driven with a 40 kHz signal, so its crystal vibrates and sends out a burst of ultrasound (too high to hear).
2. The sound travels, hits an object and bounces back.
3. The **receiver's** crystal is shaken by the echo and generates a tiny voltage (the piezoelectric effect). Onboard circuitry amplifies it.
4. The module measures the **time** between sending and receiving.

Since the sound goes there **and back**, the distance is half the trip:

`distance = (time x speed of sound) / 2`

Speed of sound is about 343 m/s, which is **0.0343 cm per microsecond**. A handy shortcut: `cm = echo_microseconds / 58`.

**Electrical signal:** a pulse on the ECHO pin whose **width equals the round-trip time**.

**How Arduino reads it:** send a 10 microsecond pulse on TRIG, then use `pulseIn()` to measure how long ECHO stays HIGH.

**Wiring:**
| HC-SR04 | Arduino |
|---|---|
| VCC | 5V |
| TRIG | D7 |
| ECHO | D8 |
| GND | GND |

```cpp
const int TRIG_PIN = 7;
const int ECHO_PIN = 8;

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  // 1. Send a 10 microsecond trigger pulse
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // 2. Measure how long ECHO stays HIGH (give up after 30 ms)
  unsigned long duration = pulseIn(ECHO_PIN, HIGH, 30000UL);

  // 3. Convert time to distance
  if (duration == 0) {
    Serial.println("No echo (out of range)");
  } else {
    float cm = duration * 0.0343 / 2.0;
    Serial.print("Distance: ");
    Serial.print(cm, 1);
    Serial.println(" cm");
  }
  delay(100);
}
```

**Try it:** hold a book 10, 20 and 30 cm away and check the readings with a ruler.

**Watch out:** soft or angled surfaces (cloth, a tilted object) bounce the sound away, and the beam is about 15 degrees wide. Wait at least 50 to 60 ms between measurements. The speed of sound changes slightly with temperature.

---

### 7.4 DHT11 Temperature and Humidity Sensor

**What it measures:** temperature (0 to 50 C, about +/-2 C) and relative humidity (20 to 90 %, about +/-5 %).

**How it works:** the small blue case holds **two sensors plus a tiny chip**:
- **Temperature:** an NTC thermistor (the same idea as block 6.3).
- **Humidity:** a **capacitive** sensor. Two electrodes sit on either side of a moisture-absorbing polymer. When the air is more humid, the polymer soaks up water vapour, its electrical properties change, and the **capacitance** between the electrodes changes.
- The onboard chip measures both, applies factory calibration, and sends the results as **digital data**. That makes the DHT11 a *digital sensor*, even though analog elements are inside it.

**Electrical signal:** a 40-bit packet on a single wire: 8 bits humidity (whole part), 8 bits humidity (decimal), 8 bits temperature (whole), 8 bits temperature (decimal) and 8 bits **checksum** to detect errors. Each bit is sent as a pulse whose **length** shows 0 (short, about 26 microseconds) or 1 (long, about 70 microseconds).

**How Arduino reads it:** the Arduino pulls the line LOW for at least 18 ms to say "send data", then times the pulses. A **library does this timing for you**.

**Setup:** Library Manager > install **DHT sensor library** (by Adafruit) and, if asked, **Adafruit Unified Sensor**.

**Wiring (3-pin module with a built-in pull-up resistor):**
| DHT11 module | Arduino |
|---|---|
| VCC (+) | 5V |
| DATA (S) | D4 |
| GND (-) | GND |

If you use the bare 4-pin sensor, add a 10 kohm resistor between DATA and VCC and leave pin 3 unconnected.

```cpp
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  delay(2000);                          // DHT11 is slow: max 1 reading per second

  float humidity = dht.readHumidity();
  float tempC = dht.readTemperature();

  if (isnan(humidity) || isnan(tempC)) {   // checksum or wiring problem
    Serial.println("DHT read failed");
    return;
  }

  Serial.print("Humidity: ");
  Serial.print(humidity, 0);
  Serial.print(" %   Temperature: ");
  Serial.print(tempC, 1);
  Serial.println(" C");
}
```

**Try it:** breathe gently on the sensor and watch humidity jump, then slowly fall.

**Watch out:** read no faster than once per second. If you get "read failed", check the DATA wire and the library installation. Its resolution is 1 degree and 1 %, so it suits room monitoring, not lab-grade work.

---

## Block 8: Output Devices

Output devices turn the Arduino's electrical signals into **light, sound, motion or text**. Remember the limit: a pin can supply about 20 mA, so anything bigger (motors, relays, strips) needs its own power or a driver.

---

### 8.1 LED (with PWM brightness control)

**What it does:** gives light.

**How it works:** an LED is a **PN-junction diode**. When current flows in the right direction (anode to cathode), electrons cross the junction and fall into "holes", and each fall releases energy as a **photon**. The material sets the colour. A red LED drops about 2 V when on, and blue or white about 3 V.

**How Arduino drives it:** HIGH turns it on, LOW turns it off. For **brightness**, use PWM on a ~ pin: `analogWrite()` switches it on and off faster than the eye can follow, so a lower duty cycle looks dimmer.

**Wiring:**
```
D5 ---[ 220 ohm ]---> LED anode (long leg) ... LED cathode (short leg) ---> GND
```

```cpp
const int LED_PIN = 5;     // PWM pin
const int POT_PIN = A0;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int raw = analogRead(POT_PIN);                  // 0..1023
  int brightness = map(raw, 0, 1023, 0, 255);     // 0..255
  analogWrite(LED_PIN, brightness);
}
```

**Try it:** turn the pot to dim and brighten the LED. Then replace the loop with a `for` loop from 0 to 255 and back, with `delay(8)`, to make it "breathe".

**Watch out:** no resistor means a burnt LED (and possibly a damaged pin). Backwards means it simply will not light.

---

### 8.2 Buzzer

**What it does:** makes sound.

**How it works:** a buzzer has a thin **piezoelectric disc** (or a coil and diaphragm) that bends when voltage is applied. Applying a **rapidly alternating voltage** makes it vibrate, and the vibration is sound. The vibration rate is the pitch.

| Type | Built-in oscillator? | What you do |
|---|---|---|
| **Active buzzer** | Yes | Give it 5 V (HIGH) and it beeps at one fixed pitch |
| **Passive buzzer** | No | You supply the frequency with `tone()`, so you can play different notes |

**How to tell them apart:** put an active buzzer straight across 5 V and it sounds. A passive one only clicks. Active buzzers usually have a sealed top and a slightly taller body.

**Wiring:** buzzer (+) (longer leg or the marked leg) to D6, buzzer (-) to GND.

**Active buzzer:**
```cpp
const int BUZZER_PIN = 6;

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  digitalWrite(BUZZER_PIN, HIGH);   // beep
  delay(300);
  digitalWrite(BUZZER_PIN, LOW);    // silence
  delay(700);
}
```

**Passive buzzer (plays a scale):**
```cpp
const int BUZZER_PIN = 6;
int notes[] = {262, 294, 330, 349, 392, 440, 494, 523};   // C4 to C5 in Hz

void setup() {}

void loop() {
  for (int i = 0; i < 8; i++) {
    tone(BUZZER_PIN, notes[i], 300);   // play for 300 ms
    delay(350);
  }
  delay(1000);
}
```

**Watch out:** `tone()` uses Timer2, so it disables PWM (`analogWrite`) on pins 3 and 11. It plays only one note at a time. Using `tone()` on an active buzzer gives an odd sound, so match the code to your buzzer type.

---

### 8.3 Servo Motor (SG90)

**What it does:** turns its shaft to an exact angle (0 to 180 degrees) and holds it there.

**How it works:** inside a servo are four parts:
1. A small **DC motor**
2. A **gearbox** (more torque, slower turning)
3. A **potentiometer** attached to the output shaft that reports the current angle
4. A **control circuit**

The Arduino sends a pulse every **20 ms (50 Hz)**. The **width of the pulse is the command**: about 1 ms is 0 degrees, 1.5 ms is 90 degrees and 2 ms is 180 degrees. The control circuit compares the commanded angle with the potentiometer's reading and runs the motor until they match. That is **closed-loop control**.

**How Arduino drives it:** the **Servo library** makes the pulses with a timer, so you only write `myServo.write(angle)`.

**Wiring:**
| Servo wire | Arduino |
|---|---|
| Brown or black (GND) | GND |
| Red (power) | 5V |
| Orange or yellow (signal) | D9 |

```cpp
#include <Servo.h>

Servo myServo;
const int POT_PIN = A0;

void setup() {
  myServo.attach(9);
}

void loop() {
  int angle = map(analogRead(POT_PIN), 0, 1023, 0, 180);
  myServo.write(angle);     // turn the knob, the servo follows
  delay(15);                // give the servo time to move
}
```

**Sweep example:**
```cpp
for (int a = 0; a <= 180; a++) { myServo.write(a); delay(15); }
for (int a = 180; a >= 0; a--) { myServo.write(a); delay(15); }
```

**Watch out:**
- The signal wire can go to **any digital pin**. It does not have to be a PWM pin.
- The Servo library disables `analogWrite()` on pins **9 and 10**.
- One unloaded SG90 is fine on the Arduino's 5 V, but a loaded or stalled servo can pull 500 mA or more, which resets the board. For heavier loads or several servos, use a separate 5 V supply and **connect its GND to the Arduino GND**.

---

### 8.4 16x2 LCD with I2C Backpack

**What it does:** shows 2 lines of 16 characters.

**How it works:**
- The screen is made of **liquid crystal** cells between polarising filters. With a voltage across a cell, the crystals twist or untwist and either pass or block light, which creates a dark dot. Each character is a **5 x 8 dot grid**.
- An **HD44780 controller** chip on the back stores the character shapes. You send it a character code (for example, the number for the letter A) and it lights the right dots.
- A **backlight LED** shines through the display.
- A small **I2C backpack (PCF8574)** converts the controller's many parallel wires into just **two**.

**I2C in one line:** two wires, **SDA** (data) and **SCL** (clock), can connect many devices. Each device answers to its own **address**, usually **0x27** or **0x3F** for these LCDs.

**Setup:** Library Manager > install **LiquidCrystal I2C** (by Frank de Brabander).

**Wiring:**
| LCD backpack | Arduino |
|---|---|
| GND | GND |
| VCC | 5V |
| SDA | A4 |
| SCL | A5 |

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);   // address, columns, rows

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);                // column 0, row 0
  lcd.print("Arduino Master");
}

void loop() {
  lcd.setCursor(0, 1);                // second row
  lcd.print("Knob: ");
  lcd.print(analogRead(A0));
  lcd.print("    ");                  // spaces erase leftover digits
  delay(200);
}
```

**Try it:** turn the pot and watch the number change.

**Watch out:** if the screen is blank or shows only blocks, turn the small **blue contrast screw** on the backpack. If it is still blank, run the I2C scanner in Appendix A, because your address may be 0x3F.

---

## Block 9: Mini-Project, Distance Warning System

**Goal:** the Arduino measures distance continuously. When an object comes closer than **20 cm**, the LED turns on and the buzzer sounds. When the object moves away, it resets.

**Parts:** Arduino Uno, HC-SR04, LED, 220 ohm resistor, buzzer, breadboard, jumper wires.

### Block diagram
```
HC-SR04 (INPUT)  ->  Arduino: measure distance, compare with 20 cm (PROCESS)  ->  LED + Buzzer (OUTPUT)
```

### Wiring
| Device | Connection |
|---|---|
| HC-SR04 VCC / GND | 5V / GND |
| HC-SR04 TRIG | D7 |
| HC-SR04 ECHO | D8 |
| LED anode | D5 through a 220 ohm resistor |
| LED cathode | GND |
| Buzzer (+) | D6 |
| Buzzer (-) | GND |

### Build steps
1. Wire and test the HC-SR04 alone with the code from block 7.3.
2. Add the LED and test it alone.
3. Add the buzzer and test it alone.
4. Upload the full program below.

### Code
```cpp
const int TRIG_PIN = 7;
const int ECHO_PIN = 8;
const int LED_PIN = 5;
const int BUZZER_PIN = 6;
const float LIMIT_CM = 20.0;     // warning distance

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
}

float measureCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  unsigned long duration = pulseIn(ECHO_PIN, HIGH, 30000UL);
  if (duration == 0) return -1;              // no echo
  return duration * 0.0343 / 2.0;
}

void loop() {
  float cm = measureCm();

  if (cm < 0) {
    Serial.println("Out of range");
    digitalWrite(LED_PIN, LOW);
    noTone(BUZZER_PIN);
  } else {
    Serial.print("Distance: ");
    Serial.print(cm, 1);
    Serial.print(" cm  ");

    if (cm < LIMIT_CM) {
      digitalWrite(LED_PIN, HIGH);
      tone(BUZZER_PIN, 1000);                // passive buzzer
      Serial.println("WARNING");
    } else {
      digitalWrite(LED_PIN, LOW);
      noTone(BUZZER_PIN);
      Serial.println("Safe");
    }
  }
  delay(100);
}
```
For an **active** buzzer, replace `tone(BUZZER_PIN, 1000)` with `digitalWrite(BUZZER_PIN, HIGH)` and `noTone(BUZZER_PIN)` with `digitalWrite(BUZZER_PIN, LOW)`.

### Test it
Move your hand toward the sensor. The Serial Monitor should show the distance fall, and at under 20 cm the LED and buzzer switch on.

### Level up (pick one)
- **Beeps that speed up:** replace the `if` branch with `tone(BUZZER_PIN, 1000, 40); delay(map(constrain((int)cm, 5, 50), 5, 50, 50, 500));` so the beeps get faster as the object nears.
- **LCD display:** show the distance on row 2 (block 8.4).
- **Barrier:** add a servo that lifts to 90 degrees when the alarm fires.
- **Traffic-light LEDs:** green above 40 cm, amber from 20 to 40 cm, red under 20 cm.

---

## Block 10: Quiz and Wrap-up

### Knowledge check (answers follow each question)
1. **Which one puts CPU, memory and I/O peripherals on a single chip?** A) Microprocessor B) Microcontroller C) Graphics card D) Power supply. **Answer: B.** A microcontroller is a complete small computer on one chip.
2. **What is the bootloader's job?** A) Cool the chip B) Receive the uploaded program over serial and write it to Flash C) Convert 5 V to 3.3 V D) Run the Serial Monitor. **Answer: B.**
3. **What does `analogRead()` return when the pin sees 2.5 V on an Uno?** A) 0 B) about 127 C) about 512 D) 1023. **Answer: C.** 2.5 V is half of 5 V, so about half of 1024 steps.
4. **Which Uno pin supports PWM?** A) D4 B) D9 C) A2 D) D7. **Answer: B.** The PWM pins are D3, D5, D6, D9, D10, D11.
5. **Why does an LDR need a fixed resistor (voltage divider)?** A) To make it brighter B) Because the Arduino reads voltage, not resistance C) To change its colour D) To save memory. **Answer: B.**
6. **A button uses `INPUT_PULLUP`. What does `digitalRead()` return while it is pressed?** A) HIGH B) LOW C) 512 D) Random. **Answer: B.** Pressing connects the pin to GND.
7. **Why is the HC-SR04 echo time divided by 2?** A) Sound is slower in air B) The pulse travels to the object and back C) The sensor runs at 2.5 V D) To convert to milliseconds. **Answer: B.**
8. **What happens to an NTC thermistor's resistance as it gets hotter?** A) Rises B) Stays the same C) Falls D) Becomes infinite. **Answer: C.**
9. **What does a typical IR obstacle sensor output when it detects an object?** A) HIGH B) LOW C) 1023 D) Nothing. **Answer: B.** The output is active low.
10. **How does the DHT11 send its readings?** A) As a smooth analog voltage B) As a 40-bit digital packet on one wire C) As a PWM signal D) Over USB. **Answer: B.**

### Sensor cheat sheet
| Device | Physical principle | Signal Arduino sees | Read with | Pin |
|---|---|---|---|---|
| Potentiometer | Moving wiper divides the track voltage | Voltage 0 to 5 V | `analogRead()` | A0 |
| LDR | Light frees charge carriers, resistance falls | Divider voltage | `analogRead()` | A1 |
| NTC thermistor | Heat frees carriers, resistance falls | Divider voltage | `analogRead()` + Beta equation | A2 |
| MQ-2 | Gas reacts on hot SnO2, resistance falls | Voltage on AO | `analogRead()` | A3 |
| Push button | Contacts connect pin to GND | HIGH or LOW | `digitalRead()` | D2 |
| IR obstacle | Reflected IR hits photodiode, comparator switches | LOW when object seen | `digitalRead()` | D3 |
| DHT11 | Thermistor + capacitive humidity element, chip digitises | 40-bit packet | DHT library | D4 |
| HC-SR04 | Piezo sends and receives 40 kHz echo | Pulse width = round-trip time | `pulseIn()` | D7, D8 |
| LED | PN junction emits photons | (output) PWM | `analogWrite()` | D5 |
| Buzzer | Piezo disc vibrates | (output) tone | `tone()` | D6 |
| Servo | Closed-loop motor, pulse width sets angle | (output) 1 to 2 ms pulse | Servo library | D9 |
| 16x2 LCD | Liquid crystal cells controlled by HD44780 | (output) I2C data | LiquidCrystal_I2C | A4, A5 |

### Function cheat sheet
| Function | What it does |
|---|---|
| `pinMode(pin, mode)` | INPUT, OUTPUT or INPUT_PULLUP |
| `digitalWrite(pin, v)` | HIGH or LOW out |
| `digitalRead(pin)` | Read HIGH or LOW |
| `analogRead(pin)` | 0 to 1023 from A0 to A5 |
| `analogWrite(pin, v)` | PWM 0 to 255 on ~ pins |
| `delay(ms)` | Wait |
| `pulseIn(pin, level, timeout)` | Time a pulse in microseconds |
| `tone(pin, freq)` / `noTone(pin)` | Square wave for a passive buzzer |
| `map(x, a, b, c, d)` | Rescale a number |
| `Serial.begin()` / `Serial.println()` | Talk to the PC |

### What you learned
- What Arduino, a microcontroller and the ATmega328P are, and why the specs matter
- How digital, analog (ADC) and PWM work inside the chip
- How sensors turn light, heat, gas, distance and humidity into electrical signals, and how the Arduino reads them
- How to wire and program 12 devices, and how to combine them in a project

### What to learn next
Interrupts, non-blocking timing with `millis()`, I2C and SPI sensors (OLED, accelerometer, SD card), motor drivers, shift registers, and Wi-Fi boards such as ESP32.

### Useful resources
Arduino Language Reference (docs.arduino.cc), Tinkercad Circuits and Wokwi (free online simulators to test before wiring), Random Nerd Tutorials, and the ATmega328P datasheet from Microchip.

---

## Appendix A: I2C Scanner (find your LCD address)
```cpp
#include <Wire.h>

void setup() {
  Wire.begin();
  Serial.begin(9600);
  Serial.println("Scanning...");
  for (byte addr = 1; addr < 127; addr++) {
    Wire.beginTransmission(addr);
    if (Wire.endTransmission() == 0) {
      Serial.print("Found device at 0x");
      Serial.println(addr, HEX);
    }
  }
  Serial.println("Done");
}

void loop() {}
```
Use the address it prints in `LiquidCrystal_I2C lcd(address, 16, 2);`.

## Appendix B: 16x2 LCD Without the I2C Backpack (6-wire parallel)

| LCD pin | Connect to |
|---|---|
| 1 VSS | GND |
| 2 VDD | 5V |
| 3 V0 | Middle pin of a 10k pot (contrast), outer pins to 5V and GND |
| 4 RS | D12 |
| 5 RW | GND |
| 6 E | D11 |
| 11 D4 | D5 |
| 12 D5 | D4 |
| 13 D6 | D3 |
| 14 D7 | D2 |
| 15 A | 5V through 220 ohm |
| 16 K | GND |

This uses D2 to D5, D11 and D12, so it clashes with the pin map. Use it on its own, not together with the button, IR sensor, DHT11 and LED.

```cpp
#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);   // RS, E, D4, D5, D6, D7

void setup() {
  lcd.begin(16, 2);
  lcd.print("Hello, Arduino!");
}

void loop() {
  lcd.setCursor(0, 1);
  lcd.print(millis() / 1000);
  lcd.print(" s");
}
```

## Appendix C: Troubleshooting by Device
| Device | Problem | Check |
|---|---|---|
| Any | Strange or random values | Common GND, loose jumper, floating pin |
| LED | Does not light | Polarity, resistor, pin number in code |
| LDR / thermistor | Reading stuck at 0 or 1023 | Both divider resistor legs connected, correct A-pin |
| MQ-2 | Value drifts or is high in clean air | Warm-up time, first-time burn-in |
| IR obstacle | Always detects or never detects | Turn the blue pot, avoid sunlight and black objects |
| HC-SR04 | Reads 0 or no echo | TRIG and ECHO swapped, 5 V connected, flat surface 10 to 50 cm away |
| DHT11 | Read failed | DATA pin, library installed, 2 s between reads |
| Servo | Jitters or board resets | Separate 5 V supply, shared GND |
| LCD | Blank or blocks | Contrast screw, I2C address, library |
| Upload | Fails | Board and port, data cable, D0/D1 free |

## Appendix D: Website Structure Notes (for the React build)

**Page flow:** one long page with a sticky progress nav listing blocks 1 to 10 (the page stays live after the presentation, so students can jump to any block).

**Repeatable components:**
- **Sensor card** with tabs or sections: How it works, Signal, Wiring, Code, Try it, Watch out
- **Code block** with a copy button and syntax colours
- **Wiring table** next to a simple diagram
- **Takeaway bar** at the end of each block

**Interactive widgets (keep each small and optional):**
| Block | Widget |
|---|---|
| 3 | Pinout explorer (click a pin to see its role) |
| 3 | ADC explorer: slide a voltage and see the 0 to 1023 value and 10-bit binary |
| 3 | PWM explorer: slide the duty cycle, see the waveform and average voltage |
| 4 | Voltage divider calculator: slide R_sensor, see Vout and the ADC reading |
| 6 | LDR / thermistor sliders showing resistance, voltage and reading |
| 7 | HC-SR04 simulator: slide the distance, see the echo time |
| 7 | DHT11 packet visual: 40 bits with the 5 byte groups labelled |
| 8 | Servo angle simulator linked to pulse width |
| 10 | Quiz with instant feedback |

**Parallax:** hero (circuit-grid back layer, floating component icons mid layer, title front layer) and the dividers between blocks. Keep it subtle, animate only transform and opacity, and respect reduced-motion settings. Do not place parallax behind code or tables.
