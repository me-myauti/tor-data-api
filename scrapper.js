const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const response = await page.goto('https://www.dan.me.uk/torlist/');
  if(response.status() == 200){
      const ipList = await page.evaluate(()=>{
      const nodeList = document.querySelectorAll('pre')[0].innerText
      const ipArray = [nodeList]
  
      const list = ipArray.map(ips => ({
        ip: ips
      }))
      const toSeparate = list[0].ip.split('\n')
      const separatedList = toSeparate.map(items => ({
        ip: items
      }))
      return separatedList
    })
  
    fs.writeFile('ips.json', JSON.stringify(ipList, null, 2), err => {
       if(err)throw new Error('Could not create json file!')
      console.log('Data inserted successfully')
    })
  }else{
    console.log('Error rewriting list of ips: You need to wait 30 minutes until the next request\n You should check your ips.json file instead')
  }
  await browser.close();
})();