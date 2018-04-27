const { render } = require('ejs');
const { uniqBy } = require('lodash');
const { join } = require('path');
const Generator = require('yeoman-generator');

class BaseGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.metadata = [];
    this.sourceRoot(join(__dirname, '..', 'templates'));
  }

  async defaultAskQuestions() {
    this.log('Gather the information.');
    const answers = await this.prompt(this._getPrompts());
    for (const transformer of this._getTransformers()) {
      transformer(answers);
    }
    this.answers = answers;
  }

  writing() {
    this.log('Write the file content.');

    const contents = [];

    for (const tpl of this._getTemplates()) {
      this.log(`Add template "${tpl}".`);
      const tplContent = this.fs.read(this.templatePath(tpl));
      contents.push(
        render(tplContent, { data: this.answers }),
      );
    }

    this.fs.write(this.destinationPath(`${this.answers['global-name']}.yml`), contents.join('---\n'));
  }

  _getPrompts() {
    const prompts = [].concat(...this.metadata.map(data => data.prompts));
    return uniqBy(prompts, 'name');
  }

  _getTransformers() {
    return this.metadata.map(data => data.transformAnswers).filter(Boolean);
  }

  _getTemplates() {
    return this.metadata.map(data => data.templateName);
  }
}

module.exports = BaseGenerator;
