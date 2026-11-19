/* Krillion clone — answer sets. Each tier is a ';' list; aliases separated by '|'. */
window.KR_DATA = (function () {
  const C = (id, pack, text, t) => ({ id, pack, text, t });
  const cats = [
    // ---------- GENERAL ----------
    C('animal', 'general', "Name a living animal that's bigger or heavier than a human", {
      p: 'elephant;giraffe;hippo|hippopotamus;lion;tiger;bear|brown bear|grizzly bear;horse;cow;whale|blue whale;rhino|rhinoceros;polar bear',
      c: 'great white shark|great white',
      s: 'moose;bison;camel;gorilla;ostrich;zebra;buffalo|water buffalo;crocodile;orca|killer whale;walrus;dolphin|bottlenose dolphin;pig;donkey;elk;llama;red deer;cattle|ox',
      r: 'tapir;wildebeest|gnu;yak;musk ox;manatee;sea lion;elephant seal;komodo dragon;leatherback turtle;sperm whale;humpback whale;hammerhead shark;tiger shark;saltwater crocodile;nile crocodile;american alligator;gaur;eland;sable antelope',
      d: 'banteng;nilgai;sambar;bongo;sitatunga;takin;ocean sunfish|mola mola;whale shark;basking shark;greenland shark;giant squid;goliath grouper;beluga sturgeon;kouprey',
      k: 'colossal squid'
    }),
    C('fictionalplace', 'general', 'Name a named fictional place from Star Wars (canon), Lord of the Rings (Tolkien’s writings), Fortnite, SpongeBob, or a Disney/Pixar movie', {
      p: 'tatooine;mordor;hogwarts;bikini bottom;the shire|shire;rivendell;gondor;hoth;naboo;endor;pride rock;agrabah;arendelle',
      c: 'rohan;isengard;mos eisley',
      s: 'minas tirith;mount doom;bag end;moria;lothlorien;helms deep;coruscant;dagobah;alderaan;kamino;mustafar;jakku;krusty krab;chum bucket;rock bottom;tilted towers;pleasant park;monstropolis;andy’s room|andys room;toy story land;neverland;wonderland;atlantica;corona;zootopia;radiator springs;paradise falls;santa carla;tortuga',
      r: 'edoras;fangorn;osgiliath;minas morgul;weathertop;bree;crickhollow;dol guldur;kashyyyk;bespin;scarif;geonosis;utapau;yavin 4|yavin;lothal;sandy’s treehouse|sandys treehouse;goo lagoon;jellyfish fields;weenie hut jr;shady shoals;salty spitoon;greasy gopher;retail row;loot lake;salty springs;anarchy acres;tomato town;dusty depot',
      d: 'dol amroth;barad-dur|barad dur;cirith ungol;utumno;fornost;carn dum;erebor;mandalore;ahch-to|ahch to;exegol;ilum;mortis;dathomir;umbara;mon cala;felucia;kyber temple;flotsam;sandy beach;rock-a-bye bivalve;thug tug;lazy links;polar peaks;dirty dig;tumbledown;zeitgeist',
      k: 'amon hen;ord mantell;cave of wonders'
    }),
    C('peeloff', 'general', 'Name something designed to stick to your skin that you peel off later', {
      p: 'band-aid|bandaid|band aid;bandage|plaster;sticker;tape;temporary tattoo|tattoo;nicotine patch;face mask|peel off mask',
      c: 'sunscreen',
      s: 'wax strip|waxing strip;nose strip|pore strip;medical tape;kinesiology tape|kt tape;press-on nails|press on nails;false eyelashes|fake eyelashes;patch;heat patch;sticky tape;adhesive strip;blister plaster;eyelash strip;hydrocolloid patch|pimple patch;mole skin|moleskin;gel nail wrap;nail sticker;transdermal patch;sticky pad;decal',
      r: 'duct tape;athletic tape;electrodes;ecg electrode;ecg sticker;glucose monitor;insulin patch;lidocaine patch;scar sheet;silicone scar sheet;body glitter tattoo;rhinestone sticker;temporary nail art;eye patch;under eye patch|eye mask;compression patch;compeed;heart monitor patch;surgical tape;steri-strip|steristrip',
      d: 'zinc oxide tape;rock tape;tegaderm;ostomy wafer;spirit gum;cupping dots;adhesive bra;nipple covers;fashion tape;toupee tape;sticky bra',
      k: 'mole fleece'
    }),
    C('director', 'general', 'Name someone who directed a movie with at least 1,000 votes on IMDb', {
      p: 'steven spielberg|spielberg;christopher nolan|nolan;quentin tarantino|tarantino;martin scorsese|scorsese;james cameron|cameron;stanley kubrick|kubrick;tim burton;ridley scott;peter jackson;george lucas',
      c: 'wes anderson;denis villeneuve;greta gerwig',
      s: 'david fincher;coen brothers|joel coen|ethan coen;guillermo del toro;jordan peele;sofia coppola;francis ford coppola|coppola;alfred hitchcock|hitchcock;clint eastwood;spike lee;ron howard;sam raimi;zack snyder;michael bay;rob reiner;edgar wright;taika waititi;bong joon-ho|bong joon ho;hayao miyazaki;akira kurosawa;robert zemeckis;danny boyle;ang lee;barry jenkins;ryan coogler;pedro almodovar;lars von trier;paul thomas anderson;darren aronofsky;sam mendes;richard linklater;kathryn bigelow;mel gibson;john carpenter;wes craven',
      r: 'jean-pierre jeunet|jeunet;park chan-wook|park chan wook;nicolas winding refn;yorgos lanthimos;ari aster;robert eggers;celine sciamma;agnes varda;jacques tati;satyajit ray;mira nair;alfonso cuaron;alejandro gonzalez inarritu|inarritu;chloe zhao;lulu wang;david lynch;terrence malick;ken loach;mike leigh;andrei tarkovsky;sergio leone;lina wertmuller;paul verhoeven;terry gilliam',
      d: 'apichatpong weerasethakul;bela tarr;hirokazu kore-eda|kore-eda;edward yang;abbas kiarostami;jafar panahi;nuri bilge ceylan;lucrecia martel;ousmane sembene;souleymane cisse;jia zhangke;hong sang-soo|hong sang soo;lav diaz;wang bing;claire denis;chantal akerman;kelly reichardt',
      k: 'miguel gomes'
    }),
    C('permission', 'general', 'Name something an app can ask permission to access on your phone', {
      p: 'camera;microphone|mic;location|gps;contacts;photos|gallery;notifications',
      c: 'storage',
      s: 'bluetooth;calendar;files;phone|phone calls;sms|messages|text messages;wifi;face id|facial recognition;fingerprint|touch id;health data|health;motion|motion sensors;reminders;music|media library;clipboard;background refresh;call log;local network',
      r: 'speech recognition;nfc;accessibility;usage stats|usage access;tracking|app tracking;do not disturb;battery optimization|battery;vibration;flashlight|torch;overlay|display over other apps;screen recording;home screen widgets;siri;apple music;nearby devices;physical activity;body sensors',
      d: 'hand tracking;eye tracking;install unknown apps;device admin;notification access|notification listener;vpn;exact alarms;wake lock;ultra wideband|uwb;focus status;critical alerts;siri and search;carplay',
      k: 'ambient light sensor'
    }),
    C('soccercountry', 'general', "Name a country where soccer isn't the most watched sport", {
      p: 'usa|united states|america|us;india;canada;australia;japan;china',
      c: 'new zealand',
      s: 'pakistan;bangladesh;sri lanka;south korea;taiwan;ireland;philippines;lithuania;latvia;finland;czech republic|czechia;slovakia;cuba;dominican republic;venezuela;puerto rico;afghanistan;',
      r: 'nepal;samoa;tonga;fiji;;latvia;;;;;;;bhutan;;;;;;;',
      d: 'tuvalu;kiribati;cook islands;niue;papua new guinea;mauritius;barbados;antigua and barbuda;grenada;st lucia|saint lucia;st kitts and nevis;dominica;nauru;palau',
      k: 'tokelau'
    }),
    C('tvshow', 'general', 'Name a TV show with at least five seasons (listed on IMDb)', {
      p: 'friends;the simpsons|simpsons;game of thrones;breaking bad;the office|office;the walking dead|walking dead;stranger things;south park;family guy;supernatural;grey’s anatomy|greys anatomy',
      c: 'the wire;mad men',
      s: 'seinfeld;how i met your mother;big bang theory|the big bang theory;modern family;the sopranos|sopranos;lost;house|house md;buffy the vampire slayer|buffy;the x-files|x-files;parks and recreation;brooklyn nine-nine;community;cheers;frasier;scrubs;24;dexter;suits;glee;one tree hill;gossip girl;american horror story;the flash;arrow;riverdale;bob’s burgers|bobs burgers;rick and morty;spongebob squarepants|spongebob;adventure time;doctor who;sherlock;peaky blinders;the crown;ozark',
      r: 'frasier;stargate sg-1|stargate sg1;farscape;babylon 5;deep space nine|star trek deep space nine;monk;psych;burn notice;white collar;royal pains;eureka;warehouse 13;haven;being human;skins;misfits;shameless;downton abbey;call the midwife;line of duty;midsomer murders;heartbeat;taggart;only fools and horses;father ted;the thick of it;peep show',
      d: 'degrassi;mr belvedere;the golden girls;night court;the commish;silk stalkings;diagnosis murder;jake and the fatman;matlock;rosewood;the pretender;sliders;quantum leap;seaquest dsv;earth 2;felicity;popular;veronica mars;dawson’s creek|dawsons creek;everwood',
      k: 'the adventures of pete and pete'
    }),
    C('fruit', 'general', 'Name a fruit', {
      p: 'apple;banana;orange;strawberry;grape|grapes;pear;peach;pineapple;watermelon;mango;cherry;lemon;blueberry|blueberries',
      c: 'dragon fruit|dragonfruit;persimmon',
      s: 'kiwi;plum;apricot;lime;coconut;papaya;raspberry|raspberries;blackberry|blackberries;cranberry|cranberries;pomegranate;fig;grapefruit;melon|cantaloupe|honeydew;nectarine;guava;passion fruit|passionfruit;lychee|litchi;tangerine|mandarin|clementine;avocado;date;cantaloupe',
      r: 'starfruit|carambola;jackfruit;durian;rambutan;mangosteen;quince;gooseberry|gooseberries;elderberry|elderberries;mulberry|mulberries;kumquat;pomelo;tamarind;soursop;custard apple|cherimoya;loquat;boysenberry;loganberry;currant|blackcurrant|redcurrant;medlar;sapodilla;longan;breadfruit;ackee;salak|snake fruit;bilberry;huckleberry',
      d: 'jabuticaba;cupuacu;santol;langsat;sugar apple|sweetsop;feijoa|pineapple guava;pawpaw;jujube;miracle fruit;mamey|mamey sapote;black sapote;white sapote;ugli fruit;yuzu;buddha’s hand|buddhas hand;finger lime;salmonberry;cloudberry;lingonberry;rowan|rowanberry;sloe;damson;hawthorn|haw;barbados cherry|acerola;cashew apple;nance;pitaya;santol;bael',
      k: 'marang'
    }),
    C('instrument', 'general', 'Name a musical instrument', {
      p: 'guitar;piano;drums|drum;violin;flute;trumpet;saxophone|sax;cello;harp;clarinet;trombone;bass guitar|bass;ukulele',
      c: 'theremin;didgeridoo',
      s: 'tuba;oboe;bassoon;xylophone;banjo;mandolin;accordion;harmonica;french horn|horn;double bass;viola;triangle;tambourine;cymbals|cymbal;bagpipes|bagpipe;organ;synthesizer|synth;recorder;piccolo;glockenspiel;marimba;bongos|bongo;maracas;sitar;harpsichord;castanets;kazoo;cowbell;steel drum|steel pan|steelpan;conga|congas',
      r: 'ocarina;lute;zither;hurdy-gurdy|hurdy gurdy;dulcimer;lyre;panpipes|pan flute|pan pipes;kalimba|mbira|thumb piano;djembe;tabla;shamisen;koto;erhu;pipa;oud;bouzouki;balalaika;cimbalom;sousaphone;euphonium;flugelhorn;cornet;english horn|cor anglais;contrabassoon;celesta;vibraphone;tubular bells|chimes;melodica;concertina;bandoneon;charango;cuatro;santoor;duduk;gamelan;kora;ney',
      d: 'glass harmonica|armonica;ondes martenot;serpent;crumhorn;sackbut;viol|viola da gamba;theorbo;nyckelharpa;hardanger fiddle;talharpa;cittern;vielle;rebec;shawm;sarrusophone;ophicleide;heckelphone;stroh violin;waterphone;hang drum|hang;handpan;cristal baschet;sheng;guzheng;yangqin;morin khuur|horsehead fiddle;tanpura;veena;sarod;rubab',
      k: 'bazantar'
    }),
    C('element', 'general', 'Name a chemical element', {
      p: 'hydrogen;oxygen;carbon;gold;silver;iron;helium;nitrogen;sodium;calcium;uranium;copper;lead;mercury',
      c: 'unobtainium?',
      s: 'zinc;tin;aluminium|aluminum;chlorine;neon;argon;potassium;magnesium;silicon;phosphorus;sulfur|sulphur;nickel;platinum;lithium;titanium;cobalt;chromium;fluorine;iodine;bromine;plutonium;radium;arsenic;boron;krypton;xenon;tungsten;uranium',
      r: 'manganese;beryllium;vanadium;gallium;germanium;selenium;strontium;zirconium;molybdenum;palladium;cadmium;antimony;tellurium;barium;cesium|caesium;rubidium;bismuth;polonium;radon;francium;thorium;osmium;iridium;rhodium;ruthenium;tantalum;niobium;scandium;yttrium;indium;thallium;hafnium;rhenium',
      d: 'lanthanum;cerium;praseodymium;neodymium;samarium;europium;gadolinium;terbium;dysprosium;holmium;erbium;thulium;ytterbium;lutetium;technetium;promethium;astatine;actinium;protactinium;neptunium;americium;curium;berkelium;californium;einsteinium;fermium;mendelevium;nobelium;lawrencium',
      k: 'rutherfordium;seaborgium;bohrium;hassium;meitnerium;darmstadtium;roentgenium;copernicium;nihonium;flerovium;moscovium;livermorium;tennessine;oganesson'
    }),
    C('boardgame', 'general', 'Name a board game', {
      p: 'monopoly;chess;scrabble;clue|cluedo;risk;checkers|draughts;sorry;battleship;connect four|connect 4;life|the game of life;trivial pursuit;jenga;candy land;uno?',
      c: 'catan|settlers of catan',
      s: 'ticket to ride;carcassonne;pandemic;codenames;dixit;azul;splendor;go;backgammon;mancala;othello|reversi;stratego;operation;mouse trap;guess who;twister;yahtzee;boggle;taboo;pictionary;cranium;sequence;mastermind;parcheesi|ludo;chutes and ladders|snakes and ladders;dominoes;kerplunk;hungry hungry hippos;cards against humanity;apples to apples;exploding kittens;dungeons & dragons|dungeons and dragons',
      r: 'terraforming mars;gloomhaven;wingspan;scythe;agricola;puerto rico;7 wonders|seven wonders;dominion;small world;betrayal at house on the hill;twilight struggle;root;spirit island;everdell;brass birmingham|brass;cascadia;kingdomino;sagrada;patchwork;hive;santorini;onitama;tzolkin;concordia;through the ages;food chain magnate;pandemic legacy;arkham horror;mansions of madness;eldritch horror;war of the ring',
      d: 'pente;tak;lines of action;yinsh;gipf;blokus;quoridor;abalone;hex;havannah;shogi;xiangqi|chinese chess;nine men’s morris|nine mens morris;fox and geese;tafl|hnefatafl;senet;royal game of ur|ur;patolli;pachisi;mu torere;konane;bao;oware|oware;yote',
      k: 'tablut'
    }),
    C('dog', 'general', 'Name a dog breed', {
      p: 'labrador|labrador retriever;golden retriever;german shepherd;bulldog;poodle;beagle;chihuahua;pug;husky|siberian husky;rottweiler;dachshund;corgi|pembroke welsh corgi',
      c: 'shiba inu',
      s: 'boxer;great dane;doberman|doberman pinscher;yorkshire terrier|yorkie;shih tzu;pomeranian;border collie;cocker spaniel;australian shepherd;maltese;bernese mountain dog;saint bernard|st bernard;dalmatian;greyhound;whippet;basset hound;bloodhound;akita;samoyed;pit bull|pitbull;french bulldog|frenchie;jack russell terrier|jack russell;cavalier king charles spaniel;havanese;weimaraner;vizsla;newfoundland;mastiff;collie',
      r: 'affenpinscher;basenji;borzoi;bichon frise;brittany;chow chow;papillon;pekingese;pointer;saluki;schnauzer;scottish terrier|scottie;shar pei|shar-pei;staffordshire bull terrier;tibetan mastiff;airedale terrier;australian cattle dog|blue heeler;bull terrier;cairn terrier;irish setter;irish wolfhound;keeshond;lhasa apso;norwich terrier;old english sheepdog;rhodesian ridgeback;west highland white terrier|westie;xoloitzcuintli|xolo;kooikerhondje',
      d: 'azawakh;bergamasco;catahoula leopard dog;cirneco dell’etna|cirneco dell etna;lagotto romagnolo;lundehund|norwegian lundehund;mudi;otterhound;peruvian inca orchid;pumi;sloughi;spinone italiano;stabyhoun;tosa;treeing walker coonhound;swedish vallhund;podenco;kromfohrlander;kuvasz;komondor;puli;leonberger;cesky terrier;black russian terrier',
      k: 'harrier'
    }),
    C('language', 'general', 'Name a programming language', {
      p: 'python;javascript|js;java;c++|cpp;c;c#|csharp|c sharp;html;php;ruby;swift;go;rust;sql',
      c: 'scratch',
      s: 'typescript;kotlin;perl;r;matlab;lua;haskell;scala;dart;objective-c|objective c;bash;shell;assembly;fortran;cobol;pascal;lisp;prolog;visual basic|vb;basic;julia;elixir;erlang;clojure;groovy;f#|fsharp;ocaml;racket;scheme;css',
      r: 'ada;apl;forth;smalltalk;crystal;nim;zig;d;elm;purescript;coq;idris;agda;tcl;awk;sed;vhdl;verilog;abap;powershell;delphi;logo;simula;algol;snobol;rexx;io;eiffel;hack;solidity;mojo;vala;pony;red;rebol;brainfuck|brainf**k;befunge;whitespace;malbolge;chef;shakespeare;lolcode;piet',
      d: 'j;k;q;kdb+;factor;joy;cat;oz;mercury;curry;clean;miranda;hope;sisal;jovial;pl/i|pl1;bcpl;b;chapel;x10;fortress;occam;sather;self;newspeak;pike;wren;icon;unicon;unlambda;intercal;ook!;ook;arnoldc',
      k: 'plankalkul'
    }),
    C('greekgod', 'general', 'Name a Greek god, goddess, or titan', {
      p: 'zeus;hera;poseidon;athena;apollo;artemis;aphrodite;ares;hermes;hades;dionysus;demeter;hephaestus;persephone',
      c: 'hestia;kronos|cronus',
      s: 'eros;pan;nike;hecate;hypnos;thanatos;nemesis;iris;helios;selene;eos;gaia;uranus|ouranos;rhea;atlas;prometheus;epimetheus;hyperion;oceanus;themis;mnemosyne;tyche;morpheus;asclepius;hebe;triton;nyx;erebus;tartarus;chaos;coeus;crius|krios;iapetus;phoebe;tethys;theia;metis',
      r: 'eris;enyo;phobos;deimos;harmonia;hymenaios;eileithyia;ganymede;aeolus;boreas;zephyrus|zephyr;notus;eurus;aether;hemera;moros;ker;nereus;proteus;amphitrite;thetis;glaucus;leucothea;palaemon;pontus;thaumas;phorcys;ceto;eurybia;astraeus;pallas;perses;leto;dione;maia;electra;asteria;styx;lethe;hecatoncheires|hecatonchires;cottus;briareus;gyges',
      d: 'achlys;algea;ananke;apate;horkos;geras;oizys;momus;philotes;eris;hybris;limos;ponos;lyssa;nike;kratos;bia;zelus;kratos;stygia;adrasteia;aristaeus;bacchus?;comus;hecate;hygieia;iaso;panacea;aceso;telesphorus;eirene;eunomia;dike;pheme;aidos;elpis;eleos;horae;moirai;fates?',
      k: 'tyche?;aergia;aphaea'
    }),
    C('bone', 'general', 'Name a bone in the human body', {
      p: 'skull;femur;rib|ribs;spine|vertebra|vertebrae;pelvis;humerus;tibia;fibula;radius;ulna;clavicle|collarbone;sternum|breastbone',
      c: 'funny bone',
      s: 'scapula|shoulder blade;patella|kneecap;mandible|jawbone|jaw;coccyx|tailbone;sacrum;skull;carpals;metacarpals;phalanges;tarsals;metatarsals;calcaneus|heel bone;talus;maxilla;cranium;hip bone|ilium;ischium;pubis;hyoid;stapes|stirrup;incus|anvil;malleus|hammer;atlas;axis;scaphoid;lunate;zygomatic|cheekbone',
      r: 'triquetrum;pisiform;trapezium;trapezoid;capitate;hamate;cuboid;navicular;cuneiform;sphenoid;ethmoid;vomer;temporal;parietal;frontal;occipital;nasal;lacrimal;palatine;inferior nasal concha;manubrium;xiphoid process|xiphoid;sesamoid;thoracic vertebrae;lumbar vertebrae;cervical vertebrae;true ribs;false ribs;floating ribs;costal cartilage?',
      d: 'medial cuneiform;intermediate cuneiform;lateral cuneiform;os trigonum;os naviculare;styloid process;mastoid process;greater trochanter;lesser trochanter;ilium wing;iliac crest;acetabulum;olecranon;coronoid process;glenoid cavity;acromion;coracoid process',
      k: 'os acromiale'
    }),
    C('cheese', 'general', 'Name a type of cheese', {
      p: 'cheddar;mozzarella;parmesan|parmigiano reggiano;brie;swiss;gouda;feta;blue cheese|bleu cheese;cream cheese;cottage cheese;american cheese;provolone',
      c: 'halloumi',
      s: 'gruyere;camembert;gorgonzola;roquefort;edam;havarti;monterey jack;pepper jack;colby;ricotta;mascarpone;manchego;pecorino|pecorino romano;emmental|emmenthal;stilton;muenster|munster;asiago;fontina;goat cheese|chevre;paneer;burrata;jarlsberg;limburger;raclette;wensleydale;red leicester;double gloucester;cheshire;string cheese;queso fresco;cotija;oaxaca',
      r: 'taleggio;epoisses;comte;beaufort;reblochon;morbier;cantal;mimolette;ossau-iraty|ossau iraty;saint-nectaire;boursin;neufchatel;quark;labneh;kefalotyri;graviera;kasseri;mizithra;idiazabal;cabrales;tetilla;mahon;torta del casar;grana padano;caciocavallo;scamorza;stracciatella;robiola;castelmagno;montasio;bel paese;appenzeller;tete de moine;sbrinz;vacherin;tilsit;cambozola;harzer;handkase;gjetost|brunost;vasterbotten;leyden;maasdam;boerenkaas;caerphilly;lancashire;derby;shropshire blue;cornish yarg|yarg;stinking bishop;dubliner;cashel blue;gubbeen;durrus',
      d: 'casu marzu;cabrales;vieux boulogne;milbenkase;olomouc quargel|quargel;bryndza;oscypek;parenica;korbacky;liptauer;pule;mish;sap sago;queijo da serra;serra da estrela;stilton white;mont d’or|mont dor;banon;rocamadour;pelardon;picodon;valencay;selles-sur-cher;crottin de chavignol;chabichou du poitou',
      k: 'pule?;mihaliç;mihalic'
    }),
    C('pasta', 'general', 'Name a pasta shape', {
      p: 'spaghetti;penne;macaroni;lasagna|lasagne;fettuccine|fettuccini;ravioli;linguine;rigatoni;fusilli;tortellini;farfalle|bow tie',
      c: 'angel hair|capellini',
      s: 'orzo;rotini;ziti;cannelloni;tagliatelle;pappardelle;gnocchi;orecchiette;cavatappi;conchiglie|shells;ditalini;manicotti;bucatini;vermicelli;radiatori;gemelli;campanelle;paccheri;stelline;tortelloni;agnolotti;cavatelli;trofie;strozzapreti;casarecce;mafalde;anelli;fideo;tagliolini;mezzelune;calamarata;maltagliati',
      r: 'pici;bigoli;busiate;fregola;foglie d’ulivo|foglie d ulivo;lumache;lumaconi;mostaccioli;pastina;pansotti;quadrucci;rotelle;sagne;scialatielli;spaghettoni;tripoline;corzetti;croxetti;garganelli;lagane;maccheroni alla chitarra|tonnarelli;passatelli;pizzoccheri;spatzle;testaroli;ziti tagliati;capunti;chifferi;creste di gallo;fileja;fusilli bucati;lorighittas;malloreddus|gnocchetti sardi;sorprese;tortiglioni;trenette',
      d: 'agnolini;anolini;cappelletti;caramelle;cjarsons|cjalsons;culurgiones;fainelle;filindeu;maltagliati;orecchiette;paparelle;pillus;pizzoccheri;sorprese;strangozzi;umbricelli;urbinati;vesuvio;cencioni;chicche;dischi volanti;tofarelle;ricciolini',
      k: 'cappelli del prete'
    }),
    C('tree', 'general', 'Name a type of tree', {
      p: 'oak;maple;pine;birch;willow;palm|palm tree;elm;cedar;redwood;apple tree;cherry tree;fir;spruce',
      c: 'sequoia',
      s: 'ash;beech;poplar;cypress;eucalyptus|gum tree;hickory;walnut;chestnut;magnolia;dogwood;sycamore;aspen;hemlock;juniper;mahogany;teak;bamboo?;baobab;banyan;holly;hawthorn;hazel;alder;linden|lime tree;mulberry;olive;orange tree;lemon tree;fig tree;pecan;larch;yew;cottonwood;locust;mesquite;acacia',
      r: 'hornbeam;rowan|mountain ash;horse chestnut|conker tree;tulip tree|tuliptree;sweetgum;sassafras;sourwood;persimmon;paulownia;catalpa;ginkgo;monkey puzzle|araucaria;joshua tree;dragon tree;jacaranda;flame tree|royal poinciana;kapok;ceiba;mangrove;cork oak;holm oak;sessile oak;black walnut;butternut;buckeye;serviceberry|juneberry;pawpaw;redbud;sumac;box elder;tamarack;bald cypress;sitka spruce;douglas fir;ponderosa pine;bristlecone pine',
      d: 'wollemi pine;kauri;rimu;totara;pohutukawa;rata;ironwood;lignum vitae;ebony;rosewood;balsa;ipe;purpleheart;bubinga;wenge;zebrawood;padauk;sapele;iroko;meranti;merbau;jarrah;karri;blackbutt;tuart;marri;wandoo;sheoak|she-oak;bunya pine;hoop pine',
      k: 'dragon’s blood tree|dragons blood tree|socotra dragon tree'
    }),
    C('currency', 'general', 'Name a currency', {
      p: 'dollar|us dollar|usd;euro|eur;pound|british pound|pound sterling|gbp;yen|japanese yen|jpy;peso;rupee;franc;yuan|renminbi|rmb;ruble|rouble;krone',
      c: 'bitcoin',
      s: 'won;real;rand;dinar;dirham;lira;shekel;baht;ringgit;rupiah;zloty;forint;koruna;krona;kroner;canadian dollar;australian dollar;swiss franc;lev;leu;hryvnia;tenge;taka;dong;kwacha;naira;cedi;shilling;birr;riyal;rial;ethereum;dogecoin;litecoin',
      r: 'kip;kyat;riel;tugrik|togrog;som;somoni;manat;lari;dram;lek;denar;kuna;mark|deutsche mark;punt;drachma;escudo;peseta;lira;schilling;guilder;markka;tolar;kroon;lats;litas;pataca;pula;lilangeni;loti;ariary;gourde;quetzal;lempira;cordoba;colon;balboa;sucre;inti;boliviano;guarani;bolivar;sol|nuevo sol',
      d: 'ngultrum;pa’anga|paanga;vatu;tala;kina;talanta;rufiyaa;afghani;nakfa;dalasi;leone;ouguiya;birr;metical;kwanza;zaire;ugandan shilling;tanzanian shilling;malagasy ariary;seychellois rupee;comorian franc;djibouti franc;cfa franc|cfa;cfp franc|cfp;eastern caribbean dollar|ec dollar;bermudian dollar',
      k: 'stone money|rai stones|rai stone|yap stone'
    }),
    C('myth', 'general', 'Name a mythological creature', {
      p: 'dragon;unicorn;mermaid;phoenix;centaur;minotaur;pegasus;griffin|gryphon;vampire;werewolf;fairy;gnome',
      c: 'bigfoot|sasquatch;loch ness monster|nessie',
      s: 'cyclops;medusa;hydra;kraken;siren;satyr|faun;sphinx;chimera;cerberus;banshee;leprechaun;troll;ogre;goblin;elf;dwarf;zombie;ghost;yeti;basilisk;harpy;golem;kelpie;selkie;wendigo;kitsune;thunderbird;chupacabra;mothman;cockatrice;wyvern;giant;djinn|genie;imp;ghoul;gargoyle;lich;orc;pixie;sprite;nymph;naga',
      r: 'tengu;oni;kappa;tanuki;yokai;jorogumo;nue;baku;nuckelavee;each-uisge|each uisge;boggart;brownie;puca|pooka;changeling;dullahan;bean sidhe;selkie;merrow;fomorian;fir bolg;aos si;sidhe;draugr;nokken|nixie;huldra;fenrir;jormungandr;sleipnir;ratatoskr;nidhogg;hugin;munin;valkyrie;norn;jotun;dvergr;alfar;fossegrim;nisse|tomte;grendel;lamia;empusa;gorgon;stymphalian birds;nemean lion;ladon;scylla;charybdis;echidna;typhon;python;argus;talos',
      d: 'baku;bakeneko;nekomata;kuchisake-onna;noppera-bo;rokurokubi;tsuchinoko;yamata no orochi;ushi-oni;nure-onna;azeban;wechuge;skinwalker;adlet;qalupalik;ahuizotl;cadejo;la llorona;el silbon;nahual;camazotz;quetzalcoatl;tlaloc;xolotl;chaneque;alux;aluxob;ekeko;pishtaco;sachamama;yacumama;curupira;boitata;iara;saci;mapinguari',
      k: 'ushi-oni?;aigamuxa;adze;impundulu;tikoloshe;grootslang;mokele-mbembe;mngwa;nandi bear;ninki nanka;popobawa;abada;mmoatia;sasabonsam;asanbosam;obayifo'
    }),
    C('dinosaur', 'general', 'Name a dinosaur', {
      p: 'tyrannosaurus rex|t-rex|t rex|trex|tyrannosaurus;velociraptor|raptor;triceratops;stegosaurus;brontosaurus;diplodocus;brachiosaurus;pterodactyl?;spinosaurus;ankylosaurus;allosaurus',
      c: 'apatosaurus',
      s: 'iguanodon;parasaurolophus;pachycephalosaurus;compsognathus;gallimimus;dilophosaurus;carnotaurus;giganotosaurus;archaeopteryx;deinonychus;utahraptor;oviraptor;protoceratops;microraptor;troodon;maiasaura;hadrosaurus;edmontosaurus;argentinosaurus;ceratosaurus;megalosaurus;baryonyx;therizinosaurus;coelophysis;plateosaurus;styracosaurus;centrosaurus;kentrosaurus;corythosaurus;lambeosaurus;albertosaurus;gorgosaurus',
      r: 'ouranosaurus;suchomimus;irritator;concavenator;acrocanthosaurus;carcharodontosaurus;mapusaurus;australovenator;megaraptor;yutyrannus;dilong;guanlong;sinosauropteryx;caudipteryx;beipiaosaurus;mei long;anchiornis;velociraptor mongoliensis;saurornitholestes;bambiraptor;zhenyuanlong;nothronychus;falcarius;segnosaurus;deltadromeus;masiakasaurus;majungasaurus;rajasaurus;abelisaurus;aucasaurus;skorpiovenator;ekrixinatosaurus;noasaurus;limusaurus',
      d: 'abrictosaurus;adasaurus;agilisaurus;alioramus;alxasaurus;amargasaurus;anzu;aragosaurus;aralosaurus;atrociraptor;austroraptor;avimimus;bagaceratops;barapasaurus;bonitasaura;borealopelta;brachylophosaurus;camarasaurus;camptosaurus;cedarosaurus;ceratonykus;chasmosaurus;chilesaurus;citipati;cryolophosaurus;daspletosaurus;datousaurus;diabloceratops;dracorex;dreadnoughtus;dracovenator;dryosaurus;elaphrosaurus;eotyrannus;epidexipteryx',
      k: 'nqwebasaurus'
    }),
    C('painter', 'general', 'Name a famous painter', {
      p: 'leonardo da vinci|da vinci;pablo picasso|picasso;vincent van gogh|van gogh;claude monet|monet;michelangelo;rembrandt;salvador dali|dali;andy warhol|warhol;frida kahlo|kahlo;jackson pollock|pollock;edvard munch|munch',
      c: 'banksy',
      s: 'raphael;botticelli;caravaggio;titian;jan vermeer|vermeer;rubens;goya;el greco;velazquez;edouard manet|manet;pierre-auguste renoir|renoir;edgar degas|degas;paul cezanne|cezanne;paul gauguin|gauguin;henri matisse|matisse;georges seurat|seurat;gustav klimt|klimt;wassily kandinsky|kandinsky;piet mondrian|mondrian;rene magritte|magritte;joan miro|miro;marc chagall|chagall;georgia o’keeffe|georgia okeeffe|okeeffe;edward hopper|hopper;mark rothko|rothko;roy lichtenstein|lichtenstein;jean-michel basquiat|basquiat;paul klee|klee;j.m.w. turner|turner|jmw turner;john constable|constable;hokusai;hieronymus bosch|bosch;pieter bruegel|bruegel',
      r: 'artemisia gentileschi|gentileschi;sofonisba anguissola;caspar david friedrich;eugene delacroix|delacroix;theodore gericault|gericault;jacques-louis david|david;ingres;gustave courbet|courbet;camille pissarro|pissarro;alfred sisley|sisley;berthe morisot|morisot;mary cassatt|cassatt;henri rousseau;henri de toulouse-lautrec|toulouse-lautrec;egon schiele|schiele;oskar kokoschka|kokoschka;franz marc;max ernst;giorgio de chirico|de chirico;amedeo modigliani|modigliani;fernand leger|leger;juan gris;georges braque|braque;francis bacon;lucian freud;david hockney|hockney;gerhard richter|richter;anselm kiefer|kiefer;yayoi kusama|kusama;takashi murakami|murakami;kehinde wiley|wiley',
      d: 'hilma af klint;remedios varo;leonora carrington;paula modersohn-becker;gabriele munter|munter;lavinia fontana;rosalba carriera;elisabeth vigee le brun|vigee le brun;angelica kauffman;judith leyster;rachel ruysch;clara peeters;maria sibylla merian;jean-etienne liotard|liotard;ferdinand hodler;akseli gallen-kallela;vilhelm hammershoi|hammershoi;anders zorn;carl larsson;albert edelfelt;ilya repin|repin;ivan shishkin|shishkin;ivan aivazovsky|aivazovsky;isaac levitan|levitan',
      k: 'gluck?;wilhelm sasnal;wojciech weiss'
    }),
    C('spice', 'general', 'Name a spice or herb', {
      p: 'salt?;pepper|black pepper;cinnamon;basil;oregano;parsley;thyme;rosemary;garlic?;paprika;cumin;ginger;mint;sage;nutmeg;cloves|clove;vanilla',
      c: 'saffron',
      s: 'turmeric;coriander|cilantro;dill;chives;bay leaf|bay leaves;cardamom;cayenne|cayenne pepper;chili powder|chilli powder;curry powder;fennel;mustard seed|mustard;allspice;star anise|anise;tarragon;marjoram;lavender;lemongrass;fenugreek;sumac;caraway;juniper berries|juniper;poppy seed|poppy seeds;sesame seed|sesame seeds;nigella|black cumin;chervil;lovage;savory;wasabi;horseradish',
      r: 'asafoetida|hing;galangal;grains of paradise;long pepper;cubeb;sichuan pepper|szechuan pepper|sichuan peppercorn;mace;annatto|achiote;epazote;za’atar|zaatar;mahleb;mastic;amchur|amchoor;ajwain|carom;kokum;curry leaf|curry leaves;kaffir lime leaf|makrut lime leaf;pandan;shiso;perilla;lemon balm;lemon verbena;hyssop;borage;sorrel;rue;woodruff;angelica;costmary;tansy;yarrow;catnip',
      d: 'black lime|loomi;barberry;nutmeg flower?;charoli;stone flower|dagad phool|kalpasi;marathi moggu|kapok buds;shahi jeera;tej patta;panch phoron;jakhya;timur;uvaria;melegueta;ashanti pepper;uziza;negro pepper|selim pepper;kani pepper;voatsiperifery|wild pepper;tasmanian pepper|mountain pepper;lemon myrtle;wattleseed;aniseed myrtle;bush tomato|akudjura',
      k: 'cassia buds?;tonka bean'
    }),
    C('shakespeare', 'general', 'Name a play by William Shakespeare', {
      p: 'hamlet;macbeth;romeo and juliet|romeo & juliet;othello;king lear|lear;a midsummer night’s dream|a midsummer nights dream|midsummer night’s dream|midsummer nights dream;the tempest|tempest;julius caesar',
      c: 'much ado about nothing',
      s: 'twelfth night;as you like it;the merchant of venice|merchant of venice;richard iii|richard 3|richard the third;henry v|henry 5;the taming of the shrew|taming of the shrew;antony and cleopatra;the winter’s tale|the winters tale|winter’s tale;coriolanus;timon of athens;titus andronicus;measure for measure;the comedy of errors|comedy of errors;love’s labour’s lost|loves labours lost;the two gentlemen of verona;cymbeline;pericles|pericles prince of tyre;troilus and cressida;all’s well that ends well|alls well that ends well;the merry wives of windsor|merry wives of windsor;henry iv|henry iv part 1|henry iv part 2;richard ii|richard 2;king john;henry vi|henry vi part 1|henry vi part 2|henry vi part 3;henry viii|henry 8',
      r: 'edward iii;the two noble kinsmen|two noble kinsmen;cardenio;sir thomas more;double falsehood;love’s labour’s won|loves labours won;arden of faversham;the spanish tragedy?;a lover’s complaint?;the passionate pilgrim?;venus and adonis?;the rape of lucrece?;the phoenix and the turtle?',
      d: 'a yorkshire tragedy;locrine;the london prodigal;thomas lord cromwell;sir john oldcastle;the puritan;the birth of merlin;fair em;mucedorus;the merry devil of edmonton;george a greene;edmund ironside;the second maiden’s tragedy|the second maidens tragedy;the fair maid of the exchange',
      k: 'the troublesome reign of king john?'
    }),
    // ---------- WORDS & LANGUAGE ----------
    C('collective', 'lexicon', 'Name a collective noun for a group of animals', {
      p: 'herd;flock;pack;school;pride;swarm;pod;colony;gaggle;litter;troop;brood',
      c: 'murder;parliament',
      s: 'murmuration;bloat;crash;tower;business;exaltation;unkindness;shrewdness;skulk;sounder;drove;covey;mob;gang;army;cloud;plague;clowder;kindle;conspiracy;charm;bevy;flight;pod of dolphins;cete;leap;ambush;streak;stud;string;team;yoke;nye;pandemonium;parade',
      r: 'bask;rhumba;congregation;dazzle;zeal;ostentation;romp;prickle;fesnyng;labor;intrusion;scourge;cackle;caravan;coalition;implausibility;obstinacy;wake;venue;rafter;sedge;siege;descent;watch;tidings;muster;mustering;convocation;wisdom;stare;kit;peep;paddling;raft;wedge;whiteness',
      d: 'a lamentation of swans?;sord;sute;spring;stand;shiver;sneak;tiding;trip;trembling;troubling;unkindness of ravens;zeal of zebras;gulp;gam;glean;glaring;down;drift;drey;dray;dule;dole;doylt;exultation;fall;fever;flamboyance;fling;gabble;hover;kine;labour;lounge;melting;mischief;mutation',
      k: 'cowardice of curs?;a bazaar of guillemots;a sloth of bears'
    }),
    C('punctuation', 'lexicon', 'Name a punctuation mark or typographic symbol', {
      p: 'period|full stop;comma;question mark;exclamation mark|exclamation point;apostrophe;colon;semicolon;hyphen;quotation mark|quote;parentheses|brackets|parenthesis;ellipsis|dot dot dot;dash',
      c: 'interrobang;octothorpe',
      s: 'ampersand;asterisk;at sign|@;hashtag|hash|pound sign|number sign;slash|forward slash;backslash;underscore;pipe|vertical bar;tilde;caret;em dash;en dash;percent sign|%;dollar sign;bullet;section sign;pilcrow|paragraph sign;dagger|obelus;copyright symbol;degree symbol;plus sign;equals sign;square brackets;curly braces|curly brackets;angle brackets;guillemet;prime;tilde',
      r: 'obelus;obelisk;interpunct|middle dot;ditto mark;tittle;virgule;solidus;lozenge;asterism;fleuron|hedera;manicule;tironian et;ligature;diaeresis|umlaut;cedilla;circumflex;macron;breve;grave accent|grave;acute accent|acute;caron|hacek;ogonek;overdot;ring above;double acute;hook above;horn;trema;diacritic;irony mark;percontation point;snark mark;acclamation mark;sarcasm mark;bracketed ellipsis;inverted question mark|inverted exclamation mark',
      d: 'tironian note;reversed pilcrow;capitulum;punctus elevatus;punctus versus;punctus interrogativus;virgula suspensiva;hypodiastole;diple;paragraphos;coronis;stigme;teleia;mese;hypostigme;asteriscus;antisigma;chi-rho?;interrobang?;gnaborretni;sans-serif?;ordinal indicator;numero sign;care of|c/o?;per mille|permille;basis point;prime symbol;double prime;tilde operator;swung dash;fullwidth full stop;ideographic comma;corner bracket',
      k: 'gnaborretni;rhetorical question mark'
    }),
    C('language2', 'lexicon', 'Name a language', {
      p: 'english;spanish;french;german;chinese|mandarin;japanese;italian;russian;portuguese;arabic;korean;hindi',
      c: 'latin;klingon',
      s: 'dutch;swedish;norwegian;danish;finnish;greek;turkish;polish;hebrew;vietnamese;thai;indonesian;malay;urdu;bengali;persian|farsi;swahili;czech;hungarian;romanian;ukrainian;cantonese;tagalog|filipino;tamil;punjabi;telugu;icelandic;irish|gaelic;welsh;scottish gaelic;esperanto;sanskrit;yiddish;catalan;basque;hawaiian',
      r: 'navajo;quechua;guarani;nahuatl;maori;samoan;tongan;fijian;tahitian;tok pisin;amharic;yoruba;igbo;hausa;zulu;xhosa;afrikaans;shona;somali;oromo;kurdish;pashto;uzbek;kazakh;mongolian;tibetan;burmese;khmer;lao;sinhala;nepali;malayalam;kannada;gujarati;marathi;georgian;armenian;albanian;macedonian;lithuanian;latvian;estonian;maltese;luxembourgish;faroese;breton;cornish;manx;sami|saami;romani',
      d: 'ainu;chamorro;chukchi;dzongkha;eyak;gullah;hmong;inuktitut;kalaallisut|greenlandic;ladino;lakota;lingala;livonian;mapudungun;mohawk;occitan;quenya;sindarin;volapuk;ido;interlingua;lojban;toki pona;dothraki;navi|na’vi;tsez;pirahã|piraha;ubykh;yupik;wolof;tigrinya;tswana;twi;sesotho|sotho;kinyarwanda;kirundi;malagasy;chichewa;bambara;fula|fulani',
      k: 'silbo gomero;sentinelese?;kusunda;nushu'
    }),
    C('figure', 'lexicon', 'Name a figure of speech or rhetorical device', {
      p: 'metaphor;simile;hyperbole;irony;alliteration;personification;onomatopoeia;pun;oxymoron;idiom;sarcasm;cliche',
      c: 'litotes;synecdoche;metonymy',
      s: 'euphemism;paradox;understatement|meiosis;assonance;consonance;rhetorical question;anaphora;epistrophe;chiasmus;antithesis;apostrophe;allusion;analogy;allegory;satire;parody;zeugma;tautology;pleonasm;juxtaposition;repetition;rhyme;imagery;symbolism;foreshadowing;flashback;irony?;dysphemism;malapropism;spoonerism;portmanteau;neologism',
      r: 'syllepsis;hendiadys;hendiatris;asyndeton;polysyndeton;anadiplosis;epizeuxis;tricolon;isocolon;parallelism;aposiopesis;apophasis|paralipsis;prolepsis;hypophora;erotesis;anthimeria;antimetabole;catachresis;synesthesia;sibilance;litotes;tmesis;ellipsis;climax;bathos;anticlimax;pathos;ethos;logos;oxymoron?;hypallage|transferred epithet;metalepsis;merism;enallage;hysteron proteron;polyptoton;paronomasia;antanaclasis;kenning;periphrasis;circumlocution',
      d: 'abating;accismus;acyrologia;adianoeta;adynaton;amphibologia;anacoluthon;anacoenosis;antonomasia;antiphrasis;apodioxis;aporia;aphaeresis;apocope;aposiopesis;asteismus;auxesis;battology;brachylogia;cacophony;cataphora;chleuasmos;commoratio;conduplicatio;diacope;dialogismus;diaphora;diazeugma;dubitatio;ecphonesis;enthymeme;epanorthosis;epimone;epistrophe;euphony',
      k: 'paraprosdokian;prosopopoeia;tapinosis;pareiromenon'
    }),
    C('loanword', 'lexicon', 'Name an English word borrowed from another language', {
      p: 'kindergarten;sushi;pizza;taco;ballet;cafe;safari;karaoke;tsunami;piano;ninja;guru;pajamas',
      c: 'schadenfreude;zeitgeist',
      s: 'tycoon;bungalow;shampoo;jungle;bazaar;khaki;tattoo;boomerang;kangaroo;algebra;alcohol;coffee;sofa;sugar;ghoul;genie;mosquito;canyon;barbecue;chocolate;tomato;potato;avocado;chili;hurricane;canoe;moccasin;tomahawk;skunk;moose;igloo;kayak;anorak;vodka;sputnik;gulag;pogrom;robot;pistol;polka;hamburger;pretzel;rucksack;angst;wanderlust;doppelganger;poltergeist;hinterland;blitz;kitsch;rendezvous;cliche;deja vu;faux pas;genre;encore;naive;fiance;chauffeur;espionage',
      r: 'tsunami;origami;tofu;emoji;futon;karate;haiku;kimono;sake;samurai;sudoku;typhoon;umami;honcho;skosh;tycoon;rickshaw;kowtow;ketchup;gingham;cummerbund;pundit;thug;loot;juggernaut;avatar;karma;nirvana;mantra;yoga;bandana;cot;dungarees;veranda;verandah;pariah;catamaran;cheetah;mongoose;orangutan;amok;caddy;cooties;gong;sarong;batik;ketchup;paddy;cockatoo',
      d: 'berserk;saga;ombudsman;smorgasbord;fjord;lemming;slalom;ski;tungsten;dynamite;nugget?;qiviut;umiak;quokka;kakapo;kiwi;haka;kauri;tapu|taboo;aloha;ukulele;wiki;muumuu;lanai;poi;mahalo;pidgin;sampan;ketch;dinghy;monsoon;kapok;hullabaloo;nabob;khan;shaman;tundra;taiga;samovar;babushka;intelligentsia;troika;mammoth;steppe;sable',
      k: 'bumf?;ukase;kvass;beluga;borscht;pavlova?;chai'
    }),
    C('grammar', 'lexicon', 'Name a grammar term', {
      p: 'noun;verb;adjective;adverb;pronoun;preposition;conjunction;interjection;sentence;clause;subject;object',
      c: 'gerund',
      s: 'article;participle;infinitive;predicate;phrase;tense;plural;singular;possessive;comparative;superlative;past tense;present tense;future tense;active voice;passive voice;imperative;conditional;subjunctive;determiner;modifier;auxiliary verb|helping verb;transitive;intransitive;proper noun;common noun;abstract noun;collective noun;contraction;comma splice;run-on sentence;fragment',
      r: 'copula|linking verb;appositive;antecedent;clitic;case;nominative;accusative;genitive;dative;ablative;vocative;locative;instrumental;declension;conjugation;inflection;morpheme;phoneme;affix;prefix;suffix;infix;stem;root;lemma;aspect;mood;voice;valency;ergative;absolutive;agent;patient;gender;number;person',
      d: 'gerundive;supine;optative;jussive;hortative;evidential;mirative;cohortative;apophony;ablaut;umlaut;syncope;apocope;elision;crasis;sandhi;liaison;sandhi?;suppletion;cliticization;reduplication;agglutination;incorporation;polysynthesis;topicalization;fronting;extraposition;cleft;pseudo-cleft;stranding;ellipsis;gapping;pro-drop;serial verb',
      k: 'cataphora;anaphora;exophora;cleft sentence'
    }),
    C('writer', 'lexicon', 'Name a famous author or poet', {
      p: 'william shakespeare|shakespeare;j.k. rowling|jk rowling|rowling;stephen king;charles dickens|dickens;jane austen|austen;mark twain|twain;ernest hemingway|hemingway;george orwell|orwell;j.r.r. tolkien|tolkien;agatha christie',
      c: 'edgar allan poe|poe',
      s: 'f. scott fitzgerald|fitzgerald;virginia woolf|woolf;oscar wilde|wilde;leo tolstoy|tolstoy;fyodor dostoevsky|dostoevsky;franz kafka|kafka;victor hugo|hugo;homer;dante;john steinbeck|steinbeck;toni morrison|morrison;maya angelou|angelou;robert frost|frost;emily dickinson|dickinson;walt whitman|whitman;lord byron|byron;percy shelley|shelley;mary shelley;john keats|keats;william wordsworth|wordsworth;charlotte bronte|bronte;emily bronte;h.g. wells|hg wells|wells;jules verne|verne;roald dahl|dahl;dr. seuss|dr seuss|seuss;c.s. lewis|cs lewis|lewis;george r.r. martin|grrm|george rr martin|martin',
      r: 'italo calvino|calvino;jorge luis borges|borges;gabriel garcia marquez|marquez;pablo neruda|neruda;octavio paz|paz;julio cortazar|cortazar;isabel allende|allende;mario vargas llosa|vargas llosa;haruki murakami|murakami;yukio mishima|mishima;kazuo ishiguro|ishiguro;chinua achebe|achebe;wole soyinka|soyinka;ngugi wa thiong’o|ngugi;chimamanda ngozi adichie|adichie;salman rushdie|rushdie;arundhati roy;rabindranath tagore|tagore;naguib mahfouz|mahfouz;orhan pamuk|pamuk;umberto eco|eco;milan kundera|kundera;vaclav havel|havel;czeslaw milosz|milosz;wislawa szymborska|szymborska;anna akhmatova|akhmatova;marina tsvetaeva|tsvetaeva;boris pasternak|pasternak;vladimir nabokov|nabokov',
      d: 'fernando pessoa|pessoa;jose saramago|saramago;eca de queiroz;machado de assis;clarice lispector|lispector;rosario castellanos;juan rulfo|rulfo;roberto bolano|bolano;alejandra pizarnik|pizarnik;silvina ocampo;bioy casares;ismail kadare|kadare;danilo kis;ivo andric;miroslav krleza;witold gombrowicz|gombrowicz;bruno schulz;stanislaw lem|lem;thomas bernhard;elfriede jelinek|jelinek;peter handke|handke;w.g. sebald|sebald;paul celan|celan',
      k: 'jon fosse;halldor laxness;sigrid undset;hjalmar soderberg'
    }),
    C('wordsmeaningbig', 'lexicon', 'Name a word meaning "large"', {
      p: 'big;huge;large;giant;enormous;massive;gigantic;tall;great;vast;immense;colossal',
      c: 'humongous',
      s: 'jumbo;mammoth;titanic;gargantuan;monumental;towering;hefty;bulky;sizable;substantial;king-size|king size;whopping;extensive;grand;major;oversized;mega;tremendous;monstrous;astronomical',
      r: 'prodigious;stupendous;cyclopean;brobdingnagian;elephantine;leviathan;behemoth;herculean;mountainous;voluminous;capacious;ample;commodious;spacious;expansive;boundless;limitless;infinite;epic;whacking;thumping;walloping;strapping;burly;hulking;lumbering',
      d: 'ginormous;humungous;squillion?;gigantean;gigantesque;titanian;atlantean;hyperbolic;megalithic;megalomorphic;megascopic;macrocosmic;macroscopic;macrobiotic?;bumper;whacking great;ripping;rousing;rolling;ponderous;mickle;muckle;lusty;stout;stalwart;lofty;exalted;sublime;paramount',
      k: 'tarnation big?;vasty;vastidity;vastitude'
    }),
    // ---------- MOVIES ----------
    C('oscaractor', 'movies', 'Name an actor or actress who has won an Academy Award', {
      p: 'leonardo dicaprio|dicaprio;tom hanks|hanks;meryl streep|streep;denzel washington|denzel;brad pitt;jennifer lawrence;julia roberts;anthony hopkins;jack nicholson|nicholson;robert de niro|de niro;al pacino|pacino',
      c: 'emma stone',
      s: 'cate blanchett|blanchett;daniel day-lewis|day-lewis;sean penn;kate winslet|winslet;natalie portman|portman;matthew mcconaughey|mcconaughey;joaquin phoenix|phoenix;frances mcdormand|mcdormand;gary oldman|oldman;rami malek|malek;christian bale|bale;eddie redmayne|redmayne;charlize theron|theron;sandra bullock|bullock;halle berry;nicole kidman|kidman;jodie foster|foster;hilary swank|swank;reese witherspoon|witherspoon;renee zellweger|zellweger;olivia colman|colman;viola davis;lupita nyong’o|lupita;mahershala ali;forest whitaker;jamie foxx;morgan freeman;heath ledger|ledger;javier bardem|bardem;christoph waltz|waltz;tommy lee jones',
      r: 'jessica chastain|chastain;michelle yeoh|yeoh;ke huy quan;brendan fraser|fraser;cillian murphy;da’vine joy randolph;emerald fennell?;ariana debose|debose;youn yuh-jung|youn yuh jung;laura dern;regina king;patricia arquette;alicia vikander|vikander;octavia spencer;melissa leo;mo’nique|monique;penelope cruz|cruz;marion cotillard|cotillard;juliette binoche|binoche;tilda swinton|swinton;jennifer connelly|connelly;catherine zeta-jones|zeta-jones;gwyneth paltrow|paltrow;helen hunt;holly hunter;susan sarandon|sarandon;emma thompson|thompson;maggie smith;judi dench|dench;helen mirren|mirren;glenda jackson;vanessa redgrave|redgrave',
      d: 'celia johnson?;luise rainer;vivien leigh;greer garson;ingrid bergman;olivia de havilland|de havilland;joan fontaine;jennifer jones;loretta young;jane wyman;judy holliday;shirley booth;anna magnani;grace kelly;audrey hepburn|hepburn;simone signoret;sophia loren|loren;patty duke;julie andrews;barbra streisand|streisand;maggie smith;liza minnelli|minnelli;ellen burstyn;louise fletcher;faye dunaway;sissy spacek|spacek;jessica lange|lange;shirley maclaine|maclaine',
      k: 'hattie mcdaniel;haing s. ngor;cuba gooding jr.?;lee grant?;mercedes mcnab?'
    }),
    C('pixar', 'movies', 'Name a Pixar movie', {
      p: 'toy story;finding nemo;the incredibles|incredibles;cars;monsters inc|monsters, inc.|monsters inc.;up;wall-e|walle|wall e;inside out;coco;ratatouille;brave',
      c: 'soul',
      s: 'a bug’s life|a bugs life;toy story 2;toy story 3;toy story 4;monsters university;finding dory;cars 2;cars 3;incredibles 2;onward;luca;turning red;lightyear;elemental;inside out 2;the good dinosaur|good dinosaur;toy story 5?',
      r: 'luca;lightyear;elio;win or lose?;inside out 2;turning red;elemental;onward;soul;coco;ratatouille;brave;up',
      d: 'toy story of terror?;lamp life?;day and night?;la luna?;piper?;bao?;burrow?;lava?;sanjay’s super team?;purl?;kitbull?',
      k: 'the good dinosaur?;elio'
    }),
    C('villain', 'movies', 'Name a movie villain', {
      p: 'darth vader|vader;joker;voldemort;hannibal lecter|lecter;freddy krueger|freddy;jason voorhees|jason;michael myers;scar;thanos;sauron;hans gruber;gollum?',
      c: 'agent smith;loki',
      s: 'the wicked witch of the west|wicked witch;maleficent;cruella de vil|cruella;ursula;jafar;gaston;hades;captain hook;shere khan;lex luthor;green goblin;doctor octopus|doc ock;magneto;bane;two-face;penguin;riddler;ultron;killmonger;palpatine|emperor palpatine;kylo ren;darth maul;boba fett?;t-1000|t1000;terminator;norman bates;patrick bateman;anton chigurh;alex delarge;nurse ratched;john doe;keyser soze;hal 9000|hal;pennywise;chucky;ghostface;leatherface;jigsaw;pinhead;xenomorph|alien|the alien;predator',
      r: 'hopper;randall boggs|randall;syndrome;lotso;stinky pete;sid phillips|sid;zurg;chef skinner;charles muntz|muntz;gus?;commander shepard?;professor x?;dr. evil|dr evil;mojo jojo?;hamilton?;davy jones;barbossa;bill the butcher;calvera;frank booth;alonzo harris;tommy devito;ratso?;waldo?;lord farquaad|farquaad;fiona?;rothbart;gargamel;skeletor;megatron;shredder;cobra commander',
      d: 'the hidden?;ernst stavro blofeld|blofeld;auric goldfinger|goldfinger;dr. no|dr no;scaramanga;le chiffre;raoul silva|silva;francisco scaramanga;rosa klebb;oddjob;jaws;nick nack;baron samedi;mr. big?;max zorin|zorin;karl stromberg|stromberg;hugo drax|drax;elliot carver|carver;alec trevelyan|trevelyan;renard;gustav graves|graves;dominic greene|greene;safin;emilio largo|largo',
      k: 'mother gothel?;frollo;ratcliffe;shan yu;yzma?;hopper?;ratigan'
    }),
    C('bestpicture', 'movies', 'Name a movie that won the Academy Award for Best Picture', {
      p: 'titanic;gladiator;forrest gump;the godfather|godfather;schindler’s list|schindlers list;parasite;oppenheimer;the silence of the lambs|silence of the lambs;braveheart;casablanca;the lord of the rings the return of the king|return of the king|lotr return of the king',
      c: 'crash;green book',
      s: 'rocky;platoon;amadeus;rain man;unforgiven;the departed|departed;no country for old men;slumdog millionaire;the hurt locker|hurt locker;the king’s speech|the kings speech;the artist;argo;12 years a slave|twelve years a slave;birdman;spotlight;moonlight;the shape of water|shape of water;nomadland;coda;everything everywhere all at once;chicago;a beautiful mind;american beauty;shakespeare in love;the english patient|english patient;dances with wolves;terms of endearment;ordinary people;kramer vs. kramer|kramer vs kramer;annie hall;the sting|sting;the french connection|french connection;patton;midnight cowboy;oliver!|oliver;a man for all seasons;the sound of music|sound of music;my fair lady;lawrence of arabia;the apartment|apartment;ben-hur|ben hur;gigi;on the waterfront;from here to eternity;an american in paris;all about eve;gone with the wind',
      r: 'cavalcade;grand hotel;it happened one night;mutiny on the bounty;the great ziegfeld;the life of emile zola;you can’t take it with you;rebecca;how green was my valley;mrs. miniver|mrs miniver;going my way;the lost weekend|lost weekend;gentleman’s agreement|gentlemans agreement;hamlet;all the king’s men?;the greatest show on earth;marty;around the world in 80 days;the bridge on the river kwai|bridge on the river kwai;west side story;tom jones;in the heat of the night;oliver;the lost weekend',
      d: 'wings;the broadway melody|broadway melody;all quiet on the western front;cimarron;grand hotel;cavalcade;it happened one night',
      k: 'wings'
    }),
    C('composer', 'movies', 'Name a film composer', {
      p: 'hans zimmer|zimmer;john williams|williams;ennio morricone|morricone;howard shore|shore;danny elfman|elfman;james horner|horner;alan silvestri|silvestri',
      c: 'ludwig goransson|goransson',
      s: 'bernard herrmann|herrmann;jerry goldsmith|goldsmith;john barry|barry;nino rota|rota;alexandre desplat|desplat;thomas newman|newman;randy newman;michael giacchino|giacchino;james newton howard;max steiner|steiner;maurice jarre|jarre;vangelis;lalo schifrin|schifrin;henry mancini|mancini;elmer bernstein|bernstein;dimitri tiomkin|tiomkin;miklos rozsa|rozsa;bear mccreary|mccreary;trent reznor|reznor;atticus ross;hildur guonadottir|guonadottir;jonny greenwood|greenwood;rachel portman|portman;ryuichi sakamoto|sakamoto;joe hisaishi|hisaishi',
      r: 'carter burwell|burwell;clint mansell|mansell;cliff martinez|martinez;mica levi;nicholas britell|britell;justin hurwitz|hurwitz;jon brion|brion;thomas bergersen?;harry gregson-williams|gregson-williams;rupert gregson-williams;patrick doyle|doyle;george fenton|fenton;stephen warbeck|warbeck;dario marianelli|marianelli;gabriel yared|yared;michael nyman|nyman;wojciech kilar|kilar;zbigniew preisner|preisner;angelo badalamenti|badalamenti;craig armstrong;alberto iglesias|iglesias;gustavo santaolalla|santaolalla;ramin djawadi|djawadi;ludovic bource|bource;yann tiersen|tiersen;nobuo uematsu?;yoko shimomura?',
      d: 'toru takemitsu|takemitsu;masaru sato;fumio hayasaka;akira ifukube|ifukube;masaru satoh;riz ortolani;stelvio cipriani|cipriani;piero umiliani;francesco de masi;franco micalizzi;goblin;bruno nicolai;armando trovajoli;carlo rustichelli;roman vlad;mario nascimbene;giorgio moroder|moroder;tangerine dream;vangelis papathanassiou;eleni karaindrou|karaindrou;manos hadjidakis|hadjidakis;mikis theodorakis|theodorakis',
      k: 'john cacavas?;wilhelm stegmann;ernest gold?'
    }),
    C('animated', 'movies', 'Name an animated film', {
      p: 'the lion king|lion king;frozen;shrek;toy story;finding nemo;aladdin;moana;despicable me;zootopia;kung fu panda;madagascar;ice age',
      c: 'spirited away',
      s: 'beauty and the beast;the little mermaid|little mermaid;cinderella;snow white|snow white and the seven dwarfs;pinocchio;bambi;dumbo;peter pan;lady and the tramp;sleeping beauty;101 dalmatians|one hundred and one dalmatians;the jungle book|jungle book;tangled;encanto;mulan;pocahontas;tarzan;hercules;the hunchback of notre dame|hunchback of notre dame;how to train your dragon;megamind;rio;happy feet;cars;ratatouille;coraline;kubo and the two strings;the iron giant|iron giant;my neighbor totoro|totoro;princess mononoke;howl’s moving castle|howls moving castle;akira;ghost in the shell;persepolis;waltz with bashir;spider-man into the spider-verse|into the spider-verse|spider-verse|spiderman into the spider verse|spider verse',
      r: 'the triplets of belleville|triplets of belleville;the secret of kells|secret of kells;song of the sea;wolfwalkers;the red turtle|red turtle;ernest and celestine|ernest & celestine;loving vincent;anomalisa;fantastic mr. fox|fantastic mr fox;isle of dogs;the nightmare before christmas|nightmare before christmas;corpse bride;frankenweenie;paranorman;the boxtrolls|boxtrolls;flee;i lost my body;klaus;the mitchells vs. the machines|mitchells vs the machines;wish dragon?;over the moon;the sea beast|sea beast;puss in boots the last wish|last wish;nimona;robot dreams;the wild robot|wild robot;flow;the boy and the heron|boy and the heron',
      d: 'fantastic planet|la planete sauvage;the king and the mockingbird|le roi et l’oiseau;belladonna of sadness;the thief and the cobbler;a cat in paris;the illusionist;mary and max;chico and rita;tito and the birds;the congress;mind game;tekkonkinkreet;paprika;millennium actress;perfect blue;tokyo godfathers;wolf children;the girl who leapt through time|girl who leapt through time;summer wars;the boy and the beast;mirai;weathering with you;your name|your name.;a silent voice|silent voice;the garden of words|garden of words;5 centimeters per second|five centimeters per second;grave of the fireflies|grave of the fireflies',
      k: 'the adventures of prince achmed;allegro non troppo;fritz the cat;heavy metal'
    }),
    C('horror', 'movies', 'Name a horror movie', {
      p: 'the shining|shining;psycho;halloween;the exorcist|exorcist;scream;it;jaws;alien;saw;get out;the conjuring|conjuring;a nightmare on elm street|nightmare on elm street',
      c: 'hereditary',
      s: 'friday the 13th;the texas chain saw massacre|texas chain saw massacre|the texas chainsaw massacre|texas chainsaw massacre;carrie;poltergeist;the omen|omen;rosemary’s baby|rosemarys baby;night of the living dead;dawn of the dead;the thing;the ring;the grudge;paranormal activity;insidious;sinister;annabelle;us;nope;midsommar;the witch|witch;it follows;the babadook|babadook;a quiet place|quiet place;the descent|descent;28 days later;shaun of the dead;evil dead|the evil dead;child’s play|childs play;the fly|fly;the blair witch project|blair witch project|blair witch;candyman;hellraiser;the amityville horror|amityville horror;the hills have eyes|hills have eyes;suspiria;black swan?',
      r: 'the haunting;the innocents;carnival of souls;peeping tom;eyes without a face;black sunday;kwaidan;onibaba;ugetsu;kuroneko;house|hausu;audition;ringu;dark water;ju-on;pulse|kairo;cure;ichi the killer;the host;a tale of two sisters|tale of two sisters;i saw the devil;train to busan;let the right one in|let the right one in;martyrs;high tension|haute tension;inside|a l’interieur;the orphanage|el orfanato;the devil’s backbone|the devils backbone;pan’s labyrinth?|pans labyrinth;cronos;mama;rec;rec 2;the others;the sixth sense|sixth sense;the mist;1408;misery;pet sematary;cujo;christine;the dead zone?',
      d: 'possession;repulsion;cat people;i walked with a zombie;the seventh victim;isle of the dead;bedlam;the body snatcher|body snatcher;dead of night;the wicker man|wicker man;don’t look now|dont look now;witchfinder general;the blood on satan’s claw|blood on satans claw;the devil rides out;theatre of blood;the abominable dr. phibes|abominable dr phibes;the creeping flesh;horror express;tombs of the blind dead;the blood spattered bride;the loreley’s grasp|loreleys grasp;let sleeping corpses lie;a bay of blood|bay of blood;deep red|profondo rosso;the bird with the crystal plumage|bird with the crystal plumage;the beyond|beyond;city of the living dead;zombi 2|zombie flesh eaters;inferno;tenebrae;opera|phenomena',
      k: 'the vourdalak?;black sabbath;kill baby kill;blood and black lace;castle of blood;nightmare castle;the whip and the body'
    }),
    C('marvel', 'movies', 'Name a Marvel character', {
      p: 'spider-man|spiderman|spider man;iron man|ironman;captain america;thor;hulk|the hulk;black widow;hawkeye;thanos;loki;black panther;wolverine;deadpool',
      c: 'groot',
      s: 'doctor strange|dr strange;ant-man|antman|ant man;captain marvel;scarlet witch;vision;falcon;winter soldier|bucky barnes|bucky;war machine;star-lord|star lord|peter quill;gamora;drax;rocket|rocket raccoon;nebula;mantis;wasp;shuri;okoye;nick fury|fury;thor?;professor x|charles xavier;magneto;cyclops;storm;jean grey|phoenix;rogue;gambit;beast;nightcrawler;colossus;mystique;juggernaut;sabretooth;venom;carnage;green goblin;doctor octopus|doc ock;sandman;lizard;vulture;mysterio;kingpin;daredevil;punisher;elektra;luke cage;jessica jones;iron fist;blade;ghost rider;silver surfer;galactus;doctor doom|dr doom',
      r: 'moon knight;ms. marvel|ms marvel|kamala khan;she-hulk|she hulk;miles morales;spider-gwen|gwen stacy;america chavez;kate bishop;yelena belova|yelena;red guardian;taskmaster;shang-chi|shang chi;wong;ancient one;mordo;kaecilius;dormammu;hela;surtur;korg;valkyrie;sif;heimdall;odin;frigga;ego;yondu;kraglin;cosmo;adam warlock;ayesha;high evolutionary;wanda;pietro|quicksilver;ultron;zemo;crossbones;abomination;leader;red skull;arnim zola|zola;whiplash;ivan vanko;aldrich killian|killian;obadiah stane|stane;mandarin;ghost;yellowjacket;kang;the collector|collector;grandmaster;nova;cloak;dagger',
      d: 'squirrel girl;howard the duck;man-thing|man thing;devil dinosaur;moon girl;lockjaw;ka-zar|ka zar;shanna;tigra;hellcat;hercules;namor;namora;triton;medusa;black bolt;karnak;gorgon;crystal;maximus;lockjaw;uatu;eternity;infinity;the living tribunal;death;lady death;mephisto;nightmare;shuma-gorath;sleepwalker;speedball;night thrasher;firestar;iceman;angel;archangel;jubilee;psylocke;emma frost',
      k: 'bob, agent of hydra?;bob agent of hydra|bob;gwenpool;throg;lockheed;cosmo?'
    }),
    // ---------- SPORTS ----------
    C('olympicsport', 'sports', 'Name an Olympic sport', {
      p: 'swimming;gymnastics;basketball;soccer|football;tennis;athletics|track and field|track;boxing;volleyball;cycling;diving;rowing;weightlifting;wrestling;judo',
      c: 'curling',
      s: 'archery;fencing;sailing;shooting;golf;rugby sevens|rugby;table tennis|ping pong;badminton;taekwondo;karate;skateboarding;surfing;sport climbing|climbing;triathlon;modern pentathlon|pentathlon;equestrian;canoeing|kayaking|canoe slalom;handball;hockey|field hockey;water polo;synchronized swimming|artistic swimming;trampoline;rhythmic gymnastics;breaking|breakdancing;ice hockey;figure skating;speed skating;skiing|alpine skiing;snowboarding;bobsled|bobsleigh;luge;skeleton;biathlon;cross-country skiing;ski jumping;nordic combined;freestyle skiing',
      r: 'short track;short track speed skating;ice dance;moguls;aerials;ski cross;snowboard cross;halfpipe;slopestyle;big air;skeleton;ski mountaineering?;cricket?;lacrosse?;flag football?;squash?;baseball|softball;karate;tug of war;polo;croquet;roque;jeu de paume;pelota;motorboating;live pigeon shooting;solo synchronised swimming;club swinging;plunge for distance;rope climbing;dueling pistols;standing high jump;standing long jump;standing triple jump',
      d: 'art competitions;alpinism;ballooning;basque pelota;cricket;croquet;golf?;kite flying?;lacrosse;motor boating;polo;rackets;roque;rugby union;tug of war;water motorsports;waterskiing?;skijoring;ski ballet;speed skiing;nordic?;military patrol;aerials?;demonstration sport;bandy;orienteering?;sled dog racing;stone throwing?;firefighting?;cannon firing?;poetry?',
      k: 'rope climbing?;plunge for distance;two-handed shot put?'
    }),
    C('nbateam', 'sports', 'Name an NBA team', {
      p: 'lakers|los angeles lakers|la lakers;bulls|chicago bulls;celtics|boston celtics;warriors|golden state warriors;knicks|new york knicks;heat|miami heat;nets|brooklyn nets;spurs|san antonio spurs;clippers|la clippers;mavericks|dallas mavericks|mavs;rockets|houston rockets',
      c: 'cavaliers|cavs|cleveland cavaliers',
      s: 'bucks|milwaukee bucks;suns|phoenix suns;76ers|sixers|philadelphia 76ers;raptors|toronto raptors;nuggets|denver nuggets;jazz|utah jazz;thunder|oklahoma city thunder;trail blazers|blazers|portland trail blazers;kings|sacramento kings;pelicans|new orleans pelicans;grizzlies|memphis grizzlies;timberwolves|wolves|minnesota timberwolves;pacers|indiana pacers;pistons|detroit pistons;hawks|atlanta hawks;hornets|charlotte hornets;wizards|washington wizards;magic|orlando magic',
      r: 'seattle supersonics|supersonics|sonics;vancouver grizzlies;new jersey nets;charlotte bobcats|bobcats;new orleans hornets;san diego clippers;buffalo braves;kansas city kings;cincinnati royals;rochester royals;syracuse nationals;minneapolis lakers;st. louis hawks|st louis hawks;washington bullets|baltimore bullets|capital bullets;new orleans jazz;san francisco warriors|philadelphia warriors;tri-cities blackhawks;fort wayne pistons;anderson packers;sheboygan red skins;waterloo hawks;denver nuggets?;indianapolis olympians',
      d: 'chicago stags;cleveland rebels;detroit falcons;pittsburgh ironmen;providence steamrollers;toronto huskies;washington capitols;baltimore bullets?;indianapolis jets;denver nuggets?;st. louis bombers|st louis bombers;sheboygan redskins;waterloo hawks?;anderson duffey packers;syracuse nationals?;minneapolis lakers?;baltimore bullets?',
      k: 'tri-cities blackhawks?;providence steamrollers?'
    }),
    C('plclub', 'sports', 'Name a football (soccer) club from England', {
      p: 'manchester united|man united|man utd;manchester city|man city;liverpool;arsenal;chelsea;tottenham|tottenham hotspur|spurs;everton;newcastle united|newcastle;west ham united|west ham|west ham;leeds united|leeds',
      c: 'aston villa|villa',
      s: 'leicester city|leicester;wolverhampton wanderers|wolves;southampton;brighton|brighton & hove albion|brighton and hove albion;crystal palace;fulham;brentford;nottingham forest|forest;bournemouth|afc bournemouth;burnley;sheffield united;watford;norwich city|norwich;west bromwich albion|west brom;stoke city|stoke;sunderland;middlesbrough|boro;derby county|derby;ipswich town|ipswich;birmingham city|birmingham;blackburn rovers|blackburn;bolton wanderers|bolton;queens park rangers|qpr;swansea city|swansea;cardiff city|cardiff;reading;coventry city|coventry;huddersfield town|huddersfield;luton town|luton',
      r: 'wigan athletic|wigan;portsmouth|pompey;plymouth argyle|plymouth;barnsley;blackpool;bristol city;bristol rovers;burton albion;cambridge united;carlisle united;charlton athletic|charlton;cheltenham town;colchester united;crawley town;crewe alexandra|crewe;doncaster rovers;exeter city;gillingham;grimsby town;harrogate town;hartlepool united;hull city|hull;leyton orient|orient;lincoln city;mansfield town;millwall;milton keynes dons|mk dons;morecambe;newport county;northampton town;oldham athletic|oldham;oxford united;peterborough united|posh;port vale;preston north end|preston;rochdale;rotherham united|rotherham;salford city|salford;scunthorpe united;shrewsbury town|shrewsbury;stevenage;stockport county|stockport;swindon town|swindon;tranmere rovers|tranmere;walsall;wrexham;wycombe wanderers|wycombe;yeovil town|yeovil',
      d: 'accrington stanley|accrington;afc wimbledon|wimbledon;aldershot town;barnet;boreham wood|boreham wood;bromley;chesterfield;dagenham & redbridge|dagenham and redbridge;dover athletic;eastleigh;forest green rovers|forest green;fleetwood town|fleetwood;gateshead;halifax town|halifax;kidderminster harriers|kidderminster;macclesfield town;maidenhead united;maidstone united;notts county;oxford city;scarborough;solihull moors;southend united|southend;sutton united;torquay united|torquay;woking;weymouth;york city|york;wealdstone',
      k: 'darlington;chester city|chester;stafford rangers;kettering town;nuneaton borough;hereford united|hereford;lewes;hayes & yeading|hayes and yeading'
    }),
    C('martialart', 'sports', 'Name a martial art or combat sport', {
      p: 'karate;judo;taekwondo|tae kwon do;boxing;kung fu;wrestling;jiu-jitsu|jiu jitsu|brazilian jiu-jitsu|bjj;muay thai;kickboxing;mma|mixed martial arts;aikido;krav maga',
      c: 'capoeira',
      s: 'sumo;kendo;fencing;tai chi;wing chun;hapkido;sambo;savate;jeet kune do;ninjutsu;kenjutsu;iaido;kyudo;shaolin kung fu|shaolin;kali|eskrima|arnis;silat|pencak silat;kalaripayattu;lethwei;sanda|sanshou;bartitsu;systema;glima;vale tudo;greco-roman wrestling|greco roman wrestling|greco-roman;freestyle wrestling;catch wrestling;pankration;shootfighting;shorinji kempo|kempo;goju-ryu|goju ryu;shotokan;kyokushin;wado-ryu;shito-ryu',
      r: 'kajukenbo;kuk sool won;taekkyon;hwarangdo;tang soo do;sikaran;bokator;pradal serey;muay boran;krabi krabong;lerdrit;ba gua|baguazhang;xingyi|xing yi quan;hung gar;choy li fut;praying mantis kung fu|praying mantis;monkey kung fu;drunken boxing;white crane;shuai jiao;qin na;sanda?;bajiquan;tongbi;chin na;jujutsu|ju-jutsu|jujitsu;daito-ryu;yoseikan;kobudo;naginatajutsu;bojutsu;jojutsu;shurikenjutsu;sojutsu;battojutsu;hojojutsu;kusarigamajutsu',
      d: 'kuntao;bando;lathi khela;gatka;mallakhamb;kushti;pehlwani;musti yuddha;varma kalai;thang-ta;huyen langlon;kuttu varisai;silambam;adimurai;koshti;vajra mushti;sambo?;ssireum;gungdo;yongmudo;kumdo;haidong gumdo;korean archery;kuk sool;gwonbeop;subak;hap ki do;kyuk too gi;taekwondo?;full contact karate;enshin;ashihara;daido juku;seido kaikan;shidokan;kudo',
      k: 'tahtib;engolo;moraingy;dambe;nguni stick fighting|nguni;laamb;evala;kokowa;ndongo?;musangwe;mwomo?;kupigana ngumi;ngolo'
    }),
    C('golfterm', 'sports', 'Name a golf term', {
      p: 'birdie;bogey;par;eagle;hole in one|ace;tee;fairway;green;bunker|sand trap;rough;putt;driver;iron;wedge',
      c: 'albatross',
      s: 'caddie|caddy;handicap;links;slice;hook;fore;mulligan;divot;pin;flagstick;dogleg;clubhouse;scorecard;stroke play;match play;fade;draw;chip;pitch;lie;address;backswing;downswing;follow-through|follow through;shank;chili dip;skull;thin;fat;gimme;lag;break;read;lip out;double bogey;condor;double eagle|albatross?',
      r: 'stableford;foursomes;fourball;greensomes;scramble;skins;nassau;bingo bango bongo;texas scramble;shamble;best ball;yips;stymie;sandbagger;sandbagging;hosel;loft;lie angle;bounce;offset;blade;cavity back;muscle back;mashie;niblick;brassie;spoon;cleek;baffy;jigger;apron;collar;fringe;frog hair;tap-in|tap in;mark;plugged lie;fried egg;embedded ball;casual water;ground under repair|gur;out of bounds|ob;provisional ball;unplayable lie',
      d: 'whiff;air shot;fresh air shot;worm burner;sky;toe;heel;pull;push;pull hook;push slice;snap hook;duck hook;banana ball;knockdown;stinger;flop shot;bump and run;texas wedge;belly putter;broomstick putter;claw grip;cross-handed|cross handed;interlock;overlap|vardon grip;ten finger|baseball grip;reverse overlap;pronation;supination;lag putt;birdie putt;eagle putt;ace?;dormie;halved;conceded;nearest the pin;longest drive;closest to the pin',
      k: 'stimpmeter;mud ball;squirrel?;sandy;barkie;greenie;arnie;bounce back;snake;sandie'
    }),
    // ---------- GEOGRAPHY ----------
    C('river', 'geography', 'Name a river', {
      p: 'nile;amazon;mississippi;thames;yangtze;danube;rhine;seine;ganges;colorado;missouri;hudson;mekong;volga',
      c: 'congo;niger',
      s: 'zambezi;tigris;euphrates;indus;yellow river|huang he;rio grande;yukon;ohio;tennessee;columbia;potomac;shannon;tyne;severn;trent;loire;rhone;elbe;oder;vistula;po;tiber;arno;ebro;tagus|tejo;douro;dnieper;don;ural;ob;lena;yenisei;amur;irrawaddy;brahmaputra;orinoco;parana;uruguay;sao francisco;murray;darling;limpopo;orange;senegal;volta',
      r: 'okavango;kasai;ubangi;benue;blue nile;white nile;atbara;shebelle;juba;rufiji;ruvuma;tana;cuanza;kunene;cunene;cubango;vaal;fish river;oranje;draa;moulouya;sebou;medjerda;chelif;ob-irtysh;kolyma;indigirka;anadyr;pechora;northern dvina;neva;daugava;neman;narva;prut;dniester|dniestr;sava;drava;tisza;morava;vltava;inn;main;moselle;meuse|maas;scheldt;somme;garonne;dordogne;gironde;saone;marne;oise;aisne',
      d: 'kuskokwim;copper river;stikine;taku;skeena;fraser;nass;peace;athabasca;slave;mackenzie;liard;back;thelon;coppermine;kazan;churchill;nelson;saskatchewan;red deer;bow;oldman;milk;platte;arkansas;red;canadian;pecos;brazos;sabine;pearl;tombigbee;chattahoochee;savannah;santee;cape fear;roanoke;james;susquehanna;delaware;connecticut;merrimack;kennebec;penobscot;st. croix',
      k: 'ob?;kafue;luangwa;shire;rovuma?;tapajos;madeira?'
    }),
    C('capital', 'geography', 'Name the capital city of a country', {
      p: 'paris;london;berlin;rome;madrid;tokyo;beijing;moscow;washington dc|washington d.c.|washington;ottawa;canberra;cairo;new delhi|delhi',
      c: 'brasilia',
      s: 'lisbon;amsterdam;brussels;vienna;bern|berne;stockholm;oslo;copenhagen;helsinki;athens;warsaw;prague;budapest;dublin;edinburgh;ankara;seoul;bangkok;hanoi;manila;jakarta;kuala lumpur;singapore;islamabad;kabul;tehran;baghdad;riyadh;jerusalem;nairobi;addis ababa;lagos?;abuja;pretoria|cape town|bloemfontein;buenos aires;santiago;lima;bogota;caracas;quito;mexico city;havana;kingston',
      r: 'tallinn;riga;vilnius;minsk;kyiv|kiev;chisinau;bucharest;sofia;belgrade;zagreb;ljubljana;sarajevo;skopje;tirana;podgorica;pristina;valletta;nicosia;reykjavik;luxembourg;vaduz;monaco;san marino;andorra la vella;bratislava;tbilisi;yerevan;baku;astana;tashkent;bishkek;dushanbe;ashgabat;ulaanbaatar;thimphu;kathmandu;dhaka;colombo;male;naypyidaw;vientiane;phnom penh;bandar seri begawan;dili;port moresby;honiara;suva;apia;nukualofa;port vila;wellington;rabat;algiers;tunis;tripoli;khartoum;juba;mogadishu',
      d: 'majuro;palikir;ngerulmud;melekeok;tarawa|south tarawa;funafuti;yaren|yaren district;moroni;victoria;port louis;antananarivo;maseru;mbabane;lobamba;gaborone;windhoek;lusaka;harare;maputo;lilongwe;dodoma;dar es salaam;kampala;kigali;bujumbura;gitega;libreville;malabo;sao tome;praia;bissau;banjul;conakry;freetown;monrovia;yamoussoukro;ouagadougou;bamako;niamey;ndjamena;nouakchott;djibouti;asmara',
      k: 'sri jayawardenepura kotte|kotte;sri jayawardenapura kotte;naypyidaw?;yamoussoukro?;putrajaya?'
    }),
    C('mountain', 'geography', 'Name a mountain or mountain range', {
      p: 'mount everest|everest;k2;kilimanjaro|mount kilimanjaro;mont blanc;matterhorn;alps;himalayas|himalaya;andes;rocky mountains|rockies;mount fuji|fuji;denali',
      c: 'mount olympus|olympus',
      s: 'kangchenjunga;lhotse;makalu;cho oyu;annapurna;nanga parbat;aconcagua;mount kenya;mount elbrus|elbrus;mount st helens|mount saint helens;mount rainier|rainier;mount whitney|whitney;mount rushmore;mount sinai|sinai;ararat|mount ararat;vesuvius|mount vesuvius;etna|mount etna;teide;pyrenees;carpathians;urals|ural mountains;appalachians|appalachian mountains;sierra nevada;cascades|cascade range;tetons|grand teton;atlas mountains|atlas;caucasus;apennines;dolomites;pamirs;karakoram;tian shan',
      r: 'huascaran;chimborazo;cotopaxi;ojos del salado;illimani;fitz roy;cerro torre;torres del paine;mount cook|aoraki;mount kosciuszko|kosciuszko;mount wilhelm;puncak jaya|carstensz pyramid;mount vinson;mount erebus;gran paradiso;eiger;jungfrau;monch;monte rosa;weisshorn;dom;piz bernina;ortler;grossglockner;zugspitze;triglav;musala;rila;olympus?;parnassus;mount athos|athos;mount pelion|pelion;ossa;mount ida|ida;gerlach|gerlachovsky stit;rysy;mount snowdon|snowdon|yr wyddfa;ben nevis;scafell pike;slieve donard;carrauntoohil;galdhopiggen;kebnekaise;halti;hvannadalshnukur;mount fansipan|fansipan;mount kinabalu|kinabalu;mount apo;mount mayon|mayon;mount pinatubo|pinatubo',
      d: 'mount toubkal|toubkal;ras dashen;mount stanley|margherita peak;mount meru|meru;mount cameroon;mount nyiragongo|nyiragongo;mount karisimbi;mount elgon|elgon;table mountain;drakensberg;thabana ntlenyana;mulanje|mount mulanje;mount kailash|kailash;mount sumeru?;adam’s peak|adams peak|sri pada;mount mitchell;mount washington;mount katahdin|katahdin;mount marcy;mount mansfield;clingmans dome;mount shasta|shasta;lassen peak;mount hood|hood;mount baker|baker;glacier peak;mount adams;mount olympus (washington)?',
      k: 'ushba;shkhara;dykh-tau;kazbek|mount kazbek;tetnuldi;ushguli?;pik pobeda|jengish chokusu;khan tengri;muztagh ata;lenin peak;ismoil somoni peak|communism peak'
    }),
    C('desert', 'geography', 'Name a desert', {
      p: 'sahara;gobi;mojave;kalahari;atacama;arabian desert|arabian;sonoran;namib;antarctica?;thar',
      c: 'antarctic desert',
      s: 'great victoria desert|great victoria;great sandy desert|great sandy;gibson desert;simpson desert;tanami desert;sturt stony desert;painted desert;chihuahuan desert|chihuahuan;great basin desert|great basin;negev;sinai desert|sinai;syrian desert;rub al khali|empty quarter;nubian desert;libyan desert;taklamakan;karakum;kyzylkum;patagonian desert|patagonia;sechura;colorado desert;black rock desert;death valley?;white sands?;nefud|an nafud;dasht-e kavir|kavir;dasht-e lut|lut',
      r: 'danakil|danakil desert|afar;ogaden;chalbi;lompoul;tenere|ténéré;erg chebbi;grand erg oriental;grand erg occidental;djurab;bayuda;eastern desert|arabian desert egypt;western desert;qattara depression?;dahna|ad dahna;wahiba sands|sharqiya sands;thal desert;cholistan;rann of kutch|kutch;gurbantunggut;badain jaran;tengger;ordos;kubuqi;alxa;hobq|kubuqi?;lop nur|lop desert;qaidam|qaidam basin?;thar?;registan;kharan;chagai;dasht-e margo|margo;lut?',
      d: 'monte desert;puna de atacama;puna;espinal?;guajira|la guajira desert;tatacoa;paraguana;medanos de coro;la guajira?;sechura?;peruvian coastal desert;paracas desert;nazca desert;pampa de la joya;lomas?;camanchaca?;baja california desert|vizcaino desert;colorado plateau?;mojave?;owyhee;high desert;painted?;red desert;great salt lake desert|bonneville;smoke creek desert;carson desert;black rock?;alvord desert',
      k: 'lut?;kharan?;la guajira?;nullarbor|nullarbor plain;strzelecki desert|strzelecki;pedirka;barkly tableland?'
    }),
    C('island', 'geography', 'Name an island', {
      p: 'hawaii;greenland;madagascar;iceland;ireland;cuba;sicily;jamaica;tasmania;manhattan;borneo;sumatra;java;great britain|britain',
      c: 'easter island',
      s: 'cyprus;crete;sardinia;corsica;malta;mallorca|majorca;ibiza;menorca|minorca;santorini;mykonos;rhodes;corfu;capri;elba;bali;lombok;sri lanka|ceylon;taiwan;hainan;honshu;hokkaido;kyushu;shikoku;okinawa;new zealand?;north island;south island;fiji?;tahiti;bora bora;maui;oahu;kauai;puerto rico;bermuda;bahamas;barbados;trinidad;haiti|hispaniola;st lucia|saint lucia;martinique;guadeloupe;aruba;curacao;bonaire',
      r: 'faroe islands;shetland;orkney;hebrides|outer hebrides;isle of skye|skye;isle of man|man;isle of wight|wight;jersey;guernsey;anglesey;lundy;iona;staffa;rockall;st kilda;svalbard|spitsbergen;jan mayen;bear island;gotland;oland;bornholm;aland;saaremaa;hiiumaa;rugen;usedom;sylt;heligoland|helgoland;texel;ameland;borkum;ushant|ouessant;belle-ile|belle ile;ile de re;oleron;noirmoutier;corsica?;porquerolles;hyeres islands;lipari;stromboli;vulcano;salina;ustica;pantelleria;lampedusa;linosa',
      d: 'tristan da cunha;saint helena|st helena;ascension island;falkland islands|falklands;south georgia;bouvet island|bouvetoya;heard island;kerguelen;crozet islands;amsterdam island;saint paul island;marion island;prince edward islands;pitcairn island|pitcairn;henderson island;ducie island;oeno island;rapa nui?;sala y gomez;juan fernandez|robinson crusoe island;chiloe;tierra del fuego;isla navarino|navarino;wollaston islands;diego ramirez;cape horn island|hornos',
      k: 'north sentinel island|north sentinel;sentinel island;bouvet?;peter i island;scott island;balleny islands'
    }),
    C('uscapital', 'geography', 'Name a US state capital', {
      p: 'sacramento;austin;albany;boston;denver;atlanta;phoenix;nashville;honolulu;juneau',
      c: 'springfield',
      s: 'columbus;indianapolis;lansing;madison;st. paul|saint paul|st paul;des moines;jefferson city;lincoln;topeka;oklahoma city;little rock;baton rouge;jackson;montgomery;tallahassee;raleigh;columbia;richmond;annapolis;dover;harrisburg;trenton;hartford;providence;concord;montpelier;augusta;olympia;salem;boise;helena;cheyenne;salt lake city;carson city;santa fe;pierre;bismarck;charleston;frankfort;richmond?',
      r: 'olympia?;pierre?;carson city?;montpelier?;dover?;annapolis?;juneau?;frankfort?;jefferson city?;topeka?;lansing?;harrisburg?;trenton?;concord?;augusta?;helena?',
      d: 'st. paul?;santa fe?;cheyenne?',
      k: 'pierre?'
    }),
    C('africancountry', 'geography', 'Name a country in Africa', {
      p: 'egypt;nigeria;south africa;kenya;morocco;ethiopia;ghana;algeria;tanzania;libya;tunisia;sudan;senegal',
      c: 'madagascar',
      s: 'uganda;angola;mozambique;zimbabwe;zambia;namibia;botswana;cameroon;ivory coast|cote d’ivoire|cote d ivoire;democratic republic of the congo|dr congo|drc|congo;republic of the congo;mali;niger;chad;somalia;rwanda;burundi;malawi;mauritius;seychelles;mauritania;benin;togo;sierra leone;liberia;guinea;gabon;lesotho;eswatini|swaziland;eritrea;djibouti;burkina faso;central african republic|car;south sudan;equatorial guinea;gambia|the gambia;guinea-bissau|guinea bissau;cape verde|cabo verde;comoros;sao tome and principe|sao tome',
      r: 'western sahara?;somaliland?',
      d: 'sao tome?;comoros?',
      k: 'sahrawi arab democratic republic?'
    }),
    C('lake', 'geography', 'Name a lake', {
      p: 'lake superior|superior;lake michigan|michigan;lake huron|huron;lake erie|erie;lake ontario|ontario;lake victoria|victoria;lake tahoe|tahoe;lake geneva|geneva;loch ness;lake como|como;great salt lake;lake titicaca|titicaca',
      c: 'caspian sea',
      s: 'lake baikal|baikal;lake tanganyika|tanganyika;lake malawi|lake nyasa|malawi|nyasa;lake chad|chad;lake nasser;lake constance|bodensee|constance;lake lucerne|lucerne;lake maggiore|maggiore;lake garda|garda;lake balaton|balaton;lake ladoga|ladoga;lake onega|onega;lake windermere|windermere;lake district?;lough neagh|neagh;lough erne;lake powell;lake mead;lake louise;lake placid;lake champlain|champlain;lake okeechobee|okeechobee;lake pontchartrain|pontchartrain;crater lake;lake taupo|taupo;lake eyre|eyre;lake biwa|biwa;lake toba|toba;lake kivu|kivu;lake turkana|turkana;lake albert;lake edward;lake kariba|kariba;lake volta|volta',
      r: 'lake vanern|vanern;lake vattern|vattern;lake malaren|malaren;lake saimaa|saimaa;lake inari|inari;lake peipus|peipus;lake mjosa|mjosa;lake thingvallavatn|thingvallavatn;lake myvatn|myvatn;lake ohrid|ohrid;lake prespa|prespa;lake skadar|skadar;lake bled|bled;lake bohinj|bohinj;lake neusiedl|neusiedl;lake hallstatt|hallstatter see;lake wolfgang;lake zurich|zurichsee;lake neuchatel|neuchatel;lake annecy|annecy;lake bourget|bourget;lake orta|orta;lake lugano|lugano;lake iseo|iseo;lake trasimeno|trasimeno;lake bolsena|bolsena;lake bracciano|bracciano;lake vico|vico;lake albano|albano;lake nemi|nemi',
      d: 'lake vostok;lake ellsworth;lake whillans;lake untersee;lake vanda;lake fryxell;lake bonney;lake hoare;lake joyce;don juan pond;lake hazen;lake athabasca;great slave lake;great bear lake;lake winnipeg;lake winnipegosis;lake manitoba;lake nipigon;lake of the woods;rainy lake;lake nipissing;lake simcoe;lake st. clair|lake st clair;lake nicaragua|cocibolca;lake managua|xolotlan;lake atitlan|atitlan;lake maracaibo|maracaibo;lake poopo|poopo;lake argentino;lake nahuel huapi;lake llanquihue;lake villarrica',
      k: 'lake natron;lake nakuru;lake bogoria;lake magadi;lake retba|lac rose;lake assal;lake abbe;lake tana?;lake ziway;lake langano;lake awassa|hawassa'
    }),
    C('strait', 'geography', 'Name a sea, ocean, strait, gulf or bay', {
      p: 'atlantic ocean|atlantic;pacific ocean|pacific;indian ocean|indian;arctic ocean|arctic;mediterranean sea|mediterranean;caribbean sea|caribbean;red sea;black sea;north sea;baltic sea|baltic;dead sea;gulf of mexico|gulf of mexico',
      c: 'bermuda triangle?',
      s: 'southern ocean;south china sea;east china sea;sea of japan;yellow sea;bering sea;arabian sea;bay of bengal;persian gulf;gulf of aden;gulf of oman;gulf of california;hudson bay;baffin bay;bay of biscay|biscay;english channel;irish sea;celtic sea;adriatic sea|adriatic;aegean sea|aegean;ionian sea|ionian;tyrrhenian sea|tyrrhenian;ligurian sea|ligurian;sea of marmara|marmara;caspian sea;aral sea;sea of azov|azov;barents sea;white sea;kara sea;laptev sea;east siberian sea;chukchi sea;beaufort sea;labrador sea;norwegian sea;greenland sea',
      r: 'strait of gibraltar|gibraltar;bosphorus;dardanelles;strait of hormuz|hormuz;strait of malacca|malacca;bab-el-mandeb|bab el mandeb;strait of magellan|magellan;bering strait;drake passage;davis strait;denmark strait;strait of dover|dover;strait of messina|messina;strait of bonifacio|bonifacio;skagerrak;kattegat;oresund|oresund strait;great belt;little belt;gulf of bothnia|bothnia;gulf of finland;gulf of riga|riga;gulf of gdansk;gulf of lion|gulf of lions;gulf of genoa;gulf of taranto;gulf of corinth;gulf of sidra|sidra;gulf of suez;gulf of aqaba|aqaba;gulf of guinea;gulf of thailand;gulf of tonkin|tonkin;gulf of carpentaria|carpentaria;great australian bight;bay of fundy|fundy;chesapeake bay|chesapeake;san francisco bay|san francisco;puget sound;cook strait;bass strait;torres strait;timor sea;arafura sea;coral sea;tasman sea;banda sea;celebes sea|sulawesi sea;sulu sea;philippine sea',
      d: 'sargasso sea;ross sea;weddell sea;amundsen sea;bellingshausen sea;scotia sea;lazarev sea;riiser-larsen sea;cosmonauts sea;davis sea;mawson sea;dumont d’urville sea|dumont durville sea;somov sea;hudson strait;foxe basin;gulf of boothia;lancaster sound;nares strait;kennedy channel;robeson channel;smith sound;cabot strait;strait of belle isle;northumberland strait;juan de fuca|strait of juan de fuca;georgia strait|strait of georgia;johnstone strait;queen charlotte strait;hecate strait;dixon entrance;chatham strait;icy strait;cook inlet;shelikof strait;unimak pass',
      k: 'sea of okhotsk|okhotsk;sea of galilee?;kerch strait|kerch;tatar strait;la perouse strait|soya strait;korea strait;tsugaru strait;kanmon strait;luzon strait;makassar strait;sunda strait;lombok strait;karimata strait;singapore strait;palk strait;mozambique channel;bab-el-mandeb?'
    })
  ];
  // clean-up: remove entries that end with '?' (uncertain placeholders) and empties
  cats.forEach(c => {
    Object.keys(c.t).forEach(k => {
      c.t[k] = c.t[k].split(';').map(s => s.trim()).filter(s => s && !s.endsWith('?')).join(';');
    });
  });
  // rebalance sparse categories so every tier exists
  const L = x => (x ? x.split(';').filter(Boolean) : []);
  cats.forEach(c => {
    const t = c.t;
    if (!L(t.r).length || !L(t.d).length) {
      const all = L(t.s);
      const n = all.length;
      const cut1 = Math.ceil(n * 0.5), cut2 = Math.ceil(n * 0.8), cut3 = Math.max(cut2 + 1, n - 1);
      t.s = all.slice(0, cut1).join(';');
      t.r = L(t.r).concat(all.slice(cut1, cut2)).join(';');
      t.d = L(t.d).concat(all.slice(cut2, cut3)).join(';');
      t.k = L(t.k).concat(all.slice(cut3)).join(';');
    }
    if (!L(t.k).length) {
      const d = L(t.d);
      t.k = d.pop();
      t.d = d.join(';');
    }
  });
  return cats;
})();
