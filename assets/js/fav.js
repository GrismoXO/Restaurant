let fav_two = document.querySelector('.fav_two');
let test = JSON.parse(localStorage.getItem('favoris'));

// div créer par le localstorage
function testfav() {
    
    for (i = 0; i < test.length; i++) {
        fav_two.innerHTML +=`
        <div class="size_fav ">
        <div class="size_camera_fav flex pos center"><i class="fa-solid fa-camera-retro logo_size logo_padding_fav"></i></div>
        <div class="flex direct pos_p size_adresse googlefont">
            <p class="p_marginbot">${test[i]}</p>
        </div>
        <div class = "flex bout_fav">
            <div class="pos_btn"><button type="button" class="btn">Suprimer</button></div>
        </div>
    </div> `;
    }
}
testfav();

// écouteur
fav_two.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        clear();
        e.target.parentElement.parentElement.parentElement.remove();
        
    }
})

// fonction pour supprimer le localstorage
function clear() {
    localStorage.removeItem('favoris');
}

