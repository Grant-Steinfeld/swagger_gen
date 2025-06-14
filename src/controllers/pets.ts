import { Request, Response } from 'express';
import { pets } from '../models/pets';

export function getPets(req: Request, res: Response) {
  const { type, breed } = req.query;
  let filtered = pets;
  if (type) filtered = filtered.filter(p => p.type === type);
  if (breed) filtered = filtered.filter(p => p.breed === breed);
  res.json(filtered);
}

export function addPet(req: Request, res: Response) {
  const pet = req.body;
  pet.id = pets.length + 1;
  pets.push(pet);
  res.status(201).json(pet);
}

export function updatePet(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const idx = pets.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Pet not found' });
  pets[idx] = { ...pets[idx], ...req.body, id };
  res.json(pets[idx]);
}

export function patchPet(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const idx = pets.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Pet not found' });
  pets[idx] = { ...pets[idx], ...req.body, id };
  res.json(pets[idx]);
}
