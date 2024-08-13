const cheerio = require('cheerio');
const axios = require('axios');
const FormData = require('form-data');

async function telguarder(number) {
    let data = new FormData();
    data.append('q', number);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://www.telguarder.com/id/search',
        headers: {
            ...data.getHeaders()
        },
        data : data
    };

    const response  = await axios.request(config)

    const $ = cheerio.load(response.data);
    const headerNumber = $('body > div.ai-page-content.cl-container.no-padding-mobile > div.cl-content.ai-interscroller-aware > div.ai-panel.ai-number-stats-panel > div.ai-number-stats-panel-header > div.ai-number').text()
    const provider = $('body > div.ai-page-content.cl-container.no-padding-mobile > div.cl-content.ai-interscroller-aware > div.ai-panel.ai-number-stats-panel > div.ai-number-stats-panel-header > div.ai-full-number-container > div.ai-carrier-info.cc-tooltip.hoved.number-type-tooltip > div.ai-carrier-info-item > span').text()
    const jmlPnecarian = $('body > div.ai-page-content.cl-container.no-padding-mobile > div.cl-content.ai-interscroller-aware > div.ai-panel.ai-number-stats-panel > div.ai-number-stats-panel-content > div.ai-row-1 > div:nth-child(1) > div.ai-row-info-value').text()
    const jmlLapor = $('body > div.ai-page-content.cl-container.no-padding-mobile > div.cl-content.ai-interscroller-aware > div.ai-panel.ai-number-stats-panel > div.ai-number-stats-panel-content > div.ai-row-1 > div:nth-child(2) > div.ai-row-info-value').text()
    const lastCari = $('body > div.ai-page-content.cl-container.no-padding-mobile > div.cl-content.ai-interscroller-aware > div.ai-panel.ai-number-stats-panel > div.ai-number-stats-panel-content > div.ai-row-1 > div:nth-child(3) > div.ai-row-info-value').text()

    const activity = $('body > div.ai-page-content.cl-container.no-padding-mobile > div.cl-content.ai-interscroller-aware > div.ai-panel.ai-number-stats-panel > div.ai-number-stats-panel-content > div.ai-row-2 > div:nth-child(2) > div:nth-child(3) > span').text()
    let commentA = []

    $('#latestCommentPanelInner > div > div.ai-assessment-body').each((index, element) => {
        const c = $(element).text()

        commentA.push(c)
    })


    return {
        number: headerNumber
        , provider,
        "jmlPnecarian": jmlPnecarian
        , "jmlLapor": jmlLapor
        , "lastCari": lastCari
        , "activity": activity + " 3 bulan terakhir"
        , "comment": commentA
    }
}

module.exports = {telguarder}