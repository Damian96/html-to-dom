var source,prefix,result,output,clipboard,download,error,$=jQuery,converter=new htmltodom,validatePrefix=function(){var e=converter.validateVarName(prefix.val()),i=prefix.closest(".form-group"),l=(i.find(".valid-feedback"),i.find(".invalid-feedback")),r=!prefix.val()||0==prefix.val().length;if(r||e){if(!r)return i.removeClass("is-invalid").addClass("is-valid"),prefix.removeClass("is-invalid").addClass("is-valid"),!0;i.removeClass("is-valid").addClass("is-invalid"),prefix.removeClass("is-valid").addClass("is-invalid"),l.html("This field is required.")}else i.removeClass("is-valid").addClass("is-invalid"),prefix.removeClass("is-valid").addClass("is-invalid"),l.html("Invalid variable name.");return!1},validateSource=function(){var e=!source.val()||0==source.val().length,i=source.closest("group");return e?(i.addClass("is-invalid").removeClass("is-valid"),source.addClass("is-invalid").removeClass("is-valid"),!1):(i.addClass("is-valid").removeClass("is-invalid"),source.addClass("is-valid").removeClass("is-invalid"),!0)},downloadFile=function(){"use strict";if(!validateSource()||!validatePrefix())return!1;if(void 0===output||null==output||0==output.length)return!1;var e=Date.now(),i=new File([output],"htmltodom-"+e+".js",{type:"text/javascript",lastModified:e}),l=document.createElement("a");l.href=URL.createObjectURL(i),l.setAttribute("download",i.name),document.body.appendChild(l),l.click(),l.remove()},showFullScreen=function(){"use strict";if(!validateSource()||!validatePrefix())return!1;if(void 0===output||null==output||0==output.length)return!1;var e=$("#source-popup"),i=e.find("pre");i.html(output),hljs.highlightBlock(i[0]),e.removeClass("hidden"),$("body").addClass("fullscreen"),$("#popup-close").click(function(){e.addClass("_hiding"),e.on("transitionEnd webkitTransitionEnd mozTransitionEnd oTransitionEnd msTransitionEnd",function(){e.hasClass("_hiding")&&(e.addClass("hidden").removeClass("_hiding"),$("body").removeClass("fullscreen"))})})};$(function(){source=$("#source"),prefix=$("#prefix"),result=$("#result"),download=$("#download"),error=$("#error"),result.html("// Javascript code will appear here..."),hljs.highlightBlock(result[0]),source.on("change focusout blur",validateSource),prefix.on("change focusout blur keyup",validatePrefix),download.click(downloadFile),$("#reset").click(function(){result.html("// Javascript code will appear here...")}),$("#fullscreen").click(showFullScreen),$("#submit").on("click",function(){if(!validateSource()||!validatePrefix())return!1;var e=new Object({src:source.val(),options:{prefix:prefix.val(),plaintext:$("#plain-text")[0].checked,whitespace:$("#whitespace")[0].checked,comments:$("#comments")[0].checked}});try{output=converter.convert(e),result.html(output),result.removeClass("empty"),hljs.highlightBlock(result[0]),error.addClass("hidden"),(clipboard=new ClipboardJS("#copy",{text:function(e){return output}})).on("success",function(e){var i=e.trigger.getAttribute("aria-label");e.trigger.setAttribute("aria-label","Copied!"),e.trigger.addEventListener("mouseleave",function(e,i){i.target.setAttribute("aria-label",e)}.bind(null,i),{once:!0})})}catch(e){console.error(e),result.html("// Error, see above."),error.removeClass("hidden").html(e),hljs.highlightBlock(result[0]),output="",null!=clipboard&&clipboard.destroy()}})});