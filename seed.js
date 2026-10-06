import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://cnckzaybkmlcfxnhvrmp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuY2t6YXlia21sY2Z4bmh2cm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MjQ0NDYsImV4cCI6MjEwNDMwMDQ0Nn0.K5_AlEAFqUFQDQJVHd3DSAuffUxVxeMTQDR8wu0PoYY');

const CARDS_DATA = [
  { id: 1, title: 'Branchwise ELC', subtitle: 'Branch level event', image: '/thumb3.png', color: '#38bdf8' },
  { id: 2, title: 'Summer ELC', subtitle: 'Summer event', image: '/thumb2.png', color: '#3b82f6' },
  { id: 3, title: 'Startups', subtitle: 'More events', image: '/thumb1.jpg', color: '#67e8f9' },
  { id: 4, title: 'ELC Projects', subtitle: 'Innovation & research', image: '/elc_project_thumb.png', color: '#38bdf8' },
  { id: 5, title: 'Resources', subtitle: 'Equipment & facilities', image: '/resources_thumb.png', color: '#3b82f6' },
  { id: 6, title: 'Campus Tours', subtitle: 'Explore campus', image: '/campus_tour_thumb.png', color: '#38bdf8' },
  { id: 7, title: 'Faculty', subtitle: 'Our team', image: '/faculty_thumb.jpg', color: '#67e8f9' }
];

async function seed() {
    for (const card of CARDS_DATA) {
        const { data, error } = await supabase.from('categories').insert({
            slug: card.title.toLowerCase().replace(/\\s+/g, '-'),
            title: card.title,
            badge: card.subtitle,
            color: card.color,
            image_url: card.image,
            order_index: card.id
        }).select();
        
        if (error) console.error('Error inserting', card.title, error);
        else console.log('Inserted', card.title, data[0].id);
    }
}
seed();