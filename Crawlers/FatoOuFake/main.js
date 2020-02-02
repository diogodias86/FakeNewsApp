const Apify = require('apify');
const db = require('../Db/db.js');
const momentjs = require('moment');
const { log } = Apify.utils;

log.setLevel(log.LEVELS.ERROR);

//db.clearDb();

function strToDate(dateStr) {
    let date = new Date();
    let num = dateStr.replace(/^\D+|\D+$/g, "");

    dateStr = dateStr.toLowerCase();

    if (dateStr.includes('horas') ||
        dateStr.includes('minutos') ||
        dateStr.includes('segundos')) {
        return date;
    }

    if (dateStr.includes('dia') || dateStr.includes('ontem')) {
        if (dateStr.includes('ontem')) {
            num = 1;
        }

        return momentjs().subtract(num, 'days');
    }

    if (dateStr.includes('semana')) {
        return momentjs().subtract(num, 'weeks');
    }

    if (dateStr.includes('mês') || dateStr.includes('meses')) {
        return momentjs().subtract(num, 'months');
    }

    if (dateStr.includes('ano')) {
        return momentjs().subtract(num, 'years');
    }

    return date;
}

Apify.main(async () => {
    const requestList = new Apify.RequestList({
        sources: [
            { url: 'https://g1.globo.com/fato-ou-fake/index/feed/pagina-1.ghtml' },
            //{ url: 'https://g1.globo.com/fato-ou-fake/index/feed/pagina-57.ghtml' }
        ],
    });

    await requestList.initialize();

    const crawler = new Apify.CheerioCrawler({
        requestList,
        handlePageFunction: async ({ request, html, $ }) => {
            $('.bastian-feed-item').each((index, el) => {
                let source = "fato-ou-fake";
                let title = $(el).find('.feed-post-link').text().trim();
                let elContent = $(el).find('.feed-post-body-resumo');
                let content = $(elContent).find('._label_event').text();
                let url_detail = $(el).find('.feed-post-link').attr('href');
                let url_image = $(el).find('.bstn-fd-picture-image').attr('src');
                let date = strToDate($(el).find('.feed-post-datetime').text());

                // db.insert({
                //     title,
                //     url_image,
                //     date,
                //     content,
                //     source,
                //     url_detail
                // });
            });
        },
        maxRequestsPerCrawl: 100,
        maxConcurrency: 10,
    });

    await crawler.run();
});