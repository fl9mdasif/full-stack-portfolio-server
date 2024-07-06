export type TPetFilterableFields = {
  species?: string | undefined;
  breed?: string | undefined;
  age?: string | undefined;
  size?: string | undefined;
  searchTerm?: string | undefined;
};

export type TProjects = {
  title?: string;
  des?: string;
  img?: string | undefined | null;
  link?: string;
  client?: string;
  server?: string;
  status?: string;
};
