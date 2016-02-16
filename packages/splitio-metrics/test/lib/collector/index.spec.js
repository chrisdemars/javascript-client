'use strict';

var tape = require('tape');
var Collector = require('../../../lib/collector');

tape('COLLECTOR should count based on ranges', function (assert) {
  var c1 = new Collector();

  c1.track(1);
  c1.track(1000);
  c1.track(1001);

  assert.true(c1.counters()[0] === 3, 'the bucket #0 should have 3');

  c1.track(1500);
  assert.true(c1.counters()[1] === 1, 'the bucket #1 should have 1');

  c1.track(3456);
  assert.true(c1.counters()[3] === 1, 'the bucket #3 should have 1');

  c1.track(985251);
  assert.true(c1.counters()[16] === 1, 'the bucket #17 should have 1');

  c1.track(985271);
  assert.true(c1.counters()[17] === 1, 'the bucket #18 should have 1');

  c1.track(7481830);
  assert.true(c1.counters()[22] === 1, 'the bucket #22 should have 1');

  assert.end();
});

tape('COLLECTOR should count based on ranges', function (assert) {
  var c1 = new Collector();

  c1.track(1);
  c1.track(1000);
  c1.track(1001);
  c1.track(1500);
  c1.track(3456);
  c1.track(985251);
  c1.track(985271);
  c1.track(7481830);

  assert.true(c1.clear().reduce(function (sum, c) {
    return sum += c;
  }, 0) === 0, 'after call clear, counters should be 0');

  assert.end();
});
//# sourceMappingURL=index.spec.js.map