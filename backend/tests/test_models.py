import pytest

from photo_gallery.models import Photographer


@pytest.mark.django_db
def test_photographer_str():
    photographer = Photographer.objects.create(name="Behon Baker", pexels_id=1234)
    assert str(photographer) == "Behon Baker"
