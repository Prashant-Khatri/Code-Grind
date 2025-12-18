import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req){
    try {
        const user=await currentUser()
        if(!user){
            return Response.json({
                success : false,
                message : "No authenticated user found"
            },{status : 401})
        }
        const {id}=user;
        const userRole=await prisma.user.findUnique({
            where : {
                clerkId : id
            },
            select : {
                role : true
            }
        })
        console.log(userRole)
        if(!userRole || !userRole.role){
            if(!user){
                return Response.json({
                    success : false,
                    message : "No user found"
                },{status : 403})
            }
        }
        return Response.json({
            success : true,
            role : userRole.role,
            message : "User role found successfully"
        },{status : 200})
    } catch (error) {
        console.log("Error getting user role : ",error)
        return Response.json({
            success : false,
            message : "Error getting user role"
        },{status : 500})
    }
}