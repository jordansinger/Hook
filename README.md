Hook
=======

Pull to refresh for the web

##Dependencies
* jQuery

##Settings
* refresh: refreshes entire page, default is true, if false will call callback (must also have callback setting),
* callback: custom callback function

##Examples:
```` JS
// Defaults
$('#hook').hook();

// Callback
$('#hook').hook({
  refresh: false,
  callback: function(){
    console.log('Hello, World!');
  }
});
````