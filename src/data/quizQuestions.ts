export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctId: string;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What does a microcontroller do?',
    options: [
      { id: 'a', text: 'Stores only analog signals' },
      { id: 'b', text: 'Executes instructions and interacts with connected hardware' },
      { id: 'c', text: 'Only amplifies electrical signals' },
      { id: 'd', text: 'Converts AC power to DC power' },
    ],
    correctId: 'b',
    explanation: 'A microcontroller contains a CPU that executes your program instructions. It can read from sensors, make decisions in code, and control outputs like LEDs, motors, and displays \u2014 all in one compact chip.',
  },
  {
    id: 'q2',
    question: 'Which Arduino function runs exactly once after startup or reset?',
    options: [
      { id: 'a', text: 'loop()' },
      { id: 'b', text: 'begin()' },
      { id: 'c', text: 'setup()' },
      { id: 'd', text: 'init()' },
    ],
    correctId: 'c',
    explanation: 'setup() runs once when the board powers on or is reset. It is used to configure pin modes, start Serial communication, and initialize libraries. After setup() finishes, loop() begins repeating.',
  },
  {
    id: 'q3',
    question: 'What is the typical range of values returned by analogRead() on the classic Arduino Uno R3?',
    options: [
      { id: 'a', text: '0 to 255' },
      { id: 'b', text: '0 to 5' },
      { id: 'c', text: '0 to 4095' },
      { id: 'd', text: '0 to 1023' },
    ],
    correctId: 'd',
    explanation: 'The classic Uno R3 has a 10-bit ADC (analog-to-digital converter). A 10-bit ADC can represent 2\u00b9\u2070 = 1024 levels, giving values from 0 to 1023. With a 5V reference, 1023 represents approximately 5V.',
  },
  {
    id: 'q4',
    question: 'Which of these is a PWM-capable pin on the classic Arduino Uno R3?',
    options: [
      { id: 'a', text: 'D4' },
      { id: 'b', text: 'D9' },
      { id: 'c', text: 'A2' },
      { id: 'd', text: 'D7' },
    ],
    correctId: 'b',
    explanation: 'The PWM-capable pins on the classic Uno R3 are D3, D5, D6, D9, D10, and D11 (marked with ~ on the board). D9 is commonly used for servo control with the Servo library. D4, D7, and analog pins A2 do not support PWM.',
  },
  {
    id: 'q5',
    question: 'Why does a bare LED always need a series current-limiting resistor?',
    options: [
      { id: 'a', text: 'To make it glow brighter' },
      { id: 'b', text: 'To protect it from moisture' },
      { id: 'c', text: 'To limit current so the LED and the GPIO pin are not damaged' },
      { id: 'd', text: 'To reverse its polarity' },
    ],
    correctId: 'c',
    explanation: 'An LED has a very low resistance when forward-biased. Without a series resistor, current can rise to a damaging level almost instantly. The resistor limits current to a safe range (often around 10\u201320 mA for typical LEDs), protecting both the LED and the GPIO pin.',
  },
  {
    id: 'q6',
    question: 'In the HC-SR04 distance calculation, why is the measured pulse duration divided by two?',
    options: [
      { id: 'a', text: 'Because the sensor uses 2.5V logic' },
      { id: 'b', text: 'Because sound travels twice as fast underwater' },
      { id: 'c', text: 'Because the pulse represents round-trip time \u2014 sound goes to the object and returns' },
      { id: 'd', text: 'To convert from microseconds to milliseconds' },
    ],
    correctId: 'c',
    explanation: 'The HC-SR04 measures the time from the trigger pulse until the echo returns. This time covers the sound wave travelling to the object AND back. Dividing by 2 gives the one-way travel time. Then multiplying by the speed of sound gives the distance to the object.',
  },
  {
    id: 'q7',
    question: 'Does analogWrite() on the classic Uno R3 produce a true steady analog voltage?',
    options: [
      { id: 'a', text: 'Yes \u2014 it uses a built-in DAC to generate a smooth voltage' },
      { id: 'b', text: 'No \u2014 it generates a PWM waveform that rapidly switches between 0V and 5V' },
      { id: 'c', text: 'Yes \u2014 it uses a capacitor to smooth the output automatically' },
      { id: 'd', text: 'No \u2014 it only works on analog pins A0\u2013A5' },
    ],
    correctId: 'b',
    explanation: 'The classic Uno R3 does not have a DAC (digital-to-analog converter). analogWrite() produces a PWM (pulse-width modulation) signal \u2014 a digital output that switches rapidly between 0V and 5V. The ratio of time spent HIGH vs LOW is the duty cycle. Many loads (like LEDs and motors) respond to the average voltage, but the actual output is always either 0V or 5V.',
  },
];
