import * as libs from './libs';
import _ from 'lodash';
import {assert, test as helpers} from 'yeoman-generator';

describe('videojs-plugin:app options', function() {

  describe('--bcov', function() {
    before(function(done) {
      helpers.run(libs.GENERATOR_PATH)
        .withOptions(libs.options({
          bcov: true
        }))
        .withPrompts({
          name: 'options-bcov',
          author: 'ignored',
          description: 'doesn\'t matter'
        })
        .on('end', libs.onEnd.bind(this, done));
    });

    it('produces expected package properties and file(s)', function() {
      assert.strictEqual(this.pkg.author, 'Brightcove, Inc.');
      assert.strictEqual(this.pkg.license, 'Apache-2.0');
      assert.ok(_.isUndefined(this.pkg.private));
      assert.file(libs.fileList('oss'));
    });
  });

  describe('--bcov + private license', function() {
    before(function(done) {
      helpers.run(libs.GENERATOR_PATH)
        .withOptions(libs.options({
          bcov: true
        }))
        .withPrompts({
          name: 'options-bcov-private',
          author: 'ignored',
          description: 'doesn\'t matter',
          license: 'private'
        })
        .on('end', libs.onEnd.bind(this, done));
    });

    it('produces expected package properties and file(s)', function() {
      assert.strictEqual(this.pkg.author, 'Brightcove, Inc.');
      assert.strictEqual(this.pkg.license, 'Private/Closed Source');
      assert.strictEqual(this.pkg.private, true);
      assert.noFile(libs.fileList('oss'));
    });
  });
});
