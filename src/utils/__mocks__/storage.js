const mockStorage = (storageToMock) => {
  let storage = {};

  const mock = {
    setItem: (key, val) => {
      storage[key] = val;
    },

    getItem: (key) => {
      return storage[key] || null;
    },

    removeItem: (key) => {
      storage[key] = null;
    },

    clear: () => {
      storage = {};
    },
  };

  Object.defineProperty(global, storageToMock, {
    get: () => mock,
  });
  Object.defineProperty(window, storageToMock, {
    get: () => mock,
  });
};

export default mockStorage;
