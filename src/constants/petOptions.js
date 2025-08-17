const STATUS_CHOICES = [
  { value: 1, label: 'Lost' },
  { value: 2, label: 'Found' },
  { value: 3, label: 'Seen' },
];

const SPECIES_CHOICES = [
  { value: 1, label: 'Dog' },
  { value: 2, label: 'Cat' },
  { value: 3, label: 'Other' },
];

const AGE_CHOICES = [
  { value: '', label: '-' },
  { value: 1, label: 'Young' },
  { value: 2, label: 'Adult' },
  { value: 3, label: 'Senior' },
];

const AGE_CHOICES_BY_SPECIES = {
  1: [
    // Dog
    { value: '', label: '-' },
    { value: 1, label: 'Puppy' },
    { value: 2, label: 'Adult' },
    { value: 3, label: 'Senior' },
  ],
  2: [
    // Cat
    { value: '', label: '-' },
    { value: 1, label: 'Kitten' },
    { value: 2, label: 'Adult' },
    { value: 3, label: 'Senior' },
  ],
  3: [
    // Other
    { value: '', label: '-' },
    { value: 1, label: 'Young' },
    { value: 2, label: 'Adult' },
    { value: 3, label: 'Senior' },
  ],
};

const SIZE_CHOICES = [
  { value: '', label: '-' },
  { value: 1, label: 'Small' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'Large' },
];

const GENDER_CHOICES = [
  { value: '', label: '-' },
  { value: 1, label: 'Male' },
  { value: 2, label: 'Female' },
];

const COUNTRY_DIALING_CODE_CHOICES = [
  { value: '', label: '-' },
  { value: '371', label: '+371 Latvia' },
  { value: '372', label: '+372 Estonia' },
  { value: '370', label: '+370 Lithuania' },
];

const PHONE_CODE_CHOICES = [
  { value: '', label: '-' },
  { value: '1', label: 'United States (+1)' },
  { value: '31', label: 'Netherlands (+31)' },
  { value: '33', label: 'France (+33)' },
  { value: '34', label: 'Spain (+34)' },
  { value: '39', label: 'Italy (+39)' },
  { value: '41', label: 'Switzerland (+41)' },
  { value: '44', label: 'United Kingdom (+44)' },
  { value: '46', label: 'Sweden (+46)' },
  { value: '48', label: 'Poland (+48)' },
  { value: '49', label: 'Germany (+49)' },
  { value: '370', label: 'Lithuania (+370)' },
  { value: '371', label: 'Latvia (+371)' },
  { value: '372', label: 'Estonia (+372)' },
];

const COLOR_CHOICES = [
  { value: '', hex: '', label: '' },
  { value: 1, hex: '#000000', label: 'Black' },
  { value: 2, hex: '#BEBEBE', label: 'Gray' },
  { value: 3, hex: '#f7f7f7', label: 'White' },
  { value: 4, hex: '#FFF1B9', label: 'Cream' },
  { value: 5, hex: '#FCDC5C', label: 'Yellow' },
  { value: 6, hex: '#FFA500', label: 'Golden' },
  { value: 7, hex: '#C37C4D', label: 'Brown' },
  { value: 8, hex: '#A71A20', label: 'Red' },
  { value: 9, hex: '#BA97AA', label: 'Lilac' },
  { value: 10, hex: '#1A355E', label: 'Blue' },
  { value: 11, hex: '#5F6F52', label: 'Green' },
  { value: 12, hex: '#BDB76B', label: 'Khaki' },
  { value: 13, hex: '#E5DECA', label: 'Beige' },
  { value: 14, hex: '#D2B48C', label: 'Fawn' },
  { value: 15, hex: '#954535', label: 'Chestnut' },
];

const PATTERN_CHOICES = [
  { value: '', label: '-' },
  { value: 1, label: 'Solid' },
  { value: 2, label: 'Striped' },
  { value: 3, label: 'Spotted' },
  { value: 4, label: 'Patched' },
  { value: 5, label: 'Marbled' },
];

const SERVICE_CATEGORIES = [
  { value: 1, label: 'Sitting' },
  { value: 2, label: 'Walking' },
  { value: 3, label: 'Grooming' },
  { value: 4, label: 'Training' },
  { value: 5, label: 'Boarding' },
  { value: 6, label: 'Veterinary' },
  { value: 7, label: 'Photography' },
  { value: 8, label: 'Rescue' },
  { value: 9, label: 'Supplies' },
  { value: 10, label: 'Art' },
  { value: 11, label: 'Burial' },
  { value: 12, label: 'Transport' },
  { value: 13, label: 'Breeders' },
  { value: 14, label: 'Insurance' },
  { value: 15, label: 'Miscellaneous' },
];

const SHELTER_CATEGORIES = [
  { value: 1, label: 'Municipal Shelter' },
  { value: 2, label: 'Animal Rescue' },
  { value: 3, label: 'Sanctuary' },
  { value: 4, label: 'Private Shelter' },
  { value: 5, label: 'Other' },
];

const PROVIDER_TYPES = [
  { value: 1, label: 'Individual' },
  { value: 2, label: 'Company' },
];

const PRICE_TYPE_CHOICES = [
  { value: 1, label: 'Per Hour' },
  { value: 2, label: 'Per Unit' },
  { value: 3, label: 'Per Day' },
  { value: 4, label: 'By Agreement' },
];

export {
  COUNTRY_DIALING_CODE_CHOICES,
  PRICE_TYPE_CHOICES,
  PROVIDER_TYPES,
  SHELTER_CATEGORIES,
  SERVICE_CATEGORIES,
  STATUS_CHOICES,
  SPECIES_CHOICES,
  AGE_CHOICES_BY_SPECIES,
  SIZE_CHOICES,
  GENDER_CHOICES,
  AGE_CHOICES,
  PHONE_CODE_CHOICES,
  COLOR_CHOICES,
  PATTERN_CHOICES,
};
