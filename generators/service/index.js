const BaseGenerator = require('../base-generator');
const service = require('../../resourceMetadata/service');

class ServiceGenerator extends BaseGenerator {
  configuring() {
    this.metadata.push(service);
  }

  async defaultAskQuestions() {
    await super.defaultAskQuestions();
  }

  writing() {
    super.writing();
  }
}

module.exports = ServiceGenerator;
