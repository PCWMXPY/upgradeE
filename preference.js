var preference = {
    getChampDeatil: function(Id) {
        switch (Id) {
            //bf, tuan zhan, kongzhi, he li xing
            case 1:
                return [7, 7, 7, 6, 5, 8];
            case 2:
                return [6, 4, 2, 8, 6, 5];
            case 3:
                return [3, 8, 8, 4, 4, 8];
            case 4:
                return [4, 7, 9, 7, 5, 9];
            case 5:
                return [7, 4, 7, 6, 6, 6];
            case 6:
                return [5, 8, 7, 4, 4, 8];
            case 7:
                return [9, 5, 5, 6, 8, 4];
            case 8:
                return [5, 8, 4, 7, 3, 7];
            case 9:
                return [8, 8, 5, 2, 6, 5];
            case 10:
                return [6, 7, 6, 9, 2, 9];
            case 11:
                return [3, 6, 4, 9, 3, 9];
            case 12:
                return [3, 9, 9, 7, 8, 7];
            case 13:
                return [7, 7, 7, 5, 4, 8];
            case 14:
                return [4, 6, 7, 7, 8, 4];
            case 15:
                return [5, 9, 2, 7, 3, 7];
            case 16:
                return [0, 6, 5, 9, 6, 6];
            case 17:
                return [6, 2, 2, 3, 8, 5];
            case 18:
                return [6, 7, 5, 8, 4, 9];
            case 19:
                return [5, 7, 9, 6, 7, 6];
            case 20:
                return [2, 6, 2, 7, 7, 5];
            case 21:
                return [8, 8, 3, 6, 5, 8];
            case 22:
                return [6, 7, 8, 6, 4, 8];
            case 23:
                return [7, 2, 2, 5, 7, 5];
            case 24:
                return [6, 6, 5, 7, 4, 8];
            case 25:
                return [5, 8, 8, 8, 5, 7];
            case 26:
                return [4, 7, 5, 7, 7, 6];
            case 27:
                return [2, 2, 6, 8, 4, 5];
            case 28:
                return [7, 1, 5, 7, 8, 6];
            case 29:
                return [8, 8, 0, 5, 4, 8];
            case 30:
                return [5, 9, 0, 6, 2, 9];
            case 31:
                return [7, 4, 7, 7, 6, 6];
            case 32:
                return [6, 9, 8, 7, 6, 7];
            case 33:
                return [5, 8, 9, 4, 5, 7];
            case 34:
                return [7, 8, 4, 7, 4, 8];
            case 35:
                return [7, 2, 4, 4, 7, 7];
            case 36:
                return [4, 6, 2, 8, 4, 7];
            case 37:
                return [7, 6, 7, 6, 8, 6];
            case 38:
                return [7, 6, 4, 6, 4, 8];
            case 39:
                return [6, 7, 7, 7, 4, 7];
            case 40:
                return [3, 3, 7, 9, 6, 6];
            case 41:
                return [6, 5, 0, 8, 4, 8];
            case 42:
                return [6, 7, 2, 7, 5, 7];
            case 43:
                return [5, 7, 6, 8, 6, 5];
            case 44:
                return [2, 9, 7, 8, 5, 7];
            case 45:
                return [9, 7, 7, 5, 4, 8];
            case 48:
                return [5, 4, 6, 6, 8, 5];
            case 50:
                return [4, 7, 6, 6, 6, 5];
            case 51:
                return [7, 7, 4, 6, 4, 8];
            case 53:
                return [5, 5, 9, 7, 8, 6];
            case 54:
                return [6, 7, 7, 7, 4, 7];
            case 55:
                return [7, 8, 0, 5, 7, 5];
            case 56:
                return [8, 4, 2, 5, 6, 5];
            case 57:
                return [4, 8, 8, 7, 4, 7];
            case 58:
                return [6, 5, 6, 7, 8, 5];
            case 59:
                return [7, 6, 6, 6, 7, 5];
            case 60:
                return [7, 2, 6, 7, 7, 4];
            case 61:
                return [7, 8, 8, 6, 4, 8];
            case 62:
                return [6, 7, 5, 8, 4, 9];
            case 63:
                return [8, 7, 4, 3, 7, 6];
            case 64:
                return [6, 4, 8, 8, 7, 6];
            case 67:
                return [8, 9, 6, 7, 1, 9];
            case 68:
                return [7, 7, 5, 6, 6, 6];
            case 69:
                return [8, 8, 8, 5, 4, 8];
            case 72:
                return [6, 8, 9, 6, 7, 7];
            case 74:
                return [4, 4, 4, 8, 7, 7];
            case 75:
                return [4, 6, 6, 8, 4, 8];
            case 76:
                return [5, 5, 5, 9, 6, 5];
            case 77:
                return [5, 7, 7, 5, 7, 6];
            case 78:
                return [6, 7, 7, 6, 5, 7];
            case 79:
                return [6, 7, 7, 4, 6, 5];
            case 80:
                return [7, 2, 7, 5, 9, 4];
            case 81:
                return [4, 8, 0, 5, 4, 7];
            case 82:
                return [6, 7, 2, 6, 7, 6];
            case 83:
                return [6, 5, 7, 6, 7, 5];
            case 84:
                return [8, 2, 2, 4, 7, 6];
            case 85:
                return [7, 7, 7, 2, 6, 6];
            case 86:
                return [6, 6, 2, 4, 7, 7];
            case 89:
                return [2, 7, 8, 6, 7, 7];
            case 90:
                return [6, 5, 7, 6, 5, 8];
            case 91:
                return [8, 2, 2, 6, 7, 6];
            case 92:
                return [7, 4, 6, 5, 7, 6];
            case 96:
                return [6, 9, 2, 0, 5, 9];
            case 98:
                return [6, 7, 5, 8, 7, 8];
            case 99:
                return [8, 7, 6, 4, 8, 6];
            case 101:
                return [6, 7, 5, 4, 7, 7];
            case 102:
                return [6, 6, 2, 9, 5, 7];
            case 103:
                return [7, 7, 7, 7, 7, 7];
            case 104:
                return [7, 7, 2, 8, 7, 8];
            case 105:
                return [8, 4, 8, 6, 9, 6];
            case 106:
                return [5, 8, 6, 3, 8, 5];
            case 107:
                return [7, 4, 4, 8, 8, 8];
            case 110:
                return [5, 7, 6, 8, 8, 5];
            case 111:
                return [2, 8, 8, 4, 7, 6];
            case 112:
                return [7, 8, 6, 3, 7, 9];
            case 113:
                return [5, 8, 9, 7, 6, 9];
            case 114:
                return [6, 4, 6, 9, 8, 6];
            case 115:
                return [7, 8, 4, 4, 6, 7];
            case 117:
                return [3, 7, 6, 8, 5, 6];
            case 119:
                return [6, 8, 2, 5, 8, 2];
            case 120:
                return [6, 7, 6, 6, 7, 7];
            case 121:
                return [8, 4, 2, 9, 8, 6];
            case 122:
                return [7, 5, 6, 3, 8, 6];
            case 126:
                return [8, 2, 5, 7, 7, 4];
            case 131:
                return [7, 4, 7, 6, 6, 8];
            case 133:
                return [7, 5, 7, 9, 8, 5];
            case 134:
                return [9, 6, 8, 5, 8, 8];
            case 136:
                return [5, 8, 4, 9, 6, 7];
            case 143:
                return [6, 6, 7, 4, 8, 6];
            case 150:
                return [7, 5, 7, 8, 6, 7];
            case 154:
                return [6, 5, 8, 3, 7, 5];
            case 161:
                return [8, 7, 5, 2, 8, 5];
            case 163:
                return [6, 5, 5, 9, 7, 8];
            case 427:
                return [3, 4, 9, 9, 7, 5];
            case 202:
                return [6, 6, 2, 7, 6, 5];
            case 240:
                return [4, 4, 8, 9, 7, 5];
            case 267:
                return [6, 7, 7, 6, 8, 7];
            case 201:
                return [3, 7, 6, 8, 5, 7];
            case 203:
                return [5, 7, 2, 8, 7, 6];
            case 236:
                return [6, 7, 6, 9, 7, 5];
            case 238:
                return [9, 7, 0, 6, 8, 5];
            case 268:
                return [3, 8, 6, 4, 2, 9];
            case 222:
                return [6, 8, 2, 7, 2, 8];
            case 420:
                return [6, 5, 2, 8, 7, 5];
            case 223:
                return [5, 5, 8, 9, 6, 5];
            case 432:
                return [6, 4, 8, 6, 7, 5];
            case 412:
                return [2, 6, 9, 9, 7, 7];
            case 421:
                return [6, 4, 8, 9, 7, 5];
            case 254:
                return [7, 7, 7, 2, 7, 6];
            case 245:
                return [6, 7, 6, 5, 6, 7];
            case 157:
                return [5, 8, 4, 6, 7, 7];
            case 127:
                return [6, 7, 9, 5, 5, 7];
            case 429:
                return [4, 8, 2, 9, 1, 8];
            case 266:
                return [7, 3, 6, 6, 9, 5];
            default:
                return [0, 0, 0, 0, 0, 0];
        }
    },
    getChampName: function(Id) {
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
                return "Shen";
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
            case 266:
                return "Aatrox";
            default:
                return Id;
        }
    },
    getSpellName: function(id) {
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
