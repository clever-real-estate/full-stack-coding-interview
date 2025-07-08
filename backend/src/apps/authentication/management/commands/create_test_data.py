from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.photos.models import Photo

User = get_user_model()


class Command(BaseCommand):
    help = 'Create test user and add 10 photos'

    def handle(self, *args, **options):
        # Create test user
        email = 'test@example.com'
        password = 'testpass123'
        
        # Check if user already exists
        if User.objects.filter(email=email).exists():
            self.stdout.write(
                self.style.WARNING(f'User with email {email} already exists')
            )
            user = User.objects.get(email=email)
        else:
            user = User.objects.create_user(
                email=email,
                password=password,
                first_name='Test',
                last_name='User'
            )
            self.stdout.write(
                self.style.SUCCESS(f'Successfully created user: {user.email}')
            )

        # Sample photo data from Pexels API format
        photos_data = [
            {
                'pexels_id': 1001,
                'width': 4000,
                'height': 6000,
                'url': 'https://www.pexels.com/photo/nature-landscape-1001/',
                'photographer': 'John Doe',
                'photographer_url': 'https://www.pexels.com/@johndoe',
                'photographer_id': 101,
                'avg_color': '#8B7355',
                'src_original': 'https://images.pexels.com/photos/1001/nature-landscape-original.jpg',
                'src_large': 'https://images.pexels.com/photos/1001/nature-landscape-large.jpg',
                'src_medium': 'https://images.pexels.com/photos/1001/nature-landscape-medium.jpg',
                'src_small': 'https://images.pexels.com/photos/1001/nature-landscape-small.jpg',
                'alt_text': 'Beautiful mountain landscape at sunset'
            },
            {
                'pexels_id': 1002,
                'width': 3200,
                'height': 4800,
                'url': 'https://www.pexels.com/photo/ocean-waves-1002/',
                'photographer': 'Jane Smith',
                'photographer_url': 'https://www.pexels.com/@janesmith',
                'photographer_id': 102,
                'avg_color': '#2A5F8A',
                'src_original': 'https://images.pexels.com/photos/1002/ocean-waves-original.jpg',
                'src_large': 'https://images.pexels.com/photos/1002/ocean-waves-large.jpg',
                'src_medium': 'https://images.pexels.com/photos/1002/ocean-waves-medium.jpg',
                'src_small': 'https://images.pexels.com/photos/1002/ocean-waves-small.jpg',
                'alt_text': 'Crashing ocean waves on rocky shore'
            },
            {
                'pexels_id': 1003,
                'width': 5000,
                'height': 3333,
                'url': 'https://www.pexels.com/photo/forest-path-1003/',
                'photographer': 'Mike Johnson',
                'photographer_url': 'https://www.pexels.com/@mikejohnson',
                'photographer_id': 103,
                'avg_color': '#3D5A3D',
                'src_original': 'https://images.pexels.com/photos/1003/forest-path-original.jpg',
                'src_large': 'https://images.pexels.com/photos/1003/forest-path-large.jpg',
                'src_medium': 'https://images.pexels.com/photos/1003/forest-path-medium.jpg',
                'src_small': 'https://images.pexels.com/photos/1003/forest-path-small.jpg',
                'alt_text': 'Winding path through dense forest'
            },
            {
                'pexels_id': 1004,
                'width': 4500,
                'height': 3000,
                'url': 'https://www.pexels.com/photo/city-skyline-1004/',
                'photographer': 'Sarah Wilson',
                'photographer_url': 'https://www.pexels.com/@sarahwilson',
                'photographer_id': 104,
                'avg_color': '#4A4A4A',
                'src_original': 'https://images.pexels.com/photos/1004/city-skyline-original.jpg',
                'src_large': 'https://images.pexels.com/photos/1004/city-skyline-large.jpg',
                'src_medium': 'https://images.pexels.com/photos/1004/city-skyline-medium.jpg',
                'src_small': 'https://images.pexels.com/photos/1004/city-skyline-small.jpg',
                'alt_text': 'Modern city skyline at dusk'
            },
            {
                'pexels_id': 1005,
                'width': 3600,
                'height': 5400,
                'url': 'https://www.pexels.com/photo/flower-garden-1005/',
                'photographer': 'Lisa Brown',
                'photographer_url': 'https://www.pexels.com/@lisabrown',
                'photographer_id': 105,
                'avg_color': '#FF6B9D',
                'src_original': 'https://images.pexels.com/photos/1005/flower-garden-original.jpg',
                'src_large': 'https://images.pexels.com/photos/1005/flower-garden-large.jpg',
                'src_medium': 'https://images.pexels.com/photos/1005/flower-garden-medium.jpg',
                'src_small': 'https://images.pexels.com/photos/1005/flower-garden-small.jpg',
                'alt_text': 'Colorful flower garden in full bloom'
            },
            {
                'pexels_id': 1006,
                'width': 4200,
                'height': 2800,
                'url': 'https://www.pexels.com/photo/desert-sand-1006/',
                'photographer': 'David Lee',
                'photographer_url': 'https://www.pexels.com/@davidlee',
                'photographer_id': 106,
                'avg_color': '#D4A574',
                'src_original': 'https://images.pexels.com/photos/1006/desert-sand-original.jpg',
                'src_large': 'https://images.pexels.com/photos/1006/desert-sand-large.jpg',
                'src_medium': 'https://images.pexels.com/photos/1006/desert-sand-medium.jpg',
                'src_small': 'https://images.pexels.com/photos/1006/desert-sand-small.jpg',
                'alt_text': 'Golden sand dunes in vast desert'
            },
            {
                'pexels_id': 1007,
                'width': 3800,
                'height': 2533,
                'url': 'https://www.pexels.com/photo/winter-snow-1007/',
                'photographer': 'Emma Davis',
                'photographer_url': 'https://www.pexels.com/@emmadavis',
                'photographer_id': 107,
                'avg_color': '#E8E8E8',
                'src_original': 'https://images.pexels.com/photos/1007/winter-snow-original.jpg',
                'src_large': 'https://images.pexels.com/photos/1007/winter-snow-large.jpg',
                'src_medium': 'https://images.pexels.com/photos/1007/winter-snow-medium.jpg',
                'src_small': 'https://images.pexels.com/photos/1007/winter-snow-small.jpg',
                'alt_text': 'Snow-covered trees in winter landscape'
            },
            {
                'pexels_id': 1008,
                'width': 4800,
                'height': 3200,
                'url': 'https://www.pexels.com/photo/lake-reflection-1008/',
                'photographer': 'Tom Anderson',
                'photographer_url': 'https://www.pexels.com/@tomanderson',
                'photographer_id': 108,
                'avg_color': '#5B8DB8',
                'src_original': 'https://images.pexels.com/photos/1008/lake-reflection-original.jpg',
                'src_large': 'https://images.pexels.com/photos/1008/lake-reflection-large.jpg',
                'src_medium': 'https://images.pexels.com/photos/1008/lake-reflection-medium.jpg',
                'src_small': 'https://images.pexels.com/photos/1008/lake-reflection-small.jpg',
                'alt_text': 'Perfect mountain reflection in calm lake'
            },
            {
                'pexels_id': 1009,
                'width': 3000,
                'height': 4500,
                'url': 'https://www.pexels.com/photo/waterfall-nature-1009/',
                'photographer': 'Amy White',
                'photographer_url': 'https://www.pexels.com/@amywhite',
                'photographer_id': 109,
                'avg_color': '#6B8E6B',
                'src_original': 'https://images.pexels.com/photos/1009/waterfall-nature-original.jpg',
                'src_large': 'https://images.pexels.com/photos/1009/waterfall-nature-large.jpg',
                'src_medium': 'https://images.pexels.com/photos/1009/waterfall-nature-medium.jpg',
                'src_small': 'https://images.pexels.com/photos/1009/waterfall-nature-small.jpg',
                'alt_text': 'Powerful waterfall cascading down rocks'
            },
            {
                'pexels_id': 1010,
                'width': 4600,
                'height': 3067,
                'url': 'https://www.pexels.com/photo/sunrise-field-1010/',
                'photographer': 'Chris Taylor',
                'photographer_url': 'https://www.pexels.com/@christaylor',
                'photographer_id': 110,
                'avg_color': '#FFB347',
                'src_original': 'https://images.pexels.com/photos/1010/sunrise-field-original.jpg',
                'src_large': 'https://images.pexels.com/photos/1010/sunrise-field-large.jpg',
                'src_medium': 'https://images.pexels.com/photos/1010/sunrise-field-medium.jpg',
                'src_small': 'https://images.pexels.com/photos/1010/sunrise-field-small.jpg',
                'alt_text': 'Golden sunrise over wheat field'
            }
        ]

        # Create photos
        created_count = 0
        for photo_data in photos_data:
            photo, created = Photo.objects.get_or_create(
                pexels_id=photo_data['pexels_id'],
                defaults=photo_data
            )
            
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Created photo: {photo.alt_text}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Photo already exists: {photo.alt_text}')
                )

        self.stdout.write(
            self.style.SUCCESS(f'\nSummary:')
        )
        self.stdout.write(f'Test user: {user.email}')
        self.stdout.write(f'Password: {password}')
        self.stdout.write(f'Created {created_count} new photos')
        self.stdout.write(f'Total photos in database: {Photo.objects.count()}')