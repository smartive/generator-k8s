module.exports = {
  templateName: 'resources/deployment.yml',
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
      name: 'deployment-name',
      message: 'The name of the deployment?',
      default: '${CI_PROJECT_PATH_SLUG}',
      validate: input => !!!input ? 'Please enter a value' : true,
    },
    {
      type: 'input',
      name: 'deployment-image',
      message: 'The dockerimage to use?',
      default: '${CI_REGISTRY_IMAGE}:${CI_COMMIT_TAG}',
      validate: input => !!!input ? 'Please enter a value' : true,
    },
    {
      type: 'input',
      name: 'deployment-ports',
      message: 'The ports (semicolon separated) of the deployment (format: "name:port;name:port")?',
      default: 'http:80',
    },
  ],
  transformAnswers(data) {
    if (typeof data['global-app-name'] === 'string') {
      data['global-app-name'] = data['global-app-name'].trim();
    }
    if (typeof data['global-app-tier'] === 'string') {
      data['global-app-tier'] = data['global-app-tier'].trim();
    }
    if (typeof data['deployment-ports'] === 'string') {
      data['deployment-ports'] = data['deployment-ports']
        .trim()
        .split(';')
        .filter(Boolean)
        .map((port) => {
          const mapping = {};
          const split = port.trim().split(':');
          mapping.name = split[0];
          mapping.port = split[1];
          return mapping;
        });
    }
  },
};
