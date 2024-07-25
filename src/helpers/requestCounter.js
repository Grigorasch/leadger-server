module.exports = function () {
  let totalRequests = 0;
  let currentRequests = 0;
  return {
    addRequst: function () {
      totalRequests++;
      currentRequests++;
    },
    removeRequest: function () {
      currentRequests--;
    },
    getTotalRequests: function () {
      return totalRequests;
    },
    getCurrentRequests: function () {
      return currentRequests;
    },
  };
};
