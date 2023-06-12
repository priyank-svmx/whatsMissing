/**
 *
 * implementing promise
 */

const proto = {
  then: function (callBack) {
    const chainPromise = new _promise((res, rej) => {});
    const checkAndResolve = () => {
      if (this.resolved) {
        const chainValue = callBack(this.value);
        chainPromise.resolve(chainValue);
      } else {
        setTimeout(checkAndResolve, 300);
      }
    };
    checkAndResolve();
    return chainPromise;
  },

  resolve: function (value) {
    this.resolved = true;
    this.value = value;
  }
};

function _promise(callBack) {
  const promiseObject = Object.create(proto);
  promiseObject.resolved = false;
  promiseObject.value = null;
  const res = (val) => {
    promiseObject.resolved = true;
    promiseObject.value = val;
  };
  const rej = (val) => (promiseObject.reject = val);
  callBack(res, rej);
  return promiseObject;
}

const testPromise = new _promise((res, rej) => {
  setTimeout(() => {
    res(2004);
  }, 1000);
});

setTimeout(() => console.log(testPromise), 3000);

testPromise.then((val) => {
  console.log(val, 100);
});
