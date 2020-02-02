const Apify = require('apify');
const db = require('../Db/db.js');
const { log } = Apify.utils;

log.setLevel(log.LEVELS.ERROR);

db.clearDb();

Apify.main(async () => {
	const requestList = new Apify.RequestList({
		sources: [
			{ url: 'https://projetocomprova.com.br/page/1' },
			{ url: 'https://projetocomprova.com.br/page/2' },
			{ url: 'https://projetocomprova.com.br/page/3' },
			{ url: 'https://projetocomprova.com.br/page/4' },
			{ url: 'https://projetocomprova.com.br/page/5' },
			{ url: 'https://projetocomprova.com.br/page/6' },
			{ url: 'https://projetocomprova.com.br/page/7' },
			{ url: 'https://projetocomprova.com.br/page/8' },
			{ url: 'https://projetocomprova.com.br/page/9' },
		],
	});

	await requestList.initialize();

	const crawler = new Apify.CheerioCrawler({
		requestList,
		handlePageFunction: async ({ request, html, $ }) => {
			$('.answer').each((index, el) => {
				let source = "projeto-comprova";
				let title = $(el).find('.answer__title').text().trim();
				let date = new Date($(el).find('.answer__credits__date').text().trim());
				let content = $(el).find('.answer__content--main').text().trim();
				let url_detail = $(el).find('.answer__title__link').attr('href');
				let imageDiv = $(el).find('.answer__image');
				let url_image = $(imageDiv).css('background-image');

				url_image = url_image.replace("url( ", '');
				url_image = url_image.replace(" )", '');
				url_image = url_image.replace(/['"]+/g, '').trim();

				db.insert({
					title,
					url_image,
					date,
					content,
					source,
					url_detail
				});
			});
		},
		maxRequestsPerCrawl: 100,
		maxConcurrency: 10,
	});

	await crawler.run();
});