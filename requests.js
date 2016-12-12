var requests = {
    API_KEY: "RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023",
    featuregame: function() {
        $.ajax({
            url: 'https://na.api.pvp.net/observer-mode/rest/featured?api_key=RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023',
            type: 'GET',
            dataType: 'json',
            data: {},
            success: function(json) {
                return json;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting Summoner data!");
            }
        });
    },
    test: function() {
        console.log("TEST");
    }
};
