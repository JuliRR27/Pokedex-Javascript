$('.close-window').click(function () {
    $('#windowPoke').removeClass('ativo');
    $("#infoPoke").attr('class', '');
    $('#main').removeClass('no-scroll');
    swal("Your support would help me a lot in my github profile :)", "https://github.com/JuliRR27", "info");
});

$('#startSearch').click(function () {
    $('.load').addClass('ativo');
    var inputValueSearch = $('#searchKey').val().toLowerCase();
    if (inputValueSearch != '') {
        inputValueSearch = inputValueSearch.split(' ').join('');
        getBaseInfo.getSearchPoke(inputValueSearch);
        
    } else {
        $('.load').removeClass('ativo');
        $('#failedToLoad').text('Sorry, no pokemon found in our database :(');
        $('#failedToLoad').addClass('ativo');
        swal("¡Oops!", "pokemon not found", "error");
    }

    setTimeout(function () {
        $('#failedToLoad').text('');
        $('#failedToLoad').removeClass('ativo');
    }, 3000);

})

$('#searchKey').keypress(function (e) {
    if (e.key === "Enter") {
        $('.load').addClass('ativo');
        var inputValueSearch = $('#searchKey').val().toLowerCase();
        if (inputValueSearch != '') {
            inputValueSearch = inputValueSearch.split(' ').join('');
            getBaseInfo.getSearchPoke(inputValueSearch);
        } else {
            $('.load').removeClass('ativo');
            $('#failedToLoad').text('Sorry, no pokemon found in our database :(');
            $('#failedToLoad').addClass('ativo');
            swal("¡Oops!", "pokemon not found", "error");


            setTimeout(function () {
                $('#failedToLoad').text('');
                $('#failedToLoad').removeClass('ativo');
            }, 3000);

        }
    }
});