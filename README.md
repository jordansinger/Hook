Hook.js
=======

Pull to refresh. For the web. This rewrite is a work in progress and has only been tested on the latest Safari, Chrome, and Firefox. There are a few bugs that I'm currently working through with Firefox.

##Dependency
* Needs mousewheel.js, however will most likely change this to an option in future commits.

##There are 9 settings and 1 callback. Which are the following;
* reloadPage: default is true, if false will reload element (note must also have reloadEl callback),
* dynamic: default is true, if false you will need your own html,
* textRequired: default is false, if true the dynamic text HTML will be added,
* swipeDistance: default is 50, the amount of swipe distance on touch devices to fire reload,
* loaderClass: default is hook-loader,
* spinnerClass: default is hook-spinner,
* loaderTextClass: default is hook-text,
* loaderText: default is 'Reloading..' is only set when you set 'textRequired'
* reloadEl: callback

##Outstanding issues:
* Firefox reload only appearing after first scrolling down.

##ToDo's: 
* Convert from jQuery animate to css3 transitions for browsers that support it.

##Examples:
```` JS
// No options
$('#hook').hook();

// Callback
$('#hook').hook({
  reloadPage: false,
  reloadEl: function(){
    console.log('Hello World!');
  }
});
````
