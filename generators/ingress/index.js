const BaseGenerator = require('../base-generator');
const ingress = require('../../resourceMetadata/ingress');

class IngressGenerator extends BaseGenerator {
  configuring() {
    this.metadata.push(ingress);
  }

  async defaultAskQuestions() {
    await super.defaultAskQuestions();
  }

  writing() {
    super.writing();
  }
}

module.exports = IngressGenerator;
