let fav = document.querySelector('.fav');
let size_fav = document.querySelector('.size_fav');

// marqueur leaflet
let map = L.map('map').setView([50.634955120678875, 3.0618515237222694], 12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Div de redirestion des favoris
const url = 'https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone'
fetch(url)
    .then((res) => res.json())
    .then((res) => {
        const places = res.records;
        for (let lieu of places) {
            let marker = L.marker(lieu.fields.geolocalisation).addTo(map);
            //div qui s'affiche quand on clique sur un marqueur avec son écouteur
            marker.addEventListener("click", () => {
                fav.innerHTML = `
                <div class="size_fav ">
                    <div class="size_camera flex pos center"><i class="fa-solid fa-camera-retro logo_size logo_padding"></i></div>
                    <div class="flex direct pos_p size_adresse googlefont">
                        <p class="p_marginbot">${lieu.fields.contact}</p>
                        <p class="p_descript">${lieu.fields.infos}</p>
                    </div>
                    <div class = "flex bout">
                        <div class="pos_btn"><button type="button" class="btn">Enregistrer</button></div>
                        <div><i class="fa-solid fa-xmark logo_size pos_croix "></i></div>
                    </div>
                </div> `;
                // bouton enregistrement des favoris
                fav.addEventListener('click', (e) => {
                    if (e.target.tagName === 'BUTTON') {
                        add();
                    }

                }
                )

                // fonction localstorage

                function add() {
                    const mesFavs = JSON.parse(localStorage.getItem('favoris')) || [];
                    const newContact = lieu.fields.contact;
                    mesFavs.push(newContact);
                    localStorage.setItem('favoris', JSON.stringify(mesFavs));
                }

                // bouton pour supprimer la popup
                fav.addEventListener('click', (e) => {
                    if (e.target.tagName === 'I') {
                        e.target.parentElement.parentElement.parentElement.remove();
                    }
                })
            })
        }
    })

