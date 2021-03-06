'use strict';
var chalk = require('chalk'),
	yeoman = require('yeoman-generator');

var ReactComponentGenerator = yeoman.generators.Base.extend({
	
	initializing: function() {
		this.pkg = require('../package.json');
	},
	
	prompting: function() {
		var done = this.async();
		
		this.log(
			'\n' + chalk.bold.underline('Welcome to the React Component generator') +
			'\n' +
			'\nWe\'re going to set up a new ' + chalk.bold('ReactJS') + ' Component, ready for development with' +
			'\n' + chalk.bold('gulp, browserify, live-reload') + ' and publishing to ' + chalk.bold('GitHub Pages') + '.' +
			'\n'
		);
		
		var prompts = [{
			type: 'input',
			name: 'projectName',
			message: 'First, what is the name of your component?',
			default: 'My Component'
		}, {
			type: 'input',
			name: 'developerName',
			message: 'What is your name? (for copyright notice, etc.)'
		}, {
			type: 'input',
			name: 'ghUser',
			message: 'What is your GitHub Username?'
		}, {
			type: 'input',
			name: 'ghRepo',
			message: 'What is the name of the GitHub repo this will be published at?'
		}, {
			type: 'confirm',
			name: 'createDirectory',
			message: 'Would you like to create a new directory for your project?',
			default: true
		}];
		
		this.prompt(prompts, function (props) {
			this.log('\n');
			this._.extend(this, props);
			this.packageName = this._.slugify(this.projectName).toLowerCase();
			this.componentName = this._.classify(this.projectName);
			this.currentYear = new Date().getFullYear();
			if (props.createDirectory) {
				this.destinationRoot(this.packageName);
			}
			done();
		}.bind(this));
	},
	
	writing: {
		project: function() {
			this.copy('editorconfig', '.editorconfig');
			this.copy('gitignore', '.gitignore');
			this.copy('gulpfile.js', 'gulpfile.js');
			this.template('_bower.json', 'bower.json');
			this.template('_gulpconfig.js', 'gulpconfig.js');
			this.template('_package.json', 'package.json');
			this.template('_readme.md', 'README.md');
		},
		component: function() {
			this.template('src/_Component.js', 'src/' + this.componentName + '.js');
		},
		examples: function() {
			this.copy('example/app.less', 'example/src/app.less');
			this.template('example/_app.js', 'example/src/app.js');
			this.template('example/_index.html', 'example/src/index.html');
			this.template('example/_standalone.html', 'example/src/standalone.html');
		}
	},
	
	install: function() {
		this.npmInstall();
	},
	
	end: function() {
		var chdir = this.createDirectory ? '"cd ' + this.packageName + '" then ' : '';
		this.log(
			'\n' + chalk.green.underline('Your new React Component is ready!') +
			'\n' +
			'\nYour component is in /src and your examples are in /example/src.' +
			'\n' +
			'\nType ' + chdir + '"gulp dev" to run the development build and server tasks.' +
			'\n'
		);
	}
	
});

module.exports = ReactComponentGenerator;
