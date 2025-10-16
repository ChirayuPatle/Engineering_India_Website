# Prarambh 2025 - Registration Portal Setup

## ✅ What's Been Created

### 1. **New `/prarambh` Page** 
Location: `src/app/prarambh/page.tsx`

A beautiful **monotonic black & white** landing page featuring:
- **Hero Section** with black gradient background and clean typography
- **1 Featured Event** - Hackathon 2025 with detailed card:
  - **HACKATHON 2025** (Ultimate Socio-Technocrat) - ₹300
- Event card displays:
  - Event name, description, and icon (monotonic design)
  - Date: Nov 01, 2025
  - Time: 9:00 AM - 3:00 PM
  - Venue: YCCE, Nagpur
  - Team size: 2-4 members
  - Prize pool: ₹15,000
  - Registration fee: ₹300 per team
  - Direct "View Details & Register" button → `/events/hackathon`

### 2. **Announcement Marquee Component**
Location: `src/components/landing/marquee.tsx`

Features:
- **Monotonic black background** design
- Auto-scrolling announcement banner
- Key highlights: Hackathon event, date, prizes, limited seats
- Dismissable with close button
- Smooth animation that pauses on hover

### 3. **Updated Home Page**
Location: `src/app/page.tsx`

Added:
- Fixed position announcement marquee at the top (black theme)
- Prominent **"Register for Prarambh 2025"** CTA button below the main title
- **Black monotonic button** with sparkle icon
- Hover effects and animations

### 4. **CSS Animations**
Location: `src/styles/globals.css`

Added marquee animation:
```css
@keyframes marquee - Smooth infinite scroll
.animate-marquee - 30s duration, pauses on hover
```

## 🎨 Design Features

### Color Scheme - **Monotonic Black & White**
- **Primary**: Black (#000000) and White (#FFFFFF)
- **Accents**: Gray shades for depth
- Clean, professional, and modern aesthetic
- Matches the hackathon page design language

### Interactive Elements
- Hover effects on event card (border color changes to black)
- Button animations with arrow transitions
- Subtle scale effects on hover
- Smooth transitions throughout

### Responsive Design
- Mobile-first approach
- Single column layout (focused on hackathon)
- Touch-friendly buttons
- Readable text hierarchy

## 🚀 User Flow

1. **Home Page** → User sees black marquee announcement
2. Click **"Register for Prarambh 2025"** button (black)
3. **Prarambh Page** → View hackathon details
4. Click **"View Details & Register"** on hackathon card
5. Redirected to **`/events/hackathon`** → Complete registration

## 📱 Navigation

### From Home Page:
- Fixed marquee at top (dismissable, black theme)
- CTA button in hero section → `/prarambh`

### From Prarambh Page:
- "View Events" button → Scrolls to events section
- "Go to Dashboard" button → `/dashboard`
- "View Details & Register" button → `/events/hackathon`
- "Contact Us" button → `/contact`
- "View All Events" button → `/events`

## 🎯 Event Details

### HACKATHON 2025 (Ultimate Socio-Technocrat)
- **Date**: Nov 01, 2025
- **Time**: 9:00 AM - 3:00 PM
- **Venue**: YCCE, Nagpur
- **Fee**: ₹300 per team
- **Team**: 2-4 members
- **Prizes**: ₹15,000 total pool
- **Registration**: `/events/hackathon`

**Event Structure**:
- Round 1: Online PPT Submission
- Round 2: Onsite Hackathon at YCCE

## 🔗 URLs

- **Prarambh Landing**: `/prarambh`
- **Hackathon Details & Registration**: `/events/hackathon`
- **Dashboard**: `/dashboard`
- **Contact**: `/contact`
- **All Events**: `/events`

## 🎨 Components Used

- `Button` - shadcn/ui (black monotonic theme)
- `Card` - shadcn/ui with CardHeader, CardContent, CardFooter
- `Badge` - shadcn/ui (black background)
- `Container` - Custom landing component
- Lucide React icons (Calendar, Clock, MapPin, Users, Trophy, etc.)
- Next.js Image, Link, and useRouter
- Bebas Neue font for headings

## 💡 Customization Tips

### To Update Event Details:
Edit the `events` array in `src/app/prarambh/page.tsx` (lines 43-66)

### To Add More Events:
Add new objects to the `events` array with all required fields

### To Change Marquee Text:
Edit `src/components/landing/marquee.tsx` (lines 13-40)

### To Modify Button Colors:
Currently using:
- `bg-black` for primary buttons
- `hover:bg-gray-900` for hover states
- Maintain monotonic theme throughout

## ✨ Design Philosophy

**Monotonic Black & White Theme**:
- Professional and modern aesthetic
- Matches the hackathon event page design
- High contrast for better readability
- Minimalist and clean interface
- Focus on content and call-to-actions

## 🐛 Known Issues

None! All files compiled without errors ✅

## 📝 Files Created/Modified

### Created:
1. `src/app/prarambh/page.tsx` - Main Prarambh landing page (monotonic)
2. `src/components/landing/marquee.tsx` - Announcement banner (black)

### Modified:
1. `src/app/page.tsx` - Added marquee and black CTA button
2. `src/styles/globals.css` - Added marquee animations

---

**Built with ❤️ for Engineering India, YCCE**

**Design**: Monotonic Black & White | **Event**: Hackathon 2025 | **Registration**: Open Now!
