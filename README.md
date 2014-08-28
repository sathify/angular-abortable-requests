
###angular-abortable-requests

Abortable AJAX requests in AngularJS Applications 

[![Build Status](https://travis-ci.org/sathify/angular-abortable-requests.svg?branch=master)](https://travis-ci.org/sathify/angular-abortable-requests)


Creating $resource and $http which can be aborted efficiently.


####Why?

Large web applications require lots of information to operate. Whether that’s navigating between menus and tabs or just clicking around, the application has to make a lots of Ajax requests to fetch data from the server. Often times the application ultimately doesn’t need all the requests made as it might not be relevant. These requests can potentially trip up the UI as the server may be slow that one request overtakes another making the application process or show stale data. So we need to be able to abort old requests to make the application faster, responsive and show correct information. 


More information about the implementation is in this [blog post](http://www.sathify.com/cancelling-ajax-requests-in-angularjs-applications/). 


####Install using bower
<code>bower install angular-abortable-requests</code>
