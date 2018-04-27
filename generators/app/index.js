const BaseGenerator = require('../base-generator');

class AppGenerator extends BaseGenerator {
  writing() {
    super.writing();
    console.log('app');
  }
}

module.exports = AppGenerator;
