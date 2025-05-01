export async function generateAnalyticsData(model, filters = {}) {
  const last7Months = [];
  const currentDate = new Date();
  let totalCount = 0;

  for (let i = 6; i >= 0; i--) {
    // Calculate the start and end dates based on months
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, currentDate.getDate());
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i - 1, currentDate.getDate());

    // Formatting the month and year in a readable format
    const monthYear = endDate.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    // Combine date range with other filters
    const query = {
      ...filters,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    };

    // Count documents within the date range and with filters
    const count = await model.countDocuments(query);
    totalCount += count;

    last7Months.push({ month: monthYear, count });
  }

  return { 
    last7Months,
    totalCount
  };
}
