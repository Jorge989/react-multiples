module.exports = {
  rootDir: "src",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
    "^.+\\.s?css$": "jest-css-modules-transform",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!react-icons)/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "single-spa-react/parcel": "single-spa-react/lib/cjs/parcel.cjs",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleDirectories: ["node_modules"],
};
