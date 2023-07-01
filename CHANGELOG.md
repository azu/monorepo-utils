# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.10.0](https://github.com/azu/monorepo-utils/compare/v2.9.0...v2.10.0) (2023-07-01)


### Features

* **get-workspaces-cli:** add @monorepo-utils/get-workspaces-cli ([#66](https://github.com/azu/monorepo-utils/issues/66)) ([407397a](https://github.com/azu/monorepo-utils/commit/407397acb198df67118972695007037682fc36ee))





# [2.9.0](https://github.com/azu/monorepo-utils/compare/v2.8.2...v2.9.0) (2022-12-02)


### Features

* support pnpm workspaces [#30](https://github.com/azu/monorepo-utils/issues/30) ([#64](https://github.com/azu/monorepo-utils/issues/64)) ([0cb0ad4](https://github.com/azu/monorepo-utils/commit/0cb0ad41490a7a17f9d1e897bce83c8815940eb2))





## [2.8.2](https://github.com/azu/monorepo-utils/compare/v2.8.1...v2.8.2) (2022-05-24)


### Bug Fixes

* Respect tsconfigPath when using includeRoot ([#62](https://github.com/azu/monorepo-utils/issues/62)) ([0d6d122](https://github.com/azu/monorepo-utils/commit/0d6d12208440dca03a62f396274a0034aae1281a))





## [2.8.1](https://github.com/azu/monorepo-utils/compare/v2.8.0...v2.8.1) (2022-05-16)


### Bug Fixes

* **package-util:** expose findPackages ([f0b6851](https://github.com/azu/monorepo-utils/commit/f0b6851c86efae8fd7a57c056a72f88c77490732))





# [2.8.0](https://github.com/azu/monorepo-utils/compare/v2.7.6...v2.8.0) (2022-05-16)


### Features

* **package-util:** export findPackages ([#61](https://github.com/azu/monorepo-utils/issues/61)) ([327ed19](https://github.com/azu/monorepo-utils/commit/327ed196603f2d6126f249b46e731c1e8cf6c34e))





## [2.7.6](https://github.com/azu/monorepo-utils/compare/v2.7.5...v2.7.6) (2022-03-25)


### Bug Fixes

* **project-references:** improve early check for duplicated deps ([#58](https://github.com/azu/monorepo-utils/issues/58)) ([7033b63](https://github.com/azu/monorepo-utils/commit/7033b63af3a081dfee149bfb47b10379b30df8fe))





## [2.7.5](https://github.com/azu/monorepo-utils/compare/v2.7.4...v2.7.5) (2022-03-25)


### Bug Fixes

* **project-references:** add validation for duplicated deps ([#57](https://github.com/azu/monorepo-utils/issues/57)) ([54e87b3](https://github.com/azu/monorepo-utils/commit/54e87b3b37af0bf0cdfd8ee07879f82abde9dc95))





## [2.7.4](https://github.com/azu/monorepo-utils/compare/v2.7.3...v2.7.4) (2021-11-29)

**Note:** Version bump only for package monorepo-utils





## [2.7.3](https://github.com/azu/monorepo-utils/compare/v2.7.2...v2.7.3) (2021-11-29)


### Bug Fixes

* skip to link non-ts package ([#54](https://github.com/azu/monorepo-utils/issues/54)) ([5b142da](https://github.com/azu/monorepo-utils/commit/5b142dafaf87897fe71f0b0dcf511c5115cb7b29)), closes [#53](https://github.com/azu/monorepo-utils/issues/53)





## [2.7.2](https://github.com/azu/monorepo-utils/compare/v2.7.1...v2.7.2) (2021-10-20)


### Bug Fixes

* **workspaces-to-typescript-project-references:** skip non-ts package ([754412a](https://github.com/azu/monorepo-utils/commit/754412a732de18f7a3b788c791ba0c5eebae765f))





## [2.7.1](https://github.com/azu/monorepo-utils/compare/v2.7.0...v2.7.1) (2021-10-20)

**Note:** Version bump only for package monorepo-utils





# [2.7.0](https://github.com/azu/monorepo-utils/compare/v2.6.3...v2.7.0) (2021-10-20)


### Features

* add --includesRoot flag ([#52](https://github.com/azu/monorepo-utils/issues/52)) ([fa0b3ce](https://github.com/azu/monorepo-utils/commit/fa0b3ce9c3819aa95d5bdc0e77d8533bbdbd88bc))





## [2.6.3](https://github.com/azu/monorepo-utils/compare/v2.6.2...v2.6.3) (2021-10-14)


### Bug Fixes

* improve check for changes ([#51](https://github.com/azu/monorepo-utils/issues/51)) ([a097b44](https://github.com/azu/monorepo-utils/commit/a097b4403c91c75ee0e86527bfefcc8da152c2a2))





## [2.6.2](https://github.com/azu/monorepo-utils/compare/v2.6.1...v2.6.2) (2021-07-14)


### Bug Fixes

* do not write tsconfig.json if contents will be same ([#50](https://github.com/azu/monorepo-utils/issues/50)) ([ae33af7](https://github.com/azu/monorepo-utils/commit/ae33af794d9ed3854a14e54097f91b93c6155719))





## [2.6.1](https://github.com/azu/monorepo-utils/compare/v2.6.0...v2.6.1) (2021-07-08)


### Bug Fixes

* append tsConfigPath filename without parent directories ([#48](https://github.com/azu/monorepo-utils/issues/48)) ([fe77743](https://github.com/azu/monorepo-utils/commit/fe77743928055607c683b9d04111ab53c8e91b47))





# [2.6.0](https://github.com/azu/monorepo-utils/compare/v2.5.1...v2.6.0) (2021-07-08)


### Features

* append tsconfigPath filename to path if not tsconfig.json ([#47](https://github.com/azu/monorepo-utils/issues/47)) ([589891f](https://github.com/azu/monorepo-utils/commit/589891f3b6c700471680d3d5daef67b717f5337f))





## [2.5.1](https://github.com/azu/monorepo-utils/compare/v2.5.0...v2.5.1) (2021-01-22)


### Bug Fixes

* **project-references:** relax asserting ([#45](https://github.com/azu/monorepo-utils/issues/45)) ([cb2843d](https://github.com/azu/monorepo-utils/commit/cb2843df2716d7e6d09ff4022715293df72877e5))





# [2.5.0](https://github.com/azu/monorepo-utils/compare/v2.4.5...v2.5.0) (2021-01-21)


### Features

* **project-refereneces:** Add Yarn v2 (Berry) support ([#42](https://github.com/azu/monorepo-utils/issues/42)) ([0a73093](https://github.com/azu/monorepo-utils/commit/0a73093683840c9a7ce53792f238387c442d9422))





## [2.4.5](https://github.com/azu/monorepo-utils/compare/v2.4.4...v2.4.5) (2021-01-18)


### Bug Fixes

* **project-references:**  add newline at end of tsconfig.json ([#40](https://github.com/azu/monorepo-utils/issues/40)) ([d7c0973](https://github.com/azu/monorepo-utils/commit/d7c0973ffb7cc80a2189cde59c1b6eaa61142766))
* **project-refereneces:** append dirname of tsconfigPath to project reference paths ([#39](https://github.com/azu/monorepo-utils/issues/39)) ([3968fac](https://github.com/azu/monorepo-utils/commit/3968facbb94c6a2dce407a333e8e2d65d4f6907f))





## 2.4.4 (2021-01-15)


### Bug Fixes

* **project-references:** correct relative paths for tsconfig.json in sub-directory ([#36](https://github.com/azu/monorepo-utils/issues/36)) ([0c92306](https://github.com/azu/monorepo-utils/commit/0c92306d49abd11722a9fa300d5770439dd9334d))
* **project-references:** only add project reference if matches version in package.json ([#35](https://github.com/azu/monorepo-utils/issues/35)) ([6bc2ef8](https://github.com/azu/monorepo-utils/commit/6bc2ef89be52e809766fed5a6fb46dd46e580b87))
* use upath instead of path ([35bddf5](https://github.com/azu/monorepo-utils/commit/35bddf5ae579c6d20fc3082bd404ce1cc27aa65a))
* **collect-changelog:** fix cmd to use correct option ([17a2db1](https://github.com/azu/monorepo-utils/commit/17a2db11446977ae03d701e67506f0dd2fbacf6b))
* **collect-changelog:** ignore empty changelog ([#16](https://github.com/azu/monorepo-utils/issues/16)) ([0ef9f29](https://github.com/azu/monorepo-utils/commit/0ef9f29cc07e30da6c8ea47b6260d9c7528ad903))
* **package-utils:** change `package` to `packageJSON` ([ae6ddf3](https://github.com/azu/monorepo-utils/commit/ae6ddf3edcc22f9ec0f5ff7a9d9b593d64bb19d4))
* **publish:** fix bin command ([27baef7](https://github.com/azu/monorepo-utils/commit/27baef7fc399d4056a1a8a6c75fac68e0ed4ee4f))
* **publish:** fix usage ([047968a](https://github.com/azu/monorepo-utils/commit/047968a51736309793fd135b59d8f88274623276))
* **publish:** includes bin directory ([d7efb33](https://github.com/azu/monorepo-utils/commit/d7efb33565af0cafc276065059e7993ddf5f62b2))
* **publish:** support yarn run ([b0475dd](https://github.com/azu/monorepo-utils/commit/b0475dd0c9814bc02b0ddf0424734f1e22982233))
* **publish:** update timeout length ([fc2d4ce](https://github.com/azu/monorepo-utils/commit/fc2d4ceca96536732e34f0df005d809bd2ba1c04))
* **workspace:** fix plugin loading ([c7a7707](https://github.com/azu/monorepo-utils/commit/c7a77074a6993d9a4db9b2ee8ecf303b12fe3231))
* **workspaces:** add message and how to fix ([1efaee4](https://github.com/azu/monorepo-utils/commit/1efaee47a35809ba96acad5244a6cf3da6f3668a))
* **workspaces:** fix error message ([d3cf8df](https://github.com/azu/monorepo-utils/commit/d3cf8dfc782842b7c4043e240d9b212bbaf9618e))
* **workspaces:** fix plugin ([af02d5f](https://github.com/azu/monorepo-utils/commit/af02d5f9795589d34b12494f51e7fa4816021118))
* **workspaces:** fix plugin loading logic ([e83e457](https://github.com/azu/monorepo-utils/commit/e83e457371bc30d3332da3082ecc5a4de848e128))
* **workspaces-to-typescript-project-references:** skip non-ts package ([53b9ca1](https://github.com/azu/monorepo-utils/commit/53b9ca1254dba94a3968b42898c9f4f53db5c375))
* project config ([d9a25d9](https://github.com/azu/monorepo-utils/commit/d9a25d938b52bdabc0eecf37e870eaa0bf4ddda4))


### Features

* **workspaces:** support --tsconfigPath ([59e0155](https://github.com/azu/monorepo-utils/commit/59e01558fdfa632800ef82eb093ee578bf1ad071))
* add cli ([73b44b9](https://github.com/azu/monorepo-utils/commit/73b44b9ffc1623971daa2ad2f7a2ab5ddc9e35f0))
* add workspaces-to-typescript-project-references ([766c662](https://github.com/azu/monorepo-utils/commit/766c66270eaee2d4a96bb7d1af30e29475dda45c))
* self use workspaces-to-typescript-project-references ([ccde789](https://github.com/azu/monorepo-utils/commit/ccde7895aec4b634d08de1fab60de174d1f72b1f))
* **collect-changelog:** add @monorepo-utils/collect-changelog ([53c970b](https://github.com/azu/monorepo-utils/commit/53c970b6d7af7ea52e54c9cf4dd93084dab23f2a))
* **collect-changelog:** support --changelog option for fixed mode ([51226af](https://github.com/azu/monorepo-utils/commit/51226af1d39bf08c9cdfb838919aa052db8e7eb7))
* **collect-changelog:** support --name ([c5e4549](https://github.com/azu/monorepo-utils/commit/c5e45494a5b42fd280962e1c5c6b371d9b95b549))
* **collect-changelog:** support --template option ([c1c0dc2](https://github.com/azu/monorepo-utils/commit/c1c0dc2a26b42a561204010bf17c95717ee1d509))
* **package-utils:** add package-utils ([3c49df9](https://github.com/azu/monorepo-utils/commit/3c49df9ba77ea2c5363b03607aa6e949e2d05aab))
* **publish:** add version to publish log ([6c9d70a](https://github.com/azu/monorepo-utils/commit/6c9d70ac294d1e027bb032e31c9704dad307adbf))
* **publish:** support --dist-tag ([d00662b](https://github.com/azu/monorepo-utils/commit/d00662b9c794be58b284cef3045640884eb64983))


### BREAKING CHANGES

* **package-utils:** the result `package` to be `packageJSON`
