const metadata = require('../../resourceMetadata/ingress');

describe('Resource Metadata: Ingress', () => {

  it('should transform the urls to an array', async () => {
    const data = {
      'ingress-urls': 'foo;bar',
    };
    metadata.transformAnswers(data);
    expect(data['ingress-urls']).toBeInstanceOf(Array);
    expect(data['ingress-urls']).toContain('foo');
    expect(data['ingress-urls']).toContain('bar');
  });

  it('should transform a single url to an array', async () => {
    const data = {
      'ingress-urls': 'foo',
    };
    metadata.transformAnswers(data);
    expect(data['ingress-urls']).toBeInstanceOf(Array);
    expect(data['ingress-urls']).toContain('foo');
    expect(data['ingress-urls']).not.toContain('bar');
  });

  it('should not throw on non string elements', () => {
    const data = {
      'ingress-urls': ['foo'],
    };
    const fn = () => metadata.transformAnswers(data);
    expect(fn).not.toThrow();
  });

});
