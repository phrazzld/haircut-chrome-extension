chrome.runtime.onInstalled.addListener(() => {
  chrome.cookies.get(
    {name: 'li_at', url: 'https://www.linkedin.com'},
    cookie => {
      console.log(`li_at cookie:`);
      console.log(cookie);
      if (cookie) {
        // request profile info with session cookie
        fetch('https://www.linkedin.com/in/phaedrusraznikov', {
          method: 'GET',
          credentials: 'include',
        })
          .then(response => response.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            console.log('doc ******************');
            console.log(doc);
            // fetch all of the <code> tags
            const codes = doc.getElementsByTagName('code');
            console.log('codes');
            console.log(codes);
            // parse them as json
            let content = [];
            for (let i = 0; i < codes.length; i++) {
              content.push(codes.item(i).innerText.replace(/\n/g, '', -1));
            }
            console.log('content');
            console.log(content);
            console.log('content.toString()');
            console.log(content.toString());
            console.log('JSON.parse(content.toString())');
            console.log(JSON.parse(content.toString()));
            // ???
            // profit
          });
        // save to local storage
        chrome.storage.sync.set({cookie: cookie}, () => {
          console.log('The color is green.');
        });
      } else {
        chrome.tabs.create({url: 'https://linkedin.com'}, tab => {
          console.log(`tab: ${tab}`);
          chrome.cookies.get(
            {name: 'li_at', url: 'https://linkedin.com'},
            cookie => {
              console.log('Just fetched cookie');
              console.log(cookie);
            },
          );
        });
      }
    },
  );
});
