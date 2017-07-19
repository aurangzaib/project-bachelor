#include <Streaming.h>
#include <Servo.h>

#define throttle_speed  5 // pwm
#define throttle_forward 12 // digital
#define throttle_reverse 7  // digital
#define servo_direction 3 // pwm

Servo navigation ;
void setup() {
    Serial.begin(9600) ;
    pinMode(throttle_forward, OUTPUT) ;
    pinMode(throttle_reverse, OUTPUT) ;
    navigation.attach(servo_direction) ;
}

void loop() {
    if (Serial.available() > 0) {
        char serial_data = Serial.read() ;
        //
        // FORWARD
        //
        if (serial_data == 0) {
            digitalWrite(throttle_forward, HIGH) ; // close switch
            digitalWrite(throttle_reverse, LOW) ; // open switch
            analogWrite(throttle_speed, 254) ; // forward button pressed
            //
            // REVERSE
            //
        }
        if (serial_data == 1) {
            digitalWrite(throttle_forward , LOW);
            digitalWrite(throttle_reverse, HIGH) ;
            analogWrite(throttle_speed, 254) ;// reverse button pressed
        }
        //
        // STOP
        //
        if (serial_data == 2) {
            // i am using free stopping fast stop can also be used
            // by highing both forward and reverse pins but it
            // requires current to be < 2A
            digitalWrite(throttle_forward , HIGH);
            digitalWrite(throttle_reverse, HIGH) ;
            analogWrite(throttle_speed, 0) ;
        }
        //
        // RIGHT
        //
        if (serial_data == 3) {
            for (int a = 85; a != 168 ; a += 1) {// right button pressed
                navigation.write(a) ;
                delay(5) ;
            }
        }
        if (serial_data == 4) { // right button released
            for (int a = 168; a != 85 ; a -= 1) {
                navigation.write(a) ;
                delay(5) ;
            }
        }
        //
        // LEFT
        //
        if (serial_data == 5) {
            for (int a = 85; a != 17 ; a -= 1) { // left button pressed
                navigation.write(a) ;
                delay(5) ;
            }
        }
        if (serial_data == 6) { // left button released
            for (int a = 17; a != 85 ; a += 1) {
                navigation.write(a) ;
                delay(5) ;
            }
        }
    }
}
