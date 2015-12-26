module.exports = stdout => {
	if (stdout === '' || stdout === null || stdout === undefined) {
		return [{}];
	}

	var output = stdout.toString('utf8').split('>>>>>>OUTPUT start<<<<<<\n')[1].split('>>>>>>OUTPUT end<<<<<<\n')[0];
	if (output === '') {
		return [{}];
	}

	var datas = output.split('>>>>>> data start:\n')
		.map(data => data.split('>>>>>> data end:\n')[0])
		.filter(data => data.length > 0)
		.map(data => {
			console.log(data);
			return data;
		})
		.map(data => {
			var title = data.split('>>>>>> title start:\n')[1].split('>>>>>> title end:\n')[0];
			var subTitle = data.split('>>>>>> sub_title start:\n')[1].split('>>>>>> sub_title end:\n')[0];
			var author = data.split('>>>>>> author start:\n')[1].split('>>>>>> author end:\n')[0];
			var content = data.split('>>>>>> content start:\n')[1].split('>>>>>> content end:\n')[0];
			return {
				title: title.replace(/\n/g, ''),
				sub_title: subTitle.replace(/\n/g, ''),
				author: author.replace(/\n/g, ''),
				content: content.replace(/\n/g, '<br>')
			};
		});

	return datas;
};
