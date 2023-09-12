const puppeteer=require("puppeteer");
const {JSDOM}=require("jsdom");

function NormalizeURL(url){                                  //normalizing the url so that all urls are deemed to be same
    const url1=new URL(url)                                   // ex- www.GOOgle.com
    let fullurl=`${url1.host}${url1.pathname}`                //     www.google.com/
    if(fullurl.length>0 && fullurl.slice(-1)==='/'){          //     www.google.com
        fullurl=fullurl.slice(0,-1)                           // all the above urls are same 
    }
    return fullurl
}


function getHTMLURLs(htmlbdy,base){                  //extracts all urls from the html body and pushes them into an array
    const urls=[]
    const doc=new JSDOM(htmlbdy)
    const elements=doc.window.document.querySelectorAll('a')
    for(const element of elements){
        if(element.href.slice(0,1)==='/'){
            try{
                urls.push(new URL(element.href,base).href)                   //converts relative urls to absolute urls
            }
            catch(error){
                console.log(`${error.message}:${element.href}`)
            }
        }
        else{
            try{urls.push(new URL(element.href).href)
            }
            catch(error){
                console.log(`${error.message}:${element.href}`)
            }

        }
    }
    return urls

}