# Publishing Guide for React Mask Field

This document provides step-by-step instructions for publishing new versions of the React Mask Field library to npm.

## Prerequisites

Before publishing, ensure you have:

1. An npm account with publishing rights to the `@altricade` organization
2. Logged in to npm in your terminal (`npm login`)
3. The latest code pulled from the main branch

## Preparing for Release

### 1. Update Version

Update the version in `package.json` according to [Semantic Versioning](https://semver.org/) principles:

- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality in a backward-compatible manner
- **PATCH** version for backward-compatible bug fixes

```bash
# Example: Update to version 1.1.1
npm version patch  # For a patch release
npm version minor  # For a minor release
npm version major  # For a major release
```

### 2. Update CHANGELOG.md

Document all significant changes in the CHANGELOG.md file:

```markdown
## x.y.z (YYYY-MM-DD)

### Features

- Description of new feature

### Bug Fixes

- Description of bug fix
```

### 3. Build the Package

Ensure the package builds correctly:

```bash
npm run build
```

### 4. Test the Package

Run tests to ensure everything is working correctly:

```bash
npm test
```

## Publishing to npm

### 1. Publish the Package

```bash
npm publish --access public
```

If you're publishing a beta or release candidate:

```bash
npm publish --tag beta --access public
```

### 2. Update Storybook Documentation

After publishing to npm, update the Storybook documentation:

```bash
npm run deploy-storybook
```

This will deploy the latest documentation to GitHub Pages at [https://altricade.github.io/react-mask-field/](https://altricade.github.io/react-mask-field/).

## Post-Release Tasks

### 1. Create a GitHub Release

1. Go to [GitHub Releases](https://github.com/altricade/react-mask-field/releases)
2. Click "Draft a new release"
3. Tag version: `vX.Y.Z` (e.g., `v1.1.0`)
4. Title: `Version X.Y.Z`
5. Description: Copy the relevant section from CHANGELOG.md
6. Publish release

### 2. Announce the Release

Consider announcing the new release in relevant channels:

- GitHub Discussions
- Twitter/X
- React community forums

## Troubleshooting

### npm publish errors

If you encounter errors during publishing:

1. Ensure you're logged in to npm: `npm whoami`
2. Check if the package name is available: `npm view @altricade/react-mask-field`
3. Verify you have the correct permissions: `npm access ls-collaborators @altricade/react-mask-field`

### Version conflicts

If there's a version conflict:

1. Check the current published version: `npm view @altricade/react-mask-field version`
2. Ensure your new version is higher than the published version

## Best Practices

1. **Keep the implementation simple**: Focus on core functionality and reliability
2. **Maintain backward compatibility**: Avoid breaking changes in minor and patch releases
3. **Document all changes**: Update both code documentation and the CHANGELOG
4. **Test thoroughly**: Ensure all components work as expected before publishing
5. **Update examples**: Keep the Storybook examples up-to-date with the latest features

## Release Checklist

- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Build and test the package
- [ ] Publish to npm
- [ ] Deploy updated Storybook
- [ ] Create GitHub release
- [ ] Announce the release
