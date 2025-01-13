export enum BookStatus {
    AVAILABLE = 'available',
    BORROWED = 'borrowed',
    UNAVAILABLE = 'unavailable',
  }
  
  export const BookStatusLabels: Record<BookStatus, string> = {
    [BookStatus.AVAILABLE]: 'Disponible',
    [BookStatus.BORROWED]: 'Emprunté',
    [BookStatus.UNAVAILABLE]: 'Indisponible',
  };