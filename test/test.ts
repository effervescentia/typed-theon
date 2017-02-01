import test = require('blue-tape');

import theon = require('theon');

test('theon exists', (t) => {
  t.plan(1);
  t.notEquals(theon, undefined);
});
