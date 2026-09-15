// Central place for the host to edit event details.
// Every visitor-facing value (except fixed UI labels) comes from here.
// Fill in the TODO placeholders before sharing the link.

export const EVENT = {
  honoree: "Siiri",
  age: 45,
  dateTime: "TODO: nt 12. juuli 2026, kell 18:00",
  locationName: "TODO: koha nimi",
  address: "TODO: täisaadress navigeerimiseks",
  inviteText: "TODO: kutse tekst siia",
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
