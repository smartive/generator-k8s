module.exports = {
  templateName: 'resources/secret.yml',
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
      name: 'secret-name',
      message: 'The name of the secret map?',
      default: '${CI_PROJECT_PATH_SLUG}',
      validate: input => !!!input ? 'Please enter a value' : true,
    },
    {
      type: 'confirm',
      name: 'secret-enter-values',
      message: 'Do you wish to preenter values into the secret?',
      default: false,
    },
    {
      type: 'editor',
      name: 'secret-values',
      message: 'Enter the values in the editor, description is given in the editor.',
      default: '# Enter values in the following format: NAME: VALUE\n# Lines with # are ignored.\n# The VALUE is base64 encoded.\n\n',
      when: answers => answers['secret-enter-values']
    },
  ],
  transformAnswers(data) {
    if (typeof data['global-app-name'] === 'string') {
      data['global-app-name'] = data['global-app-name'].trim();
    }
    if (typeof data['global-app-tier'] === 'string') {
      data['global-app-tier'] = data['global-app-tier'].trim();
    }
    if (!data['secret-values']) {
      data['secret-values'] = ['secret: DATA'];
    } else if (typeof data['secret-values'] === 'string') {
      data['secret-values'] = data['secret-values']
        .split('\n')
        .filter(Boolean)
        .filter(line => !line.trim().startsWith('#'))
        .map((line) => {
          const split = line.split(':');
          if (split.length < 2) {
            return null;
          }
          return `${split[0]}: ${Buffer.from(split[1]).toString('base64')}`;
        })
        .filter(Boolean);
    }
  },
};
