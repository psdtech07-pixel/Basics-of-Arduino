export interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const codeExamples: CodeExample[] = [
  {
    id: 'setup-loop',
    title: 'Sketch Structure — setup() & loop()',
    description: 'Every Arduino sketch has exactly these two functions. setup() runs once; loop() repeats forever.',
    code: `void setup() {
  // Runs ONCE after startup or reset
  // → Configure pins, start Serial, initialise libraries
  pinMode(13, OUTPUT);      // Set pin 13 as an output
  Serial.begin(9600);       // Open serial port at 9600 baud
}

void loop() {
  // Runs CONTINUOUSLY while the board has power
  // → Read sensors, make decisions, control outputs
  digitalWrite(13, HIGH);   // Set pin 13 HIGH (5V)
  delay(1000);              // Wait 1000 ms (1 second)
  digitalWrite(13, LOW);    // Set pin 13 LOW (0V)
  delay(1000);              // Wait 1 second
}`,
  },
  {
    id: 'blink',
    title: 'Blink — LED on Pin 13',
    description: 'The classic "Hello World" of Arduino. Blinks the built-in LED on pin 13 once per second.',
    code: `// Built-in LED is on pin 13 (labelled "L" on the board)
const int LED_PIN = 13;

void setup() {
  pinMode(LED_PIN, OUTPUT);   // Configure pin 13 as output
}

void loop() {
  digitalWrite(LED_PIN, HIGH); // LED ON  (5V on pin 13)
  delay(1000);                 // Wait 1 second
  digitalWrite(LED_PIN, LOW);  // LED OFF (0V on pin 13)
  delay(1000);                 // Wait 1 second
}
// The board loops this forever — blinking 1 second on, 1 second off.`,
  },
  {
    id: 'digital-io',
    title: 'Digital I/O — Button Controls LED',
    description: 'Use INPUT_PULLUP to safely read a button without an external resistor. Press = LOW.',
    code: `const int BUTTON_PIN = 2;  // Button connected to D2 and GND
const int LED_PIN    = 8;  // LED + 220Ω resistor on D8

void setup() {
  // INPUT_PULLUP: internal 20kΩ resistor pulls pin HIGH.
  // When button is pressed it connects pin to GND → reads LOW.
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int buttonState = digitalRead(BUTTON_PIN);

  if (buttonState == LOW) {
    // Button is pressed
    digitalWrite(LED_PIN, HIGH);
    Serial.println("Button PRESSED — LED ON");
  } else {
    // Button is released
    digitalWrite(LED_PIN, LOW);
    Serial.println("Button released — LED OFF");
  }
}`,
  },
  {
    id: 'pwm-fade',
    title: 'PWM Fade — Smooth LED Brightness',
    description: 'Use analogWrite(pin, 0–255) on a PWM pin (~) to fade an LED smoothly in and out.',
    code: `// Use a PWM-capable pin: D3, D5, D6, D9, D10, or D11
const int LED_PIN = 9;  // ~ symbol on the board means PWM

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  // Fade IN: 0 (off) → 255 (full brightness)
  for (int brightness = 0; brightness <= 255; brightness++) {
    analogWrite(LED_PIN, brightness); // Set PWM duty cycle
    delay(8);                         // ~2 seconds total fade-in
  }

  // Fade OUT: 255 → 0
  for (int brightness = 255; brightness >= 0; brightness--) {
    analogWrite(LED_PIN, brightness);
    delay(8);
  }
}
// analogWrite does NOT output a true analog voltage.
// It rapidly switches the pin HIGH/LOW — the duty cycle
// determines the apparent brightness.`,
  },
  {
    id: 'ldr-light',
    title: 'LDR Light Sensor — Read & React',
    description: 'Read an LDR via the 10-bit ADC (0–1023) and switch an LED based on a light threshold.',
    code: `const int LDR_PIN = A0;  // LDR + 10kΩ voltage divider on A0
const int LED_PIN = 8;   // LED + 220Ω resistor on D8

const int THRESHOLD = 400; // ADC value below which it's "dark"
                            // Calibrate by observing Serial Monitor

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lightLevel = analogRead(LDR_PIN); // Read 0–1023

  // Print to Serial Monitor for calibration
  Serial.print("Light ADC: ");
  Serial.print(lightLevel);

  if (lightLevel < THRESHOLD) {
    // It's dark → turn LED on as a night light
    digitalWrite(LED_PIN, HIGH);
    Serial.println(" → DARK: LED ON");
  } else {
    // Bright enough → LED off
    digitalWrite(LED_PIN, LOW);
    Serial.println(" → BRIGHT: LED OFF");
  }

  delay(300); // Wait 300 ms between readings
}`,
  },
  {
    id: 'ultrasonic',
    title: 'HC-SR04 Ultrasonic — Distance Measurement',
    description: 'Send a 10µs trigger pulse and measure the echo duration to calculate distance in cm.',
    code: `const int TRIG_PIN = 9;   // Trigger output (send pulse)
const int ECHO_PIN = 8;   // Echo input  (receive reflection)

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  // Step 1: Send a 10 µs HIGH trigger pulse
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);   // ≥10 µs HIGH pulse required
  digitalWrite(TRIG_PIN, LOW);

  // Step 2: Measure how long ECHO stays HIGH (timeout = 30 ms)
  unsigned long duration = pulseIn(ECHO_PIN, HIGH, 30000UL);

  // Step 3: Calculate distance
  // Speed of sound ≈ 343 m/s = 0.0343 cm/µs
  // Divide by 2 because the pulse travels to the object AND back
  if (duration == 0) {
    Serial.println("No echo — object out of range or too close");
  } else {
    float distanceCm = duration * 0.0343 / 2.0;
    Serial.print("Distance: ");
    Serial.print(distanceCm, 1);
    Serial.println(" cm");
  }

  delay(200); // 200 ms between measurements
}`,
  },
  {
    id: 'buzzer',
    title: 'Active & Passive Buzzer',
    description: 'Active buzzer: just set HIGH. Passive buzzer: use tone() with a frequency for melody control.',
    code: `// --- ACTIVE BUZZER (simpler) ---
// Active buzzer beeps when you set the pin HIGH.
const int BUZZER_PIN = 8;

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  digitalWrite(BUZZER_PIN, HIGH); // Buzzer ON
  delay(500);
  digitalWrite(BUZZER_PIN, LOW);  // Buzzer OFF
  delay(500);
}

// --- PASSIVE BUZZER (tone control) ---
// Use tone(pin, frequency) for melody and noTone() to stop.
// tone(BUZZER_PIN, 1000);    // 1 kHz tone
// tone(BUZZER_PIN, 2000);    // 2 kHz tone
// noTone(BUZZER_PIN);        // Stop any tone`,
  },
  {
    id: 'servo',
    title: 'Servo Motor — Position Control',
    description: 'The Servo library generates precise PWM timing. Write angles 0°–180° directly.',
    code: `#include <Servo.h>   // Include the built-in Servo library

Servo myServo;           // Create a Servo object

void setup() {
  myServo.attach(9);     // Attach servo signal wire to pin D9
  Serial.begin(9600);
}

void loop() {
  // Sweep from 0° to 180° in steps of 10°
  for (int angle = 0; angle <= 180; angle += 10) {
    myServo.write(angle);        // Command the servo to move
    Serial.print("Angle: ");
    Serial.println(angle);
    delay(100);                  // Wait for servo to reach position
  }

  delay(500);

  // Sweep back
  for (int angle = 180; angle >= 0; angle -= 10) {
    myServo.write(angle);
    delay(100);
  }

  delay(500);
}
// Note: Power the servo from an external 5V supply for larger servos
// — the Arduino's 5V pin may not supply enough current.`,
  },
  {
    id: 'lcd',
    title: '16×2 I²C LCD Display',
    description: 'Install LiquidCrystal_I2C from Library Manager. Only 4 wires needed via I²C (A4=SDA, A5=SCL).',
    code: `#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// LiquidCrystal_I2C(address, columns, rows)
// Common addresses: 0x27 or 0x3F — run I2C scanner if unsure
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  lcd.init();            // Initialise the LCD
  lcd.backlight();       // Turn on the backlight

  // Row 0 (top), Column 0 (leftmost)
  lcd.setCursor(0, 0);
  lcd.print("Arduino Master");

  // Row 1 (bottom)
  lcd.setCursor(0, 1);
  lcd.print("Hello, World!");
}

void loop() {
  // Display stays — nothing needed here unless you update it
  // Example: update a reading every second
  // lcd.setCursor(0, 1);
  // lcd.print(analogRead(A0));
}`,
  },
  {
    id: 'distance-warning',
    title: 'Mini-Project: Distance Warning System',
    description: 'Combines HC-SR04, LED, and buzzer. LED and buzzer activate when an object comes within 20 cm.',
    code: `// ─── DISTANCE WARNING SYSTEM ───────────────────────────────
// HC-SR04 on D9 (TRIG) + D8 (ECHO)
// Warning LED + 220Ω on D4
// Active buzzer on D7
// ─────────────────────────────────────────────────────────────

const int TRIG_PIN      = 9;
const int ECHO_PIN      = 8;
const int LED_PIN       = 4;
const int BUZZER_PIN    = 7;
const float THRESHOLD   = 20.0; // cm — adjust as needed

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN,   OUTPUT);
  pinMode(ECHO_PIN,   INPUT);
  pinMode(LED_PIN,    OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  Serial.println("Distance Warning System — Ready");
}

float measureDistance() {
  // Send 10 µs trigger pulse
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Measure echo pulse (timeout at 30 ms)
  unsigned long duration = pulseIn(ECHO_PIN, HIGH, 30000UL);
  if (duration == 0) return -1.0; // No echo

  return duration * 0.0343 / 2.0;
}

void loop() {
  float dist = measureDistance();

  if (dist < 0) {
    Serial.println("Out of range");
    digitalWrite(LED_PIN, LOW);
    noTone(BUZZER_PIN);
    delay(100);
    return;
  }

  Serial.print("Distance: ");
  Serial.print(dist, 1);
  Serial.print(" cm — ");

  if (dist < THRESHOLD) {
    // WARNING: object too close
    digitalWrite(LED_PIN, HIGH);
    tone(BUZZER_PIN, 1000);     // 1 kHz alert tone
    Serial.println("⚠ WARNING!");
  } else {
    // SAFE: object far enough
    digitalWrite(LED_PIN, LOW);
    noTone(BUZZER_PIN);
    Serial.println("SAFE");
  }

  delay(150);
}`,
  },
];
