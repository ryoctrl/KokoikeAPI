module.exports = {
    target: 'muni_gurume',
    extractLocationFromTweet: function(tweet) {
        const text = tweet.text;
        const texts = text.split('\n');
        const name = texts[0].slice(1, -1);
        let areaTextLine = texts[1];
        let areaName = '';
        let begin = false;
        //NOTE: 全角コロンがうまい具合にsplitやregexで取れないため以下の実装.
        for(ch of areaTextLine) {
            if(ch.charCodeAt(0) === 39365) break;
            if(begin) areaName += ch;
            if(ch.charCodeAt(0) === 65306) begin = true;
        }
        return {
            name: name,
            area: areaName,
        };

    }
}
