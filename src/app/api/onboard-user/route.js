import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req){
    try {
        const user=await currentUser()
        console.log(user)
        if(!user){
            return Response.json({
                success : false,
                error : "No authenticated user found"
            },{status : 401})
        }
        const {id,firstName,lastName,imageUrl,emailAddresses}=user
        const newUser=await prisma.user.upsert({
            where : {
                clerkId : id
            },
            update : {
                email : emailAddresses[0]?.emailAddress || "",
                firstName : firstName || null,
                lastName : lastName || null,
                imageUrl : imageUrl || null
            },
            create : {
                clerkId : id,
                email : emailAddresses[0]?.emailAddress || "",
                firstName : firstName || null,
                lastName : lastName || null,
                imageUrl : imageUrl || null
            }
        })
        return Response.json({
            success : true,
            user : newUser,
            message : "User onBoarded Successfully"
        },{status : 200})
    } catch (error) {
        console.log("Error onboarding user : ",error)
        return Response.json({
            success : false,
            error : "Failed to onboard user"
        },{status : 400})
    }
}
