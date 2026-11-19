/* extra categories (sports) */
(function () {
  const C = (id, pack, text, t) => ({ id, pack, text, t });
  window.KR_DATA.push(
    C('nflteam', 'sports', 'Name an NFL team', {
      p: 'cowboys|dallas cowboys;patriots|new england patriots;packers|green bay packers;steelers|pittsburgh steelers;chiefs|kansas city chiefs;49ers|san francisco 49ers|niners;eagles|philadelphia eagles;giants|new york giants;bears|chicago bears;broncos|denver broncos;raiders|las vegas raiders|oakland raiders',
      c: 'seahawks|seattle seahawks',
      s: 'ravens|baltimore ravens;bills|buffalo bills;dolphins|miami dolphins;jets|new york jets;bengals|cincinnati bengals;browns|cleveland browns;texans|houston texans;colts|indianapolis colts;jaguars|jacksonville jaguars;titans|tennessee titans;chargers|los angeles chargers|la chargers;rams|los angeles rams|la rams;cardinals|arizona cardinals;lions|detroit lions;vikings|minnesota vikings;falcons|atlanta falcons;panthers|carolina panthers;saints|new orleans saints;buccaneers|bucs|tampa bay buccaneers;commanders|washington commanders',
      r: 'washington football team;redskins|washington redskins;oilers|houston oilers;st. louis rams|st louis rams;san diego chargers;baltimore colts;los angeles raiders;phoenix cardinals;st. louis cardinals|st louis cardinals;boston patriots;houston oilers?;cleveland rams;chicago cardinals;boston yanks;dallas texans',
      d: 'frankford yellow jackets;providence steam roller;duluth eskimos;rock island independents;canton bulldogs;akron pros;decatur staleys;hammond pros;rochester jeffersons;orange tornadoes',
      k: 'tonawanda kardex'
    }),
    C('ballsport', 'sports', 'Name a sport played with a ball', {
      p: 'soccer|football;basketball;baseball;tennis;golf;volleyball;rugby;cricket;american football;hockey;table tennis|ping pong;badminton?',
      c: 'dodgeball',
      s: 'softball;water polo;handball;lacrosse;polo;bowling;billiards|pool;snooker;squash;racquetball;netball;field hockey;croquet;bocce|boules|petanque;pickleball;kickball;rounders;korfball;ultimate frisbee?;cornhole?;beach volleyball;futsal;paddle|padel;racquetball?',
      r: 'sepak takraw;pelota|basque pelota|jai alai;fives|eton fives;real tennis;rackets;shinty;hurling;gaelic football;camogie;australian rules football|aussie rules;bandy;underwater rugby;underwater hockey|octopush;tchoukball;hornussen;kin-ball|kin ball;bossaball;sepak raga?;chinlone;teqball;footvolley;pesapallo;stoolball;trapball;tamburello;pallone;calcio storico;wallball;gateball;jorkyball',
      d: 'ulama;pok ta pok;tlachtli;la soule;shrovetide football;haxey hood;kirkwall ba;mob football;cnapan;knattleikr;kemari;cuju;harpastum;episkyros;tsu chu;ballon au poing;pallapugno;pallacorda;laiska;jeu de paume;sphairomachia;vaulting?;skittles;ninepins;kolf;pall-mall|pall mall;gutterball?',
      k: 'ulama;dongerchin?;jeu de mail'
    }),
    C('tennisplayer', 'sports', 'Name a professional tennis player', {
      p: 'roger federer|federer;rafael nadal|nadal;novak djokovic|djokovic;serena williams|serena;venus williams|venus;andy murray|murray;pete sampras|sampras;andre agassi|agassi;john mcenroe|mcenroe;maria sharapova|sharapova',
      c: 'carlos alcaraz|alcaraz',
      s: 'jannik sinner|sinner;naomi osaka|osaka;coco gauff|gauff;iga swiatek|swiatek;aryna sabalenka|sabalenka;ashleigh barty|barty;martina navratilova|navratilova;chris evert|evert;steffi graf|graf;monica seles|seles;billie jean king;arthur ashe|ashe;bjorn borg|borg;jimmy connors|connors;ivan lendl|lendl;boris becker|becker;stefan edberg|edberg;lleyton hewitt|hewitt;stan wawrinka|wawrinka;marin cilic|cilic;daniil medvedev|medvedev;alexander zverev|zverev;stefanos tsitsipas|tsitsipas;nick kyrgios|kyrgios;emma raducanu|raducanu;kim clijsters|clijsters;justine henin|henin',
      r: 'rod laver|laver;ken rosewall|rosewall;margaret court|court;maureen connolly|connolly;suzanne lenglen|lenglen;helen wills moody|wills moody;fred perry|perry;don budge|budge;bill tilden|tilden;jack kramer|kramer;ilie nastase|nastase;guillermo vilas|vilas;vitas gerulaitis|gerulaitis;yannick noah|noah;mats wilander|wilander;michael chang|chang;jim courier|courier;goran ivanisevic|ivanisevic;marat safin|safin;gustavo kuerten|kuerten;juan martin del potro|del potro;kei nishikori|nishikori;li na;ana ivanovic|ivanovic;jelena jankovic|jankovic;caroline wozniacki|wozniacki;petra kvitova|kvitova;simona halep|halep;garbine muguruza|muguruza;angelique kerber|kerber;victoria azarenka|azarenka;elena rybakina|rybakina;ons jabeur|jabeur',
      d: 'gussie moran|moran;bobby riggs|riggs;pancho gonzales|gonzales;lew hoad|hoad;neale fraser|fraser;roy emerson|emerson;tony trabert|trabert;vic seixas|seixas;frank sedgman|sedgman;jaroslav drobny|drobny;sven davidson|davidson;ashley cooper|cooper;mal anderson|anderson;alex olmedo|olmedo;rosie casals|casals;evonne goolagong|goolagong;virginia wade|wade;tracy austin|austin;hana mandlikova|mandlikova;gabriela sabatini|sabatini;arantxa sanchez vicario|sanchez vicario;conchita martinez|martinez;jana novotna|novotna;mary pierce|pierce;amelie mauresmo|mauresmo',
      k: 'ellsworth vines|vines;baron gottfried von cramm|von cramm;henri cochet|cochet;rene lacoste|lacoste;jean borotra|borotra;max decugis|decugis'
    }),
    C('trackevent', 'sports', 'Name a track and field event', {
      p: '100 metres|100m|100 meters|100 meter dash|100 metre dash;200 metres|200m;400 metres|400m;800 metres|800m;1500 metres|1500m;marathon;long jump;high jump;pole vault;shot put;javelin;discus;hammer throw|hammer;hurdles|110m hurdles',
      c: 'triple jump',
      s: '5000 metres|5000m|5k;10000 metres|10000m|10k;steeplechase|3000m steeplechase;400m hurdles;110m hurdles;100m hurdles;4x100 relay|4x100m relay|4x100;4x400 relay|4x400m relay|4x400;decathlon;heptathlon;pentathlon;race walk|racewalk|20km walk|50km walk;cross country;half marathon;mile|the mile;sprint;relay;4x200 relay',
      r: 'standing long jump;standing high jump;tug of war?;weight throw;stone put;cabre toss?;ultramarathon;100km;50km;2000m steeplechase;3000 metres|3000m;two mile|2 mile;1000 metres|1000m;600 metres|600m;300 metres|300m;60 metres|60m;55 metres;60m hurdles;50 metres;distance medley relay|dmr;sprint medley relay|smr;4x800 relay|4x800;4x1500 relay|4x1500;mixed relay;shuttle hurdle relay;indoor pentathlon;octathlon',
      d: 'javelin throw;discus throw;shot;superweight throw;pole throw;stone throw;caber toss;sheaf toss;hammer?;tetrathlon;biathle;triathle;mile walk;3000m walk;5000m walk;10000m walk;30km walk;50 mile;100 mile;six-day race;24-hour run;trail running;fell running;skyrunning;mountain running',
      k: 'weight pentathlon;pole throw;decuple?'
    })
  );
  // re-run rebalance for new entries
  const L = x => (x ? x.split(';').filter(Boolean) : []);
  window.KR_DATA.slice(-4).forEach(c => {
    Object.keys(c.t).forEach(k => { c.t[k] = c.t[k].split(';').map(s => s.trim()).filter(s => s && !s.endsWith('?')).join(';'); });
  });
})();
