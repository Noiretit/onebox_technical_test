export interface Booked {
  title: string;
  id: string;
  sessions: [
    {
      date: string;
      booked: number;
    }
  ];
}
