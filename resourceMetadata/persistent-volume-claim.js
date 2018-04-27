module.exports = {
  templateName: 'resources/persistent-volume-claim.yml',
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
      name: 'pvc-name',
      message: 'The name of the volume claim?',
      default: '${CI_PROJECT_PATH_SLUG}',
    },
    {
      type: 'checkbox',
      name: 'pvc-access-modes',
      message: 'Which access modes?',
      choices: ['ReadWriteOnce', 'ReadOnlyMany', 'ReadWriteMany'],
      default: ['ReadWriteOnce'],
      validate: input => input.length > 0 ? true : 'Please select at least one.',
    },
    {
      type: 'input',
      name: 'pvc-size',
      message: 'How big should the PVC be?',
      default: '5Gi',
      validate: input => !!!input ? 'Please enter a value' : true,
    },
  ],
  transformAnswers(data) {
    if (typeof data['global-app-name'] === 'string') {
      data['global-app-name'] = data['global-app-name'].trim();
    }
    if (typeof data['global-app-tier'] === 'string') {
      data['global-app-tier'] = data['global-app-tier'].trim();
    }
  },
};
