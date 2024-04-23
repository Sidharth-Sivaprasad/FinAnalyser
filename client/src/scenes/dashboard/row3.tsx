import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DasboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
	useGetKpisQuery,
	useGetProductsQuery,
	useGetTransactionsQuery,
} from "@/state/api";

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

function Row3() {
	const { data: kpiData } = useGetKpisQuery();
	const { data: productData } = useGetProductsQuery();
	const { data: transactionData } = useGetTransactionsQuery();

	const pieChartData = useMemo(() => {
		if (kpiData) {
			const totalExpenses = kpiData[0].totalExpenses;
			console.log(kpiData[0].expensesByCategory);
			return Object.entries(kpiData[0].expensesByCategory).map(
				([key, value]) => {
					return [
						{
							name: key,
							value: value,
						},
						{
							name: `${key} of Total`,
							value: totalExpenses - value,
						},
					];
				}
			);
		}
	}, [kpiData]);

	const productColumns = [
		{
			field: "_id",
			headerName: "id",
			flex: 1,
		},
		{
			field: "expense",
			headerName: "Expense",
			flex: 0.5,
			renderCell: (params: GridCellParams) => `$${params.value}`,
		},
		{
			field: "price",
			headerName: "Price",
			flex: 0.5,
			renderCell: (params: GridCellParams) => `$${params.value}`,
		},
	];

	const transactionColumns = [
		{
			field: "_id",
			headerName: "id",
			flex: 1,
		},
		{
			field: "buyer",
			headerName: "Buyer",
			flex: 0.67,
		},
		{
			field: "amount",
			headerName: "Amount",
			flex: 0.35,
			renderCell: (params: GridCellParams) => `$${params.value}`,
		},
		{
			field: "productIds",
			headerName: "Count",
			flex: 0.1,
			renderCell: (params: GridCellParams) =>
				(params.value as Array<string>).length,
		},
	];

	const { palette } = useTheme();
	const pieColor = [palette.primary[800], palette.primary[500]];

	return (
		<>
			<DashboardBox gridArea="g">
				<BoxHeader
					title="List of Products"
					sideText={`${productData?.length} products`}
				/>
				<Box
					mt="0.5rem"
					p="0.5rem"
					height="75%"
					sx={{
						"& .MuiDataGrid-root": {
							color: palette.grey[300],
							border: "none",
						},
						"& .MuiDataGrid-cell": {
							borderBottom: `1px solid ${palette.grey[800]} !important`,
						},
						"& .MuiDataGrid-columnHeaders": {
							borderBottom: `1px solid ${palette.grey[800]} !important`,
						},
						"& .MuiDataGrid-columnSeperator": {
							visibility: "hidden",
						},
					}}
				>
					<DataGrid
						columnHeaderHeight={25}
						rowHeight={35}
						hideFooter={true}
						rows={productData || []}
						columns={productColumns}
					/>
				</Box>
			</DashboardBox>
			<DashboardBox gridArea="h">
				<BoxHeader
					title="Recent Orders"
					sideText={`${transactionData?.length} latest transactions`}
				/>
				<Box
					mt="1rem"
					p="0.5rem"
					height="80%"
					sx={{
						"& .MuiDataGrid-root": {
							color: palette.grey[300],
							border: "none",
						},
						"& .MuiDataGrid-cell": {
							borderBottom: `1px solid ${palette.grey[800]} !important`,
						},
						"& .MuiDataGrid-columnHeaders": {
							borderBottom: `1px solid ${palette.grey[800]} !important`,
						},
						"& .MuiDataGrid-columnSeperator": {
							visibility: "hidden",
						},
					}}
				>
					<DataGrid
						columnHeaderHeight={25}
						rowHeight={35}
						hideFooter={true}
						rows={transactionData || []}
						columns={transactionColumns}
					/>
				</Box>
			</DashboardBox>
			<DashboardBox gridArea="i">
				<BoxHeader title="Categoize Breakdown Category" sideText="+4%" />
				<FlexBetween mt="-0.3rem" gap="-2rem" p="0 2rem" textAlign="center">
					{pieChartData?.map((data, i) => (
						<Box key={`${data[0].name}-${i}`}>
							<PieChart width={100} height={90}>
								<Pie
									data={data}
									stroke="none"
									innerRadius={18}
									outerRadius={35}
									paddingAngle={2}
									dataKey="value"
								>
									{data.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={pieColor[index]} />
									))}
								</Pie>
							</PieChart>
							<Typography variant="h5">{data[0].name}</Typography>
						</Box>
					))}
				</FlexBetween>
			</DashboardBox>
			<DashboardBox gridArea="j"></DashboardBox>
		</>
	);
}

export default Row3;
