module.exports = {
  templateName: 'resources/service.yml',
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
      name: 'service-name',
      message: 'The name of the service?',
      default: '${CI_PROJECT_PATH_SLUG}',
      validate: input => !!!input ? 'Please enter a value' : true,
    },
  ],
};
