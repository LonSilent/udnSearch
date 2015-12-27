$('#toSearch').attr('required');

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
	console.log(string);
	if (string.search("/") > -1) {
		console.log("proximity");
		var distance = string.substring(string.lastIndexOf("/") + 1, string.lastIndexOf(" "));
		console.log(distance);
		urlSearch = "/api?q=" + string.replace("/".concat(distance) + " ", "") +
			"&m=proximity&d=" + distance;
		var text = string.replace("/".concat(distance) + " ", "").replace(
			"AND ", "").replace("OR ", "").split(" ");
		console.log(urlSearch);
		console.log(text);
	} else {
		console.log("normal");
		urlSearch = "/api?q=" + string + "&m=normal";
		var text = string.replace("AND ", "").replace("OR ", "").split(" ");
		console.log(text);
	}
	$.ajax({
		url: urlSearch,
		type: "GET",
		dataType: "json",
		success: function(data) {
			$('#cardArea').empty()
			console.log("GG");
			console.log(data);
			if (text[0] === "") {
				console.log(".....");
				$('#cardArea').append('<h4>' + '請輸入query' + '</h4>');
			} else {
				for (var i = 0; i < data.length; i++) {
					// card content
					$('#cardArea').append('<div class="card blue-grey darken-1" id="card' + i + '"></div>').append(
						'<div id="modal' + i + '" class="modal"></div>');
					$('#card' + i).append('<div class="card-content white-text" id="cardContent' + i + '""></div>').append(
						'<div class="card-action" id="action' + i + '""></div>');
					$('#cardContent' + i).append('<span class="card-title">' + 
						data[i].title + '</span>').append(
						'<p>' + data[i].content + '</p>');
					$('#action' + i).append('<a class="waves-effect waves-light btn modal-trigger" href="#modal' 
						+ i + '" id="dialog' + i + '"> ' + '看全文</a>');
					// popup dialog
					$('#modal' + i).append('<div class="modal-content" id="modalText' +
					 i + '"></div>');
					$('#modalText' + i).append('<h4>' + data[i].title + '</h4>').append(
						'<p>' + data[i].content + '</p>');
				}

				$('a').click(function() {
					console.log(event.target.id.substring(6));
					$('#modal' + event.target.id.substring(6)).openModal();
				});
				for (var i = 0; i < text.length; i++) {
					$("p").jmHighlight(text[i], {});
				}
			}
		}
	});
}
