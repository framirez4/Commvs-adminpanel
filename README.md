# Kapeloi-panel
Panel for Kapeloi-server app

## Configuration

*Node.js*, *Gulp* and *Bower* are required to configure. Create a ```configFile.json``` at ```/``` with the parameters needed:
```
{
  "hostServer": "http://localhost:3000"
}
```
Run:
```
$ npm install
$ bower install
$ gulp configure
```
This will install the needed packages from npm, from bower and will generate a configuration module at ```/js/config/configFile.js```).
Now the project is ready to ```serve```.
