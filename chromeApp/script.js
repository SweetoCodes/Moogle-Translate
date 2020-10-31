var elements = document.getElementsByTagName('*');

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        var json = JSON.parse(xhr.responseText);

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            for (var j = 0; j < element.childNodes.length; j++) {
                var node = element.childNodes[j];

                if (
                    (node.nodeType === 3) 
                    && (node.nodeValue.slice(-1) != ';') // Omit JS expressions
                    && (node.nodeValue.slice(-1) != '>') // Omit HTML expressions
                    && (node.nodeValue.slice(-1) != '}') // Omit CSS expressions
                    ) {
                    var text = node.nodeValue;
                    console.log(text)

                    var indiv = text.match(/\w+|\s+|[^\s\w]+/g);
                    var newArray = [];

                    for (k of indiv) {
                        if (k == " ") {
                            newArray.push(k)
                        } else if (json[k.toLowerCase()] === undefined) {
                            newArray.push(k)
                        } else {
                            newArray.push(json[k.toLowerCase()])
                        }
                    }

                    var replacedText = newArray.join("")
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}
xhr.open("GET", chrome.extension.getURL('/moo_translate.json'), true);
xhr.send();