import createTestHelpers from '../createTestHelpers';
const {expectTransform, expectNoChange} = createTestHelpers(['destruct-param']);

describe('Destruct function param', () => {
  it('should transform when only props are accessed', () => {
    expectTransform(
      'function foo(cfg) {\n' +
      '  console.log(cfg.foo, cfg.bar);\n' +
      '}'
    ).toReturn(
      'function foo({foo, bar}) {\n' +
      '  console.log(foo, bar);\n' +
      '}'
    );
  });

  it('should not transform when is used without props-access', () => {
    expectNoChange(
      'function foo(cfg) {\n' +
      '  console.log(cfg, cfg.foo, cfg.bar);\n' +
      '}'
    );
  });

  it('should not transform computed props-access', () => {
    expectNoChange(
      'function foo(cfg) {\n' +
      '  console.log(cfg, cfg["foo-hoo"], cfg["bar-haa"]);\n' +
      '}'
    );
  });

  it('should not transform when props are modified', () => {
    expectNoChange(
      'function foo(cfg) {\n' +
      '  cfg.foo = 1;\n' +
      '  console.log(cfg.foo, cfg.bar);\n' +
      '}'
    );
  });

  it.skip('should not transform when param with name of prop already exists', () => {
    expectNoChange(
      'function foo(cfg, bar) {\n' +
      '  console.log(cfg.foo, cfg.bar);\n' +
      '}'
    );
  });

  it.skip('should not transform when variable with name of prop already exists', () => {
    expectNoChange(
      'function foo(cfg) {\n' +
      '  var foo = 10;\n' +
      '  console.log(cfg.foo, cfg.bar);\n' +
      '}'
    );
  });

  it('should not transform already destructed param', () => {
    expectNoChange(
      'function foo({cfg, cfg2}) {\n' +
      '  console.log(cfg.foo, cfg.bar);\n' +
      '}'
    );
  });
});
