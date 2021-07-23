

//The field date must be a date in mvc -------HATASININ ÇÖZÜMÜ------
//To Fix jQuery date format 'en-GB' validation problem in Chrome
//and make sure it load after the 'jquery.validate.min.js':
//<script type="text/javascript" src="/Scripts/jquery-3.1.0.min.js"></script>
//<script type="text/javascript" src="/Scripts/jquery.validate.min.js"></script>
//<script type="text/javascript" src="/Scripts/jquery.validate.date.js"></script>


$(function () {
    $.validator.addMethod(
        "date",
        function (value, element) {
            var bits = value.match(/([0-9]+)/gi), str;
            if (!bits)
                return this.optional(element) || false;
            str = bits[1] + '/' + bits[0] + '/' + bits[2];
            return this.optional(element) || !/Invalid|NaN/.test(new Date(str));
        },
        "Please enter date in valid format [dd/mm/yyyy]"
    );
});