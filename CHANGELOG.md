# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.4](https://github.com/fragsalat/monteur/compare/v0.2.3...v0.2.4) (2022-02-10)


### Bug Fixes

* **unframed:** Clear target container on destroy to allow re-render ([07079c8](https://github.com/fragsalat/monteur/commit/07079c8f99a788c6ae16ba91f7277598e3f70d21))

### [0.2.3](https://github.com/fragsalat/monteur/compare/v0.2.2...v0.2.3) (2022-01-20)


### Bug Fixes

* **all:** Increased timeout waiting for fragment for slow connections ([6047155](https://github.com/fragsalat/monteur/commit/604715507bb1d66fc83bded8d8b2af0c328b23b5))

### [0.2.2](https://github.com/fragsalat/monteur/compare/v0.2.1...v0.2.2) (2021-12-06)


### Bug Fixes

* **all:** Added fragment destruction from host ([d7c12b8](https://github.com/fragsalat/monteur/commit/d7c12b8a6b1338441bcf04ad4baadc3e32d9526a))

### [0.2.1](https://github.com/fragsalat/monteur/compare/v0.2.0...v0.2.1) (2021-11-09)


### Bug Fixes

* **unframed:** Pass serialized data through event dom bus to prevent references ([b901203](https://github.com/fragsalat/monteur/commit/b901203e775cbaf994b141fa3e0b3de95ddcba75))

## [0.2.0](https://github.com/fragsalat/monteur/compare/v0.1.19...v0.2.0) (2021-11-04)


### Features

* **events:** Added debug logging option to event busses ([54dae3d](https://github.com/fragsalat/monteur/commit/54dae3de08bb5f0223f51911472d0aa7af16d9b7))
* **unframed:** First implementation of unframed fragment ([851de1e](https://github.com/fragsalat/monteur/commit/851de1ef7e13e9dc8d4961a1712abcc4306e01c4))


### Bug Fixes

* **unframed:** Fixed loading of unframed fragment + added caching ([d3cd851](https://github.com/fragsalat/monteur/commit/d3cd851a4b9f4d7e207cf4fcfb1533c730b09423))

## [0.2.0-rc.0](https://github.com/fragsalat/monteur/compare/v0.1.19...v0.2.0-rc.0) (2021-09-03)


### Features

* **unframed:** First implementation of unframed fragment ([aa34c50](https://github.com/fragsalat/monteur/commit/aa34c50f198b12138531256dd2feeb0a63cc34a9))


### Bug Fixes

* **unframed:** Fixed loading of unframed fragment + added caching ([8e3d5f4](https://github.com/fragsalat/monteur/commit/8e3d5f473472da149e0c2c9e14878885c4055ab7))

### [0.1.19](https://github.com/fragsalat/monteur/compare/v0.1.18...v0.1.19) (2021-08-27)


### Features

* **framed:** Use window.parent to nested fragments ([#2](https://github.com/fragsalat/monteur/issues/2)) ([121d70b](https://github.com/fragsalat/monteur/commit/121d70b77d85617e65161589c392039a9df71f0e))

### [0.1.18](https://github.com/fragsalat/monteur/compare/v0.1.17...v0.1.18) (2021-04-30)


### Features

* **framed:** Allow clipboard access in iframe ([#1](https://github.com/fragsalat/monteur/issues/1)) ([f49f6c6](https://github.com/fragsalat/monteur/commit/f49f6c6447ff6642ca6f6282be2f9714c75a4b8b))

### [0.1.17](https://github.com/fragsalat/monteur/compare/v0.1.16...v0.1.17) (2021-02-02)


### Bug Fixes

* **framed:** Increased timeout for initial ready-to-init event ([42458e3](https://github.com/fragsalat/monteur/commit/42458e3308b535227f17b3aa099639b024d6105f))

### [0.1.16](https://github.com/fragsalat/monteur/compare/v0.1.15...v0.1.16) (2021-01-26)


### Bug Fixes

* **framed:** Fixed resize event overwrite fixed height ([1f5f7e5](https://github.com/fragsalat/monteur/commit/1f5f7e5b88e5408b81725ef3b02800f7c4fbbe1f))

### [0.1.15](https://github.com/fragsalat/monteur/compare/v0.1.14...v0.1.15) (2021-01-26)


### Features

* **framed:** Added function to set fixed height of iframe ([bdf5eb6](https://github.com/fragsalat/monteur/commit/bdf5eb6f60835b5f412f9ba4fc8294a854c3a8af))

### [0.1.14](https://github.com/fragsalat/monteur/compare/v0.1.13...v0.1.14) (2021-01-26)

### [0.1.13](https://github.com/fragsalat/monteur/compare/v0.1.12...v0.1.13) (2021-01-12)


### Bug Fixes

* **framed:** Fail init when timing out while waiting for event ([7a45413](https://github.com/fragsalat/monteur/commit/7a4541360ef3a985761d9213b1578ec381e221aa))

### [0.1.12](https://github.com/fragsalat/monteur/compare/v0.1.11...v0.1.12) (2021-01-12)


### Bug Fixes

* **framed:** Fixed height not reducing with content ([6e52543](https://github.com/fragsalat/monteur/commit/6e525436ada7d914e14c0b660fcc6ccd8d1b9538))

### [0.1.11](https://github.com/fragsalat/monteur/compare/v0.1.10...v0.1.11) (2020-11-19)

### [0.1.10](https://github.com/fragsalat/monteur/compare/v0.1.9...v0.1.10) (2020-11-11)


### Bug Fixes

* **framed:** Fix calling event functions without initialized fragment ([a6ed4f1](https://github.com/fragsalat/monteur/commit/a6ed4f1df03f7da8e7d7e2e3293edb0dc5ec531d))

### [0.1.9](https://github.com/fragsalat/monteur/compare/v0.1.8...v0.1.9) (2020-11-09)


### Bug Fixes

* **event:** Serialize event payload as json to prevent cloning issues ([f3fb7d4](https://github.com/fragsalat/monteur/commit/f3fb7d418158ce6aad0e49475d5a8ade7a3d702b))
* **framed:** Fixed vertical and horizontal scrolling ([579484c](https://github.com/fragsalat/monteur/commit/579484cc790bd8ec587e7cab5c5dbc359dea3086))

### [0.1.8](https://github.com/fragsalat/monteur/compare/v0.1.7...v0.1.8) (2020-11-06)

### [0.1.7](https://github.com/fragsalat/monteur/compare/v0.1.6...v0.1.7) (2020-10-21)


### Bug Fixes

* **build:** Include src to make source maps working ([31cadb5](https://github.com/fragsalat/monteur/commit/31cadb5f7fdc805d5f2788dc6aef262140ab2ea6))

### [0.1.6](https://github.com/fragsalat/monteur/compare/v0.1.5...v0.1.6) (2020-10-21)

### [0.1.5](https://github.com/fragsalat/monteur/compare/v0.1.4...v0.1.5) (2020-10-21)


### Bug Fixes

* **build:** Made source root of sourcemaps relative ([efb82b6](https://github.com/fragsalat/monteur/commit/efb82b6f8b371b6d515e8ba76cf1c8c5bc84a4fc))

### [0.1.4](https://github.com/fragsalat/monteur/compare/v0.1.3...v0.1.4) (2020-10-20)


### Features

* Export HostFragment for better type support ([a4d73ce](https://github.com/fragsalat/monteur/commit/a4d73cec4f860f407a05307ecb263d18ac9515cc))

### [0.1.3](https://github.com/fragsalat/monteur/compare/v0.1.2...v0.1.3) (2020-10-20)


### Bug Fixes

* **package:** Removed prettier plugin as production dependency ([e8c6251](https://github.com/fragsalat/monteur/commit/e8c62511b9dea3be78afdfc2b17a266277debba6))

### [0.1.2](https://github.com/fragsalat/monteur/compare/v0.1.1...v0.1.2) (2020-10-20)


### Bug Fixes

* **build:** esnext module build was to modern for react-scripts ([eb14938](https://github.com/fragsalat/monteur/commit/eb14938e6562d120b8edd7e6455c3643939e8985))

### 0.1.1 (2020-10-20)


### Features

* **framed:** Implemented support for framed fragments ([767eb6a](https://github.com/fragsalat/monteur/commit/767eb6afc1c6b4c4eec318d3a773797ade052cef))

## [0.1.0](https://github.com/fragsalat/monteur/compare/v0.1.1...v0.1.0) (2020-10-20)
