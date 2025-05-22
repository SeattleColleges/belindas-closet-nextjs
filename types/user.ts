export interface LookingForItem {
  type: string;
  size?: string;
  gender?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pronoun: string;
  role?: string;
  degreeType?: string;
  major?: string;
  graduationMonth?: string;
  graduationYear?: string;
  lookingFor?: LookingForItem[];
} 