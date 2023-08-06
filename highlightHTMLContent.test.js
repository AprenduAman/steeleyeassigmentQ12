const highlightHTMLContent = require('./highlightHTMLContent');

describe('highlightHTMLContent', () => {
  test('expected output should highlight the given plain text positions in the HTML content', () => {
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

    const expectedOutput = '<p><span>Hi David <br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects <br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility <mark>Equity</mark> scale solar… <br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br> ------------------------------------- <br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a> , and this story was marked as 82% relevant.<br><br> Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | <mark>Privacy</mark> Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br> ------------------------------------- <br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>';

    expect(highlightHTMLContent(htmlContent, plainText, plainTextPositions)).toBe(expectedOutput);
  });

  test('expected output should be same as html content as start is beyond greater then length of html content', () =>{

    const htmlContent = '<p><span>Hi David</span></p>';
    const plainText = `Hi David` ;
    const plainTextPositions = [
      {
        start: 30,
        end: 40,
      },
      


    ];

    const expectedOutput = `<p><span>Hi David</span></p>`;

    expect(highlightHTMLContent(htmlContent, plainText, plainTextPositions)).toBe(expectedOutput);

  });
  test('expected output should be same as html content as end is beyond greater then length of html content', () =>{

    const htmlContent = `<p>Content is the information contained within communication media.<br><br> This includes internet, cinema, television, radio, audio CDs, books, magazines, physical art, and live event content.</p>`;
    const plainText = `Content is the information contained within communication media. This includes internet, cinema, television, radio, audio CDs, books, magazines, physical art, and live event content.` ;
    const plainTextPositions = [
      {
        start: 178,
        end: 190,
      },
      
    ];

    const expectedOutput = `<p>Content is the information contained within communication media.<br><br> This includes internet, cinema, television, radio, audio CDs, books, magazines, physical art, and live event content.</p>`;

    expect(highlightHTMLContent(htmlContent, plainText, plainTextPositions)).toBe(expectedOutput);
    
  });
  test('expected output should highlight first plain text position , but not the second as that position are out of bound in html content', () =>{

    const htmlContent = `<p>Node.js is a cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS, and more.</p><p> Node.js is a back-end JavaScript runtime environment, runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser.</p>`;
    const plainText = `Node.js is a cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS, and more. Node.js is a back-end JavaScript runtime environment, runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser.` ;
    const plainTextPositions = [
      {
        start: 76,
        end: 83,
      },
      {
        start: 318,
        end: 325,
      },


    ];

    const expectedOutput = `<p>Node.js is a cross-platform, open-source server environment that can run on <mark>Windows</mark>, Linux, Unix, macOS, and more.</p><p> Node.js is a back-end JavaScript runtime environment, runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser.</p>`;

    expect(highlightHTMLContent(htmlContent, plainText, plainTextPositions)).toBe(expectedOutput);
    
  });
  test('expected output should highlight first and third plain text position, but not the second as that position is out of bound in the html content', () =>{

    const htmlContent = `<p>Node.js is a cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS, and more.</p><p> Node.js is a back-end JavaScript runtime environment, runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser.</p>`;
    const plainText = `Node.js is a cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS, and more. Node.js is a back-end JavaScript runtime environment, runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser.` ;
    const plainTextPositions = [
      {
        start: 76,
        end: 83,
      },
      {
        start: 318,
        end: 325,
      },
      {
        start:115,
        end:122,
      },


    ];

    const expectedOutput = `<p>Node.js is a cross-platform, open-source server environment that can run on <mark>Windows</mark>, Linux, Unix, macOS, and more.</p><p> <mark>Node.js</mark> is a back-end JavaScript runtime environment, runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser.</p>`;

    expect(highlightHTMLContent(htmlContent, plainText, plainTextPositions)).toBe(expectedOutput);
    
  });


});

