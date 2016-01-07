var minWidth = 200,
    minHeight = 200,
    siteURL = "http://showgirls.dev/admin/t?get_article=";

function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    
    var myObject = new Object();
    var imagesURL = [];
    //return html;
    
    var images = [].slice.apply(document.getElementsByTagName('img'));

    for (i =0; i < images.length; i++ ) {
        if (images[i].clientWidth > minWidth && images[i].clientHeight > minHeight) {
            console.log(images[i].src);
            imagesURL.push(images[i].src);
        }
    }
    
    var h1s = document.getElementsByTagName('h1');

    if (h1s.length > 0) {
        myObject.title = h1s[0].innerText;
    } else {
        myObject.title = "Grab!";
    }
    
    myObject.url = document.URL;
    myObject.imgsrc = imagesURL;
    
    var myJsonString = JSON.stringify(myObject);

    if (imagesURL.length > 0 ) { 
        output = myJsonString;
        url = siteURL +  myJsonString;
        //window.open(url,"_blank")
        return url;
    } else {
        return "Нет картинок хорошего качества!";
    }
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});