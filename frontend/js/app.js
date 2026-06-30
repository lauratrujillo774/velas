/*=====================================================
        LUZ INTERIOR
        APP.JS
        PARTE 1
======================================================*/

/*==============================
        SELECTORES
==============================*/

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

/*==============================
        VARIABLES
==============================*/

const navbar = $("#navbar");

const menu = $("#mobileMenu");

const menuButton = $("#menuButton");

const closeMenu = $("#closeMenu");

const menuOverlay = $("#mobileOverlay");

const backTop = $("#backTop");

const loader = $("#loader");

/*==============================
        NAVBAR
==============================*/

function navbarScroll(){

    if(window.scrollY > 60){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", navbarScroll);

/*==============================
    BOTÓN VOLVER ARRIBA
==============================*/

function backTopButton(){

    if(window.scrollY > 500){

        backTop.classList.remove("hidden");

    }else{

        backTop.classList.add("hidden");

    }

}

window.addEventListener("scroll", backTopButton);

backTop?.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*==============================
    MENÚ MÓVIL
==============================*/

function openMenu(){

    menu.classList.remove("hidden");

    document.body.style.overflow="hidden";

}

function hideMenu(){

    menu.classList.add("hidden");

    document.body.style.overflow="";

}

menuButton?.addEventListener("click",openMenu);

closeMenu?.addEventListener("click",hideMenu);

menuOverlay?.addEventListener("click",hideMenu);

/*==============================
    CERRAR MENU AL HACER CLICK
==============================*/

$$('#mobileMenu a').forEach(link=>{

    link.addEventListener("click",()=>{

        hideMenu();

    });

});

/*==============================
    SCROLL SUAVE
==============================*/

$$('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        const target=document.querySelector(

            this.getAttribute("href")

        );

        if(!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior:"smooth"

        });

    });

});

/*==============================
        LOADER
==============================*/

window.addEventListener("load",()=>{

    if(!loader) return;

    loader.style.opacity="0";

    setTimeout(()=>{

        loader.remove();

    },500);

});

/*==============================
    INTERSECTION OBSERVER
==============================*/

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:.15

});

$$(".fade-up").forEach(item=>{

    observer.observe(item);

});

/*==============================
    ANIMACIÓN HERO
==============================*/

window.addEventListener("load",()=>{

    $(".hero-content")?.classList.add(

        "animate-fade-up"

    );

});

/*==============================
    UTILIDAD
==============================*/

function debounce(callback,delay=200){

    let timer;

    return(...args)=>{

        clearTimeout(timer);

        timer=setTimeout(()=>{

            callback(...args);

        },delay);

    }

}

/*==============================
    RESIZE
==============================*/

window.addEventListener("resize",

debounce(()=>{

    if(window.innerWidth>1024){

        hideMenu();

    }

})

);

/*==============================
    FECHA FOOTER
==============================*/

const year=document.querySelector("#year");

if(year){

    year.textContent=new Date().getFullYear();

}

/*==============================
    EFECTO PARALLAX HERO
==============================*/

const heroImage=document.querySelector("#inicio img");

window.addEventListener("scroll",

debounce(()=>{

    if(!heroImage) return;

    heroImage.style.transform=

    `translateY(${window.scrollY*0.2}px)`;

},10)

);

/*==============================
    APARICIÓN SECCIONES
==============================*/

$$("section").forEach(section=>{

    section.classList.add("fade-up");

    observer.observe(section);

});

/*==============================
    TOOLTIP SIMPLE
==============================*/

$$("[data-tooltip]").forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        item.setAttribute(

            "title",

            item.dataset.tooltip

        );

    });

});

/*==============================
    PREVENIR DOBLE CLICK BOTONES
==============================*/

$$("button").forEach(btn=>{

    btn.addEventListener("dblclick",(e)=>{

        e.preventDefault();

    });

});

/*==============================
    FIN PARTE 1
==============================*/