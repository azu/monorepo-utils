# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.8.1](https://github.com/azu/monorepo-utils/compare/v2.8.0...v2.8.1) (2022-05-16)

**Note:** Version bump only for package @monorepo-utils/workspaces-to-typescript-project-references





# [2.8.0](https://github.com/azu/monorepo-utils/compare/v2.7.6...v2.8.0) (2022-05-16)

**Note:** Version bump only for package @monorepo-utils/workspaces-to-typescript-project-references





## [2.7.6](https://github.com/azu/monorepo-utils/compare/v2.7.5...v2.7.6) (2022-03-25)


### Bug Fixes

* **project-references:** improve early check for duplicated deps ([#58](https://github.com/azu/monorepo-utils/issues/58)) ([7033b63](https://github.com/azu/monorepo-utils/commit/7033b63af3a081dfee149bfb47b10379b30df8fe))





## [2.7.5](https://github.com/azu/monorepo-utils/compare/v2.7.4...v2.7.5) (2022-03-25)


### Bug Fixes

* **project-references:** add validation for duplicated deps ([#57](https://github.com/azu/monorepo-utils/issues/57)) ([54e87b3](https://github.com/azu/monorepo-utils/commit/54e87b3b37af0bf0cdfd8ee07879f82abde9dc95))





## [2.7.4](https://github.com/azu/monorepo-utils/compare/v2.7.3...v2.7.4) (2021-11-29)

**Note:** Version bump only for package @monorepo-utils/workspaces-to-typescript-project-references





## [2.7.3](https://github.com/azu/monorepo-utils/compare/v2.7.2...v2.7.3) (2021-11-29)


### Bug Fixes

* skip to link non-ts package ([#54](https://github.com/azu/monorepo-utils/issues/54)) ([5b142da](https://github.com/azu/monorepo-utils/commit/5b142dafaf87897fe71f0b0dcf511c5115cb7b29)), closes [#53](https://github.com/azu/monorepo-utils/issues/53)





## [2.7.2](https://github.com/azu/monorepo-utils/compare/v2.7.1...v2.7.2) (2021-10-20)


### Bug Fixes

* **workspaces-to-typescript-project-references:** skip non-ts package ([754412a](https://github.com/azu/monorepo-utils/commit/754412a732de18f7a3b788c791ba0c5eebae765f))





## [2.7.1](https://github.com/azu/monorepo-utils/compare/v2.7.0...v2.7.1) (2021-10-20)

**Note:** Version bump only for package @monorepo-utils/workspaces-to-typescript-project-references





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





## [2.4.3](https://github.com/azu/monorepo-utils/compare/@monorepo-utils/workspaces-to-typescript-project-references@2.4.2...@monorepo-utils/workspaces-to-typescript-project-references@2.4.3) (2020-10-22)


### Bug Fixes

* use upath instead of path ([35bddf5](https://github.com/azu/monorepo-utils/commit/35bddf5ae579c6d20fc3082bd404ce1cc27aa65a))





## [2.4.2](https://github.com/azu/monorepo-utils/compare/@monorepo-utils/workspaces-to-typescript-project-references@2.4.1...@monorepo-utils/workspaces-to-typescript-project-references@2.4.2) (2020-08-31)


### Bug Fixes

* **workspaces:** fix plugin ([af02d5f](https://github.com/azu/monorepo-utils/commit/af02d5f9795589d34b12494f51e7fa4816021118))





## [2.4.1](https://github.com/azu/monorepo-utils/compare/@monorepo-utils/workspaces-to-typescript-project-references@2.4.0...@monorepo-utils/workspaces-to-typescript-project-references@2.4.1) (2020-08-31)


### Bug Fixes

* **workspaces:** add message and how to fix ([1efaee4](https://github.com/azu/monorepo-utils/commit/1efaee47a35809ba96acad5244a6cf3da6f3668a))





# [2.4.0](https://github.com/azu/monorepo-utils/compare/@monorepo-utils/workspaces-to-typescript-project-references@2.3.7...@monorepo-utils/workspaces-to-typescript-project-references@2.4.0) (2020-08-30)


### Features

* **workspaces:** support --tsconfigPath ([59e0155](https://github.com/azu/monorepo-utils/commit/59e01558fdfa632800ef82eb093ee578bf1ad071))





## [2.3.7](https://github.com/azu/monorepo-utils/compare/@monorepo-utils/workspaces-to-typescript-project-references@2.3.6...@monorepo-utils/workspaces-to-typescript-project-references@2.3.7) (2020-08-30)

**Note:** Version bump only for package @monorepo-utils/workspaces-to-typescript-project-references





## [2.3.6](https://github.com/azu/monorepo-utils/compare/@monorepo-utils/workspaces-to-typescript-project-references@2.3.5...@monorepo-utils/workspaces-to-typescript-project-references@2.3.6) (2020-08-30)


### Bug Fixes

* **workspaces:** fix error message ([d3cf8df](https://github.com/azu/monorepo-utils/commit/d3cf8dfc782842b7c4043e240d9b212bbaf9618e))





## [2.3.5](https://github.com/azu/monorepo-utils/compare/@monorepo-utils/workspaces-to-typescript-project-references@2.3.4...@monorepo-utils/workspaces-to-typescript-project-references@2.3.5) (2020-08-30)


### Bug Fixes

* **workspace:** fix plugin loading ([c7a7707](https://github.com/azu/monorepo-utils/commit/c7a77074a6993d9a4db9b2ee8ecf303b12fe3231))





## [2.3.4](https://github.com/azu/monorepo-utils/compare/@monorepo-utils/workspaces-to-typescript-project-references@2.3.3...@monorepo-utils/workspaces-to-typescript-project-references@2.3.4) (2020-08-30)


### Bug Fixes

* **workspaces:** fix plugin loading logic ([e83e457](https://github.com/azu/monorepo-utils/commit/e83e457371bc30d3332da3082ecc5a4de848e128))





## [2.3.3](https://github.com/azu/monorepo-utils/compare/@monorepo-utils/workspaces-to-typescript-project-references@2.3.2...@monorepo-utils/workspaces-to-typescript-project-references@2.3.3) (2020-08-30)

**Note:** Version bump only for package @monorepo-utils/workspaces-to-typescript-project-references





## [2.3.2](https://github.com/azu/monorepo-utils/compare/@monorepo-utils/workspaces-to-typescript-project-references@2.3.1...@monorepo-utils/workspaces-to-typescript-project-references@2.3.2) (2020-08-30)

**Note:** Version bump only for package @monorepo-utils/workspaces-to-typescript-project-references





## [2.3.1](https://github.com/azu/monorepo-utils/compare/@monorepo-utils/workspaces-to-typescript-project-references@2.3.0...@monorepo-utils/workspaces-to-typescript-project-references@2.3.1) (2020-08-30)


### Bug Fixes

* **workspaces-to-typescript-project-references:** skip non-ts package ([53b9ca1](https://github.com/azu/monorepo-utils/commit/53b9ca1254dba94a3968b42898c9f4f53db5c375))





# 2.3.0 (2020-08-30)


### Bug Fixes

* project config ([d9a25d9](https://github.com/azu/monorepo-utils/commit/d9a25d938b52bdabc0eecf37e870eaa0bf4ddda4))


### Features

* add cli ([73b44b9](https://github.com/azu/monorepo-utils/commit/73b44b9ffc1623971daa2ad2f7a2ab5ddc9e35f0))
* add workspaces-to-typescript-project-references ([766c662](https://github.com/azu/monorepo-utils/commit/766c66270eaee2d4a96bb7d1af30e29475dda45c))
* self use workspaces-to-typescript-project-references ([ccde789](https://github.com/azu/monorepo-utils/commit/ccde7895aec4b634d08de1fab60de174d1f72b1f))
