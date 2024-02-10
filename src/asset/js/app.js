function menu(){
    const list = document.getElementById('listMenu')

    if(list.classList.contains('hidden')){
        list.classList.remove('hidden')
    } else {
        list.classList.add('hidden')
    }
}

function listCategory(){
    const list = document.getElementById('listCategory')
    const arrow = document.getElementById('arrow')

    if(list.classList.contains('hidden')){
        list.classList.remove('hidden')
        arrow.classList.add('rotate-180')
    } else {
        list.classList.add('hidden')
        arrow.classList.remove('rotate-180')

    }

}

function closeSearch(){
    const search = document.getElementById('searchBar')

        search.classList.add('hidden')
}

function openSearch(){
    const search = document.getElementById('searchBar')

        search.classList.toggle('hidden')
}

let counter = 1

function increment(){
    counter++
    document.getElementById('inputQty').value = counter

}

function decrement(){
    const decr = document.getElementById("decrement")
    if(counter === 1){
        decr.setAttribute = disabled
        document.getElementById('inputQty').value = counter

    } else {
        counter--
        document.getElementById('inputQty').value = counter
    }
}

function logout() {
    localStorage.removeItem('users');

    window.location.href = 'login.html';
}



document.addEventListener('DOMContentLoaded', function(){
    const navCate = document.getElementById('listCategory')
    const arrow = document.getElementById('arrow')
    

    document.addEventListener('click', function(event){
        const isClickInside = navCate.contains(event.target) || arrow.contains(event.target)

        if(!isClickInside){
            navCate.classList.add('hidden')
            arrow.classList.remove('rotate-180')

        }
    })

    const inputQty = document.getElementById('inputQty')
    window.onload = function() {
        inputQty.value = "1"
    }

    const logged = localStorage.getItem('users')

    if(!logged){
        window.location.href = 'login.html'
    }
})