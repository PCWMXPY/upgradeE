const publicfunctions = {
    getfeaturedgame: () => {
        Ca$.get({
            url: 'https://na.api.riotgames.com/observer-mode/rest/featured?api_key=RGAPI-2c57be6f-0f51-42cc-b54c-d62f19e26023',
            success: json => {
                console.log(json);
            },
            error: error => {
                console.log(error);
            }
        });
    }
}