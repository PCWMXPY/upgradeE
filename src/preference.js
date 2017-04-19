var preference = {
    terminal: array => {
        for (let i = 0; i < array.length; i++) {
            console.log('---------------------');
            for (let j = 0; j < array[i].length; j++) {
                switch (j) {
                    case 0:
                        console.log('Mid: ' + array[i][j]);
                        break;
                    case 1:
                        console.log('Bot: ' + array[i][j]);
                        break;
                    case 2:
                        console.log('Top: ' + array[i][j]);
                        break;
                    case 3:
                        console.log('Sup: ' + array[i][j]);
                        break;
                    case 4:
                        console.log('Jgl: ' + array[i][j]);
                        break;
                }
            }
        }
    },
    getlane: id => {
        //mid,bot,top,sup,jungle
        switch (id) {
            case 1:
                return [1, 3, 4, 2, 5];
            case 2:
                return [4, 5, 2, 3, 1];
            case 3:
                return [3, 5, 1, 4, 2];
            case 4:
                return [1, 3, 2, 5, 4];
            case 5:
                return [2, 5, 3, 4, 1];
            case 6:
                return [3, 1, 2, 5, 4];
            case 7:
                return [1, 4, 2, 3, 5];
            case 8:
                return [2, 5, 1, 3, 4];
            case 9:
                return [2, 5, 4, 3, 1];
            case 10:
                return [3, 4, 1, 5, 2];
            case 11:
                return [3, 4, 2, 5, 1];
            case 12:
                return [4, 5, 2, 1, 3];
            case 13:
                return [2, 5, 1, 4, 3];
            case 14:
                return [5, 4, 1, 2, 3];
            case 15:
                return [2, 1, 3, 5, 4];
            case 16:
                return [3, 5, 2, 1, 4];
            case 17:
                return [2, 4, 1, 5, 3];
            case 18:
                return [2, 1, 3, 5, 4];
            case 19:
                return [5, 4, 2, 3, 1];
            case 20:
                return [5, 4, 2, 3, 1];
            case 21:
                return [3, 1, 4, 2, 5];
            case 22:
                return [4, 1, 3, 2, 5];
            case 23:
                return [3, 5, 1, 4, 2];
            case 24:
                return [3, 4, 1, 5, 2];
            case 25:
                return [2, 5, 3, 1, 4];
            case 26:
                return [1, 4, 3, 2, 5];
            case 27:
                return [3, 4, 1, 5, 2];
            case 28:
                return [3, 5, 2, 4, 1];
            case 29:
                return [4, 1, 3, 5, 2];
            case 30:
                return [1, 4, 2, 3, 5];
            case 31:
                return [1, 5, 2, 4, 3];
            case 32:
                return [3, 5, 2, 4, 1];
            case 33:
                return [4, 5, 2, 3, 1];
            case 34:
                return [1, 5, 2, 3, 4];
            case 35:
                return [3, 5, 2, 4, 1];
            case 36:
                return [5, 4, 1, 3, 2];
            case 37:
                return [2, 3, 4, 1, 5];
            case 38:
                return [1, 5, 2, 4, 3];
            case 39:
                return [2, 5, 1, 4, 3];
            case 40:
                return [3, 4, 2, 1, 5];
            case 41:
                return [2, 3, 1, 4, 5];
            case 42:
                return [1, 2, 3, 4, 5];
            case 43:
                return [2, 5, 3, 1, 4];
            case 44:
                return [4, 5, 2, 1, 3];
            case 45:
                return [1, 5, 2, 3, 4];
            case 48:
                return [4, 5, 1, 3, 2];
            case 50:
                return [2, 5, 1, 3, 4];
            case 51:
                return [2, 1, 3, 4, 5];
            case 53:
                return [2, 5, 3, 1, 4];
            case 54:
                return [2, 5, 1, 4, 3];
            case 55:
                return [1, 5, 2, 3, 4];
            case 56:
                return [2, 5, 3, 4, 1];
            case 57:
                return [5, 4, 1, 3, 2];
            case 58:
                return [2, 5, 1, 4, 3];
            case 59:
                return [3, 5, 2, 4, 1];
            case 60:
                return [2, 5, 3, 4, 1];
            case 61:
                return [1, 5, 3, 2, 4];
            case 62:
                return [3, 5, 1, 4, 2];
            case 63:
                return [1, 5, 3, 2, 4];
            case 64:
                return [3, 5, 2, 4, 1];
            case 67:
                return [4, 1, 2, 5, 3];
            case 68:
                return [2, 5, 1, 4, 3];
            case 69:
                return [1, 4, 2, 3, 5];
            case 72:
                return [4, 5, 2, 3, 1];
            case 74:
                return [5, 4, 2, 3, 1];
            case 75:
                return [2, 5, 1, 3, 4];
            case 76:
                return [2, 4, 3, 5, 1];
            case 77:
                return [3, 5, 2, 4, 1];
            case 78:
                return [4, 5, 1, 3, 2];
            case 79:
                return [3, 4, 2, 5, 1];
            case 80:
                return [4, 5, 1, 3, 2];
            case 81:
                return [2, 1, 3, 5, 4];
            case 82:
                return [3, 1, 2, 5, 4];
            case 83:
                return [3, 5, 1, 4, 2];
            case 84:
                return [1, 5, 2, 4, 3];
            case 85:
                return [2, 5, 1, 4, 3];
            case 86:
                return [5, 4, 1, 3, 2];
            case 89:
                return [4, 5, 2, 1, 3];
            case 90:
                return [1, 5, 3, 4, 2];
            case 91:
                return [1, 3, 2, 6, 3];
            case 92:
                return [2, 5, 1, 4, 3];
            case 96:
                return [2, 1, 5, 4, 3];
            case 98:
                return [4, 5, 1, 2, 3];
            case 99:
                return [1, 4, 3, 2, 5];
            case 101:
                return [1, 5, 3, 2, 4];
            case 102:
                return [3, 4, 2, 5, 1];
            case 103:
                return [1, 5, 2, 3, 4];
            case 104:
                return [4, 3, 2, 5, 1];
            case 105:
                return [1, 5, 2, 4, 3];
            case 106:
                return [5, 4, 2, 3, 1];
            case 107:
                return [3, 4, 2, 5, 1];
            case 110:
                return [2, 1, 3, 5, 4];
            case 111:
                return [5, 4, 1, 3, 2];
            case 112:
                return [1, 5, 2, 4, 3];
            case 113:
                return [4, 3, 2, 5, 1];
            case 114:
                return [2, 5, 1, 4, 3];
            case 115:
                return [1, 2, 5, 3, 4];
            case 117:
                return [2, 5, 3, 1, 4];
            case 119:
                return [3, 1, 2, 5, 4];
            case 120:
                return [3, 4, 2, 5, 1];
            case 121:
                return [3, 4, 2, 5, 1];
            case 122:
                return [2, 3, 1, 4, 5];
            case 126:
                return [2, 3, 1, 5, 4];
            case 127:
                return [1, 5, 2, 3, 4];
            case 131:
                return [2, 5, 3, 4, 1];
            case 133:
                return [4, 3, 1, 5, 2];
            case 134:
                return [1, 5, 2, 3, 4];
            case 136:
                return [1, 5, 4, 2, 3];
            case 143:
                return [2, 5, 3, 1, 4];
            case 150:
                return [5, 4, 1, 3, 2];
            case 154:
                return [3, 4, 2, 5, 1];
            case 157:
                return [1, 5, 2, 4, 3];
            case 161:
                return [1, 5, 3, 2, 4];
            case 163:
                return [1, 5, 2, 3, 4];
            case 164:
                return [2, 4, 1, 3, 5];
            case 201:
                return [4, 3, 2, 1, 5];
            case 202:
                return [4, 1, 2, 5, 3];
            case 203:
                return [3, 4, 2, 5, 1];
            case 222:
                return [5, 1, 2, 3, 4];
            case 223:
                return [4, 5, 2, 1, 3];
            case 236:
                return [2, 1, 3, 5, 4];
            case 238:
                return [1, 5, 2, 3, 4];
            case 240:
                return [3, 5, 1, 4, 2];
            case 245:
                return [2, 5, 1, 4, 3];
            case 254:
                return [2, 4, 3, 5, 1];
            case 266:
                return [5, 3, 1, 4, 2];
            case 267:
                return [2, 5, 3, 1, 4];
            case 268:
                return [1, 5, 2, 3, 4];
            case 412:
                return [2, 5, 3, 1, 4];
            case 420:
                return [2, 3, 1, 4, 5];
            case 421:
                return [3, 4, 2, 5, 1];
            case 427:
                return [3, 5, 2, 4, 1];
            case 429:
                return [5, 1, 2, 3, 4];
            case 432:
                return [2, 4, 3, 1, 5];
            case 497:
                return [2, 4, 3, 1, 5];
            case 498:
                return [3, 1, 3, 5, 5];
            default:
                return id;
        }
    },
    getChampName: function (Id) {
        switch (Id) {
            case 1:
                return "Annie";
            case 2:
                return "Olaf";
            case 3:
                return "Galio";
            case 4:
                return "TwistedFate";
            case 5:
                return "XinZhao";
            case 6:
                return "Urgot";
            case 7:
                return "Leblanc";
            case 8:
                return "Vladimir";
            case 9:
                return "FiddleSticks";
            case 10:
                return "Kayle";
            case 11:
                return "MasterYi";
            case 12:
                return "Alistar";
            case 13:
                return "Ryze";
            case 14:
                return "Sion";
            case 15:
                return "Sivir";
            case 16:
                return "Soraka";
            case 17:
                return "Teemo";
            case 18:
                return "Tristana";
            case 19:
                return "Warwick";
            case 20:
                return "Nunu";
            case 21:
                return "MissFortune";
            case 22:
                return "Ashe";
            case 23:
                return "Tryndamere";
            case 24:
                return "Jax";
            case 25:
                return "Morgana";
            case 26:
                return "Zilean";
            case 27:
                return "Singed";
            case 28:
                return "Evelynn";
            case 29:
                return "Twitch";
            case 30:
                return "Karthus";
            case 31:
                return "Chogath";
            case 32:
                return "Amumu";
            case 33:
                return "Rammus";
            case 34:
                return "Anivia";
            case 35:
                return "Shaco";
            case 36:
                return "DrMundo";
            case 37:
                return "Sona";
            case 38:
                return "Kassadin";
            case 39:
                return "Irelia";
            case 40:
                return "Janna";
            case 41:
                return "Gangplank";
            case 42:
                return "Corki";
            case 43:
                return "Karma";
            case 44:
                return "Taric";
            case 45:
                return "Veigar";
            case 48:
                return "Trundle";
            case 50:
                return "Swain";
            case 51:
                return "Caitlyn";
            case 53:
                return "Blitzcrank";
            case 54:
                return "Malphite";
            case 55:
                return "Katarina";
            case 56:
                return "Nocturne";
            case 57:
                return "Maokai";
            case 58:
                return "Renekton";
            case 59:
                return "JarvanIV";
            case 60:
                return "Elise";
            case 61:
                return "Orianna";
            case 62:
                return "MonkeyKing";
            case 63:
                return "Brand";
            case 64:
                return "LeeSin";
            case 67:
                return "Vayne";
            case 68:
                return "Rumble";
            case 69:
                return "Cassiopeia";
            case 72:
                return "Skarner";
            case 74:
                return "Heimerdinger";
            case 75:
                return "Nasus";
            case 76:
                return "Nidalee";
            case 77:
                return "Udyr";
            case 78:
                return "Poppy";
            case 79:
                return "Gragas";
            case 80:
                return "Pantheon";
            case 81:
                return "Ezreal";
            case 82:
                return "Mordekaiser";
            case 83:
                return "Yorick";
            case 84:
                return "Akali";
            case 85:
                return "Kennen";
            case 86:
                return "Garen";
            case 89:
                return "Leona";
            case 90:
                return "Malzahar";
            case 91:
                return "Talon";
            case 92:
                return "Riven";
            case 96:
                return "KogMaw";
            case 98:
                return "Shen";
            case 99:
                return "Lux";
            case 101:
                return "Xerath";
            case 102:
                return "Shyvana";
            case 103:
                return "Ahri";
            case 104:
                return "Graves";
            case 105:
                return "Fizz";
            case 106:
                return "Volibear";
            case 107:
                return "Rengar";
            case 110:
                return "Varus";
            case 111:
                return "Nautilus";
            case 112:
                return "Viktor";
            case 113:
                return "Sejuani";
            case 114:
                return "Fiora";
            case 115:
                return "Ziggs";
            case 117:
                return "Lulu";
            case 119:
                return "Draven";
            case 120:
                return "Hecarim";
            case 121:
                return "Khazix";
            case 122:
                return "Darius";
            case 126:
                return "Jayce";
            case 131:
                return "Diana";
            case 133:
                return "Quinn";
            case 134:
                return "Syndra";
            case 136:
                return "AurelionSol";
            case 143:
                return "Zyra";
            case 150:
                return "Gnar";
            case 154:
                return "Zac";
            case 161:
                return "Velkoz";
            case 163:
                return "Taliyah";
            case 164:
                return "Camille";
            case 427:
                return "Ivern";
            case 202:
                return "Jhin";
            case 240:
                return "Kled";
            case 267:
                return "Nami";
            case 201:
                return "Braum";
            case 203:
                return "Kindred";
            case 236:
                return "Lucian";
            case 238:
                return "Zed";
            case 268:
                return "Azir";
            case 222:
                return "Jinx";
            case 420:
                return "Illaoi";
            case 223:
                return "TahmKench";
            case 432:
                return "Bard";
            case 412:
                return "Thresh";
            case 421:
                return "RekSai";
            case 254:
                return "Vi";
            case 245:
                return "Ekko";
            case 157:
                return "Yasuo";
            case 127:
                return "Lissandra";
            case 429:
                return "Kalista";
            case 497:
                return "Rakan";
            case 498:
                return "Xayah";
            case 266:
                return "Aatrox";
            default:
                return Id;
        }
    },
    weightspell: function (spell, lane) {
        for (let i = 0; i < lane.length; i++) {
            let ran = ((Math.random() * 100) % 10) * 0.03;
            lane[i] -= ran;
        }
        //mid,bot,top,sup,jungle
        switch (spell) {
            case 21:
                lane[0] -= 0.7;
                lane[4] += 1;
                break;
            case 2:
                lane[0] -= 0.4;
                lane[1] -= 0.8;
                lane[4] += 1;
                break;
            case 13:
                lane[0] -= 0.6;
                lane[3] -= 0.7;
                break;
            case 1:
                lane[0] -= 0.4;
                lane[2] -= 0.5;
                break;
            case 3:
                lane[0] -= 0.6;
                lane[3] -= 1;
                lane[2] -= 0.4;
                break;
            case 4:
                //return "Flash";
                break;
            case 17:
                //return "Garrison";
                break;
            case 6:
                lane[0] -= 0.6;
                lane[2] -= 0.7;
                break;
            case 7:
                //mid,bot,top,sup,jungle
                lane[0] -= 0.6;
                lane[1] -= 0.7;
                break;
            case 14:
                break;
                // return "Dot";
            case 11:
                lane[0] += 2;
                lane[1] += 2;
                lane[3] += 2;
                lane[4] -= 3.8;
                // return "Smite";
            case 12:
                lane[0] -= 0.6;
                lane[2] -= 0.8;
                break;
            case 32:
                break;
                // return "Snowball";
        }
        return lane;
    },
    getSpellName: function (id) {
        switch (id) {
            case 21:
                return "Barrier";
            case 2:
                return "Clairvoyance";
            case 13:
                return "Mana";
            case 1:
                return "Boost";
            case 3:
                return "Exhaust";
            case 4:
                return "Flash";
            case 17:
                return "Garrison";
            case 6:
                return "Haste";
            case 7:
                return "Heal";
            case 14:
                return "Dot";
            case 11:
                return "Smite";
            case 12:
                return "Teleport";
            case 32:
                return "Snowball";
            default:
                return id;
        }
    }
};
module.exports = preference;