export interface Pet {
  id: number;
  type: 'dog' | 'cat' | 'fish';
  breed: string;
  name: string;
  age: number;
}

export const pets: Pet[] = [
  { id: 1, type: 'dog', breed: 'Basenji', name: 'Kito', age: 2 },
  { id: 2, type: 'dog', breed: 'Africanis', name: 'Simba', age: 3 },
  { id: 3, type: 'dog', breed: 'Boerboel', name: 'Zulu', age: 1 },
  { id: 4, type: 'cat', breed: 'Egyptian Mau', name: 'Nile', age: 4 },
  { id: 5, type: 'cat', breed: 'Abyssinian', name: 'Addis', age: 2 },
  { id: 6, type: 'cat', breed: 'Sokoke', name: 'Mombasa', age: 5 },
  { id: 7, type: 'fish', breed: 'African Cichlid', name: 'Lake', age: 1 },
  { id: 8, type: 'fish', breed: 'Congo Tetra', name: 'River', age: 2 },
  { id: 9, type: 'fish', breed: 'Elephantnose Fish', name: 'Trunk', age: 3 }
];
