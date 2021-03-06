const { describe, it } = require('mocha');
require('should');

const { exec, args } = require('./exec');

describe('Step', () => {
  it('should log step', () => {
    exec('test/features/step.feature', '--name', 'Step name', ...args).should.containEql(
      '    Given noop\n' +
      '    When noop\n' +
      '    Then noop\n' +
      '    And noop\n' +
      '    But noop\n'
    );
  });

  it('should log ambiguous step', () => {
    exec('test/features/step.feature', '--name', 'Ambiguous step', ...args).should.containEql(
      '    When ambiguous\n' +
      '    ✖ ambiguous\n'
    );
  });

  it('should log failed step', () => {
    exec('test/features/step.feature', '--name', 'Failed step', ...args).should.containEql(
      '    When failed\n' +
      '    ✖ failed\n'
    );
  });

  it('should log passed step', () => {
    exec('test/features/step.feature', '--name', 'Passed step', ...args).should.match(
      / {4}When passed\n(?! {4})/
    );
  });

  it('should log pending step', () => {
    exec('test/features/step.feature', '--name', 'Pending step', ...args).should.containEql(
      '    When pending\n' +
      '    ? pending\n'
    );
  });

  it('should log skipped step', () => {
    exec('test/features/step.feature', '--name', 'Skipped step', ...args).should.containEql(
      '    When skipped\n' +
      '    - skipped\n'
    );
  });

  it('should log undefined step', () => {
    exec('test/features/step.feature', '--name', 'Undefined step', ...args).should.containEql(
      '    When undefined\n' +
      '    ? undefined\n'
    );
  });

  it('should log error', () => {
    exec('test/features/step.feature', '--name', 'Failed step', ...args).should.containEql(
      '    When failed\n' +
      '    ✖ failed\n' +
      '      Error: FAILED\n' +
      '          at World'
    );
  });
});
