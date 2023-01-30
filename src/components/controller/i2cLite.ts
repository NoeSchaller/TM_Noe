class I2cLite {
  protected robot: MaqueenLite;

  constructor(robot: MaqueenLite) {
    this.robot = robot;
  }

  write(adresse: number, byte: Uint16Array) {
    if (adresse == 0x10) {
      const register: number = byte[0];

      //gestion des moteur
      if (register == 0x00) {
        if (byte.length == 3) {
          const dirL = byte[1],
            pL = byte[2];
          this.robot.leftMotor.setSpeed(dirL, pL);
        } else if (byte.length >= 5) {
          const dirL = byte[1],
            pL = byte[2],
            dirR = byte[3],
            pR = byte[4];
          this.robot.leftMotor.setSpeed(dirL, pL);
          this.robot.rightMotor.setSpeed(dirR, pR);
        }
      } else if (register == 0x02) {
        const dirR = byte[1],
          pR = byte[2];
        this.robot.rightMotor.setSpeed(dirR, pR);
      }
    }
  }
}
