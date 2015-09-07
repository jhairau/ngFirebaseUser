angular.module('ng-firebaseuser-templates', ['templates/bootstrap3/login-form.html', 'templates/ionic/login-form.html']);

angular.module("templates/bootstrap3/login-form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/bootstrap3/login-form.html",
    "<style>\n" +
    "    ng-firebase-user-login-form {\n" +
    "        display: flex;\n" +
    "        align-items: center;\n" +
    "        justify-content: center;\n" +
    "        height: 100%;\n" +
    "    }\n" +
    "\n" +
    "    ng-firebase-user-login-form .panel {\n" +
    "        -webkit-box-flex: 0;\n" +
    "        -webkit-flex: none;\n" +
    "        -ms-flex: none;\n" +
    "        flex: none;\n" +
    "        max-width: 50%;\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "<div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <h3 class=\"panel-title\">Please Sign In</h3>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-12\" style=\"border-left:1px solid #ccc;height:160px\">\n" +
    "                <form class=\"form-horizontal\" ng-submit=\"doLogin()\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label for=\"userEmail\" class=\"col-sm-2 control-label\">Email</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <input id=\"userEmail\" type=\"text\" ng-model=\"user.email\" placeholder=\"Email\" class=\"form-control\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label for=\"userPassword\" class=\"col-sm-2 control-label\">Password</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <input id=\"userPassword\" ng-model=\"user.password\" placeholder=\"Enter Password\" class=\"form-control\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "                            <button class=\"btn btn-default\" type=\"submit\">Sign In</button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/ionic/login-form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/ionic/login-form.html",
    "<form ng-submit=\"doLogin()\">\n" +
    "    <div class=\"list\">\n" +
    "        <label class=\"item item-input\">\n" +
    "            <span class=\"input-label\">Username</span>\n" +
    "            <input type=\"text\" ng-model=\"user.email\">\n" +
    "        </label>\n" +
    "        <label class=\"item item-input\">\n" +
    "            <span class=\"input-label\">Password</span>\n" +
    "            <input type=\"password\" ng-model=\"user.password\">\n" +
    "        </label>\n" +
    "        <label class=\"item\">\n" +
    "            <button class=\"button button-block button-positive\" type=\"submit\">Log in</button>\n" +
    "        </label>\n" +
    "    </div>\n" +
    "</form>");
}]);
