const BaseGenerator = require('./base-generator');

module.exports = (resource) => class extends BaseGenerator {
  configuring() {
    this.metadata.push(require(`../resourceMetadata/${resource}`));
  }

  async defaultAskQuestions() {
    await super.defaultAskQuestions();
  }

  writing() {
    super.writing();
  }
};
