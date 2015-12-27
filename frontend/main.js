function submit() {
	var string = $('#toSearch').val();
	var urlSearch = "";
	console.log(string);
	if (string.search("/") > -1) {
		console.log("proximity");
		var distance = string.substring(string.lastIndexOf("/") + 1, string.lastIndexOf(" "));
		console.log(distance);
		urlSearch = "/api?q=" + string.replace("/".concat(distance) + " ", "") +
			"&=proximity&d=" + distance;
		console.log(urlSearch);
	} else {
		console.log("normal");
		urlSearch = "/api?q=" + string + "&=normal";
		console.log(urlSearch);
	}
	$.ajax({
		url: urlSearch,
		type: "GET",
		dataType: "json",
		success: function(data) {
			// alert("SUCCESS!!!");
			$('#cardArea').empty()
			console.log("GG");
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				// card content
				$('#cardArea').append('<div class="card blue-grey darken-1" id="card' + i + '"></div>').append(
					'<div id="modal'+ i +'" class="modal"></div>');
				$('#card' + i).append('<div class="card-content white-text" id="cardContent' + i + '""></div>').append(
					'<div class="card-action" id="action' + i + '""></div>');
				$('#cardContent' + i).append('<span class="card-title">' + data[i].title + '</span>').append(
					'<p>' + data[i].content + '</p>');
				$('#action' + i).append('<a class="waves-effect waves-light btn modal-trigger" href="#modal' + i + '" id="dialog' + i + '"> '+'看全文</a>');
				// popup dialog
				$('#modal'+i).append('<div class="modal-content" id="modalText'+ i +'"></div>');
				$('#modalText'+i).append('<h4>'+ data[i].title +'</h4>').append(
					'<p>'+data[i].content+'</p>');
			}
			$('a').click(function(){
				console.log(event.target.id.substring(6));
				$('#modal'+ event.target.id.substring(6) ).openModal();
			});
		}
	});
}