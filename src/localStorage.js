// This is a wrapper around `window.localStorage` that handles serialization
// and `storage` event listeners
export default {
  get(key) {
    const value = window.localStorage.getItem(key);
    if (value == null) {
      return null;
    }
    return this.parseValue(value);
  },
  set(key, value) {
    return window.localStorage.setItem(key, this.stringifyValue(value));
  },
  has(key) {
    return window.localStorage.getItem(key) != null;
  },
  unset(key) {
    return window.localStorage.setItem(key, null);
  },
  parseValue(value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  },
  stringifyValue(value) {
    return JSON.stringify(value);
  },
  onUpdate(key, callback) {
    const listener = (event) => {
      if (
        event.storageArea === window.localStorage
        && event.key === key
        && event.oldValue !== event.newValue
      ) {
        callback(this.parseValue(event.newValue));
      }
    };
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  },
};
