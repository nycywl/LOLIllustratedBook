"use strict";
setTimeout(function(){
        (function($) {
            "use strict";
            $(".js-example-basic-single").select2();
            $(".js-example-disabled-results").select2();

            $(".js-example-basic-multiple").select2();

            $(".js-example-placeholder-multiple").select2({
                placeholder: "Select Your Name"
            });

            $(".js-example-basic-multiple-limit").select2({
                maximumSelectionLength: 2
            });

            $(".js-example-rtl").select2({
                dir: "rtl"
            });
            $(".js-example-basic-hide-search").select2({
                minimumResultsForSearch: Infinity
            });
            $(".js-example-disabled").select2({
                disabled: true
            });
            $(".js-programmatic-enable").on("click", function() {
                $(".js-example-disabled").prop("disabled", false);
            });
            $(".js-programmatic-disable").on("click", function() {
                $(".js-example-disabled").prop("disabled", true);
            });
        })(jQuery);
    }
    ,350);