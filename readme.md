# Spotify playlist generator

This is the simple react app which connects to your spotify account and allows you to generate playlists.
You can try it out [here](https://medegor44.github.io/spotify-playlist/). Just log in to your Spotify
account, search tracks and create playlist from them.

# Development
Application is created using React library and uses free template taken from https://html5up.net/ 
## Start an application
Just run command 
```
npm install && npm start
```
## Testing
Tests are written using jest. Test for React are written using enzyme.
To run test execute 
```
npm test
```

Also there is a linter setted up with airbnb rules. To run linter execute
```
npm run linter
```

# Deployment
To generate static files execute
```
npm run build
```
they will be in `./dist` directory.

# Contribution
There is a setted up Github action triggered on each push into repo. Once your build is green and PR is approved
feel free to merge into master.

Do not forget rebase on master executing command
```
git rebase master
```
