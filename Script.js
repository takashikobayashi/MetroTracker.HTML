/* Tokyo Metro App | jQuery, AngularJS, Bootstrap | JavaScript, html5, CSS3 Study | (c) 2014 twitter@sumo_ninja_jp
*/

angular.module( "app20140917", [])
.controller( "app20140917Controller", function( $scope, $http,$q, $window, $interval ) {


var railways = {
  "TokyoMetro.Ginza":"銀座",
  "TokyoMetro.Marunouchi":"丸ノ内",
  "TokyoMetro.MarunouchiBranch":"丸ノ内（分岐）",
  "TokyoMetro.Hibiya":"日比谷",
  "TokyoMetro.Tozai":"東西",
  "TokyoMetro.Chiyoda":"千代田",
  "TokyoMetro.Yurakucho":"有楽町",
  "TokyoMetro.Hanzomon":"半蔵門",
  "TokyoMetro.Namboku":"南北",
  "TokyoMetro.Fukutoshin":"副都心"
};

var traintype = {
  "TokyoMetro.Unknown":"不明",
  "TokyoMetro.Local":"各停",
  "TokyoMetro.Express":"急行",
  "TokyoMetro.Rapid":"快速",
  "TokyoMetro.SemiExpress":"準急",
  "TokyoMetro.TamaExpress":"多摩急行",
  "TokyoMetro.HolidayExpress":"土休急行",
  "TokyoMetro.CommuterSemiExpress":"通勤準急",
  "TokyoMetro.Extra":"臨時",
  "TokyoMetro.RomanceCar":"特急ロマンスカー",
  "TokyoMetro.RapidExpress":"快速急行",
  "TokyoMetro.CommuterExpress":"通勤急行",
  "TokyoMetro.LimitedExpress":"特急",
  "TokyoMetro.CommuterLimitedExpress":"通勤特急",
  "TokyoMetro.CommuterRapid":"通勤快速",
  "TokyoMetro.ToyoRapid":"東葉快速"
};

var direction = {
  "TokyoMetro.Asakusa":"浅草",
  "TokyoMetro.Shibuya":"渋谷",
  "TokyoMetro.Ikebukuro":"池袋",
  "TokyoMetro.Ogikubo":"荻窪",
  "TokyoMetro.NakanoSakaue":"中野坂上",
  "TokyoMetro.Honancho":"方南町",
  "TokyoMetro.KitaSenju":"北千住",
  "TokyoMetro.NakaMeguro":"中目黒",
  "TokyoMetro.Nakano":"中野",
  "TokyoMetro.NishiFunabashi":"西船橋",
  "TokyoMetro.Ayase":"綾瀬",
  "TokyoMetro.YoyogiUehara":"代々木上原",
  "TokyoMetro.KitaAyase":"北綾瀬",
  "TokyoMetro.Wakoshi":"和光市",
  "TokyoMetro.ShinKiba":"新木場",
  "TokyoMetro.Oshiage":"押上",
  "TokyoMetro.Meguro":"目黒",
  "TokyoMetro.AkabaneIwabuchi":"赤羽岩淵",
  "TokyoMetro.KotakeMukaihara":"小竹向原",
  "TokyoMetro.ShirokaneTakanawa":"白金高輪"
};

var linkeddest = {
  "JR-East.Joban.Abiko":"我孫子",
  "JR-East.Joban.Toride":"取手",
  "JR-East.Joban.Kashiwa":"柏",
  "JR-East.Joban.Matsudo":"松戸",
  "JR-East.Chuo.Mitaka":"三鷹",
  "JR-East.ChuoChikatetsuTozai.Tsudanuma":"津田沼",
  "Toei.Mita.Mita":"三田",
  "Toei.Mita.Shibakoen":"芝公園",
  "Toei.Mita.Onarimon":"御成門",
  "Toei.Mita.Uchisaiwaicho":"内幸町",
  "Toei.Mita.Hibiya":"日比谷",
  "Toei.Mita.Otemachi":"大手町",
  "Toei.Mita.Jimbocho":"神保町",
  "Toei.Mita.Suidobashi":"水道橋",
  "Toei.Mita.Kasuga":"春日",
  "Toei.Mita.Hakusan":"白山",
  "Toei.Mita.Sengoku":"千石",
  "Toei.Mita.Sugamo":"巣鴨",
  "Toei.Mita.NishiSugamo":"西巣鴨",
  "Toei.Mita.ShinItabashi":"新板橋",
  "Toei.Mita.Itabashikuyakushomae":"板橋区役所前",
  "Toei.Mita.Itabashihoncho":"板橋本町",
  "Toei.Mita.Motohasunuma":"本蓮沼",
  "Toei.Mita.ShimuraSanchome":"志村坂上",
  "Toei.Mita.Hasune":"蓮根",
  "Toei.Mita.Nishidai":"西台",
  "Toei.Mita.Takashimadaira":"高島平",
  "Toei.Mita.ShinTakashimadaira":"新高島平",
  "Toei.Mita.NishiTakashimadaira":"西高島平",
  "SaitamaRailway.SaitamaRailway.UrawaMisono":"浦和美園",
  "SaitamaRailway.SaitamaRailway.Hatogaya":"鳩ヶ谷",
  "ToyoRapidRailway.ToyoRapid.ToyoKatsutadai":"東葉勝田台",
  "ToyoRapidRailway.ToyoRapid.YachiyoMidorigaoka":"八千代緑ヶ丘",
  "Odakyu.Tama.Karakida":"唐木田",
  "Odakyu.Odawara.HonAtsugi":"本厚木",
  "Odakyu.Odawara.HakoneYumoto":"箱根湯本",
  "Odakyu.Odawara.Ebina":"海老名",
  "Tobu.Nikko.MinamiKurihashi":"南栗橋",
  "Tobu.Isesaki.Kuki":"久喜　 ",
  "Tobu.Isesaki.Takenotsuka":"竹ノ塚",
  "Tobu.Isesaki.KitaKasukabe":"北春日部",
  "Tobu.Isesaki.KitaKoshigaya":"北越谷",
  "Tobu.Isesaki.TobuDoubutuKouen":"東武動物公園",
  "Tobu.Tojo.Kawagoeshi":"川越市",
  "Tobu.Tojo.Asaka":"朝霧",
  "Tobu.Tojo.Asakadai":"朝霧台",
  "Tobu.Tojo.Shiki":"志木",
  "Tobu.Tojo.Yanasegawa":"柳瀬川",
  "Tobu.Tojo.Mizuhodai":"みずほ台",
  "Tobu.Tojo.Tsuruse":"鶴瀬",
  "Tobu.Tojo.Fujimino":"ふじみ野",
  "Tobu.Tojo.KamiFukuoka":"上福岡",
  "Tobu.Tojo.Shingashi":"新河岸",
  "Tobu.Tojo.Kawagoe":"川越",
  "Tobu.Tojo.Kawagoeshi":"川越市",
  "Tobu.Tojo.Kasumigaseki":"霞ヶ関",
  "Tobu.Tojo.Tsurugashima":"鶴ヶ島",
  "Tobu.Tojo.Wakaba":"若葉",
  "Tobu.Tojo.Sakado":"坂戸",
  "Tobu.Tojo.KitaSakado":"北坂戸",
  "Tobu.Tojo.Takasaka":"高坂",
  "Tobu.Tojo.HigashiMatsuyama":"東松山",
  "Tobu.Tojo.ShinrinKoen":"森林公園",
  "Tokyu.Toyoko.Hiyoshi":"日吉",
  "Tokyu.Toyoko.MusashiKosugi":"武蔵小杉",
  "Tokyu.Toyoko.Yokohama":"横浜",
  "Tokyu.Toyoko.Kikuna":"菊名",
  "Tokyu.Toyoko.Motosumiyoshi":"元住吉",
  "Tokyu.Toyoko.Okusawa":"奥沢",
  "Tokyu.Meguro.Hiyoshi":"日吉",
  "Tokyu.Meguro.Okusawa":"奥沢",
  "Tokyu.Meguro.Motosumiyoshi":"元住吉",
  "Tokyu.Meguro.MusashiKosugi":"武蔵小杉",
  "Tokyu.DenEnToshi.FutakoTamagawa":"二子玉川",
  "Tokyu.DenEnToshi.Nagatsuta":"長津田",
  "Tokyu.DenEnToshi.Saginuma":"鷺沼",
  "Tokyu.DenEnToshi.ChuoRinkan":"中央林間",
  "Minatomirai.Minatomirai.MotomachiChukagai":"元町・中華街",
  "Seibu.Ikebukuro.ShinSakuradai":"新桜台",
  "Seibu.Ikebukuro.Nerima":"練馬",
  "Seibu.Ikebukuro.Nakamurabashi":"中村橋",
  "Seibu.Ikebukuro.Fujimidai":"富士見台",
  "Seibu.Ikebukuro.NerimaTakanodai":"練馬高野台",
  "Seibu.Ikebukuro.ShakujiiKoen":"石神井公園",
  "Seibu.Ikebukuro.OizumiGakuen":"大泉学園",
  "Seibu.Ikebukuro.Hoya":"保谷",
  "Seibu.Ikebukuro.Hibarigaoka":"ひばりヶ丘",
  "Seibu.Ikebukuro.HigashiKurume":"東久留米",
  "Seibu.Ikebukuro.Kiyose":"清瀬",
  "Seibu.Ikebukuro.Akitsu":"秋津",
  "Seibu.Ikebukuro.Tokorozawa":"所沢",
  "Seibu.Ikebukuro.NishiTokorozawa":"西所沢",
  "Seibu.Ikebukuro.Kotesashi":"小手指",
  "Seibu.Ikebukuro.Sayamagaoka":"狭山ヶ丘",
  "Seibu.Ikebukuro.MusashiFujisawa":"武蔵藤沢",
  "Seibu.Ikebukuro.InariyamaKoen":"稲荷山公園",
  "Seibu.Ikebukuro.Irumashi":"入間市",
  "Seibu.Ikebukuro.Bushi":"仏子",
  "Seibu.Ikebukuro.Motokaji":"元加治",
  "Seibu.Ikebukuro.Hanno":"飯能"
};

var token = "672e182fef5eadc290821d6cbb062ede93bfad46422ce8a53c6555a631decb9e";
var apiurl = "https://api.tokyometroapp.jp/api/v2/";


$scope.app = {};
$scope.app.name ="ココどこメトロ";
$scope.app.version = "0.01";
$scope.disp = {};
$scope.disp.dlg1_pgb1;
$scope.disp.dlg2_pgb1;
$scope.disp.main_pgb1;
$scope.disp.railways = railways;
$scope.disp.railwayStations;
$scope.disp.trainInfo = [];
$scope.disp.train;
$scope.disp.showTrainInfo = true;
$scope.data = {};
$scope.data.currentRailway;
$scope.data.nearStations;
$scope.data.currentStation;
$scope.data.currentTimetable;
$scope.data.nearTrains;
$scope.data.currentTrain;
$scope.data.trackingTrains = [];
$scope.data.latestTrainInfo = [];
$scope.temp = {};
$scope.temp.railways = {};
$scope.temp.railwayStations = {};
$scope.temp.railwayTimetables = {};
$scope.pref = {};
$scope.pref.radius = 15000;
$scope.pref.defaultRailway = 6;
$scope.pref.weekdays = "12345";
$scope.pref.saturdays = "6";
$scope.pref.holidays = "0";
$scope.pref.showTrainInfo = true;
$scope.pref.autoUpdateInfo = true;
$scope.pref.maxUpdateMinutes = 60;// 3600000 = 1000 * 60 * 60
$scope.pref.trainInfoInterval = 250000;// 1000*(60-10)*5
$scope.pref.trainInfoMaxRepeats = 15;// 3600 / 250 -> 14.4
$scope.pref.trackTrainInterval = 80000;// 1000*(90-10)
$scope.pref.trackTrainMaxRepeats = 45;// 3600 / 80 -> 45
$scope.pref.autoRemoveInvalids = true;

$scope.msg;

var itvl = {};


function DPStation( res ) {
//alert("new DPs: "+JSON.stringify(res));
  this.res = res;

  var r = res["odpt:railway"];
  this.rail = r.substring(r.lastIndexOf(":")+1);

  r = res["owl:sameAs"];
  this.station = r.substring(r.lastIndexOf(":")+1);

  this.title = res["dc:title"];

  this.code = res["odpt:stationCode"]

  this.disp_title = this.title +" " + this.code;

  this.disp_name = this.disp_title + " " + railways[this.rail] + "線";
}

function DPTrain( res ) {
//alert("new DPt: "+JSON.stringify(res));
  this.res = res;
  //this.id = res["@id"];
  this.id = res["owl:sameAs"];
  //this.id = res["odpt:trainNumber"];

  var r = res["odpt:railway"];
  this.rail = r.substring(r.lastIndexOf(":")+1);

  r = res["odpt:railDirection"];
  this.direction = r.substring(r.lastIndexOf(":")+1);

  r = res["odpt:trainType"];
  this.type = r.substring(r.lastIndexOf(":")+1);

  r = res["odpt:terminalStation"];
  this.destination = r.substring(r.lastIndexOf(":")+1);
  this.destrail = r.substring(r.lastIndexOf(":")+1, r.lastIndexOf("."));

  r = res["odpt:fromStation"];
  this.nowrail = r.substring(r.lastIndexOf(":")+1, r.lastIndexOf("."));
  this.nowdest = this.nowrail + "." + this.destination.substring( this.destination.lastIndexOf(".")+1 );

  this.url = apiurl + "datapoints/" + this.id + "?acl:consumerKey=" + token;
  //this.url = apiurl + "datapoints?rdf:type=odpt:Train&odpt:trainNumber=" + this.id + "&acl:consumerKey=" + token;

  this.table;

  this.disp_num = res["odpt:trainNumber"];

  r = this.rail;
  this.disp_class = r.substring(r.lastIndexOf(".")+1);

  this.disp_rail = railways[this.rail] + "線";

  this.disp_dir = direction[this.direction] + "方面 ";

  this.disp_type = traintype[this.type];

  r = findStationTitle( this.destrail, this.destination );
  if( ! r ) {
    r = findStationTitle( this.nowrail, this.nowdest );
  }
  this.disp_dest = r + "行き";

  this.getStatus = function() {
//alert("DPTrain.gS: called");
    var r;
    var ret = "";
    var from = res["odpt:fromStation"];
    from = from.substring(from.lastIndexOf(":")+1);
    var fromrail = from.substring(0,from.lastIndexOf("."));
    var to = res["odpt:toStation"];
    var torail;
    if( to == null ) {
      if( from == this.destination ) {
        ret = "終点 ";
      }
      ret +=  findStationTitle( fromrail, from )+" 駅";
    }
    else {
      to = to.substring(to.lastIndexOf(":")+1);
      torail = to.substring(0,to.lastIndexOf("."));
//alert("DPTrain.gS: "+fromrail+" "+torail);
      ret = "次は";
      if( to == this.destination ) {
        ret += "終点";
      }
      r = findStationTitle( torail, to );
      if( ! r ) {
        r = findStationTitle( this.nowrail, this.nowdest );
      }
      ret += " "+ r +" 駅";
    }
    return ret;
  }
  
  this.isValid = true;
  this.valid = new Date(res["dct:valid"]);

  this.time = new Date(res["dc:date"]);
  this.disp_time = this.time.getFullYear()+"年"+(this.time.getMonth()+1)+"月"+this.time.getDate()+"日 "+this.time.getHours()+"時"+this.time.getMinutes()+"分現在";

  this.delay = res["odpt:delay"];
  this.disp_delay = this.delay > 0 ? Math.ceil( this.delay / 60 ) : 0;

  this.disp_table = [];
  this.setTimetable = function( tables ) {
//alert("DPt.setTimetable: "+JSON.stringify(tables));

    var i;
    for( i = 0; i < tables.length; i++ ) {
      if( tables[i].table ) {
        this.table = tables[i].table;
        break;
      }
    }
    if( ! this.table ) {
      return;
    }
    var start = res["odpt:startingStation"];
    start = start.substring(start.lastIndexOf(":")+1);
    var from = res["odpt:fromStation"];
    from = from.substring(from.lastIndexOf(":")+1);
    var to = res["odpt:toStation"];
    if( to ) {
      to = to.substring(to.lastIndexOf(":")+1);
    }

    var j, t, s1, s2, sr, m, c;
    var isPast = true;
    for( i = 0; i < this.table.length; i++ ) {
      t = this.table[i]["odpt:departureTime"];
      if( ! t ) {
        t = this.table[i]["odpt:arrivalTime"];
      }
      s1 = this.table[i]["odpt:departureStation"];
      if( ! s1 ) {
        s1 = this.table[i]["odpt:arrivalStation"];
      }
      s1 = s1.substring(s1.lastIndexOf(":")+1);
      sr = s1.substring(0, s1.lastIndexOf("."));
      s2 = findStationTitle( sr, s1 );

      m = "";
      if( isPast ) {
        if( s1 === to || s1 === this.nowdest ) {
            c = "□";
            isPast = false;
        }
        else {
          c = "■";
          if( s1 === from && ! to ) {
            
            isPast = false;
          }
        }

        for( j = 0; j < s2.length; j++ ) {
          m += c;
        }
      }
      this.disp_table.push( {
        "time":t,
        "station":s1,
        "sta":s2,
        "mark":m
      } );
    }

//alert("DPt: "+JSON.stringify(this.disp_table));
  }
}

function DPTrainInfo( res ) {
//alert("new DPti: "+JSON.stringify(res));
  this.res = res;

  var r = res["odpt:railway"];
  this.rail = r.substring(r.indexOf(":")+1);

  this.status = res["odpt:trainInformationStatus"];

  this.time = new Date(res["dc:date"]);

  this.text = res["odpt:trainInformationText"];

  this.disp_rail = railways[this.rail];

  this.disp_time = this.time.getFullYear()+"年"+(this.time.getMonth()+1)+"月"+this.time.getDate()+"日 "+this.time.getHours()+"時"+this.time.getMinutes()+"分現在"

  this.disp_text = this.text;

  if( ! this.status ) {
    this.disp_class = "alert-info";
  }
  else {
    if( this.status["@value"] === "false" ) {
      this.disp_class = "alert-danger";
    }
    else {
      this.disp_class = "alert-warning";
    }
  }

  this.isVisible = true;
}

function DPRailway( res ) {
//alert("new DPr: "+JSON.stringify(res));
  this.res = res;

  var r = res["owl:sameAs"];
  this.id = r.substring( r.lastIndexOf(":")+1 );

  this.order = [];
  var ss = res["odpt:stationOrder"], i;
  for( i = 0; i < ss.length; i++ ) {
    r = ss[i]["odpt:station"];
    r = r.substring( r.lastIndexOf(":")+1 );
    this.order[ss[i]["odpt:index"]] = findStation( this.id, r );
//r.substring( r.lastIndexOf(".")+1 ) );
  }
//alert("DPr: "+JSON.stringify(this.order));
}

function DPTimetable( res ) {
//alert("new DPtt: "+JSON.stringify(res));
  this.res = res;

  var r = res["owl:sameAs"];
  this.station = r.substring(r.lastIndexOf(":")+1);

  r = new Date().getDay();
  var d = "odpt:weekdays";
  if( $scope.pref.weekdays.indexOf( r ) != -1 ) {
    d = "odpt:weekdays";
  }
  else if( $scope.pref.saturdays.indexOf( r ) != -1 ) {
    d = "odpt:saturdays";
  }
  else if( $scope.pref.holidays.indexOf( r ) != -1 ) {
    d = "odpt:holidays";
  }
  this.table = res[d];
//alert("new DPtt: "+d);
//alert("new DPtt: "+JSON.stringify(this.table));

}

function DPTrainTimetable( res ) {
//alert("new DPttt: "+JSON.stringify(res));
  this.res = res;

  var r = res["odpt:railway"];
  this.rail = r.substring(r.indexOf(":")+1);

  r = new Date().getDay();
  var d = "odpt:weekdays";
  if( $scope.pref.weekdays.indexOf( r ) != -1 ) {
    d = "odpt:weekdays";
  }
  else if( $scope.pref.saturdays.indexOf( r ) != -1 ) {
    d = "odpt:saturdays";
  }
  else if( $scope.pref.holidays.indexOf( r ) != -1 ) {
    d = "odpt:holidays";
  }
  this.table = res[d];

//alert("new DPttt: "+JSON.stringify(this.table));
}

function getNearStationsQuery( pos, rad ) {
  return apiurl + "places?rdf:type=odpt:Station&lon=" + pos.coords.longitude + "&lat=" + pos.coords.latitude + "&radius=" + rad + "&acl:consumerKey=" + token;
}

function getRailwayQuery( rwy ) {
  return apiurl + "datapoints?rdf:type=odpt:Railway&owl:sameAs=" + rwy + "&acl:consumerKey=" + token;

//alert("gRQ: "+rwy);
//  var r = $window.encodeURIComponent( railways[rwy]);
//  return apiurl + "datapoints?rdf:type=odpt:Railway&dc:title=" + r + "&acl:consumerKey=" + token;
}

function getRailwayStationsQuery( rwy ) {
  return apiurl + "datapoints?rdf:type=odpt:Station&odpt:railway=odpt.Railway:" + rwy + "&acl:consumerKey=" + token;

  //return "https://api.tokyometroapp.jp/api/v2/datapoints?rdf:type=odpt:Station&odpt:railway=odpt.Railway:TokyoMetro.Yurakucho&acl:consumerKey=" + token;

  //return apiurl + "datapoints?rdf:type=odpt:Station&acl:consumerKey=" + token;

}

function getTrainsQuery() {
  return apiurl + "datapoints?rdf:type=odpt:Train&acl:consumerKey=" + token;
}

function getTrainInfoQuery() {
  return apiurl + "datapoints?rdf:type=odpt:TrainInformation&acl:consumerKey=" + token;
}

function getTrainTimetablesQuery( rwy, train ) {
  return apiurl + "datapoints?rdf:type=odpt:TrainTimetable&odpt:railway=odpt.Railway:" + rwy + "&odpt:trainNumber=" + train + "&acl:consumerKey=" + token;
}

function getStationTimetablesQuery( sta ) {
  return apiurl + "datapoints?rdf:type=odpt:StationTimetable&odpt:station=odpt.Station:" + sta + "&acl:consumerKey=" + token;
}

function getGeoLocation() {
//alert("gGL: called");
  var deferred = $q.defer();
  if( navigator.geolocation ) {
    navigator.geolocation.getCurrentPosition( function( pos ) {
//alert("gGL.gCP: called");
      deferred.resolve( pos );
    } );
  }
  return deferred.promise;
}

function getStationValues( pos ) {
  var rad = $scope.pref.radius;
//alert("gSV: "+getNearStationsQuery( pos, rad ));
//$scope.msg="gSV: called";
  return $http.get( getNearStationsQuery( pos, rad ) );
}

function setNearStations( stations ) {
  $scope.data.nearStations = stations;
//alert("sNS: "+JSON.stringify($scope.data.nearStations));
  return stations;
}

function selectFirstStation( stations ) {
  $scope.data.currentStation = stations[0];
//alert("sFS: "+JSON.stringify($scope.data.currentStation));
  $scope.$apply();
  return stations[0];
}

$scope.getNearStations = function() {
//alert("gNS: called");
  return getGeoLocation()
  .then( getStationValues, error, notify )
  .then( dfdize( transformResponse ) )
  .then( dfdize( getStations ) )
  .then( dfdize( setNearStations ) )
  .then( dfdize( selectFirstStation ) )
//  .then( getNearTrains )
  ;
}

function callAddTrainDlg1() {
//alert("cATD1: called");
  $( "#addTrainDlg1" ).modal( "show" );
}

$scope.showAddTrainDlg1 = function() {
//alert("sATD1: called");
  $scope.getNearStations()
  .then( dfdize( callAddTrainDlg1 ) )
  .catch( error )
  ;
}


function getTrainTimetableValues( train ) {
//alert("gTTtV: "+getTrainTimetablesQuery( train.rail, train.disp_num ));
  return $http.get( getTrainTimetablesQuery( train.rail, train.disp_num ) );
}

function setTrainTimetable( train ) {
  return function( tables ) {
//alert("sTTt: "+JSON.stringify(table));
    train.setTimetable( tables );
    return train;
  }
}

function getTimetableOfTrain( train ) {
//alert("gTtoT: "+JSON.stringify(train));
  return getTrainTimetableValues( train )
  .then( dfdize( transformResponse ) )
  .then( dfdize( getTrainTimetable ) )
  .then( dfdize( setTrainTimetable( train ) ) )
  .catch( error )
  ;
}

function callTrainInfoDlg() {
//alert("cTID: called");
  $( "#trainInfoDlg" ).modal( "show" );
}

$scope.showTrainInfoDlg = function( i ) {
//alert("sTID: called: "+i);
  $scope.disp.train = $scope.data.trackingTrains[i];

  if( $scope.disp.train.table ) {
    callTrainInfoDlg();
  }
  else {
    getTimetableOfTrain( $scope.disp.train )
    .then( dfdize( callTrainInfoDlg ) );
  }
}

function selectRailwayFromStation( station ) {
//alert("sRfS: "+JSON.stringify(station));
  var ret;
  if( station ) {
    ret = station.rail;
  }
  else {
    ret = Object.keys(railways)[$scope.pref.defaultRailway];
  }
  return ret;
}

function setCurrentRailway( railway ) {
//alert("sCR: "+railway);
  $scope.data.currentRailway = railway;
  return railway;
}

function getRailwayValues( rwy ) {
//alert("gRV: "+getRailwayQuery( rwy ));
  return $http.get( getRailwayQuery( rwy ) );
}

function setRailway( railways ) {
  var i, rwy;
  var ret = [];
  for( i = 0; i < railways.length; i++ ) {
    rwy = railways[i].id;
    if( rwy === $scope.data.currentRailway ) {
//alert("sR: "+rwy);
      $scope.temp.railways[rwy] = railways[i];
      ret.push( railways[i] );
    }
  }
//alert("sR: "+rwy+" "+ret.length);
  return ret;
}

function getRailwayInfo( rwy ) {
  return getRailwayValues( $scope.data.currentRailway )
  .then( dfdize( transformResponse ) )
  .then( dfdize( getRailway ) )
  .then( dfdize( setRailway ) )
  ;
}

function getSelectedRailwayInfo( rwy ) {
//alert("gSRI1: "+rwy+" "+$scope.temp.railways[rwy]+" "+$scope.temp.railwayStations[rwy]);
  var ret;
  if( ! $scope.temp.railways[rwy] ) {
    if( ! $scope.temp.railwayStations[rwy] ) {
      ret = getStationsOfRailway( rwy )
      .then( dfdize( transmitParams( rwy ) ) )
      .then( getRailwayInfo )
      .then( dfdize( transmitParams( rwy ) ) )
      ;
    }
    else {
      ret = getRailwayInfo( rwy )
      .then( dfdize( transmitParams( rwy ) ) )
      ;
    }
  }
  else {
    if( ! $scope.temp.railwayStations[rwy] ) {
      ret = getStationsOfRailway( rwy )
      .then( dfdize( transmitParams( rwy ) ) )
      ;
    }
    else {
      ret = dfdize( transmitParams( rwy ) )();
    }
  }
//alert("gSRI2: "+ret);
  return ret;
}
/*
function setDisplayRailwayStations( rwy ) {
alert("sDRS1: "+rwy);
  $scope.disp.railwayStations = $scope.temp.railways[rwy].order;

  $scope.data.currentStation = $scope.disp.railwayStations[0];

  for( i = 0; i < $scope.disp.railwayStations.length; i++ ) {
    if( $scope.disp.railwayStations[i].station === $scope.data.currentStation.station ) {
      $scope.data.currentStation = $scope.disp.railwayStations[i];
      break;
    }
  }

  $scope.$apply();
  return rwy;
}
*/

function setDisplayRailwayStations( rwy ) {
//alert("sDRS1: "+rwy);
//alert("sDRS2: "+$scope.temp.railways[rwy]);
  var i;
  $scope.disp.railwayStations = $scope.temp.railways[rwy].order;
//alert("sDRS3: "+$scope.disp.railwayStations);
//alert("sDRS4: "+$scope.data.currentStation);
  if( $scope.data.currentStation ) {
    if( $scope.data.currentStation.rail !== $scope.data.currentRailway ) {
      $scope.data.currentStation = null;
      if( $scope.data.nearStations ) {
        for( i = 0; i < $scope.data.nearStations.length; i++ ) {
          if( $scope.data.currentRailway === $scope.data.nearStations[i].rail ) {
            $scope.data.currentStation = $scope.data.nearStations[i];
            break;
          }
        }
      }
    }
  }
  if( ! $scope.data.currentStation ) {
    $scope.data.currentStation = $scope.disp.railwayStations[0];
  }
//alert("sDRS5: "+JSON.stringify($scope.data.currentStation));

  for( i = 0; i < $scope.disp.railwayStations.length; i++ ) {
    if( $scope.disp.railwayStations[i].station === $scope.data.currentStation.station ) {
      $scope.data.currentStation = $scope.disp.railwayStations[i];
      break;
    }
  }

  $scope.$apply();
  return rwy;
}


function callAddTrainDlg2() {
//alert("cATD2: called");
  $( "#addTrainDlg2" ).modal( "show" );
}

$scope.showAddTrainDlg2 = function() {
//alert("sATD2: called");
  $scope.getNearStations()
  .then( dfdize( selectRailwayFromStation ) )
  .then( dfdize( setCurrentRailway ) )
  .then( getSelectedRailwayInfo )
  .then( dfdize( setDisplayRailwayStations ) )
  .then( dfdize( callAddTrainDlg2 ) )
  .catch( error )
  ;
}

function clearCurrentTimetable( p ) {
  $scope.data.currentTimetable = null;
  $scope.$apply();
  return p;
}

$scope.getRailwayInfoOfSelectedStation = function() {
//alert("gRIoSS: "+$scope.data.currentRailway+" "+$scope.data.currentStation.station);

/*
  var pgb = "dlg2_pgb1";
  setPBar( pgb, 0 )();
      .then( dfdize( setPBar( pgb, 20 ) ) )
  .then( dfdize( setPBar( pgb, 40 ) ) )
  .then( dfdize( setPBar( pgb, 60 ) ) )
  .then( dfdize( setPBar( pgb, 80 ) ) )
  .then( dfdize( setPBar( pgb, 100 ) ) )
*/

  var rwy;
  clearCurrentTimetable();
  if( ! $scope.data.currentRailway ) {
    return;
  }
  else {
    rwy = $scope.data.currentRailway;
    getSelectedRailwayInfo( rwy )
    .then( dfdize( setDisplayRailwayStations ) )
    .catch( error )
    ;
  }
}


function getRailwayStationsValues( rwy ) {
//alert("gRSV: "+getRailwayStationsQuery( rwy ));
  return $http.get( getRailwayStationsQuery( rwy ) );
}

function getRailwayStations( r ) {
//alert("gRS: "+JSON.stringify(r));
  return getStations( transformResponse( r ) );
}

function setRailwayStations( stations ) {
  var rwy;
  if( stations ) {
    rwy = stations[0].rail;
//alert("sRS: "+rwy+" "+JSON.stringify(stations));
    $scope.temp.railwayStations[rwy] = stations;
  }
  return stations;
}

function getStationsOfRailway( rwy ) {
//alert("gSoR: "+rwy);
  return getRailwayStationsValues( rwy )
  .then( dfdize( getRailwayStations ) )
  .then( dfdize( setRailwayStations ) )
  ;
}


function getStationTimetableValues( sta ) {
//alert("gSTtV: "+getStationTimetablesQuery( sta ));
  return $http.get( getStationTimetablesQuery( sta ) );
}

function addTimetablesToRailway( rwy ) {
  return function( tables ) {
//alert("aTttR1: "+tables.length);
    if( ! $scope.temp.railwayTimetables[rwy] ) {
      $scope.temp.railwayTimetables[rwy] = tables;
//alert("aTttR2: "+rwy);
    }
    else {
      $scope.temp.railwayTimetables[rwy] = $scope.temp.railwayTimetables[rwy].concat( tables );
    }
//alert("aTttR3: "+      $scope.temp.railwayTimetables[rwy].length);
    return tables;
  }
}

function setCurrentTimetable( tables ) {
//alert("sCTt1: "+tables.length);
    
$scope.data.currentTimetable = tables[0];
//alert("sCTt2: "+JSON.stringify($scope.data.currentTimetable.table));
  return tables;
}

function getStationTimetables( sta, rwy ) {
//alert("gSTt: "+sta+" "+rwy);
  return getStationTimetableValues( sta )
  .then( dfdize( transformResponse ) )
  .then( dfdize( getTimetables ) )
  ;
}

$scope.getTimetablesOfStation = function() {
  var sta, rwy;
  if( ! $scope.data.currentStation ) {
    return;
  }
  else {
    sta = $scope.data.currentStation;
    rwy = sta.rail;
    if( findStationTimetable( sta ).length == 0 ) {
      getStationTimetables( sta.station, rwy )
      .then( dfdize( addTimetablesToRailway( rwy ) ) )
      .then( dfdize( setCurrentTimetable ) )
      .catch( error )
      ;
    }
  }
}

function findStationTimetable( station ) {
//alert("fSTt1: "+station.station);
  var sta, rwy, tts, s, i;
  var ret = [];
  sta = station.station;
  rwy = station.rail;

  if( $scope.temp.railwayTimetables[rwy] ) {
    tts = $scope.temp.railwayTimetables[rwy];
    for( i = 0; i < tts.length; i++ ) {
      s = tts[i].station;
      s = s.substring( 0, s.lastIndexOf(".") );
//alert("fSTt2: "+tts[i].station+" "+s);
      if( sta === s ) {
        ret.push( tts[i] );
      }
    }
  }
//alert("fSTt3: "+ret.length);
  return ret;
}


function callAboutDlg() {
//alert("cAD: called");
  $( "#aboutDlg" ).modal( "show" );
}

$scope.showAboutDlg = function() {
//alert("sAD: called");
  callAboutDlg();
}


function getTrainValues() {
//alert("gTV: "+getTrainsQuery());
  return $http.get( getTrainsQuery() );
}

function filterNearTrains( station ) {
//alert("fNT1: "+station);
  return function( ts ) {
//alert("fNT2: "+JSON.stringify(ts));
    var ret = [], i, t, s;
    for( i = 0; i < ts.length; i++ ) {
      t = ts[i];
      s = "odpt.Station:" + station;
      if( t["odpt:fromStation"] === s ||  t["odpt:toStation"] === s ) {
        ret.push( t );
      }
    }
    return ret;
  }
}

function setNearTrains( trains ) {
//alert("sNT: "+JSON.stringify(trains));
  $scope.data.nearTrains = trains;
  return trains;
}

function selectFirstTrain( trains ) {
  $scope.data.currentTrain =  $scope.data.nearTrains[0];
//alert("sFT: "+JSON.stringify($scope.data.currentTrain));
  $scope.$apply();
  return trains;
}

function getNearTrains( station ) {
  var pgb = "dlg1_pgb1";
  setPBar( pgb, 0 )();
  return getTrainValues()
  .then( dfdize( setPBar( pgb, 0 ) ) )
  .then( dfdize( transformResponse ) )
  .then( dfdize( setPBar( pgb, 20 ) ) )
  .then( dfdize( filterNearTrains( station ) ) )
  .then( dfdize( setPBar( pgb, 40 ) ) )
  .then( dfdize( getTrains ) )
  .then( dfdize( setPBar( pgb, 70 ) ) )
  .then( dfdize( setNearTrains ) )
  .then( dfdize( setPBar( pgb, 90 ) ) )
  .then( dfdize( selectFirstTrain ) )
  .then( dfdize( setPBar( pgb, 100 ) ) )
  ;
}

$scope.getTrainsAtStation = function() {
//alert("gTaS: called");
  var rwy, func;
  if( ! $scope.data.currentStation ) {
    return;
  }
  else {
    rwy = $scope.data.currentStation.rail;
    if( ! $scope.temp.railwayStations[rwy] ) {
      getStationsOfRailway( rwy )
      .then( dfdize( transmitParams( $scope.data.currentStation.station ) ) )
      .then( getNearTrains )
      .catch( error )
      ;
    }
    else {
      getNearTrains( $scope.data.currentStation.station )
      .catch( error )
      ;
    }
  }
}

function filterTrackingTrains( ts ) {
//alert("fTT1: "+JSON.stringify(ts));
  var ids = [], ret = [], i, t;
  for( i = 0; i < $scope.data.trackingTrains.length; i++ ) {
    t = $scope.data.trackingTrains[i];
    ids.push( t.id );
  }
//alert("fTT2: "+JSON.stringify(ids));

  for( i = 0; i < ts.length; i++ ) {
    if( ids.indexOf( ts[i]["owl:sameAs"] ) != -1 ) {
      ret.push( ts[i] );
    }
  }
//alert("fTT3: "+JSON.stringify(ret));
  return ret;
}

function setTrackingTrains( trains ) {
//alert("sTT1: "+JSON.stringify(trains));
  var ids = [], t, i, j;
  for( i = 0; i < trains.length; i++ ) {
    ids.push( trains[i].id );
  }
//alert("sTT2: "+JSON.stringify(ids));
  for( i = 0; i < $scope.data.trackingTrains.length; i++ ) {
    j = ids.indexOf( $scope.data.trackingTrains[i].id );
//alert("sTT3: "+j);
    if( j > -1 ) {
      $scope.data.trackingTrains[i] = trains[j];
    }
  }
  $scope.$apply();
  return $scope.data.trackingTrains;
}

function removeInvalids( trains ) {
  var ret = [];
  var i, t, n;
//alert("rI: "+JSON.stringify(trains));
  if( ! $scope.pref.autoRemoveInvalids ) {
    return trains;
  }

  n = new Date();
  for( i = 0; i < trains.length; i++ ) {
    t = trains[i];
    if( t.isValid ) {
      ret.push( t );
      t.isValid = t.valid.getTime() >= n.getTime();
//alert(t.isValid);
    }
  }
  $scope.data.trackingTrains = ret;
  $scope.$apply();
  return $scope.data.trackingTrains;
}

function updateTrackingTrains() {
  var pgb = "main_pgb1";
  setPBar( pgb, 0 )();
  return getTrainValues()
  .then( dfdize( setPBar( pgb, 20 ) ) )
  .then( dfdize( transformResponse ) )
  .then( dfdize( setPBar( pgb, 40 ) ) )
  .then( dfdize( filterTrackingTrains ) )
  .then( dfdize( setPBar( pgb, 60 ) ) )
  .then( dfdize( getTrains ) )
  .then( dfdize( setPBar( pgb, 80 ) ) )
  .then( dfdize( setTrackingTrains ) )
  .then( dfdize( removeInvalids ) )
  .then( dfdize( setPBar( pgb, 100 ) ) )
  ;
}

$scope.doUpdateTrackingTrains = function() {
  if( $scope.data.trackingTrains.length >= 0 ) {
    updateTrackingTrains();
  }
}


function getTrainInfoValues() {
//alert("gTIV: "+getTrainInfoQuery());
  return $http.get( getTrainInfoQuery() );
}

function setLatestTrainInfo( tinfo ) {
//alert("sLTI: "+JSON.stringify(tinfo));
  $scope.data.latestTrainInfo = tinfo;
  return tinfo;
}

function filterDisplayInfo( tinfo ) {
//alert("fDI1: "+JSON.stringify(tinfo));
  var ret = [], i;
  for( i = 1; i < tinfo.length; i++ ) {
    if( ! tinfo[i].status ) {
      continue;
    }
    else {
      ret.push( tinfo[i] );
    }
  }
  if( ret.length == 0 ) {
    ret.push( {
      "disp_rail":"東京メトロ全",
      "disp_class":"alert-info",
      "disp_time":tinfo[0].disp_time,
      "disp_text":"現在、平常どおり運転しています。"
    } );
  }
//alert("fDI2: "+JSON.stringify(ret));
  return ret;
}

function setDisplayTrainInfo( dinfo ) {
//alert("sDTI: "+JSON.stringify(dinfo));

  if( dinfo && (dinfo.length > 1 || dinfo[0].disp_class !== "alert-info" ) ) {
    $scope.disp.showTrainInfo = $scope.pref.showTrainInfo;
  }

  $scope.disp.trainInfo = dinfo;
  $scope.$apply();
  return dinfo;
}

function getTrainInformation() {
  var pgb = "main_pgb1";
  setPBar( pgb, 0 )();
  return getTrainInfoValues()
  .then( dfdize( setPBar( pgb, 20 ) ) )
  .then( dfdize( transformResponse ) )
  .then( dfdize( setPBar( pgb, 30 ) ) )
  .then( dfdize( getTrainInfo ) )
  .then( dfdize( setPBar( pgb, 40 ) ) )
  .then( dfdize( setLatestTrainInfo ) )
  .then( dfdize( setPBar( pgb, 60 ) ) )
  .then( dfdize( filterDisplayInfo ) )
  .then( dfdize( setPBar( pgb, 80 ) ) )
  .then( dfdize( setDisplayTrainInfo ) )
  .then( dfdize( setPBar( pgb, 100 ) ) )
  ;
}

$scope.doUpdateTrainInfo = function() {
//alert("dUTI: called");
  $scope.disp.showTrainInfo = $scope.pref.showTrainInfo;
  getTrainInformation();
}

$scope.dismissTrainInfo = function( i ) {
  var v = true;

  $scope.disp.trainInfo[i].isVisible = false;

  for( i = 0; i < $scope.disp.trainInfo.length; i++ ) {
    v = v || $scope.disp.trainInfo[i].isVisible;
  }

  $scope.disp.showTrainInfo = v;
}

getTrainInformation();

itvl.trainInfo = $interval( $scope.doUpdateTrainInfo, $scope.pref.trainInfoInterval, $scope.pref.trainInfoMaxRepeats );

itvl.trackTrain = $interval( $scope.doUpdateTrackingTrains, $scope.pref.trackTrainInterval, $scope.pref.trackTrainMaxRepeats );

$scope.restartUpdate = function() {
  var m;
  m = 1000 * 60 * $scope.pref.maxUpdateMinutes;
  $scope.pref.trainInfoMaxRepeats = Math.ceil( m / $scope.pref.trainInfoInterval );
  $scope.pref.trackTrainMaxRepeats = Math.ceil( m / $scope.pref.trackTrainInterval );

//alert("rU: "+m+" train: "+$scope.pref.trainInfoMaxRepeats+" track: "+$scope.pref.trackTrainMaxRepeats);
  if( itvl.trainInfo ) {
    $interval.cancel( itvl.trainInfo );
  }
  if( itvl.trackTrain ) {
    $interval.cancel( itvl.trackTrain );
  }

  itvl.trainInfo = $interval( $scope.doUpdateTrainInfo, $scope.pref.trainInfoInterval, $scope.pref.trainInfoMaxRepeats );

  itvl.trackTrain = $interval( $scope.doUpdateTrackingTrains, $scope.pref.trackTrainInterval, $scope.pref.trackTrainMaxRepeats );
}


$scope.changeUpdateSetting = function() {
  if( $scope.pref.autoUpdateInfo ) {
    $scope.restartUpdate();
  }
  else {
    if( itvl.trainInfo ) {
      $interval.cancel( itvl.trainInfo );
    }
    if( itvl.trackTrain ) {
      $interval.cancel( itvl.trackTrain );
    }
  }
}

function callSettingDlg() {
//alert("cSD: called");
  $( "#settingDlg" ).modal( "show" );
}

$scope.showSettingDlg = function() {
//alert("sSD: called");

  if( ! itvl.trainInfo || ! itvl.trackTrain ) {
    $scope.pref.autoUpdateInfo = false;
  }

  callSettingDlg();
}


/*
  var pgb = "main_pgb1";
  setPBar( pgb, 0 )();

  .then( dfdize( setPBar( pgb, 20 ) ) )
  .then( dfdize( setPBar( pgb, 40 ) ) )
  .then( dfdize( setPBar( pgb, 60 ) ) )
  .then( dfdize( setPBar( pgb, 80 ) ) )
  .then( dfdize( setPBar( pgb, 100 ) ) )
*/



$scope.addToTrack = function() {
  if( ! $scope.data.currentTrain ) {
    return;
  }
  $scope.data.trackingTrains.push( $scope.data.currentTrain );
  $scope.$apply();
}

$scope.removeFromTrack = function( i ) {
//alert("rFT: "+JSON.stringify($scope.data.trackingTrains[i]));
  $scope.data.trackingTrains.splice( i, 1 );
  $scope.$apply();
}

$scope.test = function() {
  alert("test: called");
}

$scope.getTrainType = function( tt ) {
  return traintype[tt.substring( tt.lastIndexOf(":")+1 )];
}

$scope.getDestTitle = function( dest ) {
  return findStationTitle( $scope.data.currentRailway, dest.substring( dest.lastIndexOf(":")+1 ) ) + "行き";
}

function findStationTitle( rwy, sta ) {
//alert("fST: "+sta);
  var s = findStation( rwy, sta ), ret;

  if( ! s ) {
    ret = linkeddest[sta];
  }
  else {
    ret = s.title;
  }

  return ret;
}

function findStation( rwy, sta ) {
//alert("fS: "+sta);

  var i, s;
  var ret = null;
  var stations = $scope.temp.railwayStations[rwy];

  if( stations ) {
    for( i = 0; i < stations.length; i++ ) {
      s = stations[i].station;
      if( s === sta ) {
        ret = stations[i];
        break;
      }
    }
  }
  return ret;
}


function dfdize( func ) {
  return function( val ) {
    var deferred = $q.defer();
    var ret = func( val );
    deferred.resolve( ret );
    return deferred.promise;
  };
}

function transformResponse( res ) {
//alert("tR: "+JSON.stringify(res));
  return res.data;
}

function transformResponseArray( rs ) {
//alert("tRA: "+JSON.stringify(rs));
  var i, ret = [];
  for( i = 0; i < rs.length; i++ ) {
    ret = ret.concat( rs[i].data );
  }
//alert("tRA: "+JSON.stringify(ret));
  return ret;
}

function transmitParams( p ) {
//alert("tP: "+JSON.stringify(p));
  return function( trash ) {
    return p;
  }
}

function getStations( ss ) {
//alert("gS: "+JSON.stringify(ss));
  var i;
  var ret = [];
  for( i = 0; i < ss.length; i++ ) {
    ret.push( new DPStation( ss[i] ) );
  }
  return( ret );
}

function getRailway( rs ) {
//alert("gR: "+
//rs.length);
//JSON.stringify(rs[0]));
  var i;
  var ret = [];
  for( i = 0; i < rs.length; i++ ) {
    ret.push( new DPRailway( rs[i] ) );
  }
  return ret;
}

function getTrains( ts ) {
//alert("gT: "+JSON.stringify(ts));
  var i;
  var ret = [];
  for( i = 0; i < ts.length; i++ ) {
    ret.push( new DPTrain( ts[i] ) );
  }
//alert("gT: "+JSON.stringify(ret));
  return( ret );
}

function getTrainInfo( tis ) {
//alert("gTI: "+JSON.stringify(tis));
  var i;
  var ret = [];
  for( i = 0; i < tis.length; i++ ) {
    ret.push( new DPTrainInfo( tis[i] ) );
  }
//alert("gTI: "+JSON.stringify(ret));
  return( ret );
}

function getTimetables( tt ) {
//alert("gTT: "+JSON.stringify(tt));
  var i;
  var ret = [];
  for( i = 0; i < tt.length; i++ ) {
    ret.push( new DPTimetable( tt[i] ) );
  }
//alert("gTT: "+JSON.stringify(ret));
  return ret;
}

function getTrainTimetable( ttt ) {
//alert("gTTT: "+JSON.stringify(ttt));
  var i;
  var ret = [];
  for( i = 0; i < ttt.length; i++ ) {
    ret.push( new DPTrainTimetable( ttt[i] ) );
  }
//alert("gTTT: "+JSON.stringify(ret));
  return ret;
}

function setPBar( pgb, val ) {
  return function( p ) {
//$scope.msg = "sPB: "+val;
    $scope.disp[pgb] = val;
    $scope.$apply();
    return p;
  }
}

function notify( msg ) {
alert("Notice: "+JSON.stringify(msg));
  $scope.msg = "Notice: " + msg;
  $scope.apply();
}

function error( msg ) {
alert("Error: "+JSON.stringify(msg));
  $scope.msg = "Error: " + JSON.stringify(msg);
  $scope.apply();
}

} );
