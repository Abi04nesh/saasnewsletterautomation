export async function generateAnalyticsData(model) {
  const last7Months = [];
  const currentDate = new Date();

  for (let i = 6; i >= 0; i--) {
    // Calculate the start and end dates based on months
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, currentDate.getDate());
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i - 1, currentDate.getDate());

    // Formatting the month and year in a readable format
    const monthYear = endDate.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    // Count documents within the date range
    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    last7Months.push({ month: monthYear, count });
  }

  return { last7Months };
}
