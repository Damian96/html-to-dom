var $           = jQuery;
var converter   = new htmltodom();
var source;
var prefix;
var result;
var output;
var clipboard;

var validatePrefix  = function() {
    var isValid     = converter.validateVarName( prefix.val() );
    var group       = prefix.closest('.form-group');
    var validFeed   = group.find('.valid-feedback');
    var invalidFeed = group.find('.invalid-feedback');
    var isEmpty     = ! prefix.val() || prefix.val().length == 0;

    if ( ! isEmpty && ! isValid ) { // valid
        group.removeClass('is-valid').addClass('is-invalid');
        prefix.removeClass('is-valid').addClass('is-invalid');
        invalidFeed.html("Invalid variable name.");
    } else if ( ! isEmpty ) { // invalid
        group.removeClass('is-invalid').addClass('is-valid');
        prefix.removeClass('is-invalid').addClass('is-valid');
        return true;
    } else { // empty
        group.removeClass('is-valid').addClass('is-invalid');
        prefix.removeClass('is-valid').addClass('is-invalid');
        invalidFeed.html('This field is required.');
    }

    return false;
};

var validateSource  = function() {
    var isEmpty = ! source.val() || source.val().length == 0;
    var group   = source.closest('group');

    if ( isEmpty ) {
        group.addClass('is-invalid').removeClass('is-valid');
        source.addClass('is-invalid').removeClass('is-valid');
    } else {
        group.addClass('is-valid').removeClass('is-invalid');
        source.addClass('is-valid').removeClass('is-invalid');
        return true;
    }

    return false;
};

$(function () {
    source  = $('#source');
    prefix  = $('#prefix');
    result  = $('#result');

    // Higlight.js - Result Code
    result.html('// Javascript code will appear here...');
    // hljs.configure({useBR: true});
    hljs.highlightBlock(result[0]);
    
    source.on('change focusout blur', validateSource);
    prefix.on('change focusout blur keyup', validatePrefix);

    $("#submit").on('click', function() {
        if ( ! validatePrefix() || ! validateSource() ) {
            return false;
        }

        var data = new Object({
            src: source.val(),
            options: {
                prefix: prefix.val(),
                plaintext: $('#plain-text')[0].checked,
                whitespace: $('#whitespace')[0].checked,
                comments: $('#comments')[0].checked
            }
        });

        console.log('options', data.options);

        try {
            output  = converter.convert(data);
            result.html(output);
            result.removeClass('empty');
            // Higlight.js - Result Code
            hljs.highlightBlock(result[0]);

            $('#error').addClass('hidden');

            clipboard = new ClipboardJS('#copy', {
                text: function(trigger) {
                    return output;
                }
            });
            clipboard.on('success', function(e) {
                var og  = e.trigger.getAttribute('aria-label');
                e.trigger.setAttribute('aria-label', 'Copied!');

                e.trigger.addEventListener('mouseleave', function(label, e) {
                    e.target.setAttribute('aria-label', label);
                }.bind(null, og), {once: true});
            });
        } catch( e ) {
            console.error(e);

            // Higlight.js
            result.html('// Error, see above.');
            $('#error').removeClass('hidden').html(e);

            hljs.highlightBlock(result[0]);

            if ( clipboard != null )
                clipboard.destroy();
        }
    });
});