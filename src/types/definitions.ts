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

interface Song{
    id?:string,
    song_name:string,
    youtube_link:string
}

interface User{
    uid:string,
    photoURL:any,
    email:any,
    displayName:any,
    phoneNumber:any,
    emailVerified:boolean
}

export type{
    Event,
    Member,
    Project,
    Song,
    User,
}