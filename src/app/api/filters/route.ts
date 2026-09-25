import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import { TableRowModel } from "@/models/table.model";

const filterFields = ["name", "email", "department", "city", "status"] as const;

export async function GET() {
	try {
		await connectDB();
		const values = await Promise.all(
			filterFields.map(async (field) => [field, await TableRowModel.distinct(field)] as const),
		);
		return NextResponse.json({ data: Object.fromEntries(values) });
	} catch (error) {
		console.error("Failed to fetch filter options:", error);
		return NextResponse.json({ message: "Failed to fetch filter options" }, { status: 500 });
	}
}
