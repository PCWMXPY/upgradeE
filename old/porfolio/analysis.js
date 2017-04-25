var analysis = {
    ChartF: function(data) {
        var ctx = document.getElementById('myChart').getContext('2d');
        var bt = [0, 0, 0, 0, 0, 0];
        var yt = [0, 0, 0, 0, 0, 0];
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 6; j++) {
                bt[j] += preference.getChampDeatil(data[i].championId)[j];
            }
        }
        for (i = 5; i < 10; i++) {
            for (j = 0; j < 6; j++) {
                yt[j] += preference.getChampDeatil(data[i].championId)[j];
            }
        }
        var datad = {
            type: 'radar',
            data: {
                labels: ['DamageOutput', 'TeamFight', 'Control', 'Flexibility', 'EarlyGame', 'LateGame'],
                datasets: [{
                    label: 'Team Blue',
                    data: [bt[0], bt[1], bt[2], bt[3], bt[4], bt[5]],
                    backgroundColor: "rgba(0,229,238,0.6)"
                }, {
                    label: 'Team Yellow',
                    data: [yt[0], yt[1], yt[2], yt[3], yt[4], yt[5]],
                    backgroundColor: "rgba(255,242,0,0.6)"
                }]
            }
        };
        var myChart = new Chart(ctx, datad);
    },
    ChartD: function(data) {
        var ctx = document.getElementById('myChartTWO').getContext('2d');
        var q;
        var p;
        for (i = 0; i < data.length; i++) {
            if (data[i].playerStatSummaryType == "Unranked") {
                q = i;
            }
            if (data[i].playerStatSummaryType == "RankedSolo5x5") {
                p = i;
            }
        }
        var solo = data[p].aggregatedStats;
        var sologames = data[p].losses + data[p].wins;
        var unrank = data[q].aggregatedStats;
        var unrankgames = data[q].wins * 1.08;
        var ng = [solo.totalAssists / sologames, solo.totalChampionKills / sologames * 1.2, solo.totalMinionKills / sologames * 0.08, solo.totalNeutralMinionsKilled / sologames * 0.3, solo.totalTurretsKilled / sologames * 10];
        var rg = [unrank.totalAssists / unrankgames, unrank.totalChampionKills / unrankgames * 1.2, unrank.totalMinionKills / unrankgames * 0.08, unrank.totalNeutralMinionsKilled / unrankgames * 0.3, unrank.totalTurretsKilled / unrankgames * 10];
        var datad = {
            type: 'radar',
            data: {
                labels: ['Team Work', 'Damage Output', 'Farm', 'Jungle Control', 'Lane Push'],
                datasets: [{
                    label: 'Normal Game',
                    data: [ng[0], ng[1], ng[2], ng[3], ng[4]],
                    backgroundColor: "rgba(0,229,238,0.6)"
                }, {
                    label: 'Ranked Game',
                    data: [rg[0], rg[1], rg[2], rg[3], rg[4]],
                    backgroundColor: "rgba(255,242,0,0.6)"
                }]
            }
        };
        var myChart = new Chart(ctx, datad);
    },
    ChartH: function(data) {
        var ctx = document.getElementById('myChart').getContext('2d');
        var recent = [0, 0, 0, 0, 0, 0];
        for (i = 0; i < 32; i++) {
            for (j = 0; j < 6; j++) {
                recent[j] += preference.getChampDeatil(data[i].champion)[j];
            }
        }
        var datad = {
            type: 'bar',
            data: {
                labels: ['DamageOutput', 'TeamFight', 'Control', 'Flexibility', 'EarlyGame', 'LateGame'],
                datasets: [{
                    label: 'Recent Played',
                    data: [recent[0], recent[1], recent[2], recent[3], recent[4], recent[5]],
                    backgroundColor: "rgba(0,229,238,0.6)"
                }]
            }
        };
        var myChart = new Chart(ctx, datad);
    }
};
