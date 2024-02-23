interface Event{
    id?:string,
    date:string,
    project:string,
    programme:string,
    location:string
}

interface Member{
    id?:string,
    name:string,
    telephone:number,
    id_number:number,
    email:string
}
export type{
    Event,
    Member,
}