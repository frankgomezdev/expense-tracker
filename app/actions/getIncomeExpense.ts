'use server';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getIncomeExpense():Promise<{
    income?: number;
    expense?: number;
    error?: string;
}> {
    const session = await auth()
    const userId = session.userId

    if (!userId){
        return {error: 'User not found'}
    }

    try{
        const transactions = await db.transaction.findMany({
            where: { userId }
        })

        const amounts = transactions.map((transaction) => transaction.amount);

        const income = amounts.filter((item) => item > 0).reduce((acc, item) => acc + item)

        const expense = amounts.filter((item) => item < 0).reduce((acc, item) => acc + item)

        return { income, expense: Math.abs(expense) }

    } catch(error){
        return { error: 'Database error'}
    }
}

export default getIncomeExpense;