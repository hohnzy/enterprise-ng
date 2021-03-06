# Dev Ops and Release Publishing Tasks and Notes

## Prerequisites:

- collaborator permissions with our npmjs.com organization
- correct permissions on github
- setup the github token, require in release-it script

## Check Published npm Tags

```bash
npm info ids-enterprise-ng dist-tags
npm view ids-enterprise-ng versions
```

## Steps for Cutting a Release

## Documentation

- Verify the [changelog](docs/changelog) is up-to-date

## Make sure you have [credential] setup in .gitconfig  (Windows Users)
Try adding this into your git config
```
   [credential]
       helper = wincred
```    
or via console

```
   git config --global credential.helper wincred
```
##Make sure you have a GITHUB_ACCESS_TOKEN configured
- Get a token <https://github.com/settings/tokens>
  - click the `Generate new token` button
  - click ONLY the repo scope 
  - scroll to the bottom and click the `Generate token` button
  - NOTE: Save your token somewhere so it doesn't get lost.
- Set your environment variable from your command window
  - `set GITHUB_ACCESS_TOKEN="<your token here>"`
 
## Update the version of ids-enterprise

- <https://github.com/infor-design/enterprise>
- `npm i ids-enterprise@latest --save`
- Get PR merged in and pushed

## Steps using release-it

- `npm install release-it -g`
- Checkout the release branch and `git pull --tags`
- Type of releases:
    - `npm run release:dev` - dev (Note: Will NOT git tag or github release)
    - `npm run release:beta` - beta
    - `npm run release:rc` - release candidate normally the final testing branch before the release
    - `release:final` - the release itself
    - **Always** verify the release version when the script asks
- Merge back into `master`
- PR the master version to the proper "dev" version
    - i.e. if we just released `4.7.0`, master will now be `4.8.0-dev`

## Test Npm packages

```bash
npm view ids-enterprise-ng versions
npm view ids-enterprise-angular versions

npm info ids-enterprise-angular dist-tags
npm info ids-enterprise-ng dist-tags
```
