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
      name: 'service-name',
      message: 'The name of the service?',
      default: '${CI_PROJECT_PATH_SLUG}',
      validate: input => !!!input ? 'Please enter a value' : true,
    },
    {
      type: 'input',
      name: 'service-selector',
      message: 'The selector of the service (app and tier are added if given)?',
      default: '${CI_PROJECT_PATH_SLUG}',
      validate: input => !!!input ? 'Please enter a value' : true,
    },
    {
      type: 'input',
      name: 'service-ports',
      message: 'The ports (semicolon separated) of the service (format: "name:port;name:port")?',
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
    if (typeof data['service-ports'] === 'string') {
      data['service-ports'] = data['service-ports']
        .trim()
        .split(';')
        .filter(Boolean)
        .map((port) => {
          const mapping = {};
          const split = port.split(':');
          mapping.name = split[0];
          mapping.port = split[1];
          return mapping;
        });
    }
  },
};
