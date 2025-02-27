'use server';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Transaction } from "@/types/Transactions";

async function getTransactions():Promise<{
    transactions?: Transaction[];
    error?: string;
}> {
    const session = await auth()
    const userId = session.userId

    if (!userId){
        return {error: 'User not found'}
    }

    try{
        const transactions = await db.transaction.findMany({
            where: { userId },
            orderBy: {
                createdAt: 'desc'
            }
        })

        
        return { transactions }
    } catch(error){
        return { error: 'Database error'}
    }
}

export default getTransactions;