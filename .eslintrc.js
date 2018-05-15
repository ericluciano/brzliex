module.exports = {
    "extends": "airbnb",
    "globals": {
      "window": true,
      "document": true
    },
    "rules": {
      "react/jsx-filename-extension": [0],
      "jsx-a11y/anchor-is-valid": ["error", {
       components: ["Link"],
       specialLink: ["to"],
       aspects: ["noHref", "invalidHref", "preferButton"],
       }],
    }
};
