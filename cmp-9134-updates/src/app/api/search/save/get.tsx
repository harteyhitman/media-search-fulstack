import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
 // Replace with the actual path to your authOptions
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req : any, res: any) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Unauthorized" });
  
    const userEmail = session.user?.email;
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { savedItems: true },
    });
  
    res.status(200).json(user?.savedItems || []);
  }
  