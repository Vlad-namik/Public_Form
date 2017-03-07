/**
 * Created by namik on 21.02.17.
 */
$(function () {
    var page = 0;
    currentPage = 0;
    visited = [0,0,0,0];
    username = 0; usermail = 0;
    usercountry = 0; usercity = 0;
    usersocial = 0;
    userpet = 0; userpetSrc = 0;
    socialFlag = false; socialLink = [0,0,0,0];
    stepNumber = "page1"; previousStepNumber = 0;

    adaptiveSocial();

    $(window).resize(function () {
        adaptiveSocial();
    });

    $(".page").first().css("color", "black");

    $(".page").click(function () {
        if(currentPage == 0){
            if(validate() && validateName()){
                visited[currentPage] = 1;
                $("#page1").css("color", "orange");
                username = $(".name").val();
                usermail = $(".email").val();
                if (($(".page").index(this) > currentPage) && (($(".page").index(this) - currentPage) > 1) && visited[$(".page").index(this) - 1] != 1){
                    showStep(stepNumber);
                }
                else {
                    previousStepNumber = stepNumber;
                    currentPage = $(".page").index(this);
                    stepNumber = this.id;
                    showStep(stepNumber);
                }
            }
            else {
                $("#page1").css("color", "grey");
            }
        }
        else if(currentPage == 1){
            if(($(".country").val() == 0 && $(".city").val() == 0) || ($(".country").val() != 0 && $(".city").val() == 0)){
                $("#page2").css("color", "grey");
                if($(".page").index(this) < currentPage){
                    currentPage = $(".page").index(this);
                    stepNumber = this.id;
                    showStep(stepNumber);
                }
                else {
                    $("#page2").css("color", "grey");
                }
            }
            else {
                visited[currentPage] = 1;
                usercountry = $(".country option:selected").text();
                usercity = $(".city option:selected").text();
                $("#page2").css("color", "#ff9800");
                if (($(".page").index(this) > currentPage) && (($(".page").index(this) - currentPage) > 1) && visited[$(".page").index(this) - 1] != 1){
                    showStep(stepNumber);
                }
                else {
                    previousStepNumber = stepNumber;
                    currentPage = $(".page").index(this);
                    stepNumber = this.id;
                    showStep(stepNumber);
                }
            }
        }
        else if(currentPage == 2){ //доделать(чтобы после проверки только чекнутых полей можно было перейти)
            if(($("#vk").is(":checked") || $("#fb").is(":checked") || $("#tw").is(":checked") || $("#od").is(":checked"))){
                if($("#vk").is(":checked") && validateSocialVK()){
                    socialFlag = true;
                    socialLink[0] = "<p><span class='sc'> VK: </span>" + $("#vk1").val() + "</p>";
                }
                if($("#fb").is(":checked") && validateSocialFB()){
                    socialFlag = true;
                    socialLink[1] = "<p><span class='sc'> Facebook: </span>" + $("#fb1").val() + "</p>";
                }
                if($("#tw").is(":checked") && validateSocialTW()){
                    socialFlag = true;
                    socialLink[2] = "<p><span class='sc'> Twitter: </span>" + $("#tw1").val() + "</p>";
                }
                if($("#od").is(":checked") && validateSocialOD()){
                    socialFlag = true;
                    socialLink[3] = "<p><span class='sc'> Odnoklassniki: </span>" + $("#od1").val() + "</p>";
                }
                if(($("#vk").is(":checked") && !validateSocialVK()) || ($("#fb").is(":checked") && !validateSocialFB()) || ($("#tw").is(":checked") && !validateSocialTW()) || ($("#od").is(":checked") && !validateSocialOD())){
                    socialFlag = false;
                }
                if(socialFlag == true){
                    visited[currentPage] = 1;
                    $("#page3").css("color", "#ff9800");
                    currentPage = $(".page").index(this);
                    stepNumber = this.id;
                    showStep(stepNumber);
                }
                else if (socialFlag == false){
                    if($(".page").index(this) < currentPage){
                        currentPage = $(".page").index(this);
                        stepNumber = this.id;
                        showStep(stepNumber);
                    }
                    $("#page3").css("color", "grey");
                }
            }
            else {
                if($(".page").index(this) < currentPage){
                    currentPage = $(".page").index(this);
                    stepNumber = this.id;
                    showStep(stepNumber);
                }
                $("#page3").css("color", "grey");
            }
        }
        else if(currentPage == 3){
            if(userpet == 1){
                $("#page4").css("color", "#ff9800");
                currentPage = $(".page").index(this);
                stepNumber = this.id;
                showStep(stepNumber);
            }
            else {
                $("#page4").css("color", "grey");
                if($(".page").index(this) < currentPage){
                    currentPage = $(".page").index(this);
                    stepNumber = this.id;
                    showStep(stepNumber);
                }
            }
        }

        $(".page").css({"border": "none"});
    });

    $(".next").click(function () {
        if(currentPage == 0){
            if(validate() && validateName()){
                username = $(".name").val();
                usermail = $(".email").val();
                $("#page1").css("color", "#ff9800");
                currentPage += 1;
                stepNumber = "page2";
                showStep(stepNumber);
            }
            else { }
        }
        else if(currentPage == 1){
            if(($(".country").val() == 0 && $(".city").val() == 0) || ($(".country").val() != 0 && $(".city").val() == 0)) {

            }
            else {
                visited[currentPage] = 1;
                usercountry = $(".country option:selected").text();
                usercity = $(".city option:selected").text();
                $("#page2").css("color", "#ff9800");

                currentPage += 1;
                stepNumber = "page3";
                showStep(stepNumber);
            }
        }
        else if(currentPage == 2){
            if(($("#vk").is(":checked") || $("#fb").is(":checked") || $("#tw").is(":checked") || $("#od").is(":checked"))){
                if($("#vk").is(":checked") && validateSocialVK()){
                    socialFlag = true;
                    socialLink[0] = "<p><span> VK: </span>" + $("#vk1").val() + "</p>";
                }
                if($("#fb").is(":checked") && validateSocialFB()){
                    socialFlag = true;
                    socialLink[1] = "<p><span> Facebook: </span>" + $("#fb1").val() + "</p>";
                }
                if($("#tw").is(":checked") && validateSocialTW()){
                    socialFlag = true;
                    socialLink[2] = "<p><span> Twitter: </span>" + $("#tw1").val() + "</p>";
                }
                if($("#od").is(":checked") && validateSocialOD()){
                    socialFlag = true;
                    socialLink[3] = "<p><span> Odnoklassniki: </span>" + $("#od1").val() + "</p>";
                }
                if(($("#vk").is(":checked") && !validateSocialVK()) || ($("#fb").is(":checked") && !validateSocialFB()) || ($("#tw").is(":checked") && !validateSocialTW()) || ($("#od").is(":checked") && !validateSocialOD())){
                    socialFlag = false;
                }
                if(socialFlag == true){
                    visited[currentPage] = 1;
                    $("#page3").css("color", "#ff9800");
                    currentPage += 1;
                    stepNumber = "page4";
                    showStep(stepNumber);
                }
                else if (socialFlag == false){}
            }
            else {}
        }
    });

    $(".prev").click(function () {
        if(currentPage == 0){}
        else if(currentPage == 1){
            if(($(".country").val() == 0 && $(".city").val() == 0) || ($(".country").val() != 0 && $(".city").val() == 0)) {
                currentPage -= 1;
                stepNumber = "page1";
                showStep(stepNumber);
                $("#page2").css("color", "grey");
            }
            else {
                visited[currentPage] = 1;
                usercountry = $(".country option:selected").text();
                usercity = $(".city option:selected").text();
                $("#page2").css("color", "#ff9800");
                currentPage -= 1;
                stepNumber = "page1";
                showStep(stepNumber);
            }
        }
        else if(currentPage == 2){
            if(($("#vk").is(":checked") || $("#fb").is(":checked") || $("#tw").is(":checked") || $("#od").is(":checked"))){
                if($("#vk").is(":checked") && validateSocialVK()){
                    socialFlag = true;
                    socialLink[0] = "<p><span> VK: </span>" + $("#vk1").val() + "</p>";
                }
                if($("#fb").is(":checked") && validateSocialFB()){
                    socialFlag = true;
                    socialLink[1] = "<p><span> Facebook: </span>" + $("#fb1").val() + "</p>";
                }
                if($("#tw").is(":checked") && validateSocialTW()){
                    socialFlag = true;
                    socialLink[2] = "<p><span> Twitter: </span>" + $("#tw1").val() + "</p>";
                }
                if($("#od").is(":checked") && validateSocialOD()){
                    socialFlag = true;
                    socialLink[3] = "<p><span> Odnoklassniki: </span>" + $("#od1").val() + "</p>";
                }
                if(($("#vk").is(":checked") && !validateSocialVK()) || ($("#fb").is(":checked") && !validateSocialFB()) || ($("#tw").is(":checked") && !validateSocialTW()) || ($("#od").is(":checked") && !validateSocialOD())){
                    socialFlag = false;
                }
                if(socialFlag == true){
                    visited[currentPage] = 1;
                    $("#page3").css("color", "#ff9800");
                    currentPage -= 1;
                    stepNumber = "page2";
                    showStep(stepNumber);
                }
                else if (socialFlag == false){
                    currentPage -= 1;
                    stepNumber = "page2";
                    showStep(stepNumber);
                    $("#page3").css("color", "grey");
                }
            }
            else {
                currentPage -= 1;
                stepNumber = "page2";
                showStep(stepNumber);
                console.log("Social are ! valid");
                $("#page3").css("color", "grey");
            }
        }
        else if(currentPage == 3){
            if(userpet == 1){
                $("#page4").css("color", "#ff9800");
                currentPage -= 1;
                stepNumber = "page3";
                showStep(stepNumber);
            }
            else {
                currentPage -= 1;
                stepNumber = "page3";
                showStep(stepNumber);
                $("#page4").css("color", "grey");
            }
        }
    });

    $(".finish").click(function () {
        if(userpet == 1){
            $(".pages").css("display", "none");
            $("#wrapper").css({"width" : "100%"});
            showStep("final-page");
        }
        else {}
    });

    $(".animal").click(function () {
        $(".animal").css("border" , "none");
        if($(this).children('img').attr('src') == "images/dog4.jpg"){
            userpet = 0;
            $(this).css("border" , "2px solid red");
            $(".animals-list + p").remove();
            $(".animals-list").after("<p>Вы выбрали собачку. А надо котика</p>");
            if($(window).width() > 990){
                $(".next-prev").css("margin-top", "114px");
            }
            else if ($(window).width() <= 990 && $(window).width() >550){
                $(".next-prev").css("margin-top", "74px");
            }
            else if ($(window).width() <= 550){
                $(".next-prev").css("margin-top", "34px");
            }
            $(".animals-list + p").css("color", "red");
        }
        else {
            $(".animals-list + p").remove();
            if($(window).width() > 990) {
                $(".next-prev").css("margin-top", "150px");
            }
            else if ($(window).width() <= 990 && $(window).width() > 550) {
                $(".next-prev").css("margin-top", "110px");
            }
            else if ($(window).width() <= 550) {
                $(".next-prev").css("margin-top", "70px");
            }
            $(this).css("border", "2px solid green");

            userpet = 1;
            userpetSrc = $(this).children('img').attr('src');
        }
    });

    $(".try-again").click(function () {
        location.reload();
    });

    $(".email").bind("blur",validate);
    $(".name").bind("blur",validateName);
    $("#vk1").bind("blur", validateSocialVK);
    $("#fb1").bind("blur", validateSocialFB);
    $("#tw1").bind("blur", validateSocialTW);
    $("#od1").bind("blur", validateSocialOD);

    var $select_country = $(".country");
    var $select_city = $(".city");

    $.getJSON("countries.json", function (data) {
        $select_country.html('');
        var $first_option = $("<option/>").attr("value", 0).text("Страна");
        $select_country.append($first_option);

        $.each(data, function(key, val){
            var $option = $("<option/>").attr("value", key).text(val);
            $select_country.append($option);
        })
    });

    $select_country.change(function () {
        var tempcountry = $select_country.val();
        $.getJSON("citiess.json", function (data) {
            $select_city.html('');
            var $first_option = $("<option/>").attr("value", 0).text("Город");
            $select_city.append($first_option);

            $.each(data, function(key, val){
                if(val.country == tempcountry) {
                    var $option = $("<option/>").attr("value", val.country).text(val.name);
                    $select_city.append($option);
                }
                else {}
            })
        });
    });

    $.getJSON("citiess.json", function (data) {
        $select_city.html('');
        var $first_option = $("<option/>").attr("value", 0).text("Город");
        $select_city.append($first_option);
    });

    function showStep(step) {
        if (step == "page1") {
            $(".main-content-2, .main-content-3, .main-content-4").hide();
            $(".main-content-1").show();
            $(".next").css("display" , "block");
            $(".finish").css("display", "none");
            $(".final-content").css("display", "none");
            $(".try-again").css("display", "none");
            $("#page1").css("color", "black");
        }
        else if (step == "page2") {
            $(".main-content-1, .main-content-3, .main-content-4").hide();
            $(".main-content-2").show();
            $(".next").css("display" , "block");
            $(".finish").css("display", "none");
            $("#page2").css("color", "black");
        }
        else if (step == "page3") {
            $(".main-content-1, .main-content-2, .main-content-4").hide();
            $(".main-content-3").show();
            $(".next").css("display" , "block");
            $(".finish").css("display", "none");
            $("#page3").css("color", "black");
        }
        else if (step == "page4") {
            $(".main-content-1, .main-content-2, .main-content-3").hide();
            $(".main-content-4").show();
            $(".next").css("display" , "none");
            $(".finish").css("display", "block");
            $("#page4").css("color", "black");
        }
        else if (step == "final-page") {
            $(".main-content-1, .main-content-2, .main-content-3, .main-content-4").hide();
            $(".final-name").html(username);
            if(username.length > 40){
                $(".final-name").css("font-size", "18px");
            }
            $(".final-email").html(usermail);
            $(".final-adress").html(usercity + ", " + usercountry);

            $.each(socialLink, function (index, value) {
                if(value != 0){
                    $(".block-social").append(value);
                }
                else{}
            });
            $(".final-image").attr('src',userpetSrc);
            $(".final-image").attr('alt',"Твой котик");
            // $(".final-image").attr('alt',"Твой котик");
            $(".final-content").css("display", "flex");
            $(".final-content").css("display", "-webkit-box");
            $(".try-again").css("display" , "block");
            $(".prev").css("display" , "none");
            $(".next").css("display" , "none");
            $(".finish").css("display", "none");
        }

    }

    function adaptiveSocial() {
        if($(window).width() <= 810){
            console.log("Yes");
            $("#vk1").attr("placeholder", "VK");
            $("#fb1").attr("placeholder", "Facebook");
            $("#tw1").attr("placeholder", "Twitter");
            $("#od1").attr("placeholder", "Одноклассники");
        }
        else {
            console.log("No");
            $("#vk1").attr("placeholder", "Ваша страница в VK");
            $("#fb1").attr("placeholder", "Ваша страница в Facebook");
            $("#tw1").attr("placeholder", "Ваша страница в Twitter");
            $("#od1").attr("placeholder", "Ваша страница в Одноклассники");
        }
    }


    /*ВАЛИДАЦИЯ*/
    function validateInputEmail(em){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(em);
    }
    function validateInputName(rem){
        // var chars = /^[a-z]+$/i;
        var chars = /([а-яё]+)\s?([а-яё]+)?$/i;
        return chars.test(rem);
    }
    function validateInputSocialVK(remm) {
        var chasr = /(vk\.com)\/([a-z0-9\._-])+$/i;
        return chasr.test(remm);
    }
    function validateInputSocialFB(remm) {
        var chasr = /(facebook\.com)\/([a-z0-9\._-])+$/i;
        return chasr.test(remm);
    }
    function validateInputSocialTW(remm) {
        var chasr = /(twitter\.com)\/([a-z0-9\._-])+$/i;
        return chasr.test(remm);
    }
    function validateInputSocialOD(remm) {
        var chasr = /(ok\.ru)\/([a-z0-9\._-])+$/i;
        return chasr.test(remm);
    }

    function validate() {
        var email = $(".email").val();
        if (validateInputEmail(email)){
            $(".email").css("border" , "1px solid green");
            return true;

        }
        else
        {
            $(".email").css("border" , "1px solid red");
            return false;

        }
    }
    function validateName() {
        var name = $(".name").val();
        if (validateInputName(name)){
            $(".name").css("border" , "1px solid green");
            return true;
        }
        else
        {
            $(".name").css("border" , "1px solid red");
            return false;
        }
    }
    function validateSocialVK() {
        var social = $("#vk1").val();
        if (validateInputSocialVK(social)){
            $("#vk1").css("border" , "1px solid green");
            return true;
        }
        else
        {
            $("#vk1").css("border" , "1px solid red");
            return false;
        }
    }
    function validateSocialFB() {
        var social = $("#fb1").val();
        if (validateInputSocialFB(social)){
            $("#fb1").css("border" , "1px solid green");
            return true;
        }
        else
        {
            $("#fb1").css("border" , "1px solid red");
            return false;
        }
    }
    function validateSocialTW() {
        var social = $("#tw1").val();
        if (validateInputSocialTW(social)){
            $("#tw1").css("border" , "1px solid green");
            return true;
        }
        else
        {
            $("#tw1").css("border" , "1px solid red");
            return false;
        }
    }
    function validateSocialOD() {
        var social = $("#od1").val();
        if (validateInputSocialOD(social)){
            $("#od1").css("border" , "1px solid green");
            return true;
        }
        else
        {
            $("#od1").css("border" , "1px solid red");
            return false;
        }
    }
    /*КОНЕЦ ВАЛИДАЦИИ*/
});
