$(document).ready((function (e) {
    $(".load").addClass("ativo"), setTimeout((function () {
        $.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0").done((function (e) {
            getBaseInfo.tratamentoPrimal(e), offset += 20
        })), $(".load").removeClass("ativo"), $("#preload").addClass("no-show"), $("#main").removeClass("no-scroll");
        var e = document.createElement("script");
        e.src = "js/chartjs/Chart.min.js", document.body.appendChild(e);
        var s = document.createElement("script");
        s.src = "js/chartjs/Chart.bundle.min.js", document.body.appendChild(s);
        var o = document.createElement("script");
        o.src = "js/slick/slick.min.js", document.body.appendChild(o);
        var t = document.createElement("link");
        t.href = "https://kit-free.fontawesome.com/releases/latest/css/free-v4-shims.min.css", t.media = "all", t.rel = "stylesheet", t.id = "font-awesome-5-kit-css1", document.head.appendChild(t);
        var a = document.createElement("link");
        a.href = "https://kit-free.fontawesome.com/releases/latest/css/free-v4-font-face.min.css", a.media = "all", a.rel = "stylesheet", a.id = "font-awesome-5-kit-css2", document.head.appendChild(a);
        var i = document.createElement("link");
        i.href = "https://kit-free.fontawesome.com/releases/latest/css/free.min.css", i.media = "all", i.rel = "stylesheet", i.id = "font-awesome-5-kit-css3", document.head.appendChild(i);
        var l = document.createElement("link");
        l.href = "css/Chart.min.css", l.rel = "stylesheet", document.head.appendChild(l), $("footer").addClass("ativo")
    }), 3e3)
}));
var valores = [],
    getBaseInfo = {
        attBtnCard: e => {
            var s = "https://pokeapi.co/api/v2/pokemon/" + e.getAttribute("data-card");
            pokeBase.getPokeUrl(s)
        },
        getSearchPoke: e => {
            var s = "https://pokeapi.co/api/v2/pokemon/" + e;
            $.ajax({
                url: s,
                type: "GET",
                dataType: "json",
                data: valores,
                success: function (e) {
                    pokeBase.createWindow(e), $(".load").removeClass("ativo")
                },
                error: function (e, s, o, t) {
                    console.log("Falha em: catchPoke [", e, s, o, t, "]"), $(".load").removeClass("ativo"), $("#failedToLoad").text("Sorry, no pokemon found in our database :("), $("#failedToLoad").addClass("ativo"), setTimeout((function () {
                        $("#failedToLoad").text(""), $("#failedToLoad").removeClass("ativo")
                    }), 3e3)
                }
            })
        },
        tratamentoPrimal: e => {
            for (i = 0; i < e.results.length; i++) {
                var s = e.results[i];
                getBaseInfo.catchPoke(s)
            }
        },
        catchPoke: e => {
            $.ajax({
                url: e.url,
                type: "GET",
                dataType: "json",
                data: valores,
                success: function (e) {
                    getBaseInfo.pokedexDatabase(e)
                },
                error: function (e, s, o, t) {
                    console.log("Falha em: catchPoke [", e, s, o, t, "]")
                }
            })
        },
        pokedexDatabase: e => {
            var s = e,
                o = '            <div class="pokemons-card {pokeType}" data-card="{pokeId}" onclick="getBaseInfo.attBtnCard(this)">                <div class="poke-type">                    <i class="energy icon-{pokeType}"></i>                    <i class="energy icon-{pokeType2}"></i>                </div>                <div class="poke-icon">                        <img src="{pokeIcon}" alt="{pokeName}">                    </div>                <div class="poke-img {pokeType}">                    <img width="200" height="200" src={pokeSprite} class="primaria" alt="{pokeName}">                </div>                <div class="body-card">                    <div class="poke-id">                        <h3># {pokeIdN}</h3>                    </div>                    <div class="poke-name"><h2>{pokeName}</h2></div>                </div>            </div>        ';
            if (o = (o = (o = s.types[1] ? o.replace(/{pokeType2}/g, s.types[1].type.name) : o.replace(/{pokeType2}/g, "none")).replace(/{pokeIcon}/g, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/" + s.id + ".png")).replace(/{pokeId}/g, s.id), s.id < 10) {
                var t = "00",
                    a = s.id,
                    i = t.concat(a);
                o = o.replace(/{pokeIdN}/g, i)
            } else if (s.id >= 10 && s.id < 100) {
                t = "0", a = s.id, i = t.concat(a);
                o = o.replace(/{pokeIdN}/g, i)
            } else o = o.replace(/{pokeIdN}/g, s.id);
            o = (o = o.replace(/{pokeType}/g, s.types[0].type.name)).replace(/{pokeName}/g, s.name);
            var l = s.id;
            l < 10 ? l = "00" + l : l < 100 && (l = "0" + l), o = o.replace(/{pokeSprite}/g, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + l + ".png");
            var p = document.createElement("div");
            p.setAttribute("class", "col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 "), p.setAttribute("style", "order:" + s.order), p.innerHTML = o, document.getElementById("all_poke").appendChild(p)
        }
    },
    pokeBase = {
        getPokeUrl: e => {
            $.ajax({
                url: e,
                type: "GET",
                dataType: "json",
                data: valores,
                success: function (e) {
                    pokeBase.createWindow(e)
                },
                error: function (e, s, o, t) {
                    console.log("Falha em: getPokeUrl [", e, s, o, t, "]")
                }
            })
        },
        getSpecies: (e, s, o) => {
            $.ajax({
                url: e,
                type: "GET",
                dataType: "json",
                data: valores,
                success: function (e) {
                    "primal" == s && function (e) {
                        function s(e) {
                            e.forEach((e => {
                                $.ajax({
                                    url: "https://pokeapi.co/api/v2/pokemon/" + e.species_name,
                                    type: "GET",
                                    dataType: "json",
                                    data: valores,
                                    success: function (e) {
                                        pokeBase.createEvolution(e)
                                    },
                                    error: function (e, s, o, t) {
                                        console.log("Falha em: catchPoke [", e, s, o, t, "]")
                                    }
                                })
                            }))
                        }
                        console.log(e), e.flavor_text_entries.forEach((e => {
                            "en" == e.language.name && "x" == e.version.name && $("#recebeDescricao").text(e.flavor_text)
                        })), e.genera.forEach((e => {
                            "en" == e.language.name && $("#smallDescription").text(e.genus)
                        })), $.ajax({
                            url: e.evolution_chain.url,
                            type: "GET",
                            dataType: "json",
                            data: valores,
                            success: function (e) {
                                let o = [],
                                    t = e.chain;
                                do {
                                    let e = t.evolves_to.length;
                                    if (o.push({
                                            species_name: t.species.name,
                                            evolution_details: t.evolution_details
                                        }), e > 1)
                                        for (let s = 1; s < e; s++) o.push({
                                            species_name: t.evolves_to[s].species.name,
                                            evolution_details: t.evolves_to[s] ? t.evolves_to[s].evolution_details : null,
                                            trigger: t.evolves_to[s] ? t.evolves_to[s].evolution_details.trigger : null
                                        });
                                    t = t.evolves_to[0]
                                } while (null != t && t.hasOwnProperty("evolves_to"));
                                s(o)
                            },
                            error: function (e, s, o, t) {
                                console.log("Falha em: getSpecies [", e, s, o, t, "]")
                            }
                        })
                    }(e)
                },
                error: function (e, s, o, t) {
                    console.log("Falha em: getSpecies [", e, s, o, t, "]")
                }
            })
        },
        createEvolution: e => {
            var s = "<div class='poke-evolv-img {type}' data-card='{pokeId}' onclick='getBaseInfo.attBtnCard(this)'><img src='{pokeImg}' alt='{pokeName}'></div><div class='types'><div class='type {pokeType}'>{pokeType}</div><div class='type {pokeType2}'>{pokeType2}</div></div><div class='poke-name'><span># {pokeIdN}</span></div><div class='poke-name'><span>{pokeName}</span></div>";
            s = (s = s.replace(/{pokeId}/g, e.id)).replace(/{pokeType}/g, e.types[0].type.name), console.log(e), s = e.types[1] ? s.replace(/{pokeType2}/g, e.types[1].type.name) : s.replace(/{pokeType2}/g, "none");
            var o = e.id;
            o < 10 ? o = "00" + o : o < 100 && (o = "0" + o), s = (s = (s = (s = s.replace(/{pokeImg}/g, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + o + ".png")).replace(/{pokeName}/g, e.name)).replace(/{pokeIdN}/g, o)).replace(/{type}/g, e.types[0].type.name);
            var t = document.createElement("div");
            t.setAttribute("class", "item"), t.setAttribute("style", "order:" + e.order), t.innerHTML = s, document.getElementById("recebeEvolution").appendChild(t)
        },
        createWindow: e => {
            $("#windowPoke").addClass("ativo"), $("#main").addClass("no-scroll"), $(".body-pokemon").css("display", "none"), $("#infoPoke").addClass("ativo"), $("#infoPoke").addClass(e.types[0].type.name), $(".load").addClass("ativo");
            var s = "<div class='body-pokemon' style='display: none;'><div class='container'><div class='content-pokemon {pokeType}'><div class='body-content {pokeType}'><div class='col-md-12'><div class='poke-id'><div class='name'>{pokeName}</div><div class='id'> N°{pokeId}</div><div id='smallDescription'></div></div></div><div class='col-md-7 col-xs-12 col-lg-6'><div class='content-sprites'><div class='pokemon-img'><div class='item'><img src={pokeSprite} class='primaria' id='recebeSrcPoke' alt='{pokeName}'></div></div><div class='pokesprites {pokeType}'><div class='item ativo' data-srcpoke='{pokeSprite}'><img src='{pokeSprite}' class='primaria' alt='{pokeName}'></div><div class='item' data-srcpoke='{pokeSpriteFront}'><img src='{pokeSpriteFront}' class='primaria' alt='{pokeName}'></div><div class='item' data-srcpoke='{pokeSpriteBack}'><img src='{pokeSpriteBack}' class='primaria' alt='{pokeName}'></div><div class='item' data-srcpoke='{pokeSpriteShyneFront}'><img src='{pokeSpriteShyneFront}' class='primaria' alt='{pokeName}'></div><div class='item' data-srcpoke='{pokeSpriteShyneBack}'><img src='{pokeSpriteShyneBack}' class='primaria' alt='{pokeName}'></div>" + (e.sprites.front_female ? "<div class='item' data-srcpoke='{pokeSpriteFemale}'><img src='{pokeSpriteFemale}' class='primaria' alt='{pokeName}'></div>" : "") + (e.sprites.back_female ? "<div class='item' data-srcpoke='{pokeSpriteFemaleBack}'><img src='{pokeSpriteFemaleBack}' class='primaria' alt='{pokeName}'></div>" : "") + "</div></div></div><div class='col-md-5 col-xs-12 col-lg-6'><div class='pokemon-description' id='recebeDescricao'></div><div class='height-weight'><div class='item'><div class='content-item'>{pokeHeight} m</div><small>Height</small></div><div class='item'><div class='content-item'>{pokeWeight} kg</div><small>Weight</small></div></div><div class='types'><div class='title'>Types:</div><div class='type {pokeType}'>{pokeType}</div><div class='type {pokeType2}'>{pokeType2}</div></div><div class='poke-chart {pokeType}'><div class='title-chart'>Stats:</div><div class='content' id='recebeGrafico'><div class='pontos'><div class='item-pontos'><div class='title-pontos'>PS</div><div class='content-pontos' style='width:calc({pokePSw}% - 100px);'>{pokePS}</div></div><div class='item-pontos'><div class='title-pontos'>Atack</div><div class='content-pontos' style='width:calc({pokeAtackw}% - 100px);'>{pokeAtack}</div></div><div class='item-pontos'><div class='title-pontos'>Defense</div><div class='content-pontos' style='width:calc({pokeDefensew}% - 100px);'>{pokeDefense}</div></div><div class='item-pontos'><div class='title-pontos'>Special Atack</div><div class='content-pontos' style='width:calc({pokeSPw}% - 100px);'>{pokeSP}</div></div><div class='item-pontos'><div class='title-pontos'>Special Defense</div><div class='content-pontos' style='width:calc({pokeSDw}% - 100px);'>{pokeSD}</div></div><div class='item-pontos'><div class='title-pontos'>Speed</div><div class='content-pontos' style='width:calc({pokeSpeedw}% - 100px);'>{pokeSpeed}</div></div></div></div></div></div><div class='col-md-12 col-sm-12' style='filter: drop-shadow(1px 1px 2px #000);'><div class='content-evolution'><div class='title'><h3>Evolutions</h3></div><div id='recebeEvolution'></div></div></div></div></div></div></div>",
                o = e.id;
            o < 10 ? o = "00" + o : o < 100 && (o = "0" + o), s = (s = (s = (s = (s = (s = (s = (s = (s = (s = (s = (s = (s = (s = e.types[1] ? s.replace(/{pokeType2}/g, e.types[1].type.name) : s.replace(/{pokeType2}/g, "none")).replace(/{pokeSprite}/g, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + o + ".png")).replace(/{pokeSpriteFront}/g, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + e.id + ".png")).replace(/{pokeSpriteBack}/g, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/" + e.id + ".png")).replace(/{pokeSpriteShyneFront}/g, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/" + e.id + ".png")).replace(/{pokeSpriteShyneBack}/g, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/" + e.id + ".png")).replace(/{pokeSpriteFemale}/g, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/" + e.id + ".png")).replace(/{pokeSpriteFemaleBack}/g, "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/" + e.id + ".png")).replace(/{pokeId}/g, o)).replace(/{pokeType}/g, e.types[0].type.name)).replace(/{pokeSpriteBack}/g, e.sprites.back_default)).replace(/{pokeName}/g, e.name)).replace(/{pokeHeight}/g, e.height / 10)).replace(/{pokeWeight}/g, e.weight / 10);
            var t = e.stats,
                a = [],
                i = [];
            t.forEach((e => {
                a.push(e.base_stat), "special-defense" == e.stat.name ? (e.stat.name = "SD", i.push(e.stat.name)) : "special-attack" == e.stat.name ? (e.stat.name = "SA", i.push(e.stat.name)) : i.push(e.stat.name)
            }));
            for (var l = 0, p = 0; p < a.length; p++) a[p] > l && (l = a[p]);
            s = (s = (s = (s = (s = (s = (s = (s = (s = (s = (s = (s = s.replace(/{pokePS}/g, a[0])).replace(/{pokePSw}/g, (100 * a[0] / l).toFixed(2))).replace(/{pokeAtack}/g, a[1])).replace(/{pokeAtackw}/g, (100 * a[1] / l).toFixed(2))).replace(/{pokeDefense}/g, a[2])).replace(/{pokeDefensew}/g, (100 * a[2] / l).toFixed(2))).replace(/{pokeSP}/g, a[3])).replace(/{pokeSPw}/g, (100 * a[3] / l).toFixed(2))).replace(/{pokeSD}/g, a[4])).replace(/{pokeSDw}/g, (100 * a[4] / l).toFixed(2))).replace(/{pokeSpeed}/g, a[5])).replace(/{pokeSpeedw}/g, (100 * a[5] / l).toFixed(2)), setTimeout((function () {
                jQuery("#infoPoke").html(s), console.log(t), console.log(a), setTimeout((function () {
                    $(".pokesprites").slick({
                        dots: !1,
                        arrows: !0,
                        prevArrow: '<button class="slick-prev slick-button"><svg xmlns="http://www.w3.org/2000/svg" style="enable-background:new 0 0 512 512;transform: scaleX(-1);" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="25" height="25" x="0" y="0" viewbox="0 0 492.004 492.004" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"  data-original="#000000" style="" class=""></path></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg></button>',
                        nextArrow: '<button class="slick-next slick-button"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="25" height="25" x="0" y="0" viewbox="0 0 492.004 492.004" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"  data-original="#000000" style="" class=""></path></g></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg></button>',
                        infinite: !0,
                        speed: 300,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        useTransform: !0,
                        autoplay: !1,
                        autoplaySpeed: 2e3,
                        focusOnSelect: !1,
                        responsive: [{
                            breakpoint: 990,
                            settings: {
                                slidesToShow: 3
                            }
                        }]
                    });
                    var e = document.querySelectorAll("[data-srcpoke]");
                    e.forEach((s => {
                        s.addEventListener("click", (() => {
                            e.forEach((e => {
                                e.classList.remove("ativo")
                            })), $("#recebeSrcPoke").attr("src", s.dataset.srcpoke), s.classList.add("ativo")
                        }))
                    }))
                }), 1e3);
                var o = e.species.url;
                pokeBase.getSpecies(o, "primal", e), $(".load").removeClass("ativo"), $(".body-pokemon").css("display", "block")
            }), 500)
        }
    },
    offset = 0,
    lastScrollTop = 0;
$("#main").on("scroll", (function (e) {
    let s = $(this).get(0);
    s.scrollTop + s.clientHeight >= s.scrollHeight - 1 && ($(".load").addClass("ativo"), $("#main").addClass("no-scroll"), $.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=" + offset).done((function (e) {
        getBaseInfo.tratamentoPrimal(e), offset += 20
    })), e.preventDefault(), setTimeout((function () {
        $(".load").removeClass("ativo"), $("#main").removeClass("no-scroll")
    }), 1e3));
    var o = $(this).scrollTop();
    o > 255 ? (o > lastScrollTop ? ($(".nenza-header").addClass("move-down-nenza"), $(".nenza-header").removeClass("move-up-nenza")) : ($(".nenza-header").removeClass("move-down-nenza"), $(".nenza-header").addClass("move-up-nenza")), lastScrollTop = o <= 0 ? 0 : o) : ($(".nenza-header").removeClass("move-down-nenza"), $(".nenza-header").removeClass("move-up-nenza")), lastScrollTop = o
})), $(".close-window").click((function () {
    $("#windowPoke").removeClass("ativo"), $("#infoPoke").attr("class", ""), $("#main").removeClass("no-scroll")
})), $("#startSearch").click((function () {
    $(".load").addClass("ativo");
    var e = $("#searchKey").val().toLowerCase();
    "" != e ? (e = e.split(" ").join(""), getBaseInfo.getSearchPoke(e)) : ($(".load").removeClass("ativo"), $("#failedToLoad").text("Sorry, no pokemon found in our database :("), $("#failedToLoad").addClass("ativo"), setTimeout((function () {
        $("#failedToLoad").text(""), $("#failedToLoad").removeClass("ativo")
    }), 3e3))
})), $("#searchKey").keypress((function (e) {
    if ("Enter" === e.key) {
        $(".load").addClass("ativo");
        var s = $("#searchKey").val().toLowerCase();
        "" != s ? (s = s.split(" ").join(""), getBaseInfo.getSearchPoke(s)) : ($(".load").removeClass("ativo"), $("#failedToLoad").text("Sorry, no pokemon found in our database :("), $("#failedToLoad").addClass("ativo"), setTimeout((function () {
            $("#failedToLoad").text(""), $("#failedToLoad").removeClass("ativo")
        }), 3e3))
    }
}));