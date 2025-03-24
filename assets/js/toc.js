$(document).ready(function () {
    $(document).on("click", '.toc-list > li > a[href^="#"]', function (event) {
        event.preventDefault();
        let tblofContntHeight = $('.tblof-contnt').height();
        let headerHeight = $('.section-header').height();
        let totalHeight = tblofContntHeight + headerHeight;
        let totalSidebarHeight = totalHeight - 252;
        if(!$('.section-article-single__sidebar').length > 0) {
            $("html, body").animate({
                scrollTop: $($.attr(this, "href")).offset().top - totalHeight
            }, 800);
        }else {
            $("html, body").animate({
                scrollTop: $($.attr(this, "href")).offset().top - totalSidebarHeight
            }, 800);
        }

        if($('.tblof-contnt').hasClass('openList')){
            $('.tblof-contnt').removeClass('openList');
            $('.tblof-contnt').find('.tblof-contnt__list').slideUp(300);
        }

        console.log(tblofContntHeight);
    });

	var anchorList = [];
	$(".section-article-single__content-toc").each(function () {
		for (var i = 0; i < 6; i++) {
			var headingTag = "h" + (i + 1);
			if (headingTag != "h1") {
				$(this).find(headingTag).each(function () {
                    $(this).attr("id", "anchor-" + diacritics($(this).text()));
                    anchorList += `<li class="li-h${i + 1} fs-${i + 1}"">
                                    <a href="#${$(this).attr("id")}"><span>${$(this).text()}</span></a>
                                </li>`;
                });
			}
		}
	});

    let tocListUL = `<ul class="toc-list">${anchorList}</ul>`;

	$(".tblof-contnt__list").append(tocListUL);
    $(".tblof-contnt__title").on('click', function(){
        let selfThis = $(this).parent();
        if(!$(selfThis).hasClass('openList')) {
            $(selfThis).addClass('openList');
            $(selfThis).find('.tblof-contnt__list').slideDown(300);
        }else {
            $(selfThis).find('.tblof-contnt__list').slideUp(300);
            $(selfThis).removeClass('openList');
        }
    });

    function diacritics(value) {
        return value.toLowerCase().replace(/[@`$&.(){},;\[\]\n]/g, function(match) {
            const replacements = {
                '$': '',
                '&': '',
                '@': '',
                '.': '',
                ',': '',
                ';': '',
                '(': '',
                ')': '',
                '{': '',
                '}': '',
                '[': '',
                ']': '',
                '*': '',
                '-': '',
                '+': '',
                '/': '',
                '|': '',
                '^': '',
                '>': '',
                '<': '',
                '?': '',
                '~': '',
                '`': '',
                '\n': ''
            };
            return replacements[match];
        }).replace(/ /g, "");
    }
});