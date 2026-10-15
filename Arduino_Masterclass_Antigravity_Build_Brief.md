# Arduino Masterclass --- Animated React Learning Page

## Complete Build Brief for Google Antigravity

> **Goal:** Build a polished, animated, beginner-friendly React website
> that teaches the basics of Arduino to first-year ENTC and
> Instrumentation & Control Engineering students who have no prior
> electronics knowledge.
>
> **Format:** A scroll-based, presentation-style learning experience
> with animated visuals, clear explanations, wiring references, working
> code examples, and practical demonstrations.
>
> **Teaching duration:** 60 minutes.
>
> **Primary hardware:** Arduino Uno R3 with ATmega328P.

------------------------------------------------------------------------

## 1. Instructions for Antigravity

Act as a senior frontend engineer, interaction designer, and
beginner-level electronics educator.

Build a complete, runnable React website---not merely a mockup, static
screenshot, or collection of disconnected components. The result should
feel like a modern interactive technical masterclass.

### Required workflow

1.  Inspect the existing project before changing anything.
2.  If no project exists, create a React + Vite project.
3.  Use JavaScript or TypeScript consistently with the existing project.
4.  Build the page in reusable components.
5.  Install and configure only dependencies that are actually used.
6.  Run the development/build checks and fix errors.
7.  Check the experience at desktop and mobile widths.
8.  Verify all internal navigation, interactive elements, and code copy
    buttons.
9.  Keep the project easy to run and modify.

### Suggested stack

-   React + Vite
-   Tailwind CSS, if compatible with the existing project
-   Motion for React (`motion`) for entrance, hover, and scroll-linked
    animations
-   Lucide icons (`lucide-react`)
-   Optional: GSAP only if genuinely useful for complex scroll sequences

Do not add unnecessary libraries. Use CSS for simple animations. If the
project already uses a suitable animation library, reuse it.

### Important quality rules

-   All educational content must be readable and accurate.
-   Do not use a screenshot of an entire webpage as the website.
-   Do not make the website dependent on unavailable APIs or paid
    services.
-   Do not invent live sensor data. Any simulated reading must be
    labelled **Simulation**.
-   Use real circuit diagrams or clear custom SVG diagrams wherever
    possible.
-   If external images are used, provide a graceful fallback if an image
    fails to load.
-   Use semantic HTML, accessible contrast, keyboard-friendly controls,
    and reduced-motion support.
-   Do not make animations so intense that they distract from the
    lesson.
-   The website must work locally after installation, without requiring
    a login or API key.

------------------------------------------------------------------------

## 2. Audience, Teaching Goal, and Tone

### Audience

First-year ENTC and Instrumentation & Control Engineering students with
no prior knowledge of electronics or Arduino.

### After completing the lesson, students should be able to

1.  Explain what Arduino is and what a microcontroller does.
2.  Identify the important parts of an Arduino Uno R3.
3.  Understand voltage, current, resistance, ground, and breadboard
    connections.
4.  Distinguish digital input/output, analog input, and PWM output.
5.  Understand `setup()` and `loop()`.
6.  Upload a sketch and read values in the Serial Monitor.
7.  Understand the basic wiring and purpose of an LED, LDR, HC-SR04
    ultrasonic sensor, thermistor, servo, buzzer, and 16×2 LCD.
8.  Understand a small sensor-based project.
9.  Follow safe wiring practices and troubleshoot basic mistakes.

### Writing style

-   Friendly, confident, practical, and beginner-friendly.
-   Explain technical terms immediately when they first appear.
-   Prefer short paragraphs, diagrams, examples, and comparisons.
-   Avoid unexplained jargon and overly long walls of text.
-   Use relatable analogies, but explain where an analogy is imperfect.
-   Keep code examples complete and copyable.
-   Explain what each important line does.
-   Never imply that a simulated demonstration is controlling real
    hardware.

------------------------------------------------------------------------

## 3. Visual Direction and Design System

Create a premium, futuristic electronics-lab aesthetic---not a generic
corporate template.

### Look and feel

-   Dark navy/charcoal background.
-   Cyan, teal, and restrained electric-blue accents.
-   White primary text and muted grey secondary text.
-   Subtle circuit-board traces, grid patterns, glowing connection
    points, and waveform motifs.
-   Realistic Arduino board/component images mixed with clean vector
    illustrations.
-   Rounded cards, fine borders, subtle glows, soft shadows, and
    generous spacing.
-   Strong typography hierarchy; large headings and short supporting
    text.
-   Use gradients sparingly.
-   Avoid excessive glassmorphism, neon everywhere, clutter, and tiny
    text.

### Responsive layout

-   Desktop: spacious, presentation-like sections with split layouts and
    large visuals.
-   Tablet: preserve diagrams and readable text while reducing columns.
-   Mobile: stack content vertically, make code blocks horizontally
    scrollable, and keep navigation usable.
-   Provide a persistent progress indicator and a compact table of
    contents.
-   Add a "Back to top" control near the end.

### Motion principles

-   Smooth section reveal as the user scrolls.
-   Small parallax or floating motion on decorative circuit elements.
-   Animated signal paths and connection pulses in diagrams.
-   Subtle hover states on cards and pinout labels.
-   Animate diagrams only when the animation communicates a concept.
-   Use short transitions, not long intro animations that delay access
    to content.
-   Respect `prefers-reduced-motion`; disable or simplify non-essential
    movement.
-   Do not hijack normal scrolling or trap the user in a full-page
    animation.

------------------------------------------------------------------------

## 4. Website Structure and Learning Journey

Build the page as a sequence of well-defined sections. Each section
should feel like a slide in a presentation, but users should be able to
scroll normally.

### Section 1 --- Hero: "Arduino Masterclass"

**Headline:** Arduino Masterclass\
**Subtitle:** From Zero to Sensors & Circuits\
**Supporting line:** A hands-on introduction to microcontrollers, pins,
signals, sensors, and outputs.

Visual: - Arduino Uno-style board on the right. - Animated circuit
traces or pulses. - Small floating component labels: LED, LDR,
ultrasonic sensor, servo. - CTA buttons: "Start Learning" and "Explore
the Board". - Show "60-minute beginner workshop".

Clicking "Start Learning" should scroll to the first learning section.

### Section 2 --- What is Arduino?

Explain in simple language: - Arduino is an open-source electronics
platform. - A board provides a convenient way to program a
microcontroller and connect external components. - Hardware = the
physical board and components. - Software = the IDE and libraries used
to write and upload code. - Sketch = the Arduino program.

Use the input → process → output model: - Input: a sensor measures
something. - Process: the microcontroller runs instructions. - Output:
an LED, buzzer, display, or motor responds.

Animate a simple flow: **Sensor → Arduino → Output**

Give examples: - LDR senses light → Arduino decides if it is dark → LED
turns on. - Ultrasonic sensor measures distance → Arduino checks a
threshold → buzzer beeps.

Clarify that Arduino is a platform, not the name of one specific
microcontroller chip.

### Section 3 --- Meet the Arduino Uno R3

Show a labelled image or custom SVG diagram of an Arduino Uno R3. Labels
should be interactive or selectable.

Identify: - ATmega328P microcontroller - USB connector - DC power jack -
Digital pins D0--D13 - Analog inputs A0--A5 - PWM-capable pins - Power
header: 5V, 3.3V, GND, VIN - RESET button - Clock source - Built-in LED,
typically connected to D13 on the classic Uno R3 - USB-to-serial
interface

When a label is selected, show: - Name - Purpose - A simple analogy or
beginner explanation - One caution if relevant

**ATmega328P specifications for the classic Uno R3:** - 8-bit AVR
microcontroller - 16 MHz clock - 32 KB Flash memory - 2 KB SRAM - 1 KB
EEPROM - 14 digital I/O pins - 6 analog input channels - 6 PWM-capable
digital pins

Explain the memory: - Flash stores the uploaded program. - SRAM holds
variables while the program runs. - EEPROM can retain small amounts of
data after power is removed.

Note: These details apply to the classic Arduino Uno R3 using the
ATmega328P, not every board sold under the Arduino name.

### Section 4 --- Electronics Fundamentals

Explain the basic concepts using simple diagrams and a water-flow
analogy.

-   Voltage: electrical potential difference; measured in volts (V).
-   Current: flow of electric charge; measured in amperes (A).
-   Resistance: opposition to current; measured in ohms (Ω).
-   Power: rate of energy transfer; measured in watts (W).
-   Ground: the circuit's common voltage reference, not necessarily a
    connection to earth.

Show: - Ohm's law: `V = I × R` - Power: `P = V × I`

Include a worked LED example: - Supply = 5 V - Approximate LED forward
voltage = 2 V - Series resistor = 220 Ω - Approximate current = (5 − 2)
/ 220 ≈ 13.6 mA

Explain that the LED forward voltage depends on the LED type and colour,
so this is an illustrative calculation.

### Section 5 --- Breadboard and Wiring Basics

Show a clear breadboard diagram that explains: - Internally connected
terminal strips. - Power rails. - Centre trench. - Possible breaks in
power rails. - Why component legs must be placed in the correct rows.

Explain common labels: - VCC/VDD: positive supply connection, depending
on the device. - GND: ground reference. - SIG/OUT: signal. - VIN: input
supply pin on a board. - SDA/SCL: I²C data and clock. - TX/RX: serial
transmit and receive.

Add an interactive "spot the wiring mistake" challenge with 2--3 simple
cases: - LED without a current-limiting resistor. - Sensor ground not
connected. - Component legs accidentally inserted into the same
connected row.

Provide explanations after the user selects an answer.

### Section 6 --- Digital, Analog, and PWM

This is a core learning section. Include a side-by-side comparison and
interactive examples.

#### Digital input/output

Explain that digital signals represent discrete states, commonly LOW and
HIGH.

Show: - `pinMode(pin, OUTPUT)` - `digitalWrite(pin, HIGH)` -
`pinMode(pin, INPUT)` - `digitalRead(pin)`

Clarify that GPIO pins are for signals and cannot provide unlimited
current.

#### Analog input

The classic Uno R3 has a 10-bit ADC, so `analogRead()` typically returns
0--1023.

For an assumed 5 V reference:
`Approximate voltage = ADC reading × 5.0 / 1023`

Example: ADC value 512 is approximately 2.50 V.

State that actual voltage estimates depend on the actual reference
voltage.

#### PWM

Explain pulse-width modulation as a digital signal that switches HIGH
and LOW quickly. Changing the percentage of time spent HIGH changes its
duty cycle and can control perceived LED brightness.

Classic Uno R3 PWM pins: **D3, D5, D6, D9, D10, D11**

For the classic Uno R3, `analogWrite()` uses values from 0--255 on
PWM-capable pins. It does not create a true analog voltage.

Create an interactive duty-cycle slider from 0% to 100%: - Show a
square-wave diagram whose pulse width changes. - Show the corresponding
approximate average of a 5 V waveform. - Clearly label the visual as a
conceptual simulation. - Explain that the actual electrical output
remains a switching waveform.

Include a digital/analog/PWM comparison table.

### Section 7 --- First Arduino Program

Explain the structure:

``` cpp
void setup() {
  // Runs once after startup or reset
}

void loop() {
  // Repeats while the board is running
}
```

Explain: - `setup()` initializes pins and communication. - `loop()`
repeatedly runs the main program. - Comments explain code and are not
executed.

Add a working Blink example:

``` cpp
const int ledPin = 13;

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

Mention that the built-in LED is typically connected to D13 on the
classic Uno R3. An external LED needs a suitable series resistor.

Explain the IDE workflow: 1. Select the board. 2. Select the correct
port. 3. Verify/compile. 4. Upload. 5. Open Serial Monitor when needed.

Include a copy-code button. It must actually copy the code and show a
visible success/failure message.

### Section 8 --- Sensor 1: LDR (Light Sensor)

Explain: - LDR = light-dependent resistor. - Its resistance generally
decreases as light intensity increases. - It is commonly measured using
a voltage divider. - The raw ADC reading depends on which side of the
divider contains the LDR.

Show wiring for the exact circuit below: - LDR leg 1 → 5V - LDR leg 2 →
A0 - Fixed 10 kΩ resistor between A0 and GND

With this arrangement, the reading generally rises as the light gets
brighter.

Code:

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

Explain that the Serial Monitor should be set to 9600 baud. Values and
thresholds depend on the actual LDR, resistor, and lighting conditions.

Add a simulated light slider only if it is clearly marked "Simulation".
Do not claim it is reading a physical sensor.

### Section 9 --- Sensor 2: HC-SR04 Ultrasonic Distance Sensor

Explain: - The module sends an ultrasonic burst. - It measures the time
until an echo returns. - Distance is half the sound's round-trip travel
distance.

Wiring: - VCC → 5V - GND → GND - TRIG → D9 - ECHO → D10

Code:

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

Explain: - The trigger pulse. - Why distance is divided by two. - Why
`pulseIn()` has a timeout. - Why soft, angled, or small objects may
cause unreliable readings.

Add an optional visual simulation of a target moving toward and away
from the sensor. Clearly mark all simulated readings.

### Section 10 --- Output Devices

Provide compact, accurate reference cards for these components. The main
60-minute journey should focus on LED, LDR, and ultrasonic sensor; the
rest are reference material that can be explored after the live
workshop.

#### LED

-   An LED emits light when forward-biased.
-   Use a series current-limiting resistor.
-   Longer lead is often anode on through-hole LEDs, but check the part.
-   Do not connect a bare LED directly across a supply.

#### Buzzer

-   Active buzzer: usually generates its own tone when powered.
-   Passive piezo buzzer: generally needs a changing signal such as
    `tone()`.
-   Check module current and voltage; use a transistor driver if GPIO
    current is insufficient.

Example for a suitable passive buzzer:

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

#### Servo motor (example: SG90)

Typical control wiring: - Signal → D9 - Ground → GND - Positive supply →
supply compatible with the servo

Code:

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

Explain that a servo accepts position commands via control pulses. It
may draw current peaks that make the Arduino reset; use an appropriate
supply when needed and connect grounds together for a shared signal
reference. Do not power a motor from a GPIO pin.

#### 16×2 LCD, parallel interface

Use a common HD44780-compatible LCD in 4-bit mode.

Example wiring: - LCD 1 VSS → GND - LCD 2 VDD → 5V - LCD 3 VO → wiper of
10 kΩ contrast potentiometer - LCD 4 RS → D12 - LCD 5 RW → GND - LCD 6 E
→ D11 - LCD 11 D4 → D5 - LCD 12 D5 → D4 - LCD 13 D6 → D3 - LCD 14 D7 →
D2 - LCD pins 7--10 unused in 4-bit mode - Backlight pins 15--16 wired
according to module polarity and current requirements

Code:

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

Explain contrast adjustment and note that some modules have different
backlight requirements.

#### I²C LCD extension

For a typical Uno R3: - SDA → A4 - SCL → A5 - VCC and GND →
module-compatible supply connections

Explain that an I²C backpack reduces the number of signal wires. The I²C
address must be checked; `0x27` and `0x3F` are common examples, not
guaranteed values.

#### Thermistor

Explain that an NTC thermistor's resistance decreases as temperature
rises.

For a common 10 kΩ NTC with a fixed 10 kΩ resistor: - Fixed resistor
from 5V to A0. - Thermistor from A0 to GND.

Explain that conversion to degrees requires the thermistor's nominal
resistance and beta/Steinhart--Hart parameters. Different thermistors
have different characteristics; do not imply that a generic formula is
perfectly calibrated.

### Section 11 --- Mini-project: Distance Warning System

Build a visual explanation of a simple project using: - Arduino Uno R3 -
HC-SR04 ultrasonic sensor - LED with a series resistor - Suitable
buzzer - Breadboard and jumper wires

Suggested pin mapping: - HC-SR04 TRIG → D9 - HC-SR04 ECHO → D10 - LED
anode through a suitable resistor → D6; cathode → GND - Suitable buzzer
signal → D8; GND → GND

Project logic: 1. Measure distance. 2. Ignore failed readings. 3. If an
object is closer than a chosen threshold, turn on the LED and beep. 4.
Otherwise, turn the LED off and silence the buzzer.

Include complete working code and a clear wiring diagram. Use `tone()`
only if the selected buzzer supports it; otherwise explain how to adapt
the output for an active buzzer module. Ensure the circuit never
requires powering a high-current load directly from a GPIO pin.

The visual simulation may animate a target and show how the warning
state changes, but label the simulated sensor values clearly. It must
not claim to be connected to a physical Arduino.

### Section 12 --- Troubleshooting Lab

Use interactive cards or an expandable checklist.

Common problems: - Arduino not detected: check the USB cable, port, and
board selection. - Upload fails: verify board/port and check whether
pins D0/D1 are interfering with serial communication. - LED does not
light: check polarity, resistor, pin mapping, and GND. - LDR reading
does not change: inspect the voltage divider and test A0 voltage. -
Ultrasonic distance shows no echo: check wiring, target angle, timeout,
and power. - LCD shows blocks: adjust contrast and check
initialization/wiring. - Servo causes resets: check supply capacity and
common ground. - Readings fluctuate: check loose connections, noise, and
sampling. - PWM does not work: verify the pin is PWM-capable.

Teach a debugging sequence: 1. Disconnect power before changing wiring.
2. Inspect the circuit. 3. Test one component at a time. 4. Print raw
sensor values. 5. Check the pin numbers in both code and wiring. 6. Add
components incrementally. 7. Test more than one condition.

### Section 13 --- Quick Quiz

Include 5--7 multiple-choice questions with immediate feedback and a
final score.

Suggested questions: 1. What does a microcontroller do? 2. Which
function runs once after startup? (`setup()`) 3. What is the typical
`analogRead()` range on the classic Uno R3? (0--1023) 4. Which of these
is a PWM pin on the classic Uno R3? (D9) 5. Why does an LED need a
series resistor? 6. Why is distance divided by two in the HC-SR04
calculation? 7. Why should a motor not be powered directly from a GPIO
pin?

Allow retrying the quiz.

### Section 14 --- Wrap-up and Next Steps

Recap: - Arduino is a convenient way to learn embedded systems. - Inputs
gather information. - Code makes decisions. - Outputs respond. - Correct
wiring and power are as important as code. - Start with one component,
test it, then build up.

Next steps: - Push buttons and debouncing. - RGB LEDs and PWM. - Servo
projects. - LCD and I²C. - Thermistor calibration. - Combining
sensors. - Non-blocking timing with `millis()`. - UART, I²C, SPI, and
interrupts.

Include a final CTA: **"Now build something real."**

------------------------------------------------------------------------

## 5. Required Interaction Features

Implement these as functional UI, not decorative mock controls:

1.  **Section navigation:** Click a section name to scroll to it.
2.  **Reading progress:** Progress bar updates as the user scrolls.
3.  **Scroll reveal:** Sections/cards animate into view.
4.  **Pinout explorer:** Select a pin or label and see its purpose.
5.  **PWM explorer:** Slider updates a waveform and duty-cycle value.
6.  **Code copy:** Copy code to clipboard and provide feedback.
7.  **Wiring diagrams:** Clear labels, pin names, and connection lines.
8.  **Quiz:** Answers can be selected; feedback and score update.
9.  **Back to top:** Scrolls to the hero.
10. **Mobile navigation:** Remains usable on narrow screens.
11. **Reduced motion:** Honour the user's OS accessibility preference.
12. **Simulation labels:** Any simulated sensor values are explicitly
    marked.

If a feature cannot be implemented robustly, simplify it rather than
leaving a fake button.

------------------------------------------------------------------------

## 6. Suggested Component Structure

Organize the React code into reusable components. Adapt this structure
if the existing project has a good convention.

``` text
src/
  components/
    Navbar.jsx
    ProgressBar.jsx
    SectionHeading.jsx
    AnimatedSection.jsx
    CircuitBackground.jsx
    PinoutExplorer.jsx
    CodeBlock.jsx
    WiringDiagram.jsx
    ComparisonTable.jsx
    SimulationBadge.jsx
    PWMExplorer.jsx
    Quiz.jsx
    BackToTop.jsx
  sections/
    HeroSection.jsx
    IntroSection.jsx
    BoardSection.jsx
    ElectronicsSection.jsx
    BreadboardSection.jsx
    SignalsSection.jsx
    FirstProgramSection.jsx
    LDRSection.jsx
    UltrasonicSection.jsx
    OutputDevicesSection.jsx
    MiniProjectSection.jsx
    TroubleshootingSection.jsx
    QuizSection.jsx
    WrapUpSection.jsx
  data/
    pinout.js
    quizQuestions.js
    codeExamples.js
  styles/
    globals.css
  App.jsx
  main.jsx
```

Keep long educational text and quiz data out of huge JSX blocks when
practical. Use consistent names and readable formatting.

------------------------------------------------------------------------

## 7. Accuracy and Electrical Safety Checklist

Before declaring the site complete, verify the following:

-   Board specifications are described as applying to the **classic
    Arduino Uno R3 with ATmega328P**.
-   Digital pins are D0--D13; analog inputs are A0--A5.
-   Classic Uno R3 PWM pins are D3, D5, D6, D9, D10, and D11.
-   `analogRead()` normally returns 0--1023 on its 10-bit ADC.
-   `analogWrite()` on classic Uno R3 PWM pins accepts 0--255 and
    produces PWM, not a true analog voltage.
-   A4/A5 are SDA/SCL for I²C on the classic Uno R3.
-   An LED has a series current-limiting resistor.
-   GPIO pins are not used as motor power supplies.
-   Voltage and current requirements are checked for each module.
-   Separate supplies used with non-isolated signal connections share a
    common ground where appropriate.
-   The LDR voltage-divider wiring agrees with the described reading
    direction.
-   Thermistor calculations state their assumptions and are not
    presented as universally calibrated.
-   HC-SR04 distance is calculated using round-trip time divided by two.
-   I²C LCD addresses are presented as examples rather than guarantees.
-   Simulations are not represented as real hardware readings.
-   Every code sample is formatted correctly and has matching pin
    mappings.
-   The mini-project has a complete wiring plan and code consistent with
    that plan.

Safety copy to display: - Never short 5V directly to GND. - Never
connect a voltage higher than a pin's rating. - Do not assume every
sensor is 5V tolerant. - Do not power motors directly from GPIO pins. -
Disconnect power before changing wiring. - Use a suitable external
supply for loads that exceed the board's practical power capability.

------------------------------------------------------------------------

## 8. Performance, Accessibility, and Final QA

-   Optimize images and avoid unnecessary large assets.
-   Lazy-load below-the-fold images where practical.
-   Prevent layout shifts as images load.
-   Use semantic headings in a logical order.
-   Ensure readable font sizes and high contrast.
-   Make interactive controls keyboard accessible and visibly focusable.
-   Provide alt text for meaningful images.
-   Keep code text selectable and copyable.
-   Check for console errors and broken links.
-   Check that the production build succeeds.
-   Test at approximately 1440px, 1024px, 768px, and 375px widths.
-   Test the quiz, copy buttons, navigation, sliders, and scroll
    progress.
-   Verify reduced-motion behavior.
-   Ensure the site remains useful even if optional external images fail
    to load.

------------------------------------------------------------------------

## 9. Final Deliverables

When finished, provide:

1.  A complete runnable React project.
2.  All source code and styles.
3.  The educational content and component explanations.
4.  Wiring diagrams and copyable code examples.
5.  Working interactions and quiz.
6.  A concise README with install/run/build commands.
7.  A list of any limitations or items that still need verification on
    physical hardware.

### Definition of done

The project is complete only when the site builds successfully, the main
interactions work, the page is responsive, and a beginner can follow the
learning sequence without prior electronics knowledge.

**Final design principle:** Make the page feel like an interactive
guided tour of electronics. Use animation to clarify how circuits and
signals work---not simply to make everything move.
