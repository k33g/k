/**
 * Created by k33g_org on 17/01/16.
 */

import assert from 'assert';

/**
 * This is a test ...
 */
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
