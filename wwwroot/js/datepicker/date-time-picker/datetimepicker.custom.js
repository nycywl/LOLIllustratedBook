(function($) {
    "use strict";

    $(function () {
        $('#dt-minimum').datetimepicker();
    });

    $(function () {
        $('#dt-local').datetimepicker({
            locale: 'ru'
        });
    });
    $(function () {
        $('#dt-time').datetimepicker({
            format: 'LT'
        });
    });
    $(function () {
        $('#dt-date').datetimepicker({
            format: 'L'
        });
    });
    $(function () {
        $('#dt-noicon').datetimepicker();
    });
    $(function () {
        $('#dt-enab-disab-date').datetimepicker({
            defaultDate: "11/1/2013",
            disabledDates: [
                moment("12/25/2013"),
                new Date(2013, 11 - 1, 21),
                "11/22/2013 00:53"
            ]
        });
    });
    $(function () {
        $('#dt-view').datetimepicker({
            viewMode: 'years'
        });
    });
    $(function () {
        $('#dt-disab-days').datetimepicker({
            daysOfWeekDisabled: [0, 6]
        });
    });

})(jQuery);