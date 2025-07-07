require 'rails_helper'

RSpec.describe Photographer, type: :model do
  let(:photographer) { build(:photographer) }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(photographer).to be_valid
    end

    it "is not valid without a name" do
      photographer.name = nil
      expect(photographer).to_not be_valid
    end

    it "is not valid without a url" do
      photographer.url = nil
      expect(photographer).to_not be_valid
    end

    describe "url format" do
      it "is not valid without a valid url" do
        photographer.url = "not a valid url"
        expect(photographer).to_not be_valid
      end
    end
  end
end
