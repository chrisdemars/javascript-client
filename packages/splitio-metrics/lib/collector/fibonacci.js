/* @flow */'use strict';

var findIndex = require('@splitsoftware/splitio-utils/lib/binarySearch').bind(null, [1, 1.5, 2.25, 3.38, 5.06, 7.59, 11.39, 17.09, 25.63, 38.44, 57.67, 86.5, 129.75, 194.62, 291.93, 437.89, 656.84, 985.26, 1477.89, 2216.84, 3325.26, 4987.89, 77481.83]);

function FibonacciCollector() {
  this.clear();
}

// Latency counters based on the internal ranges
FibonacciCollector.prototype.state = function () /*: array<number> */{
  return this.counters;
};

// Store latency and return the number of occurrencies inside the range
// defined
FibonacciCollector.prototype.track = function (latency /*: number */) /*: number */{
  return ++this.counters[findIndex(latency)];
};

// Recycle the collector (reset using 0 for all the counters)
FibonacciCollector.prototype.clear = function () /*: FibonacciCollector */{
  this.counters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return this;
};

// Hook JSON.stringify to expose the state of the counters
FibonacciCollector.prototype.toJSON = function () {
  return this.counters;
};

// Check if the is data changed from the defaults
FibonacciCollector.prototype.isEmpty = function () {
  return this.counters.reduce(function (sum, e) {
    return sum += e;
  }, 0) === 0;
};

module.exports = function FibonacciCollectorFactory() {
  return new FibonacciCollector();
};
//# sourceMappingURL=fibonacci.js.map