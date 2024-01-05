const config = {
    moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    // verbose: true, 
    testEnvironment: "jsdom", 
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], 
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    // testMatch: [
    //     '<rootDir>/**/*.test.(js|jsx|ts|tsx)', '<rootDir>/(/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
    // ],
    // transformIgnorePatterns: ['/node_modules/'] : default 
    transformIgnorePatterns: ["/node_modules/(?!(react-bootstrap-tagsinput))"], 
}

module.exports = config;