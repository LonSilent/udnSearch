$('#toSearch').keydown(function(e) {
	if (e.keyCode == 13) {
		submit();
	}
})

function occurrences(string, subString, allowOverlapping) {

	string += "";
	subString += "";
	if (subString.length <= 0) return (string.length + 1);

	var n = 0,
		pos = 0,
		step = allowOverlapping ? 1 : subString.length;

	while (true) {
		pos = string.indexOf(subString, pos);
		if (pos >= 0) {
			++n;
			pos += step;
		} else break;
	}
	return n;
}

function submit() {
	$('#cardArea').empty()
	$('#cardArea').append('<div class="preloader-wrapper big active"id="circle">' +
		'<div class="spinner-layer spinner-blue-only">' +
		'<div class="circle-clipper left"><div class="circle">' +
		'</div></div><div class="gap-patch"><div class="circle">' +
		'</div></div><div class="circle-clipper right">' +
		'<div class="circle"></div></div></div></div>');
	var string = $('#toSearch').val();
	var urlSearch = "";
	// console.log(string);
	if (string.search("/") > -1) {
		console.log("proximity");
		var distance = string.substring(string.lastIndexOf("/") + 1, string.lastIndexOf(" "));
		console.log(distance);
		urlSearch = "/api?q=" + string.replace("/".concat(distance) + " ", "") +
			"&m=proximity&d=" + distance;
		var text = string.replace("/".concat(distance) + " ", "");
		console.log(urlSearch);
		console.log(text);
	} else {
		console.log("normal");
		urlSearch = "/api?q=" + string + "&m=normal";
		var text = string.replace("AND ", "").replace("OR ", "").split(" ");
		var notIndex = text.indexOf("NOT");
		if (notIndex > -1) {
			text.splice(notIndex, 1);
		}
		console.log(text);
		console.log(urlSearch);
	}
	$.ajax({
		url: urlSearch,
		type: "GET",
		dataType: "json",
		success: function(data) {
			$('#cardArea').empty()
			if (text[0] === "") {
				$('#cardArea').append('<h4>' + '請輸入query' + '</h4>');
			} else if (data.length === 0 || data[0].content === undefined) {
				$('#cardArea').append('<h4>' + '查無結果，請重新輸入query' + '</h4>');
			} else {
				$('#cardArea').append('<p>總共有<strong>' + data.length + '</strong>筆資料符合\"' + string + '\"的搜尋結果</p>');
				if (text.length === 1) {
					var queryOcurrence = 0;
					for (var i = 0; i < data.length; i++) {
						queryOcurrence += occurrences(data[i].content, text[0], true);
						queryOcurrence += occurrences(data[i].title, text[0], true);
						queryOcurrence += occurrences(data[i].sub_title, text[0], true);
						queryOcurrence += occurrences(data[i].author, text[0], true);
					}
					$('#cardArea').append('<p>總共有<strong>' + queryOcurrence + '</strong>個\"' + text[0] + '\"出現在文本</p>');
				}
				for (var i = 0; i < data.length; i++) {
					$('#cardArea').append('<div class="card blue-grey darken-1" id="card' + i + '"></div>').append(
						'<div id="modal' + i + '" class="modal"></div>');
					$('#card' + i).append('<div class="card-content white-text" id="cardContent' + i + '""></div>').append(
						'<div class="card-action" id="action' + i + '""></div>');

					if (data[i].highlights.length > 0) {
						$('#cardContent' + i).append('<span class="card-title">' +
							data[i].title + '</span>').append(
							'<span class="sub_title">' + data[i].sub_title + '</span>').append(
							'<span class="author">' + data[i].author + '</span>').append(
							'<p>...' + data[i].highlights + '...</p>');
					} else {
						$('#cardContent' + i).append('<span class="card-title">' +
							data[i].title + '</span>').append(
							'<span class="sub_title">' + data[i].sub_title + '</span>').append(
							'<span class="author">' + data[i].author + '</span>').append(
							'<p>' + data[i].content + '</p>');
					}

					$('#action' + i).append('<a class="waves-effect waves-light btn modal-trigger" href="#modal' + i + '" id="dialog' + i + '"> ' + '看全文</a>');
					// popup dialog
					$('#modal' + i).append('<div class="modal-content" id="modalText' +
						i + '"></div>');
					$('#modalText' + i).append('<h4>' + data[i].title + '</h4>').append(
						'<h5>' + data[i].sub_title + '</h5>').append(
						'<h6>' + data[i].author + '</h6>').append(
						'<p>' + data[i].content + '</p>');
				}

				$('a').click(function() {
					$('#modal' + event.target.id.substring(6)).openModal();
				});
				for (var i = 0; i < text.length; i++) {
					$("p").jmHighlight(text[i], {});
					$("span").jmHighlight(text[i], {});
					$("h5").jmHighlight(text[i], {});
					$("h6").jmHighlight(text[i], {});
				}
			}
		}
	});
}
