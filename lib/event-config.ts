// Central place for the host to edit event details.
// Every visitor-facing value (except fixed UI labels) comes from here.

export type InviteBlock = {
  // Optional gold subheading shown above the content.
  heading?: string;
  // A paragraph of body copy...
  text?: string;
  // ...or a bulleted list (used instead of `text`).
  items?: string[];
};

export const EVENT = {
  honoree: "Siiri",
  age: 45,
  // TODO: kontrolli aastaarvu (kutses on kuupäev 5.–6. veebruar).
  dateTime: "5.–6. veebruar 2027, kell 19:00",
  locationName: "Wagenküll",
  address: "Wagenküll, Taagepera",
  inviteText: [
    {
      text: "Kuna talviste reisiplaanide tegemine kogub juba hoogsasti tuure, siis annan teile aegsasti teada, et jätke palun 5.–6. veebruar oma reisigraafikust välja. Eksootilised palmisaared ja lumised suusakuurordid võivad sel nädalavahetusel oodata – maailma parim seltskond koguneb hoopis Taageperas.",
    },
    {
      text: "Mul on suur rõõm kutsuda teid Wagenkülli Talvevõlumaale, et pidada üheskoos maha üks igati meeleolukas ja särtsakas koosviibimine. Et teie reisiotsust veelgi mugavamaks teha, on minu poolt teile täispakett: luksuslik ööbimine ning sauna- ja spaamõnude külastus.",
    },
    {
      heading: "Päevakava ja logistika",
      items: [
        "Sisseregistreerimine Pargimajja algab alates kell 15:00.",
        "Eelmäng enne õhtust pidu on teil suurepärane võimalus ja piisavalt aega, et teha tutvust spaa- ja saunamõnudega.",
        "Ametlik peo algus on täpselt kell 19:00.",
        "Järgmisel hommikul ootab teid kosutav hommikusöök kell 7:30–10:30.",
        "Pärast hommikusööki on taas võimalus end korraks spaas mullitama unustada.",
        "Kell 12:00 on aeg pakkida kohvrid ja asuda koduteele.",
      ],
    },
    {
      heading: "Teie kohustuslik reisi-varustus",
      text: "Elegantne supelustrikoo või ujumisriided (mullivannid ootavad teid juba pärastlõunast). Löögivalmis peomeeleolu.",
    },
    {
      heading: "Kingitustest ja floristikast",
      text: "Kingituse osas ei pea te pead vaevama ega üle mõtlema. Soovin endale soetada päris oma isikliku maali ja selle tarbeks piisab täiesti, kui leiate ümbrikusse ühe sobiva kupüüri. Mis puutub lilledesse, siis on minu suur palve need seekord lillepoodi jätta – hoiame loodust ja säästame teid lillevaaside ostmisest.",
    },
  ] as InviteBlock[],
};

// Directions helpers built from the address above.
export function googleMapsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    address
  )}`;
}

export function wazeUrl(address: string): string {
  return `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;
}
