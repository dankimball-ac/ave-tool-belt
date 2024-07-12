export interface Contact {
    id?:number
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    type?: string;
    organization?: string;
    title?: string;
    projects?: string[];
    mobile?: string;
    address?: string;
    secondAddress?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  }

  
export interface Project {
    number: string;
    name: string;
    client: string;
    startDate: string;
    endDate: string;
  }
  