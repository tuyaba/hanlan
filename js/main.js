$(function () {
	var mtp = new Array();
	mtp[0] = 0;

	$('.module-title').each(function(index, el) {
		mtp[index + 1] = $(this).offset().top - 40;
	});

	$(window).scroll(function(event) {
			var mindex;
			var wtop = $(window).scrollTop();
			for (var i = 0; i < mtp.length; i++) {
				if (i == mtp.length - 1) {
					if (wtop >= mtp[i]) {
						mindex = i ;
						break;
					}
				} else{
					if (wtop >= mtp[i] && wtop < mtp[i + 1]) {
						mindex = i;
						break;
					}
				}
			};

			
			$('nav a').eq(mindex).addClass('navactive').siblings().removeClass('navactive');
	});

	$('nav a').click(function(event) {
		// navClick = 1;
		var i = $(this).index();
		var top = i ? ($('.module-title').eq(i - 1).offset().top) - 40 : 0;
		$(this).addClass('navactive').siblings().removeClass('navactive');
		$('body').animate({scrollTop:top}, 300);
		return false;
	});

	$('#msg-mail').focus(function(event) {
		if ($(this).val() == '邮箱') {
			$(this).val('');
		}
	});

	$('#msg-mail').blur(function(event) {
		if ($(this).val() == '') {
			$(this).val('邮箱');
		}
	});

	$('#msg-phone').focus(function(event) {
		if ($(this).val() == '电话') {
			$(this).val('');
		}
	});

	$('#msg-phone').blur(function(event) {
		if ($(this).val() == '') {
			$(this).val('电话');
		}
	});

	$('#msg-send').click(function(event) {
		var mail = $('#msg-mail').val();
		var phone = $('#msg-phone').val();
		var content = $('#msg-content').val();

		$.ajax({
			url: 'http://localhost:8080/hladvice',
			type: 'post',
			data: {mail: mail, phone: phone, content: content},
		})
		.done(function(msg) {
			if (msg == 1) {
				pop('反馈成功');
			} else {
				pop(msg);
			}
		})
		.fail(function() {
			pop('反馈失败');
		})
		.always(function() {
			console.log("complete");
		});
		
	});

	$('#milestone-img img').hover(function() {
		var i = $('#milestone-img img').index($(this)[0]);
		$('.milestone-stone').eq(i).trigger('mouseenter');
	}, function() {
		var i = $('#milestone-img img').index($(this)[0]);
		$('.milestone-stone').eq(i).trigger('mouseleave');
	});

	$('.milestone-stone').hover(function() {
		var i = $(this).index();
		if (i <= 7) {
			$(this).css('background-position', '-603px -480px');
			var src = 'partimg/tu_0' + (i + 1) + '.jpg'; 
			$('#milestone-img img').eq(i).attr('src', src)
			.css({
				'z-index': '99',
				'width': '260px', 
				'height': '192px',
				'margin-left': '-130px',
				'margin-top': '-96px'
			});
			// .css('z-index', '99')
			// .animate({
			// 	width: '260px', 
			// 	height: '192px',
			// 	marginLeft: '-130px',
			// 	marginTop: '-96px',
			// }, 200);
		}
	}, function() {
		var i = $(this).index();
		if (i <= 7) {
			$(this).css('background-position', '-633px -480px');
			var src = 'partimg/tu_0' + (i + 1) + '_0.jpg'; 
			$('#milestone-img img').eq(i).attr('src', src)
			.css({
				'z-index': i,
				'width': '138px', 
				'height': '177px',
				'margin-left': '-69px',
				'margin-top': '-88px'
			});
			// .css('z-index', i)
			// .animate({
			// 	width: '138px', 
			// 	height: '177px',
			// 	marginLeft: '-69px',
			// 	marginTop: '-88px'
			// }, 200);
		}
	});
});


function pop (msg) {
	$('#popup').html(msg).fadeIn(200, function() {
		setInterval('clpop()', 1000);
	});
}

function clpop () {
	$('#popup').fadeOut(200);
}