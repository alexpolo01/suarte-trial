module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "globals": {
        "app": "writable",
        "assert": "writable",
        "collectorToken": "writable",
        "artistToken": "writable",
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": [
            "error",
            {
                "varsIgnorePattern": "should|expect|supertest|assert|app"
            }
        ],
        "curly": [
            "error",
            "all"
        ],
        "brace-style": [
            "error",
            "allman"
        ],
    }
};