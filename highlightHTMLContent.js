/**
 * Strips the prefix from the keys of the given key-value pairs
 * @param {string} htmlContent - HTML content which needs to be highlighted
 * @param {string} plainText - This plain text is extracted from htmlContent
 * @param {array} plainTextPositions - Array of Objects with start and end positions of words in plainText (Not the positions in HTML)
 * @returns {string} Using the positions in plainText, find the appropriate positions in htmlContent, highlight the content and return it
 */
function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {

  var result = htmlContent;
  var pre_i = htmlContent.length;

// traversing throgh different start points
  for (var pos of plainTextPositions) {

    var start = pos.start,
      end = pos.end;
    var count_start = 0,
      count_end = 0;
    var i = 0,
      j = 0;
    

    while (count_start !== start) {
      var char = htmlContent[i];
      if (char === "<") {
        while (char !== ">") {

          char = htmlContent[i];
          i++;

        }
      } else {
        count_start++;
        i++;
      }

    }


    while (count_end !== end) {
      var char = htmlContent[j];
      if (char === "<") {
        while (char !== ">") {

          char = htmlContent[j];
          j++;
        }
      } else {
        count_end++;
        j++;
      }

    }
    if(i > htmlContent.length || j > htmlContent.length){
      continue;
    }
    if (pre_i < i) {
      i += 13;
      j += 13;
    }
    const prefix = result.slice(0, i);
    const suffix = result.slice(j);
    result = `${prefix}<mark>${result.slice(i, j)}</mark>${suffix}`;
    pre_i = i;
  }

  return result;
}

module.exports = highlightHTMLContent;


//example 
const htmlContent = `<p><span>Hi David <br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects <br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… <br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br> ------------------------------------- <br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a> , and this story was marked as 82% relevant.<br><br> Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br> ------------------------------------- <br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>`;
const plainText = `Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here .`;
const plainTextPositions = [
  {
    start: 241,
    end: 247,
  },
  {
    start: 518,
    end: 525,
  },


];

const highlightedContent = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
console.log(highlightedContent);


