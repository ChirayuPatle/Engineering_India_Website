"use client"

import { format } from 'date-fns';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { type Event } from '@/context/eventContext';

interface EventHeaderProps {
  event: Event;
}

const EventHeader = ({ event }: EventHeaderProps) => {
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date || "");
  const isUpcoming = startDate > new Date();
  
  const formatDate = (date: Date) => format(date, 'MMMM d, yyyy');
  const formatTime = (date: Date) => format(date, 'h:mm a');

  // Use the first gallery image or poster for the hero image
  const heroImage = event.gallery && event.gallery.length > 0 
    ? event.gallery[0] 
    : event.image;

  return (
    <div className="animate-fade-in">
      {/* Full-width hero image */}
      {heroImage && (
        <div className="w-full h-[40vh] md:h-[60vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10" /> {/* Overlay */}
          <img 
            src={heroImage} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
            <div className="container max-w-4xl mx-auto">
              {isUpcoming && (
                <Badge className="bg-black text-white mb-2">Upcoming Event</Badge>
              )}
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-white/90 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(startDate)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(startDate)} - {formatTime(endDate)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Event info card */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
        <div className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white rounded-lg shadow-lg">
          {/* Event image (smaller version) */}
          <div className="w-full md:w-1/3 rounded-lg overflow-hidden shadow-lg">
            {event.image ? (
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-auto object-cover aspect-square md:aspect-[4/3]"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-medium">No Image Available</span>
              </div>
            )}
          </div>
          
          {/* Event summary info */}
          <div className="w-full md:w-2/3 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              {event.fee ? (
                <Badge variant="outline" className="text-lg px-3 py-1 border-black text-black">
                  ₹ {event.fee.toLocaleString()}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-lg px-3 py-1 border-green-500 text-green-500">
                  Free
                </Badge>
              )}
              
              <div className="flex items-center gap-1">
                <span className="font-medium">{event.spots_filled}</span>
                <span className="text-gray-500">going</span>
              </div>
            </div>
            
            <p className="text-gray-600 line-clamp-2">
              {event.description.split('\n\n')[0]}
            </p>
            
            <div className="pt-2">
              <span className="text-sm text-gray-500">Organized by: </span>
              <span className="font-medium">{event?.organizer?.email || 'Unknown Organizer'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;
