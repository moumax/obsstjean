const sortedByDate = (arr) => {
  const now = new Date();
  const sortedTab = arr.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA < now && dateB < now) {
      return dateA - dateB;
    }
    if (dateA < now) {
      return 1;
    }
    if (dateB < now) {
      return -1;
    }
    return dateA - dateB;
  });
  return sortedTab;
};

export default sortedByDate;
