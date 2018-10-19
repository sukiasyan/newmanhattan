// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    FastClick.attach(document.body);
    
    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());
    var footerTpl = Handlebars.compile($("#footer-tpl").html());
    /* ---------------------------------- Local Variables ---------------------------------- */
    var service = new EmployeeService();
    service.initialize().done(function () {
        renderHomeView();
    });

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        }
      }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */
    // function findByName() {
    //     service.findByName($('.search-key').val()).done(function (employees) {
    //         $('.content').html(employeeListTpl(employees));
    //     });
    // }

    function renderHomeView() {
        $('body').html(homeTpl());
        $('.search-key').html(employeeListTpl());
        $('.footer').html(footerTpl());
    }
    
}());