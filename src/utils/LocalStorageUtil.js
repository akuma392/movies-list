// Utility for caching API responses in localStorage

const LocalStorageUtil = {
    get: (key) => {
        try {
            const cached = localStorage.getItem(key);
            if (!cached) return null;

            const { value, expiry } = JSON.parse(cached);

            // If expired, remove it
            if (expiry && Date.now() > expiry) {
                localStorage.removeItem(key);
                return null;
            }

            return value;
        } catch (error) {
            console.error("LocalStorage get error:", error);
            return null;
        }
    },

    set: (key, value, ttl = 60 * 60 * 1000) => {
        try {
            const expiry = ttl ? Date.now() + ttl : null; // ttl in ms
            const data = { value, expiry };
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error("LocalStorage set error:", error);
        }
    },

    remove: (key) => {
        localStorage.removeItem(key);
    },

    clear: () => {
        localStorage.clear();
    },
};

export default LocalStorageUtil;
