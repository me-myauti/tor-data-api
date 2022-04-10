const puppeteer = require('puppeteer');
const fs = require('fs');
var path = "./ips.json";

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
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
  
    try{
        fs.access(path, fs.constants.F_OK, (err) =>{
          if(err){
            fs.writeFile('ips.json', JSON.stringify(ipList, null, 2), err => {
              if(err)throw new Error('Could not create json file!')
            console.log('Created ips.json')
            })
          }
        })
    }catch(error){
        fs.writeFile('ips.json', JSON.stringify(ipList, null, 2), err => {
            if(err)throw new Error('Could not create json file!')
          console.log('Created ips.json')
         })
    }
  }else{
    const defaultData = [{ip: "Theres no ips yet"}]
    try {
          fs.access(path, fs.constants.F_OK, (err)=>{
            if(err){
              fs.writeFile('ips.json', JSON.stringify(defaultData, null, 2), err => {
                if(err)throw new Error('Could not create json file!')
                console.log('Created ips.json')
              })
            }
          });
    }catch(error){
        console.log('your file already exists')
      }
      console.log('Error rewriting list of ips: You need to wait 30 minutes until the next request\n You should check your ips.json file instead')
  }
  await browser.close();
})();