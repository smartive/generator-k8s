const BaseGenerator = require('../base-generator');
const { readdir, stat } = require('fs-extra');
const { join } = require('path');

class AppGenerator extends BaseGenerator {
  async prompting() {
    const path = join(__dirname, '..');
    const contents = await readdir(path);
    const resources = [];

    for (const name of contents) {
      const stats = await stat(join(path, name));
      if (stats.isDirectory() && name !== 'app') {
        resources.push(name);
      }
    }

    const answers = await this.prompt({
      type: 'checkbox',
      name: 'selected-resources',
      message: 'Select the desired resources',
      choices: resources.sort(),
      validate: answers => answers.length > 0 ? true : 'Please select at least one element.',
    });

    this.selectedResources = answers['selected-resources'];
  }

  configuring() {
    for (const resource of this.selectedResources) {
      this.metadata.push(require(`../../resourceMetadata/${resource}`));
    }
  }

  async defaultAskQuestions() {
    await super.defaultAskQuestions();
  }

  writing() {
    super.writing();
  }
}

module.exports = AppGenerator;
