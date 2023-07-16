export const getMeasurementColor = (measurementUnit: string) => {
  switch (measurementUnit) {
    case 'Case':
      return '#ffcccc'; // Pale Red
    case 'Case of 18':
      return '#ccffcc'; // Pale Green
    case 'Case of 20':
      return '#ccccff'; // Pale Blue
    case 'Case of 24':
      return '#ffccff'; // Pale Magenta
    case 'Ready to drink':
      return '#ffd8b1'; // Pale Orange
    case 'Bottle':
      return '#ffffcc'; // Pale Yellow
    case 'Keg/fustage':
      return '#A1EED1';
    default:
      return '#e8e8e8'; // Light Gray
  }
};
