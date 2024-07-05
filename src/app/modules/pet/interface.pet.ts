export type TPetFilterableFields = {
  species?: string | undefined;
  breed?: string | undefined;
  age?: string | undefined;
  size?: string | undefined;
  searchTerm?: string | undefined;
};
export type TPets = {
  name: string;
  species: string;
  breed: string;
  age: string;
  size: string;
  location: string;
  description: string;
  temperament: string;
  medicalHistory: string;
  adoptionRequirements: string;
};
