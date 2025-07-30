export const userMapping = (user : any) : UserType[] =>{
    return user.map((item : any) => ({
        id : item.id , 
        name : item.name  , 
        avatar : null,
        role : item.role , 
        email : item.email , 
        tasks : item.tasks ,
        projects : item.projects
    }))
}

export const SingleuserMapping = (item : any) : UserType =>{
    return  ({
        id : item.id , 
        name : item.name  , 
        avatar : item.avatar,
        role : item.role , 
        email : item.email , 
        tasks : item.tasks ,
        projects : item.projects
    })
}