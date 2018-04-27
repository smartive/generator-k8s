const IngressGenerator = require('../../generators/ingress');
const { readFile, pathExists } = require('fs-extra');
const { join } = require('path');
const helpers = require('yeoman-test');

const defaultPrompts = {
  'global-name': 'resource',
  'global-namespace': '${NAMESPACE}',
  'ingress-name': '${CI_PROJECT_PATH_SLUG}',
  'ingress-urls': 'smartive.ch;www.smartive.ch',
};

describe('Resource Generator: Ingress', () => {

  it('should generate a resource file', async () => {
    const folder = await helpers
      .run(IngressGenerator)
      .withPrompts(defaultPrompts);
    expect(await pathExists(join(folder, 'resource.yml'))).toBe(true);
  });

  it('should generate a host for a single url', async () => {
    const folder = await helpers
      .run(IngressGenerator)
      .withPrompts({
        ...defaultPrompts,
        'ingress-urls': 'smartive.ch',
      });
    const content = await readFile(join(folder, 'resource.yml'), 'utf8');
    expect(content).toMatchSnapshot();
  });

  it('should generate a host for multiple urls', async () => {
    const folder = await helpers
      .run(IngressGenerator)
      .withPrompts({
        ...defaultPrompts,
        'ingress-urls': 'smartive.ch;www.smartive.ch',
      });
    const content = await readFile(join(folder, 'resource.yml'), 'utf8');
    expect(content).toMatchSnapshot();
  });

  it('should not generate a host for an empty url', async () => {
    const folder = await helpers
      .run(IngressGenerator)
      .withPrompts({
        ...defaultPrompts,
        'ingress-urls': 'smartive.ch;www.smartive.ch;;',
      });
    const content = await readFile(join(folder, 'resource.yml'), 'utf8');
    expect(content).toMatchSnapshot();
  });

});
