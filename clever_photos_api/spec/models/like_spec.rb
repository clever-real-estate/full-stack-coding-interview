require 'rails_helper'

RSpec.describe Like, type: :model do
  let(:like) { create(:like) }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(like).to be_valid
    end

    it "is not valid with a duplicate user and photo" do
      duplicate_like = build(:like, user: like.user, photo: like.photo)
      expect(duplicate_like).to_not be_valid
      expect(duplicate_like.errors[:user_id]).to include("has already been taken")
    end

    it "is not valid without a user" do
      like.user = nil
      expect(like).to_not be_valid
    end

    it "is not valid without a photo" do
      like.photo = nil
      expect(like).to_not be_valid
    end
  end
end
