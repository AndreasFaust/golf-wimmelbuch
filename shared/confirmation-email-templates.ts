export interface ConfirmationEmailTemplate {
  brand: string;
  subject: string;
  greeting: (name: string) => string;
  intro: string;
  detailsTitle: string;
  fieldLabels: {
    club: string;
    auflage: string;
    phone: string;
    street: string;
    city: string;
    country: string;
    message: string;
  };
  closing: string;
  signature: string;
}

export const CONFIRMATION_EMAIL_TEMPLATES = {
  de: {
    brand: "Golf-Wimmelbuch",
    subject: "Bestätigung Ihrer Anfrage – Das große Golf-Wimmelbuch",
    greeting: (name) => `Hallo ${name},`,
    intro:
      "vielen Dank für Ihre Anfrage zum großen Golf-Wimmelbuch. Wir haben Ihre Angaben erhalten und melden uns in Kürze persönlich bei Ihnen.",
    detailsTitle: "Ihre Angaben",
    fieldLabels: {
      club: "Club",
      auflage: "Mögliche Auflage",
      phone: "Telefon",
      street: "Straße / Hausnummer",
      city: "PLZ / Ort",
      country: "Land",
      message: "Nachricht",
    },
    closing: "Mit herzlichen Grüßen",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  en: {
    brand: "Golf Search-and-Find Book",
    subject:
      "Confirmation of your request – The Big Golf Search-and-Find Book",
    greeting: (name) => `Hello ${name},`,
    intro:
      "thank you for your request regarding The Big Golf Search-and-Find Book. We have received your details and will get back to you personally shortly.",
    detailsTitle: "Your details",
    fieldLabels: {
      club: "Club",
      auflage: "Possible edition",
      phone: "Phone",
      street: "Street / House number",
      city: "Postcode / City",
      country: "Country",
      message: "Message",
    },
    closing: "Best regards,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  fr: {
    brand: "Livre Cherche et Trouve Golf",
    subject:
      "Confirmation de votre demande – Le grand livre Cherche et Trouve Golf",
    greeting: (name) => `Bonjour ${name},`,
    intro:
      "merci pour votre demande concernant le grand livre Cherche et Trouve Golf. Nous avons bien reçu vos informations et nous vous contacterons prochainement.",
    detailsTitle: "Vos informations",
    fieldLabels: {
      club: "Club",
      auflage: "Tirage possible",
      phone: "Téléphone",
      street: "Rue / Numéro",
      city: "Code postal / Ville",
      country: "Pays",
      message: "Message",
    },
    closing: "Cordialement,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  es: {
    brand: "Libro de Busca y Encuentra de Golf",
    subject:
      "Confirmación de su solicitud – El gran libro de Busca y Encuentra de Golf",
    greeting: (name) => `Hola ${name},`,
    intro:
      "gracias por su solicitud sobre el gran libro de Busca y Encuentra de Golf. Hemos recibido sus datos y nos pondremos en contacto con usted en breve.",
    detailsTitle: "Sus datos",
    fieldLabels: {
      club: "Club",
      auflage: "Tirada posible",
      phone: "Teléfono",
      street: "Calle / Número",
      city: "Código postal / Ciudad",
      country: "País",
      message: "Mensaje",
    },
    closing: "Atentamente,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  it: {
    brand: "Libro Cerca e Trova Golf",
    subject:
      "Conferma della vostra richiesta – Il grande libro Cerca e Trova Golf",
    greeting: (name) => `Buongiorno ${name},`,
    intro:
      "grazie per la vostra richiesta relativa al grande libro Cerca e Trova Golf. Abbiamo ricevuto i vostri dati e vi contatteremo a breve.",
    detailsTitle: "I vostri dati",
    fieldLabels: {
      club: "Club",
      auflage: "Tiratura possibile",
      phone: "Telefono",
      street: "Via / Numero civico",
      city: "CAP / Città",
      country: "Paese",
      message: "Messaggio",
    },
    closing: "Cordiali saluti,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  nl: {
    brand: "Golf Zoekboek",
    subject: "Bevestiging van uw aanvraag – Het grote Golf Zoekboek",
    greeting: (name) => `Hallo ${name},`,
    intro:
      "bedankt voor uw aanvraag over het grote Golf Zoekboek. Wij hebben uw gegevens ontvangen en nemen binnenkort persoonlijk contact met u op.",
    detailsTitle: "Uw gegevens",
    fieldLabels: {
      club: "Club",
      auflage: "Mogelijke oplage",
      phone: "Telefoon",
      street: "Straat / Huisnummer",
      city: "Postcode / Plaats",
      country: "Land",
      message: "Bericht",
    },
    closing: "Met vriendelijke groet,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  pt: {
    brand: "Livro de Procura e Encontra de Golfe",
    subject:
      "Confirmação do seu pedido – O grande livro de Procura e Encontra de Golfe",
    greeting: (name) => `Olá ${name},`,
    intro:
      "obrigado pelo seu pedido relativo ao grande livro de Procura e Encontra de Golfe. Recebemos os seus dados e entraremos em contacto consigo em breve.",
    detailsTitle: "Os seus dados",
    fieldLabels: {
      club: "Clube",
      auflage: "Tiragem possível",
      phone: "Telefone",
      street: "Rua / Número",
      city: "Código postal / Localidade",
      country: "País",
      message: "Mensagem",
    },
    closing: "Com os melhores cumprimentos,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  pl: {
    brand: "Golfowa książka Znajdź i zobacz",
    subject:
      "Potwierdzenie zapytania – Wielka golfowa książka Znajdź i zobacz",
    greeting: (name) => `Dzień dobry ${name},`,
    intro:
      "dziękujemy za zapytanie dotyczące wielkiej golfowej książki Znajdź i zobacz. Otrzymaliśmy Państwa dane i wkrótce skontaktujemy się osobiście.",
    detailsTitle: "Państwa dane",
    fieldLabels: {
      club: "Klub",
      auflage: "Możliwy nakład",
      phone: "Telefon",
      street: "Ulica / Numer",
      city: "Kod pocztowy / Miasto",
      country: "Kraj",
      message: "Wiadomość",
    },
    closing: "Z poważaniem,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  cs: {
    brand: "Golfová hledací kniha",
    subject: "Potvrzení poptávky – Velká golfová hledací kniha",
    greeting: (name) => `Dobrý den ${name},`,
    intro:
      "děkujeme za vaši poptávku týkající se velké golfové hledací knihy. Obdrželi jsme vaše údaje a brzy se vám osobně ozveme.",
    detailsTitle: "Vaše údaje",
    fieldLabels: {
      club: "Klub",
      auflage: "Možný náklad",
      phone: "Telefon",
      street: "Ulice / Číslo popisné",
      city: "PSČ / Město",
      country: "Země",
      message: "Zpráva",
    },
    closing: "S pozdravem",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  sk: {
    brand: "Golfová hľadacia kniha",
    subject: "Potvrdenie dopytu – Veľká golfová hľadacia kniha",
    greeting: (name) => `Dobrý deň ${name},`,
    intro:
      "ďakujeme za váš dopyt týkajúci sa veľkej golfovej hľadacej knihy. Obdržali sme vaše údaje a čoskoro sa vám osobne ozveme.",
    detailsTitle: "Vaše údaje",
    fieldLabels: {
      club: "Klub",
      auflage: "Možný náklad",
      phone: "Telefón",
      street: "Ulica / Číslo",
      city: "PSČ / Mesto",
      country: "Krajina",
      message: "Správa",
    },
    closing: "S pozdravom",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  hu: {
    brand: "Golf keresd meg könyv",
    subject: "Ajánlatkérés visszaigazolása – A nagy golf keresd meg könyv",
    greeting: (name) => `Tisztelt ${name}!`,
    intro:
      "köszönjük ajánlatkérését a nagy golf keresd meg könyvvel kapcsolatban. Megkaptuk adatait, és hamarosan személyesen felvesszük Önnel a kapcsolatot.",
    detailsTitle: "Az Ön adatai",
    fieldLabels: {
      club: "Klub",
      auflage: "Lehetséges példányszám",
      phone: "Telefon",
      street: "Utca / Házszám",
      city: "Irányítószám / Város",
      country: "Ország",
      message: "Üzenet",
    },
    closing: "Üdvözlettel,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  hr: {
    brand: "Golf knjiga Traži i pronađi",
    subject:
      "Potvrda upita – Velika golf knjiga Traži i pronađi",
    greeting: (name) => `Poštovani ${name},`,
    intro:
      "hvala vam na upitu u vezi velike golf knjige Traži i pronađi. Primili smo vaše podatke i uskoro ćemo vas osobno kontaktirati.",
    detailsTitle: "Vaši podaci",
    fieldLabels: {
      club: "Klub",
      auflage: "Mogući tiraž",
      phone: "Telefon",
      street: "Ulica / Kućni broj",
      city: "Poštanski broj / Grad",
      country: "Država",
      message: "Poruka",
    },
    closing: "S poštovanjem,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  sl: {
    brand: "Golfova knjiga Poišči in najdi",
    subject:
      "Potrditev povpraševanja – Velika golfova knjiga Poišči in najdi",
    greeting: (name) => `Spoštovani ${name},`,
    intro:
      "hvala za vaše povpraševanje glede velike golfove knjige Poišči in najdi. Prejeli smo vaše podatke in vam bomo kmalu osebno odgovorili.",
    detailsTitle: "Vaši podatki",
    fieldLabels: {
      club: "Klub",
      auflage: "Možna naklada",
      phone: "Telefon",
      street: "Ulica / Hišna številka",
      city: "Poštna številka / Kraj",
      country: "Država",
      message: "Sporočilo",
    },
    closing: "Lep pozdrav,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  da: {
    brand: "Golf find-og-se-bog",
    subject: "Bekræftelse af forespørgsel – Den store golf find-og-se-bog",
    greeting: (name) => `Hej ${name},`,
    intro:
      "tak for jeres forespørgsel om den store golf find-og-se-bog. Vi har modtaget jeres oplysninger og vender personligt tilbage til jer snart.",
    detailsTitle: "Jeres oplysninger",
    fieldLabels: {
      club: "Klub",
      auflage: "Muligt oplag",
      phone: "Telefon",
      street: "Gade / Husnummer",
      city: "Postnummer / By",
      country: "Land",
      message: "Besked",
    },
    closing: "Med venlig hilsen",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  sv: {
    brand: "Golfletarbok",
    subject: "Bekräftelse av förfrågan – Den stora golfletarbok",
    greeting: (name) => `Hej ${name},`,
    intro:
      "tack för er förfrågan om den stora golfletarbok. Vi har tagit emot era uppgifter och återkommer personligen inom kort.",
    detailsTitle: "Era uppgifter",
    fieldLabels: {
      club: "Klubb",
      auflage: "Möjlig upplaga",
      phone: "Telefon",
      street: "Gata / Husnummer",
      city: "Postnummer / Ort",
      country: "Land",
      message: "Meddelande",
    },
    closing: "Med vänliga hälsningar,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  nb: {
    brand: "Golf finn-og-se-bok",
    subject: "Bekreftelse av forespørsel – Den store golf finn-og-se-boka",
    greeting: (name) => `Hei ${name},`,
    intro:
      "takk for forespørselen om den store golf finn-og-se-boka. Vi har mottatt opplysningene deres og tar personlig kontakt snart.",
    detailsTitle: "Opplysningene deres",
    fieldLabels: {
      club: "Klubb",
      auflage: "Mulig opplag",
      phone: "Telefon",
      street: "Gate / Husnummer",
      city: "Postnummer / Sted",
      country: "Land",
      message: "Melding",
    },
    closing: "Med vennlig hilsen",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  fi: {
    brand: "Golf Etsi ja löydä -kirja",
    subject:
      "Pyynnön vahvistus – Suuri golf Etsi ja löydä -kirja",
    greeting: (name) => `Hei ${name},`,
    intro:
      "kiitos pyynnöstänne suuresta golf Etsi ja löydä -kirjasta. Olemme vastaanottaneet tietonne ja otamme pian henkilökohtaisesti yhteyttä.",
    detailsTitle: "Tietonne",
    fieldLabels: {
      club: "Seura",
      auflage: "Mahdollinen painos",
      phone: "Puhelin",
      street: "Katu / Numero",
      city: "Postinumero / Paikkakunta",
      country: "Maa",
      message: "Viesti",
    },
    closing: "Ystävällisin terveisin,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  lt: {
    brand: "Golfo rask ir surask knyga",
    subject:
      "Užklausos patvirtinimas – Didžioji golfo rask ir surask knyga",
    greeting: (name) => `Sveiki ${name},`,
    intro:
      "dėkojame už jūsų užklausą dėl didžiosios golfo rask ir surask knygos. Gavome jūsų duomenis ir netrukus susisieksime su jumis asmeniškai.",
    detailsTitle: "Jūsų duomenys",
    fieldLabels: {
      club: "Klubas",
      auflage: "Galimas tiražas",
      phone: "Telefonas",
      street: "Gatvė / Numeris",
      city: "Pašto kodas / Miestas",
      country: "Šalis",
      message: "Žinutė",
    },
    closing: "Pagarbiai,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  lv: {
    brand: "Golfa meklē un atrod grāmata",
    subject:
      "Pieprasījuma apstiprinājums – Lielā golfa meklē un atrod grāmata",
    greeting: (name) => `Labdien, ${name}!`,
    intro:
      "paldies par jūsu pieprasījumu par lielo golfa meklē un atrod grāmatu. Esam saņēmuši jūsu datus un drīz ar jums personīgi sazināsimies.",
    detailsTitle: "Jūsu dati",
    fieldLabels: {
      club: "Klubs",
      auflage: "Iespējamais tirāža",
      phone: "Tālrunis",
      street: "Iela / Mājas numurs",
      city: "Pasta indekss / Pilsēta",
      country: "Valsts",
      message: "Ziņojums",
    },
    closing: "Ar cieņu,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  et: {
    brand: "Golfi otsi ja leia raamat",
    subject:
      "Päringu kinnitus – Suur golfi otsi ja leia raamat",
    greeting: (name) => `Tere ${name},`,
    intro:
      "täname teid suure golfi otsi ja leia raamatu päringu eest. Oleme teie andmed kätte saanud ja võtame peagi isiklikult ühendust.",
    detailsTitle: "Teie andmed",
    fieldLabels: {
      club: "Klubi",
      auflage: "Võimalik tiraaž",
      phone: "Telefon",
      street: "Tänav / Maja number",
      city: "Postiindeks / Linn",
      country: "Riik",
      message: "Sõnum",
    },
    closing: "Lugupidamisega,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  el: {
    brand: "Βιβλίο γκολφ Βρες και δες",
    subject:
      "Επιβεβαίωση αιτήματος – Το μεγάλο βιβλίο γκολφ Βρες και δες",
    greeting: (name) => `Γεια σας ${name},`,
    intro:
      "σας ευχαριστούμε για το αίτημά σας σχετικά με το μεγάλο βιβλίο γκολφ Βρες και δες. Λάβαμε τα στοιχεία σας και θα επικοινωνήσουμε μαζί σας προσωπικά σύντομα.",
    detailsTitle: "Τα στοιχεία σας",
    fieldLabels: {
      club: "Σύλλογος",
      auflage: "Πιθανή έκδοση",
      phone: "Τηλέφωνο",
      street: "Οδός / Αριθμός",
      city: "Τ.Κ. / Πόλη",
      country: "Χώρα",
      message: "Μήνυμα",
    },
    closing: "Με εκτίμηση,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  ro: {
    brand: "Carte de golf Caută și găsește",
    subject:
      "Confirmarea solicitării – Marea carte de golf Caută și găsește",
    greeting: (name) => `Bună ziua ${name},`,
    intro:
      "vă mulțumim pentru solicitarea dumneavoastră privind marea carte de golf Caută și găsește. Am primit datele dumneavoastră și vă vom contacta personal în curând.",
    detailsTitle: "Datele dumneavoastră",
    fieldLabels: {
      club: "Club",
      auflage: "Tiraj posibil",
      phone: "Telefon",
      street: "Stradă / Număr",
      city: "Cod poștal / Oraș",
      country: "Țară",
      message: "Mesaj",
    },
    closing: "Cu stimă,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
  bg: {
    brand: "Голф книга Търси и намери",
    subject:
      "Потвърждение на запитване – Голямата голф книга Търси и намери",
    greeting: (name) => `Здравейте ${name},`,
    intro:
      "благодарим ви за запитването относно голямата голф книга Търси и намери. Получихме вашите данни и скоро ще се свържем с вас лично.",
    detailsTitle: "Вашите данни",
    fieldLabels: {
      club: "Клуб",
      auflage: "Възможен тираж",
      phone: "Телефон",
      street: "Улица / Номер",
      city: "Пощенски код / Град",
      country: "Държава",
      message: "Съобщение",
    },
    closing: "С уважение,",
    signature: "Ludwig Faust\nfaust kommunikation KG",
  },
} as const satisfies Record<string, ConfirmationEmailTemplate>;

export type ConfirmationEmailLocale = keyof typeof CONFIRMATION_EMAIL_TEMPLATES;

export function resolveConfirmationEmailLocale(
  value: unknown,
): ConfirmationEmailLocale {
  if (
    typeof value === "string" &&
    value in CONFIRMATION_EMAIL_TEMPLATES
  ) {
    return value as ConfirmationEmailLocale;
  }
  return "en";
}

export function getConfirmationEmailTemplate(value: unknown): {
  locale: ConfirmationEmailLocale;
  template: ConfirmationEmailTemplate;
} {
  const locale = resolveConfirmationEmailLocale(value);
  return { locale, template: CONFIRMATION_EMAIL_TEMPLATES[locale] };
}
