module.exports = {
  templateName: 'resources/config.yml',
  prompts: [
    {
      type: 'input',
      name: 'global-name',
      message: 'The file name (without extension)?',
      validate: input => !!!input ? 'Please enter a value' : true,
    },
    {
      type: 'input',
      name: 'global-namespace',
      message: 'The name of the namespace?',
      default: '${NAMESPACE}',
      validate: input => !!!input ? 'Please enter a value' : true,
    },
    {
      type: 'input',
      name: 'global-app-name',
      message: 'The name of the app (if any)?',
      default: '${CI_PROJECT_PATH_SLUG}',
    },
    {
      type: 'input',
      name: 'global-app-tier',
      message: 'The tier name of the app (if any)?',
    },
    {
      type: 'input',
      name: 'config-name',
      message: 'The name of the config map?',
      default: '${CI_PROJECT_PATH_SLUG}',
      validate: input => !!!input ? 'Please enter a value' : true,
    },
    {
      type: 'confirm',
      name: 'config-enter-values',
      message: 'Do you wish to preenter values into the config?',
      default: false,
    },
    {
      type: 'editor',
      name: 'config-values',
      message: 'Enter the values in the editor, description is given in the editor.',
      default: '# Enter values in the following format: NAME: VALUE\n# Lines with # are ignored.\n\n',
      when: answers => answers['config-enter-values']
    },
  ],
  transformAnswers(data) {
    if (typeof data['global-app-name'] === 'string') {
      data['global-app-name'] = data['global-app-name'].trim();
    }
    if (typeof data['global-app-tier'] === 'string') {
      data['global-app-tier'] = data['global-app-tier'].trim();
    }
    if (!data['config-values']) {
      data['config-values'] = ['CONFIG: DATA'];
    } else if (typeof data['config-values'] === 'string') {
      data['config-values'] = data['config-values']
        .split('\n')
        .filter(Boolean)
        .filter(line => !line.trim().startsWith('#'))
    }
  },
};
