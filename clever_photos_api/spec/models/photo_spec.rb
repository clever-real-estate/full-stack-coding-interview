require 'rails_helper'

RSpec.describe Photo, type: :model do
  let(:photo) { build(:photo) }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(photo).to be_valid
    end

    it "is not valid without a width" do
      photo.width = nil
      expect(photo).to_not be_valid
    end

    it "is not valid without a height" do
      photo.height = nil
      expect(photo).to_not be_valid
    end

    it "is not valid without an alt text" do
      photo.alt = nil
      expect(photo).to_not be_valid
    end

    it "is not valid without a photographer" do
      photo.photographer = nil
      expect(photo).to_not be_valid
    end

    describe "url format" do
      it "is not valid without a valid url" do
        photo.url = "not a valid url"
        expect(photo).to_not be_valid
      end
    end

    describe "src_* format" do
      it "is not valid without a valid src_* url" do
        photo.src_original = "not a valid url"
        expect(photo).to_not be_valid
      end

      it "is not valid without a valid src_* url" do
        photo.src_large2x = "not a valid url"
        expect(photo).to_not be_valid
      end

      it "is not valid without a valid src_* url" do
        photo.src_large = "not a valid url"
        expect(photo).to_not be_valid
      end

      it "is not valid without a valid src_* url" do
        photo.src_medium = "not a valid url"
        expect(photo).to_not be_valid
      end

      it "is not valid without a valid src_* url" do
        photo.src_small = "not a valid url"
        expect(photo).to_not be_valid
      end

      it "is not valid without a valid src_* url" do
        photo.src_portrait = "not a valid url"
        expect(photo).to_not be_valid
      end

      it "is not valid without a valid src_* url" do
        photo.src_landscape = "not a valid url"
        expect(photo).to_not be_valid
      end

      it "is not valid without a valid src_* url" do
        photo.src_tiny = "not a valid url"
        expect(photo).to_not be_valid
      end
    end
  end
end
