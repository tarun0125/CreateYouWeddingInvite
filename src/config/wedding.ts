/**
 * Central configuration for the Royal Wedding Invitation.
 * Edit the values below to customize the invitation.
 */

export interface WeddingConfig {
  groomName: string;
  brideName: string;
  weddingDate: string;        // Display string, e.g. "14th February 2025"
  weddingTime: string;        // Display string, e.g. "7:00 PM onwards"
  weddingDay: string;         // Day of week, e.g. "Friday"
  venueName: string;
  venueAddress: string;
  venueCity: string;
  invitationMessage: string;
  familyMessage: string;
  groomFamily: string;
  brideFamily: string;
  mediaVideoPath: string;
  mediaMusicPath: string;
  mediaPosterPath: string;
}

export const weddingConfig: WeddingConfig = {
  groomName: "[GROOM NAME]",
  brideName: "[BRIDE NAME]",
  weddingDate: "[DD Month YYYY]",
  weddingTime: "[HH:MM AM/PM] onwards",
  weddingDay: "[Day of Week]",
  venueName: "[Venue Name]",
  venueAddress: "[Venue Address, City, State]",
  venueCity: "[City]",
  invitationMessage:
    "With the blessings of our elders and the love of our families, we invite you to join us as we begin a beautiful journey together.",
  familyMessage:
    "Together with their families, they joyfully invite you to celebrate the beginning of their forever.",
  groomFamily: "[Groom's Family]",
  brideFamily: "[Bride's Family]",
  mediaVideoPath: "/media/royal-palace-intro.mp4",
  mediaMusicPath: "/media/wedding-music.mp3",
  mediaPosterPath: "/images/royal-palace-poster.webp",
};
