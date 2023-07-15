export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Mixers':
      return '#2db7f5';
    case 'Spirits':
      return '#f50';
    case 'Beer / Cider':
      return '#87d068';
    case 'Ready to drink':
      return '#108ee9';
  }
};
