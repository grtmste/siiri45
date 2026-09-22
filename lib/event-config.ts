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
      text: "Kuna talviste reisiplaanide tegemine kogub juba hoogsasti tuure, siis teavitan aegsasti, et 5.–6. veebruar paluks plaanidest välja jätta. Eksootilised palmisaared ja lumised suusakuurordid võivad sel nädalavahetusel oodata – maailma parim seltskond koguneb hoopis Taageperra!",
    },
    {
      text: "Kutsun teid Wagenkülli Talvevõlumaale meeleolukale koosviibimisele. Ees ootab suur juubelipidu koos luksusliku ööbimise ning sauna- ja spaamõnudega.",
    },
    {
      heading: "Mis, kus ja millal",
      items: [
        "Sisseregistreerimine Pargimajja alates kell 15:00. Võimalus nautida spaa- ja saunamõnusid.",
        "Pidu algab kell 19:00 ja kestab varajaste hommikutundideni.",
        "Peojärgsel hommikul pakutakse kosutavat hommikusööki.",
        "Pärast hommikusööki on võimalus end spaas turgutada.",
        "Tubade tagastamine ja koduteele asumine kell 12:00.",
      ],
    },
    {
      heading: "Kingisoov",
      text: "Kingitus võiks mahtuda ümbrikusse - soovin endale soetada päris oma isikliku maali. Lilled jätame seekord lillepoodi – hoiame loodust ja säästame teid lillevaaside ostmisest. 🙂",
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
