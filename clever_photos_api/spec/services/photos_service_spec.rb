require "rails_helper"

RSpec.describe PhotosService do
  subject { described_class.new(user) }

  let(:user) { create(:user) }
  let(:photos) { create_list(:photo, 3) }

  describe "#like_photo" do
    it "likes a photo" do
      expect { subject.like_photo(photos.first.id) }.to change(photos.first.likes, :count).by(1)
    end
  end

  describe "#unlike_photo" do
    context "when the photo is liked" do
      before do
        photos.first.likes.create(user: user)
      end

      it "unlikes a photo" do
        expect { subject.unlike_photo(photos.first.id) }.to change(photos.first.likes, :count).by(-1)
      end
    end

    context "when the photo is not liked" do
      it "does not unlike a photo" do
        expect { subject.unlike_photo(photos.first.id) }.to change(photos.first.likes, :count).by(0)
      end
    end
  end

  describe "#all_photos" do
    it "returns all photos" do
      expect(subject.all_photos).to eq(photos)
    end
  end
end
