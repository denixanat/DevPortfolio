export interface Proyecto{
    projectid: number;
    image: string;
    name: string;
    filter: string;
};

export interface Perfil {
    userid: number;
    name: string;
    image: string;
    shortdesc: string;
    longdesc: string;
    links: {
      linkedin?: string;
      github?: string;
      twitter?: string;
    };
    proyectos: Proyecto[];
  };