
module.exports = {
  templateName: 'resources/ingress.yml',
  prompts: [
    {
      type: 'input',
      name: 'global-name',
      message: 'The file name (without extension)',
      validate: input => !!!input ? 'Please enter a value' : true,
    },
    {
      type: 'input',
      name: 'global-namespace',
      message: 'The name of the namespace',
      default: '${NAMESPACE}',
      validate: input => !!!input ? 'Please enter a value' : true,
    },
    {
      type: 'input',
      name: 'ingress-name',
      message: 'The name of the ingress',
      default: '${CI_PROJECT_PATH_SLUG}',
      validate: input => !!!input ? 'Please enter a value' : true,
    },
    {
      type: 'input',
      name: 'ingress-urls',
      message: 'Semicolon separated list of hosts (without http/https)',
      validate: input => !!!input ? 'Please enter a value' : true,
    },
  ],
  transformAnswers(data) {
    if (typeof data['ingress-urls'] === 'string') {
      data['ingress-urls'] = data['ingress-urls'].split(';').filter(Boolean);
    }
  }
};
