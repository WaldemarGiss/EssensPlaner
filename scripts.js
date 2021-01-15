let x = document.querySelectorAll('input[type="checkbox"]')
document.getElementById("reset").addEventListener("click", loReload)

for (let i = 0; i < x.length; i++) {
    x[i].addEventListener("change", loadFood)
}

function loReload() {
    location.reload()
}

function loadFood() {
    let kategorie = []
    let entfernung = []
    let preis = []
    let veggie = []


    //Check Kategorie
    let filter = document.querySelectorAll(".filter:checked")

    if (filter.length === 0) {
        document.getElementById("alles").checked = true
        kategorie.push(document.getElementById("alles").value)
    }

    for (let i = 0; i < filter.length; i++) {
        kategorie.push(filter[i].value)
    }

    if (kategorie.includes(document.getElementById("alles").value) && kategorie.length > 1) {
        kategorie.splice(kategorie.indexOf(document.getElementById("alles").value), 1)
        document.getElementById("alles").checked = false
    }

    //Check Entfernung
    let entf = document.querySelectorAll(".entfernung:checked")

    if (entf.length === 0) {
        document.getElementById("entEgal").checked = true
        entfernung.push(document.getElementById("entEgal").value)
    }

    for (let i = 0; i < entf.length; i++) {
        entfernung.push(entf[i].value)
    }

    if (entfernung.includes(document.getElementById("entEgal").value) && entfernung.length > 1) {
        entfernung.splice(entfernung.indexOf(document.getElementById("entEgal").value), 1)
        document.getElementById("entEgal").checked = false
    }

    //Check Preis
    let prei = document.querySelectorAll(".preis:checked")

    if (prei.length === 0) {
        document.getElementById("preisEgal").checked = true
        preis.push(document.getElementById("preisEgal").value)
    }

    for (let i = 0; i < prei.length; i++) {
        preis.push(prei[i].value)
    }

    if (preis.includes(document.getElementById("preisEgal").value) && preis.length > 1) {
        preis.splice(preis.indexOf(document.getElementById("preisEgal").value), 1)
        document.getElementById("preisEgal").checked = false
    }


    //Check Veggie
    let veg = document.querySelectorAll(".veggietauglich:checked")

    if (veg.length === 0) {
        document.getElementById("veggieEgal").checked = true
        veggie.push(document.getElementById("veggieEgal").value)
    }

    for (let i = 0; i < veg.length; i++) {
        veggie.push(veg[i].value)
    }

    if (veggie.includes(document.getElementById("veggieEgal").value) && veggie.length > 1) {
        veggie.splice(veggie.indexOf(document.getElementById("veggieEgal").value), 1)
        document.getElementById("veggieEgal").checked = false
    }

    function handleResponse(responseText) {

        let area = document.querySelector(".textArea")
        area.innerHTML = ''
        let text = JSON.parse(responseText)

        for (let i = 0; i < text.length; i++) {

            let div = '<div class="restaurant">'
            div += '<span class="ausgabe">'
            div += text[i].name
            div += ' | '
            div += '</span>'
            let preis = text[i].preis
            div += '<span class="ausgabe">'
            div += '<i class="fa fa-money"></i>'
            div += ' '
            for (let j = 0; j < preis; j++) {
                div += '*'
            }
            div += ' | '
            div += '</span>'
            let entfernung = text[i].entfernung
            div += '<span class="ausgabe">'
            div += '<i class="fa fa-map-marker"></i>'
            div += ' '
            for (let j = 0; j < entfernung; j++) {
                div += '*'
            }
            div += ' | '
            div += '</span>'
            let veggie = text[i].veggie
            div += '<span class="ausgabe">'
            div += '<i class="fa fa-leaf"></i>'
            div += ' '
            for (let j = 0; j < veggie; j++) {
                div += '*'
            }
            div += '</span>'

            div += '</div>'

            area.innerHTML += div
        }
    }

    //AJAX zu PHP

    let xhttp = new XMLHttpRequest();
    let formData = new FormData();

    formData.append("kategorie", JSON.stringify(kategorie))
    formData.append("entfernung", JSON.stringify(entfernung))
    formData.append("preis", JSON.stringify(preis))
    formData.append("veggie", JSON.stringify(veggie))

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            handleResponse(this.responseText)
        }
    };
    xhttp.open("POST", "get.php", true);
    xhttp.send(formData);
}