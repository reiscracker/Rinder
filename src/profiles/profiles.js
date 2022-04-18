export default [
    {
        name: "Steak",
        tags: ["zart", "blutig", "roh"],
        image: require("../../assets/profiles/steak.jpg"),
        responses: [
            { type: "response", text: "Hi" },
            { type: "response", text: "Ich bin nicht billig!" },
            { type: "await user message" },
            { type: "response", text: "Hoffentlich stehst du auf ein bisschen Fettrand" },
            { type: "await user message" },
            { type: "info", text: "Der Benutzer ist offline." },
        ]
    },
    {
        name: "Braten",
        tags: ["fett", "kräftig"],
        image: require("../../assets/profiles/braten.jpg"),
        responses: [
            { type: "response", text: "Braten Response #1" }
        ]
    },
    {
        name: "Hack",
        tags: ["fein", "frisch"],
        image: require("../../assets/profiles/hack.jpg"),
        responses: [
            { type: "response", text: "Hi, ich bin Peter" },
            { type: "await user message" },
            { type: "response", text: "Weißt du, was man mit 8 Kilo Hackfleisch alles anstellen kann?" }
        ]
    },
    {
        name: "Merguez",
        tags: ["würzig", "scharf"],
        image: require("../../assets/profiles/merguez.jpg"),// https://commons.wikimedia.org/wiki/File:Merguez_grilled.jpg
        responses: [
            { type: "response", text: "Olé, Lust auf was exotisches?" },
            { type: "await user message" },
            { type: "response", text: "Ich hoffe du magst es scharf😏🌶️" },
        ]
    },
    {
        name: "TBone",
        tags: ["fett", "medium"],
        image: require("../../assets/profiles/tbone.jpg"), // https://commons.wikimedia.org/wiki/File:2018-02-19_212112_T-Bone_Steak_in_Sydney_anagoria.jpg
        responses: [
            { type: "response", text: "TBone Response #1" }
        ]
    },
    {
        name: "Dry aged beef",
        tags: ["gut abgehangen", "alt"],
        image: require("../../assets/profiles/dryaged.jpg"),
        responses: [
            { type: "response", text: "Hey, stehst du auf reifes Fleisch? 😉👴" },
            { type: "await user message" },
            { type: "response", text: "Je oller, desto doller!", },
        ]
    },
    {
        name: "Wiener Würstchen",
        tags: ["knackig", "zart"],
        image: require("../../assets/profiles/wiener.jpg"),  // Attribution: https://www.flickr.com/photos/97844767@N00/3456404501
        responses: [
            { type: "response", text: "Mich gibts nur als Paar.", },
            { type: "response", text: "Bock auf n Dreier?" },
        ]   // TODO wienerisch antworten
    },
    {
        name: "Burgerpatty",
        tags: ["mit Käse überbacken", "extra dick"],
        image: require("../../assets/profiles/burger.jpg"),
        responses: [
            { type: "response", text: "Bock auf n Dreier?" },
        ]
    },
    {
        name: "Leberkäse",
        tags: ["salzig", "außen kross, innen zart"],
        image: require("../../assets/profiles/leberkaese.jpg"),
        responses: [
            { type: "response", text: "Spreiz das Brötchen, spritz deinen Senf in mich rein 😏" },
            { type: "response", text: "Ich enttäusch dich nich, mich kriegste schon für n Euro beim Fleischer" },
        ],
    },
    {
        name: "Hackbraten",
        tags: ["grob", "ordentlich gewürzt"],
        image: require("../../assets/profiles/hackbraten.jpg"),    // Attribution: https://commons.wikimedia.org/wiki/File:Hackbraten_Leicht_Kemmern_(1).jpg 
        responses: [
            { type: "response", text: "Hackbraten Response #1" }
        ]
    },
    {
        name: "Bacon",
        tags: ["salzig", "kross", "haram"],
        image: require("../../assets/profiles/bacon.jpg"), // https://commons.wikimedia.org/wiki/File:Flickr_-_cyclonebill_-_Bacon_(1).jpg
        responses: [
            "🐷",
        ]
    },
    {
        name: "Speck",
        tags: ["mit viel Fett", "rauchig"],
        image: require("../../assets/profiles/speck.jpg"), // https://commons.wikimedia.org/wiki/File:S%C3%BCdtiroler_Speck_g.g.A._aufgeschnitten.jpg
        responses: [
            { type: "response", text: "Stehst du auf Speck, Baby? Magst du es ein bisschen fetter?" },
        ]
    },
    {
        name: "Ribs",
        tags: ["glasiert", "rauchig gegrillt"],
        image: require("../../assets/profiles/ribs.jpg"), // https://commons.wikimedia.org/wiki/File:Ribs_from_the_pit.jpg
        responses: [
            { type: "response", text: "Ich bin noch ziemlich jung, musst du wissen..." },
        ]
    },
    {
        name: "Tofu",
        tags: ["Geschmacklos"],
        image: require("../../assets/profiles/tofu.jpg"),
        responses: [
            { type: "warning", text: "Achtung, dieses Profil wurde als Fakeprofil gemeldet." },
            { type: "response", text: "Hey, ich bin nicht wie die Anderen" },
            { type: "response", text: "Ich kann aber auch lecker sein!" },
            { type: "await user message" },
            { type: "response", text: "Ich bin nich nur Ersatz" },
            { type: "response", text: "Ich bin echt ne Alternative!!" },
            { type: "await user message" },
            { type: "response", text: "Hey hier kam grad ne Meldung, moment.." },
            { type: "response", text: "Die sagen ich bin nich echt" },
            { type: "await user message" },
            { type: "response", text: "Oh fuck falls die mich jetzt sperren" },
            { type: "response", text: "Hier is meine Nummer, schreib mir:" },
            { type: "response", text: "" },
            { type: "info", text: "Der Benutzer existiert nicht mehr" },
        ],
    },
    {
        name: "Bulette/Frikadelle",
        tags: ["fein zerkleinert", "mit n' bisschen Senf"],
        image: require("../../assets/profiles/bulette.jpg"),
        responses: [
            { type: "response", text: "Bulette response #1" }
        ]
    },
    // Kotelett
    // Eisbein (Tag Berliner) Berlinert in antworten
    // Currywurscht
    // Lamm
    // Wiener Schnitzel
    // Krabbenburgerpatty
    // Schnitzel Wiener Art (Fakeprofil)
    // Lende
    // Hüftsteak
    // Schweinebäckchen
    // Tartar
    // Cordon Bleu (spricht Französisch)
    // Kobe-Rind (Premium Account)
    // Nackensteak (ordinär)
    // Leber
    // Roast Beef
    // Haggis
    // Blutwurst
    // Jerky ("Ich bin etwas zäh", "An mir hast du zu knabbern")
    // Dönerspieß ("Soße?" "Salat alles?" "Mit scharf?" "Einpacken?")
    // Salamwurst
    // Mortadella
    // Leberwurst
    // Teewurst
    // Cevapcici (kroatisch)
    // Gyros
    // Souvlaki
    // Bifteki
    // Stierhoden
    // Lamm/Hammel
    // Schweinebauch
    // Schinken
    // Mettwurst
    // Cabanossi
    // Zwiebelmett ("Hey I just mett you and this is crazy. But I'm delicious, so eat me maybe")
    // Andouille
    // Bratwurst
    // Kassler
    // Sellerieschnitzel (muss Button Fake-Profil melden)
    // Weißwurst
    // Frikandel
    // Mystery Meat
    // Bärchenwurst
];
