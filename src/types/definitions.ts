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

interface Project{
    id?:string,
    project:string,
    member_contributions:number,
    account_for_payment:number
}

export type{
    Event,
    Member,
    Project,
}